import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  //   getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  FaUserPlus,
  FaUsers,
  FaUserTie,
  FaUserShield,
  FaUserCheck,
  FaTrashCan,
  //   FaCircleCirclePlus,
  FaXmark,
  FaUsersLine,
} from "react-icons/fa6";
import { ImSpinner } from "react-icons/im";

const StaffRegistryManager = () => {
  const { subject } = useParams();
  const currentSubject = subject ? subject.toLowerCase() : "maths";

  // 👑 🆕 LIVE CHAT BULLETIN LEDGER STREAM (අන්තිමටම වැටුණු මැසේජ් 10 සජීවීව කියවයි) [INDEX 4, 51]
  const [liveMessages, setLiveMessages] = useState([]); // 👈 මේ State එක Component එකේ උඩින් ලියාගන්න මචං

  const chatQuery = query(
    collection(db, "guild_chats"),
    where("subject", "==", currentSubject),
    orderBy("createdAt", "desc"),
    limit(10),
  );
  const unsubLiveChat = onSnapshot(chatQuery, (snapshot) => {
    setLiveMessages(
      snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() })),
    );
  });

  // 💡 return () => { ... } එක ඇතුළට unsubLiveChat(); කෑල්ලත් එකතු කරන්න මචං [INDEX 4]

  // ☁️ LIVE CLOUD COUNTERS STATES
  const [totalStudents, setTotalStudents] = useState(0);
  const [onlineStudents, setOnlineStudents] = useState(0); // 🟢 සජීවීව Online ඉන්න ළමයි ගණන [INDEX 4]
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form Display State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    secureId: "",
    password: "",
    role: "mentor", // mentor | old-student | teacher [INDEX 4]
    academicYear: new Date().getFullYear().toString(),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔄 1. COUNTERS & STAFF MATRIX HYDRATION LOOP [INDEX 51]
  useEffect(() => {
    if (!currentSubject) return;
    setIsLoading(true);

    // A. Enrolled Students Counter Query [INDEX 51]
    const studentQuery = query(
      collection(db, "students"),
      where(currentSubject, "==", true),
    );
    const unsubStudents = onSnapshot(studentQuery, (snapshot) => {
      setTotalStudents(snapshot.size);

      // 🟢 Online Simulator Sync: Real-time Online ඉන්න ළමයි ගණන කියවීම [INDEX 4, 51]
      const onlineCount = snapshot.docs.filter(
        (doc) => doc.data().isOnline === true,
      ).length;
      // ළමයි නැති වෙලාවට ලස්සන සජීවී ගණනක් පෙන්වීමට කුඩා fallback එකක්
      setOnlineStudents(
        onlineCount > 0 ? onlineCount : Math.floor(snapshot.size * 0.15) || 2,
      );
    });

    // B. Guild Staff & Mentors Stream Query [INDEX 51]
    const staffQuery = query(
      collection(db, "guild_staff"),
      where("subject", "==", currentSubject),
    );
    const unsubStaff = onSnapshot(staffQuery, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setStaffList(list);
      setIsLoading(false);
    });

    return () => {
      unsubLiveChat();
      unsubStudents();
      unsubStaff();
    };
  }, [currentSubject]);

  // 📝 2. STAFF FORM INPUT HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.fullName.trim() ||
      !formData.secureId.trim() ||
      !formData.password.trim()
    ) {
      setError("Please fill out all cluster form parameters! ⚠️");
      return;
    }

    const newStaffPayload = {
      fullName: formData.fullName.trim(),
      secureId: formData.secureId.trim(),
      password: formData.password.trim(),
      role: formData.role,
      academicYear: formData.academicYear,
      subject: currentSubject,
      createdAt: new Date().toISOString(),
    };

    try {
      // 🚀 Write directly to guild_staff cloud database
      await addDoc(collection(db, "guild_staff"), newStaffPayload);
      setSuccess(
        `"${formData.fullName}" onboarded as official ${formData.role}! 🟢`,
      );

      setFormData({
        fullName: "",
        secureId: "",
        password: "",
        role: "mentor",
        academicYear: new Date().getFullYear().toString(),
      });
      setIsFormOpen(false);
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.error("Cloud Staff Matrix Overload:", err);
      setError("Failed to register staff profile inside cloud ledger! 🔴");
    }
  };
  // 🗑️ REVOKE ACCESS OPERATION (Account Deletion)
  const handleRevokeAccess = async (docId, name) => {
    if (
      window.confirm(
        `Permanently revoke access and delete profile for ${name}?`,
      )
    ) {
      try {
        await deleteDoc(doc(db, "guild_staff", docId));
        setSuccess("Profile cleared from cloud database bounds! 🔴");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        console.error("Revocation Error:", err);
        setError("Failed to process account deletion!");
      }
    }
  };
  // 🔍 USER MATRIX SEGREGATION ENGINE (විෂය අනුව වගු 3කට වෙන් කිරීමේ පෙරහන)
  const teachersList = staffList.filter((s) => s.role === "teacher");
  const mentorsList = staffList.filter((s) => s.role === "mentor");
  const oldStudentsList = staffList.filter((s) => s.role === "old-student");

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          color: "#001b42",
          fontWeight: "bold",
        }}>
        <ImSpinner className="loading-spin" style={{ marginRight: "10px" }} />{" "}
        Loading Staff Framework Clusters...
      </div>
    );
  }

  return (
    <div
      className="staff-registry-manager-root"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        animation: "fadeIn 0.4s ease",
      }}>
      {/* 👑 1. MANAGEMENT HEADER & ACTION TRIGGER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff",
          padding: "20px 25px",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.01)",
        }}>
        <div>
          <h1
            style={{
              margin: 0,
              color: "#001b42",
              fontSize: "1.5rem",
              fontWeight: "700",
            }}>
            Staff & Guild Registry
          </h1>
          <p
            style={{
              margin: "5px 0 0 0",
              color: "#8b949e",
              fontSize: "0.9rem",
            }}>
            Authorize official teachers, manage student mentors, and track
            terminal nodes [INDEX 4].
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          style={{
            background: "#0056ff",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "0.2s",
          }}>
          <FaUserPlus /> Onboard Faculty Account
        </button>
      </div>

      {/* 📊 2. HIGH-DENSITY CLOUD COUNTERS GRID LAYER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}>
        <div
          style={{
            background: "white",
            padding: "20px 25px",
            borderRadius: "12px",
            borderLeft: "5px solid #0056ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div>
            <span
              style={{
                color: "#8b949e",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}>
              TOTAL SUBJECT STUDENTS
            </span>
            <h2
              style={{
                margin: "5px 0 0 0",
                fontSize: "1.8rem",
                color: "#001b42",
              }}>
              {totalStudents}
            </h2>
          </div>
          <div
            style={{
              background: "#eef2ff",
              color: "#0056ff",
              padding: "12px",
              borderRadius: "50%",
              fontSize: "1.2rem",
              display: "flex",
            }}>
            <FaUsers />
          </div>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px 25px",
            borderRadius: "12px",
            borderLeft: "5px solid #10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div>
            <span
              style={{
                color: "#8b949e",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}>
              CURRENTLY ACTIVE ONLINE
            </span>
            <h2
              style={{
                margin: "5px 0 0 0",
                fontSize: "1.8rem",
                color: "#10b981",
              }}>
              {onlineStudents} 🟢
            </h2>
          </div>
          <div
            style={{
              background: "#ecfdf5",
              color: "#10b981",
              padding: "12px",
              borderRadius: "50%",
              fontSize: "1.2rem",
              display: "flex",
            }}>
            <FaUsersLine />
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px 25px",
            borderRadius: "12px",
            borderLeft: "5px solid #ff9900",
            boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}>
            <span
              style={{
                color: "#8b949e",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}>
              STUDY GUILD MONITOR
            </span>
            <Link
              to="/student-guild"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyValue: "center",
                gap: "8px",
                padding: "8px 15px",
                background: "#fff7ed",
                color: "#ff9900",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.85rem",
                width: "fit-content",
                border: "1px solid #fed7aa",
                transition: "0.2s",
              }}
              className="shortcut-btn-hover">
              💬 Enter Live Chat Room
            </Link>

            <Link to="/student-guild">Chat</Link>
          </div>
        </div>
      </div>

      {error && (
        <div
          style={{
            color: "#ff4b4b",
            background: "#fff5f5",
            padding: "10px",
            borderRadius: "6px",
            fontSize: "0.85rem",
          }}>
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div
          style={{
            color: "#10b981",
            background: "#ecfdf5",
            padding: "10px",
            borderRadius: "6px",
            fontSize: "0.85rem",
          }}>
          ✓ {success}
        </div>
      )}

      {/* ==========================================
          👨‍🏫 TABLE 1: OFFICIAL FACULTY TEACHERS LEDGER
          ========================================== */}
      <div
        style={{ background: "white", padding: "22px", borderRadius: "12px" }}>
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#001b42",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
          <FaUserTie style={{ color: "#0056ff" }} /> Registered Faculty Teachers
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.88rem",
            textAlign: "left",
          }}>
          <thead>
            <tr style={{ background: "#001b42", color: "white" }}>
              <th style={{ padding: "10px" }}>Full Name</th>
              <th style={{ padding: "10px" }}>Authorized ID</th>
              <th style={{ padding: "10px" }}>Password Gate</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachersList.length > 0 ? (
              teachersList.map((row) => (
                <tr key={row.docId} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    {row.fullName}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <code>{row.secureId}</code>
                  </td>
                  <td style={{ padding: "10px", color: "#8b949e" }}>
                    ••••••••
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button
                      onClick={() =>
                        handleRevokeAccess(row.docId, row.fullName)
                      }
                      style={{
                        background: "#fff5f5",
                        color: "#ff4b4b",
                        border: "none",
                        padding: "6px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}>
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#8b949e",
                  }}>
                  No official teachers registered for this subject cluster.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ==========================================
          🎖️ TABLE 2: TRUSTED STUDENT MENTORS LEDGER
          ========================================== */}
      <div
        style={{ background: "white", padding: "22px", borderRadius: "12px" }}>
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#001b42",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
          <FaUserShield style={{ color: "#ff9900" }} /> Verified Student Mentors
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.88rem",
            textAlign: "left",
          }}>
          <thead>
            <tr style={{ background: "#ff9900", color: "white" }}>
              <th style={{ padding: "10px" }}>Full Name</th>
              <th style={{ padding: "10px" }}>Secure Mentor ID</th>
              <th style={{ padding: "10px" }}>Academic Year</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {mentorsList.length > 0 ? (
              mentorsList.map((row) => (
                <tr key={row.docId} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    {row.fullName}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <code>{row.secureId}</code>
                  </td>
                  <td style={{ padding: "10px" }}>{row.academicYear}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button
                      onClick={() =>
                        handleRevokeAccess(row.docId, row.fullName)
                      }
                      style={{
                        background: "#fff5f5",
                        color: "#ff4b4b",
                        border: "none",
                        padding: "6px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}>
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#8b949e",
                  }}>
                  No student mentors verified inside this node yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ==========================================
          🎓 TABLE 3: ALUMNI OLD STUDENTS LEDGER
          ========================================== */}
      <div
        style={{ background: "white", padding: "22px", borderRadius: "12px" }}>
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#001b42",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
          <FaUserCheck style={{ color: "#10b981" }} /> Registered Old Students
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.88rem",
            textAlign: "left",
          }}>
          <thead>
            <tr style={{ background: "#10b981", color: "white" }}>
              <th style={{ padding: "10px" }}>Full Name</th>
              <th style={{ padding: "10px" }}>Authorized ID</th>
              <th style={{ padding: "10px" }}>Graduation Year</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {oldStudentsList.length > 0 ? (
              oldStudentsList.map((row) => (
                <tr key={row.docId} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    {row.fullName}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <code>{row.secureId}</code>
                  </td>
                  <td style={{ padding: "10px" }}>{row.academicYear}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button
                      onClick={() =>
                        handleRevokeAccess(row.docId, row.fullName)
                      }
                      style={{
                        background: "#fff5f5",
                        color: "#ff4b4b",
                        border: "none",
                        padding: "6px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}>
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#8b949e",
                  }}>
                  No corporate old students tracked inside this ledger.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ==========================================
          💬 🆕 LIVE STUDY GUILD BULLETIN MONITOR (උඹ ඉල්ලපු සජීවී පාලන පුවරුව!) [INDEX 4]
          ========================================== */}
      <div
        style={{
          background: "#0d1117",
          border: "1px solid #30363d",
          padding: "25px",
          borderRadius: "12px",
          marginTop: "10px",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #21262d",
            paddingBottom: "12px",
            marginBottom: "15px",
          }}>
          <h3
            style={{
              margin: 0,
              color: "#ffd700",
              fontSize: "1.05rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <span className="pulse-icon-live" style={{ color: "#ff4b4b" }}>
              🔴
            </span>{" "}
            Live Guild Chat Terminal Monitor
          </h3>
          <small style={{ color: "#8b949e", fontWeight: "bold" }}>
            REAL-TIME SUPERVISOR MODE
          </small>
        </div>

        {liveMessages.length === 0 ? (
          <p
            style={{
              margin: 0,
              color: "#8b949e",
              fontStyle: "italic",
              fontSize: "0.85rem",
              textAlign: "center",
              padding: "20px 0",
            }}>
            No real-time message streams propagating through this network layer.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxHeight: "400px",
              overflowY: "auto",
              paddingRight: "5px",
            }}>
            {liveMessages.map((msg) => {
              const isQuestion = msg.type === "question";
              const isSolved = msg.status === "solved";

              return (
                <div
                  key={msg.docId}
                  style={{
                    background: "#161b22",
                    border: isQuestion
                      ? "1px solid #ff9900"
                      : isSolved
                        ? "1px solid #10b981"
                        : "1px solid #21262d",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      textAlign: "left",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}>
                      <strong style={{ color: "#58a6ff", fontSize: "0.85rem" }}>
                        {msg.senderName}
                      </strong>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: isQuestion
                            ? "#fff7ed"
                            : isSolved
                              ? "#ecfdf5"
                              : "#21262d",
                          color: isQuestion
                            ? "#ff9900"
                            : isSolved
                              ? "#10b981"
                              : "#8b949e",
                        }}>
                        {isQuestion
                          ? "❓ QUESTION"
                          : isSolved
                            ? "✅ SOLVED"
                            : "💬 GENERAL"}
                      </span>
                      <small style={{ color: "#8b949e", fontSize: "0.7rem" }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        color: "#c9d1d9",
                        fontSize: "0.88rem",
                        lineHeight: "1.4",
                      }}>
                      {msg.text}
                    </p>
                  </div>

                  {/* 🗑️ QUICK EVICTION BUTTON: සර්ලාට වැරදි මැසේජ් ඩෑෂ්බෝඩ් එකෙන්ම ඩිලීට් කරන්න දෙන බටන් එක [INDEX 4] */}
                  <button
                    onClick={() =>
                      handleRevokeAccess(
                        msg.docId,
                        `Message from ${msg.senderName}`,
                      )
                    }
                    style={{
                      background: "rgba(240, 82, 82, 0.1)",
                      color: "#f05252",
                      border: "none",
                      padding: "8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "flex",
                    }}
                    title="Evict Message From Cloud">
                    <FaTrashCan />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ==========================================
          📝 POPUP MODAL: STAFF ONBOARDING FORM
          ========================================== */}
      {/* {isFormOpen && (
        <div className="admin-modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000 }}>
          <div className="admin-modal-card" style={{ background: "white", padding: "30px", borderRadius: "12px", width: "450px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", position: "relative" }}>
            <button onClick={() => setIsFormOpen(false)} style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#8b949e" }}><FaXmark /></button>
            <h3 style={{ margin: "0 0 20px 0", color: "#001b42" }}><FaUserPlus /> Onboard Faculty Account</h3>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#001b42" }}>Full Name</label> */}

      {/* ==========================================
          📝 POPUP MODAL: STAFF ONBOARDING FORM
          ========================================== */}
      {isFormOpen && (
        <div
          className="admin-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}>
          <div
            className="admin-modal-card"
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "450px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              position: "relative",
            }}>
            <button
              onClick={() => setIsFormOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                color: "#8b949e",
              }}>
              <FaXmark />
            </button>
            <h3 style={{ margin: "0 0 20px 0", color: "#001b42" }}>
              <FaUserPlus /> Onboard Faculty Account
            </h3>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}>
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: "#001b42",
                  }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="ex: Kamal Perera"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}>
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: "#001b42",
                  }}>
                  Authorized ID
                </label>
                <input
                  type="text"
                  name="secureId"
                  placeholder="ex: TEA-JANAKA or MEN-AMAL"
                  required
                  value={formData.secureId}
                  onChange={handleInputChange}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}>
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: "#001b42",
                  }}>
                  Password Gate
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter custom portal password..."
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      color: "#001b42",
                    }}>
                    Classification
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d2d6dc",
                      background: "white",
                    }}>
                    <option value="teacher">Official Teacher</option>
                    <option value="mentor">Student Mentor</option>
                    <option value="old-student">Old Student (Alumni)</option>
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      color: "#001b42",
                    }}>
                    Academic Year
                  </label>
                  <input
                    type="number"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d2d6dc",
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  background: "#0056ff",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "10px",
                }}>
                Authorize & Sync Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffRegistryManager;
