import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  FaPaperPlane,
  FaReply,
  FaTrashCan,
  FaHeart,
  FaThumbsUp,
  //   FaLightbulb,
  FaCircleQuestion,
  FaCircleCheck,
  FaComments,
} from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const StudentGuildChat = () => {
  const { subject } = useParams();
  const currentSubject = subject ? subject.toLowerCase() : "maths";

  // 📝 USER SESSION METADATA (ලොග් වී ඉන්නා ළමයාගේ දත්ත Session එකෙන් ගනී)
  const currentUserName =
    localStorage.getItem("student_name") || "Active Student";
  const currentUserRole = localStorage.getItem("student_role") || "student"; // student | mentor | teacher

  // 💬 CHAT STREAMS STATES
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");
  const [isQuestionToggle, setIsQuestionToggle] = useState(false);
  const [replyTarget, setReplyTarget] = useState(null); // Forward/Reply සඳහා පරණ මැසේජ් එක ලොක් කරයි
  const [activeFilter, setActiveFilter] = useState("ALL"); // ALL | UNSOLVED | SOLVED

  const chatEndRef = useRef(null);

  // 🔄 REAL-TIME CLOUD CHAT MATRIX HYDRATION LOOP [INDEX 51]
  useEffect(() => {
    // ⏳ 30 DAYS LIFECYCLE FILTER LOGIC: දවස් 30කට වඩා පරණ මැසේජ් ලෝඩ් නොවේ [INDEX 4]
    const expirationLimit = new Date();
    expirationLimit.setDate(expirationLimit.getDate() - 30);
    const dateBarrierStr = expirationLimit.toISOString();

    const q = query(
      collection(db, "guild_chats"),
      where("subject", "==", currentSubject),
      where("createdAt", ">=", dateBarrierStr),
      orderBy("createdAt", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const chatList = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setMessages(chatList);
      },
      (err) => {
        console.error("Cloud Guild Stream Interrupted:", err);
      },
    );

    return () => unsubscribe();
  }, [currentSubject]);

  // Auto Scroll Engine to Bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🚀 DISPATCH MESSAGE TO CLOUD LEDGER
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 30); // ⏳ Auto-Expire Timestamp එක දවස් 30කට ඉදිරියට ලොක් කරයි [INDEX 4]

    const chatPayload = {
      id: "MSG-" + Date.now().toString().slice(-6),
      senderName: currentUserName,
      senderRole: currentUserRole,
      text: typedMessage.trim(),
      type: isQuestionToggle ? "question" : "general",
      status: isQuestionToggle ? "pending" : "none", // pending | solved | none
      subject: currentSubject,
      replyTo: replyTarget
        ? {
            id: replyTarget.id,
            sender: replyTarget.senderName,
            text: replyTarget.text,
          }
        : null, // Forward Reply Logic [INDEX 4]
      reactions: { heart: 0, thumbs: 0, brain: 0 },
      createdAt: today.toISOString(),
      expireAt: expiryDate.toISOString(), // 🧹 TTL Sweeper එකට අවශ්‍ය Timestamp එක [INDEX 4]
    };

    try {
      await addDoc(collection(db, "guild_chats"), chatPayload);
      setTypedMessage("");
      setIsQuestionToggle(false);
      setReplyTarget(null); // Reset Reply Target Frame
    } catch (err) {
      console.error("Cloud Message Dispatch Failure:", err);
    }
  };

  // 👍 LIVE REACTION OVERRIDE CONTROLLER [INDEX 4]
  const handleAddReaction = async (docId, reactionType) => {
    try {
      const docRef = doc(db, "guild_chats", docId);
      const targetMsg = messages.find((m) => m.docId === docId);
      if (!targetMsg) return;

      const updatedReactions = { ...targetMsg.reactions };
      updatedReactions[reactionType] =
        (updatedReactions[reactionType] || 0) + 1;

      await updateDoc(docRef, { reactions: updatedReactions });
    } catch (err) {
      console.error("Reaction Sync Mutation Failed:", err);
    }
  };
  // 🏆 VERIFY ANSWER / MARK AS SOLVED ENGINE [INDEX 4]
  const handleVerifyAnswer = async (docId) => {
    try {
      const docRef = doc(db, "guild_chats", docId);
      await updateDoc(docRef, { status: "solved" });
    } catch (err) {
      console.error("Status Mutation Failed:", err);
    }
  };

  // 🗑️ ADMINISTRATIVE EVICTION CONTROL (For Teachers/Admins Only)
  const handleEvictMessage = async (docId) => {
    if (
      window.confirm(
        "Evict this message frame permanently from cloud database boundaries?",
      )
    ) {
      try {
        await deleteDoc(doc(db, "guild_chats", docId));
      } catch (err) {
        console.error("Eviction Operation Failure:", err);
      }
    }
  };

  // 🔍 UNCHARTED MULTI-TENANT FILTER MATRIX (උඹ ඉල්ලපු අච්චාරු විරෝධී Question Filters!) [INDEX 4]
  const filteredMessages = messages.filter((msg) => {
    if (activeFilter === "UNSOLVED")
      return msg.type === "question" && msg.status === "pending";
    if (activeFilter === "SOLVED") return msg.status === "solved";
    return true; // ALL Mode
  });

  return (
    <div className="student-guild-chat-workspace">
      <div className="system-container">
        <div className="back-buttons">
          <Link className="back-btn" to="/">
            <IoIosArrowBack /> Back to Home
          </Link>
          <Link className="back-btn" to="/student-voices">
            Go to Comments
            <IoIosArrowForward />
          </Link>
        </div>

        {/* 🎛️ TOP CONTROLLER BAR: FILTER PILLS MATRIX */}
        <div className="chat-top-filter-dock">
          <div className="chat-title-meta-group">
            <FaComments className="chat-hub-main-icon" />
            <strong className="chat-hub-display-heading">
              {subject?.toUpperCase()} Grade 11 Study Guild
            </strong>
          </div>

          {/* 🔍 QUESTION FILTER PILLS */}
          <div className="chat-question-filter-pills-row">
            {[
              { id: "ALL", label: "All Streams" },
              { id: "UNSOLVED", label: "❓ Unsolved Only" },
              { id: "SOLVED", label: "✅ Knowledge Hub" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveFilter(p.id)}
                className={`chat-filter-pill-trigger-btn ${activeFilter === p.id ? "pill-active" : ""}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 💬 LIVE MESSAGES FEED MATRIX */}
        <div
          className="chat-messages-scroll-area"
          style={{
            flexGrow: 1,
            padding: "20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}>
          {filteredMessages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#8b949e",
                fontStyle: "italic",
                fontSize: "0.85rem",
                margin: "auto",
              }}>
              No corporate timeline frames cataloged inside this filter
              partition.
            </div>
          ) : (
            filteredMessages.map((msg) => {
              // 🎨 VISUAL ISOLATION: ප්‍රශ්න, උත්තර සහ සාමාන්‍ය මැසේජ් වෙන වෙනම පාට වලින් වෙන් කිරීම
              const isMsgQuestion = msg.type === "question";
              const isMsgSolved = msg.status === "solved";

              let bubbleBg = "#ffffff";
              let bubbleBorder = "1px solid #eef2ff";
              if (isMsgQuestion) {
                bubbleBg = "#f0f4ff";
                bubbleBorder = "1px solid #c7d2fe";
              } else if (isMsgSolved) {
                bubbleBg = "#ecfdf5";
                bubbleBorder = "1px solid #bbf7d0";
              }

              return (
                <div
                  key={msg.docId}
                  style={{
                    background: bubbleBg,
                    border: bubbleBorder,
                    padding: "15px",
                    borderRadius: "12px",
                    maxWidth: "70%",
                    width: "fit-content",
                    alignSelf:
                      msg.senderName === currentUserName
                        ? "flex-end"
                        : "flex-start",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                    position: "relative",
                  }}>
                  {/* 📌 WHATSAPP STYLE FORWARD / REPLY PREVIEW BOX */}
                  {msg.replyTo && (
                    <div
                      style={{
                        background: "rgba(0,0,0,0.03)",
                        borderLeft: "3px solid #0056ff",
                        padding: "8px 10px",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        fontSize: "0.8rem",
                        color: "#484848",
                      }}>
                      <strong style={{ display: "block", color: "#0056ff" }}>
                        @{msg.replyTo.sender} (Question)
                      </strong>
                      <p
                        style={{
                          margin: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                        {msg.replyTo.text}
                      </p>
                    </div>
                  )}

                  {/* MAIN TEXT CHANNEL */}
                  <p
                    style={{
                      margin: "0 0 10px 0",
                      color: "#001b42",
                      fontSize: "0.92rem",
                      lineHeight: "1.4",
                      fontWeight: isMsgQuestion ? "600" : "500",
                      textAlign: "left",
                    }}>
                    {msg.text}
                  </p>

                  {/* 👟 METADATA FOOTER: නම, රෝල් එක සහ වෙලාව */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "20px",
                      borderTop: "1px solid rgba(0,0,0,0.03)",
                      paddingTop: "8px",
                    }}>
                    <small
                      style={{
                        color: "#8b949e",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                      }}>
                      {msg.senderName} |{" "}
                      <span
                        style={{
                          color:
                            msg.senderRole === "teacher"
                              ? "#ff4b4b"
                              : msg.senderRole === "mentor"
                                ? "#ff9900"
                                : "#0056ff",
                        }}>
                        {msg.senderRole?.toUpperCase()}
                      </span>
                    </small>
                    <small style={{ color: "#8b949e", fontSize: "0.7rem" }}>
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </div>

                  {/* 👍 INTERACTIVE REACTION MATRIX CONTROLS */}
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                    <button
                      onClick={() => handleAddReaction(msg.docId, "heart")}
                      style={{
                        background: "none",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        fontSize: "0.75rem",
                        color: "#ff4b6e",
                        cursor: "pointer",
                      }}>
                      <FaHeart /> {msg.reactions?.heart || 0}
                    </button>
                    <button
                      onClick={() =>
                        handleAddReaction((docId) => msg.docId, "thumbs")
                      }
                      style={{
                        background: "none",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        fontSize: "0.75rem",
                        color: "#0056ff",
                        cursor: "pointer",
                      }}>
                      <FaThumbsUp /> {msg.reactions?.thumbs || 0}
                    </button>
                  </div>

                  {/* 🎛️ ACTION PANEL: REPLY / VERIFY / EVICT CONTROLS */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "flex-end",
                      marginTop: "10px",
                      borderTop: "1px solid rgba(0,0,0,0.03)",
                      paddingTop: "6px",
                    }}>
                    <button
                      onClick={() => setReplyTarget(msg)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0056ff",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      title="Reply to Message">
                      <FaReply /> Reply
                    </button>

                    {isMsgQuestion &&
                      msg.status === "pending" &&
                      (currentUserRole === "teacher" ||
                        currentUserRole === "mentor") && (
                        <button
                          onClick={() => handleVerifyAnswer(msg.docId)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#10b981",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                          title="Mark as Solved">
                          <FaCircleCheck /> Solve
                        </button>
                      )}

                    {currentUserRole === "teacher" && (
                      <button
                        onClick={() => handleEvictMessage(msg.docId)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff4b4b",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        title="Evict Frame">
                        <FaTrashCan />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* 📌 FLOATING REPLY ANCHOR NOTIFICATION */}
        {replyTarget && (
          <div
            style={{
              background: "#eef2ff",
              padding: "8px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #c7d2fe",
              fontSize: "0.85rem",
              color: "#0056ff",
            }}>
            <span>
              Replying to <strong>@{replyTarget.senderName}</strong>: "
              {replyTarget.text.slice(0, 40)}..."
            </span>
            <button
              onClick={() => setReplyTarget(null)}
              style={{
                background: "none",
                border: "none",
                color: "#ff4b4b",
                cursor: "pointer",
                fontWeight: "bold",
              }}>
              Cancel
            </button>
          </div>
        )}

        {/* 🚀 BOTTOM LAYOUT: CHAT INPUT CONTROLLERS */}
        <form
          onSubmit={handleSendMessage}
          style={{
            display: "flex",
            gap: "12px",
            padding: "15px 20px",
            background: "#ffffff",
            borderTop: "1px solid #eef2ff",
            alignItems: "center",
          }}>
          {/* ❓ QUESTION TOGGLE TEMPLATE */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              color: isQuestionToggle ? "#ff9900" : "#8b949e",
              background: isQuestionToggle ? "#fff7ed" : "#f4f6fa",
              padding: "10px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.2s",
            }}>
            <input
              type="checkbox"
              checked={isQuestionToggle}
              onChange={(e) => setIsQuestionToggle(e.target.checked)}
              style={{ cursor: "pointer" }}
            />
            <FaCircleQuestion /> Mark as Core Question
          </label>

          <input
            type="text"
            placeholder={
              isQuestionToggle
                ? "Type your academic question details..."
                : "Type your message stream details..."
            }
            required
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #d2d6dc",
              outline: "none",
              fontSize: "0.9rem",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#0056ff",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyValue: "center",
            }}
            title="Broadcast Message">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentGuildChat;
