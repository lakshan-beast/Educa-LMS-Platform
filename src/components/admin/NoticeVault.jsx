import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebaseConfig"; // 👑 අපේ මධ්‍යම Firebase පාලම ගත්තා
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore"; // ☁️ Cloud Tools ගත්තා
import {
  FaBell,
  FaCirclePlus,
  FaTrashCan,
  FaBullhorn,
  FaCircleExclamation,
  FaCalendar,
} from "react-icons/fa6";
import ConfirmationModal from "../ConfirmationModal"; // 👑 අපේ මධ්‍යම Reusable Modal එක

const ClassNoticeVault = ({ selectedGrade, subject }) => {
  const currentSubject = (subject || "maths").toLowerCase();

  // 1. 👑 🆕 [LIVE CLOUD NOTICES STATE]: පරණ Hardcoded ලිස්ට් එක වෙනුවට හිස් Array එකක් ගත්තා
  const [notices, setNotices] = useState([]);

  const [formData, setFormData] = useState({
    type: " General-Notice", // Default Selector Match
    text: "",
  });

  // System States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reusable Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectNoticeId, setSelectNoticeId] = useState(null);

  // ============================================================
  // 📥 👑 [LIVE CLOUD FETCH ENGINE]: සජීවීව Firebase එකෙන් නිවේදන ඇදලා ගන්නා පාලම
  const fetchCloudNotices = useCallback(async () => {
    setTimeout(() => setIsLoading(true), 0);
    try {
      // ☁️ Firebase 'class_notices' එකෙන් තෝරාගත් ශ්‍රේණියට සහ විෂයට අදාළ සියලුම දත්ත Query කරයි
      const q = query(
        collection(db, "class_notices"),
        // where("grade", "==", selectedGrade || "11"),
        where("grade", "==", String(selectedGrade)),
        where("subject", "==", currentSubject),
        orderBy("createdAt", "desc"), // 🕒 අලුත්ම නිවේදන උඩටම ගනී
      );

      const querySnapshot = await getDocs(q);
      const noticeList = [];

      querySnapshot.forEach((doc) => {
        noticeList.push({ id: doc.id, ...doc.data() });
      });

      setNotices(noticeList); // 🚀 සැබෑ Cloud දත්ත ටික State එකට දැම්මා!
    } catch (err) {
      console.error("Fetch Notices Error:", err);
    }
    setTimeout(() => setIsLoading(false), 0);
  }, [selectedGrade, currentSubject]);

  useEffect(() => {
    // fetchCloudNotices();
  }, [fetchCloudNotices]);
  // ============================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧠 ☁️ [THE CLOUD BROADCAST ENGINE]: නිවේදන සජීවීව Cloud එකට යවන ප්‍රධාන ලොජික් එක
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.text.trim() === "") {
      setError("Please enter the announcement message! ⚠️");
      setIsSubmitting(false);
      return;
    }

    // 👑 🔐 [SMART DYNAMIC ID]: ඊයේ අපි හදපු Date.now() ස්මාර්ට් ID Generator එක
    const docId = "NOT-" + Date.now().toString().slice(-6);

    const noticeCloudData = {
      id: docId,
      type: formData.type,
      text: formData.text.trim(),
      // 📅 සර්ලාට පේන්න අද දවසේ දිනය පිරිසිදුව සේව් කරයි
      date: new Date().toISOString().split("T")[0],
      // grade: selectedGrade || "11",
      grade: String(selectedGrade),
      subject: currentSubject,
      author:
        currentSubject === "maths"
          ? "Janaka Sir"
          : currentSubject === "science"
            ? "Science Sir"
            : "English Teacher",
      createdAt: new Date().toISOString(),
    };

    try {
      // 🚀 setDoc() මඟින් Google Firestore එක ඇතුළටම ලස්සනට ලියයි! [INDEX 51]
      await setDoc(doc(db, "class_notices", docId), noticeCloudData);

      setSuccess(
        "The announcement was successfully broadcast live to the entire site! 🟢",
      );
      setError("");
      setFormData({ type: "💡 General-Notice", text: "" });
      fetchCloudNotices(); // වොච් එන්ජිම ලයිව් රီෆ්‍රෙෂ් කරයි
    } catch (err) {
      console.error("Cloud Save Notice Error:", err);
      setError("නිවේදනය Cloud එකට සේව් කිරීමේදී දෝෂයක් සිදු විය! ❌");
    }
    setIsSubmitting(false);
  };
  // 🗑️ 🎛️ [THE POPUP TRIGGER]
  const handleDeleteNotice = (id) => {
    setSelectNoticeId(id);
    setIsModalOpen(true); // 👑 ලස්සන පොප්-අප් එක ඕපන් කරයි
  };

  // 🗑️ ☁️ [THE REAL CLOUD DELETE LOGIC]: "Yes" එබූ විට සැබෑ ලෙසම Google Cloud එකෙන් මකා දමයි!
  const confirmRemoveNotice = async () => {
    setIsModalOpen(false);
    if (!selectNoticeId) return;

    setIsLoading(true);
    try {
      // ☁️ Firebase Firestore එකෙන් අදාළ Document එක සදහටම ඩිලීට් කරයි!
      await deleteDoc(doc(db, "class_notices", selectNoticeId));
      setSuccess(
        "The announcement was successfully removed from Google Cloud! 🔴",
      );
      setError("");
      fetchCloudNotices(); // ලයිව් ලිස්ට් එක නැවත අප්ඩේට් කරයි
    } catch (err) {
      console.error("Delete Notice Error:", err);
      setError("නිවේදනය Cloud එකෙන් මැකීමේදී දෝෂයක් සිදු විය! ❌");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="vault-container"
      style={{ background: "white", padding: "30px", borderRadius: "20px" }}>
      {/* Vault Header */}
      <div style={{ marginBottom: "25px" }}>
        <h3
          style={{
            color: "#1a0a54",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
          <FaBullhorn style={{ color: "#ff4b2b" }} /> Class Notice Vault (
          {subject?.toUpperCase()})
        </h3>
        <p style={{ color: "#666", fontSize: "0.85rem", margin: "5px 0 0" }}>
          Announcements entered here will be published live on the Student
          Dashboard, Parent Portal, and Home Page simultaneously [INDEX 51].
        </p>
      </div>

      {/* Notifications Alert Boxes */}
      {error && (
        <div
          style={{
            background: "#fdedec",
            borderLeft: "5px solid #e74c3c",
            color: "#c0392b",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "0.88rem",
            fontWeight: "bold",
          }}>
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div
          style={{
            background: "#e8f8f5",
            borderLeft: "5px solid #2ecc71",
            color: "#27ae60",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "0.88rem",
            fontWeight: "bold",
          }}>
          ✓ {success}
        </div>
      )}

      {/* ==================== FORMS & TABLES GRID ==================== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "50px",
        }}>
        {/* 📝 LEFT SIDE: POST NEW NOTICE FORM */}
        <div
          style={{
            background: "#fffbfb",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #feeaea",
            height: "fit-content",
          }}>
          <h4
            style={{
              margin: "0 0 15px",
              // color: "#ff4b2b",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <FaCirclePlus style={{ color: "#ff4b2b" }} /> Broadcast New Notice
          </h4>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {/* Notice Type Selector */}
            <div className="input-group">
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  color: "#1a0a54",
                  display: "block",
                  marginBottom: "5px",
                }}>
                Notice Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}>
                <option value=" General-Notice">💡 General Notice</option>
                <option value=" Special-Alert">🚨 Special Alert</option>
                <option value="Parent-Meetings">📅 Parent Meetings</option>
                <option value=" Class-Holidays">🛑 Class Holidays</option>
                <option value=" Extra-Classes">⚡ Extra Classes</option>
              </select>
            </div>
            {/* Notice Message Textarea */}
            <div className="input-group">
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  color: "#1a0a54",
                  display: "block",
                  marginBottom: "5px",
                }}>
                Notice Message
              </label>
              <textarea
                name="text"
                rows="5"
                placeholder="For example: There will be no class next week on the occasion of Poya Day..."
                required
                value={formData.text}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontFamily: "inherit",
                  resize: "none",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                }}
              />
            </div>

            <button
              type="submit"
              className="start-btn"
              style={{
                width: "100%",
                padding: "12px",
                background: "#ff4b2b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "5px",
                boxShadow: "0 4px 10px rgba(255,75,43,0.2)",
              }}>
              {isSubmitting
                ? "⏳ Broadcasting..."
                : "📣 Broadcast Notice to All"}
            </button>
          </form>
        </div>

        {/* 📊 RIGHT SIDE: LIVE NOTICES LOG TABLE */}
        <div>
          <h4
            style={{
              margin: "0 0 15px",
              color: "#1a0a54",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
            <FaBell style={{ color: "#ff4b2b" }} /> Active Notices Screen (Grade{" "}
            {selectedGrade})
          </h4>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {isLoading ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#ff4b2b",
                  fontWeight: "bold",
                  padding: "20px 0",
                }}>
                🔄 Syncing Live Notices from Cloud...
              </div>
            ) : notices.length > 0 ? (
              notices.map((notice, index) => (
                <div
                  key={notice.id || index}
                  style={{
                    background: "#fcfcfd",
                    padding: "18px",
                    borderRadius: "15px",
                    border: "1px solid #eee",
                    borderLeft: "5px solid #ff4b2b",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "15px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                  }}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        marginBottom: "8px",
                        padding: "0 6px",
                      }}>
                      <h2>{notice.subject} Class</h2>
                      <span
                        style={{
                          background: "#ff300b",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}>
                        {notice.type}
                      </span>
                      <small style={{ color: "#aaa", fontWeight: "bold" }}>
                        for ({notice.grade}) Students
                      </small>
                    </div>
                    <p
                      style={{
                        margin: "10px 0 0 0",
                        fontSize: "0.92rem",
                        color: "#333",
                        lineHeight: "1.6",
                        fontWeight: "500",
                      }}>
                      {notice.text}
                    </p>

                    <small
                      style={{
                        color: "#aaa",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "12px",
                      }}>
                      <FaCalendar /> Posted: {notice.date}
                    </small>
                  </div>

                  {/* Delete Notice Button Tool */}
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    style={{
                      background: "#fce4e4",
                      color: "#c0392b",
                      border: "none",
                      padding: "8px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#f9cbd2")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "#fce4e4")
                    }>
                    <FaTrashCan style={{ fontSize: "0.95rem" }} />
                  </button>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  background: "#f8faff",
                  borderRadius: "15px",
                  border: "1px dashed #ccc",
                  color: "#777",
                }}>
                <FaCircleExclamation
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "8px",
                    color: "#aaa",
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}>
                  No active notices for Grade {selectedGrade} yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Are You Sure?"
        message="Do you want to completely remove this data from the system? This action cannot be undone."
        type="danger"
        onConfirm={confirmRemoveNotice}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ClassNoticeVault;
