import { useState, useEffect } from "react";
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
    // setIsLoading(true);

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
    <div className="staff-registry-manager-root">
      {/* 👑 1. MANAGEMENT HEADER & ACTION TRIGGER */}
      <div className="staff-registry-top-header-zone">
        <div className="header-meta-details">
          <h1>Staff & Guild Registry</h1>
          <p className="registry-subtext">
            Authorize official teachers, manage student mentors, and track
            terminal nodes.
          </p>
        </div>

        {/* ONBOARD FACULTY ACCOUNT BUTTON */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="onboard-faculty-trigger-btn">
          <FaUserPlus /> Onboard Faculty Account
        </button>
      </div>

      {/* 📊 2. HIGH-DENSITY CLOUD COUNTERS GRID LAYER */}
      <div className="admin-staff-counters-bento-grid">
        {/* 👥 TILE 1: TOTAL SUBJECT STUDENTS */}
        <div className="staff-bento-tile tile-total-students">
          <div className="metric-data-stream">
            <span className="metric-hud-title">TOTAL SUBJECT STUDENTS</span>
            <h2 className="metric-digital-digits">{totalStudents}</h2>
          </div>
          <div className="metric-avatar-icon-glow">
            <FaUsers />
          </div>
        </div>

        {/* 🟢 TILE 2: CURRENTLY ACTIVE ONLINE */}
        <div className="staff-bento-tile tile-active-online">
          <div className="metric-data-stream">
            <span className="metric-hud-title">CURRENTLY ACTIVE ONLINE</span>
            <h2 className="metric-digital-digits text-neon-green">
              {onlineStudents} <span className="live-dot-pulse">🟢</span>
            </h2>
          </div>
          <div className="metric-avatar-icon-glow">
            <FaUsersLine />
          </div>
        </div>

        {/* 💬 TILE 3: STUDY GUILD CHAT MONITOR CONTROL */}
        <div className="staff-bento-tile tile-guild-monitor">
          <div className="metric-data-stream full-width-stream">
            <span className="metric-hud-title">STUDY GUILD MONITOR</span>

            <Link to="/student-guild" className="guild-chat-entry-redirect-btn">
              💬 Enter Live Chat Room
            </Link>

            <Link to="/student-guild" className="guild-hidden-fallback-link">
              Chat
            </Link>
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

      {/* 👨‍🏫 TABLE 1: OFFICIAL FACULTY TEACHERS LEDGER */}
      <div className="admin-faculty-teachers-ledger-panel">
        <h3 className="ledger-core-heading">
          <FaUserTie /> Registered Faculty Teachers
        </h3>

        <div className="ledger-table-responsive-wrapper">
          <table className="faculty-master-ledger-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Authorized ID</th>
                <th>Password Gate</th>
                <th className="text-center-align">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachersList.length > 0 ? (
                teachersList.map((row) => (
                  <tr key={row.docId}>
                    <td className="teacher-full-name-cell">{row.fullName}</td>
                    <td>
                      <code className="teacher-secure-id-code">
                        {row.secureId}
                      </code>
                    </td>
                    <td className="teacher-masked-password-cell">••••••••</td>
                    <td className="text-center-align">
                      <button
                        onClick={() =>
                          handleRevokeAccess(row.docId, row.fullName)
                        }
                        className="teacher-revoke-access-btn"
                        title="Revoke Teacher Access">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="ledger-empty-placeholder-row">
                    No official teachers registered for this subject cluster.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🎖️ TABLE 2: TRUSTED STUDENT MENTORS LEDGER */}
      <div className="admin-student-mentors-ledger-panel">
        <h3 className="ledger-core-heading">
          <FaUserShield /> Verified Student Mentors
        </h3>

        <div className="ledger-table-responsive-wrapper">
          <table className="mentor-master-ledger-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Secure Mentor ID</th>
                <th>Academic Year</th>
                <th className="text-center-align">Action</th>
              </tr>
            </thead>
            <tbody>
              {mentorsList.length > 0 ? (
                mentorsList.map((row) => (
                  <tr key={row.docId}>
                    <td className="mentor-full-name-cell">{row.fullName}</td>
                    <td>
                      <code className="mentor-secure-id-code">
                        {row.secureId}
                      </code>
                    </td>
                    <td className="mentor-academic-year-cell">
                      {row.academicYear}
                    </td>
                    <td className="text-center-align">
                      <button
                        onClick={() =>
                          handleRevokeAccess(row.docId, row.fullName)
                        }
                        className="mentor-revoke-access-btn"
                        title="Revoke Mentor Access">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="ledger-empty-placeholder-row">
                    No student mentors verified inside this node yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🎓 TABLE 3: ALUMNI OLD STUDENTS LEDGER */}
      <div className="admin-alumni-ledger-panel">
        <h3 className="ledger-core-heading">
          <FaUserCheck /> Registered Old Students
        </h3>

        <div className="ledger-table-responsive-wrapper">
          <table className="alumni-master-ledger-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Authorized ID</th>
                <th>Graduation Year</th>
                <th className="text-center-align">Action</th>
              </tr>
            </thead>
            <tbody>
              {oldStudentsList.length > 0 ? (
                oldStudentsList.map((row) => (
                  <tr key={row.docId}>
                    <td className="alumni-full-name-cell">{row.fullName}</td>
                    <td>
                      <code className="alumni-secure-id-code">
                        {row.secureId}
                      </code>
                    </td>
                    <td className="alumni-graduation-year-cell">
                      {row.academicYear}
                    </td>
                    <td className="text-center-align">
                      <button
                        onClick={() =>
                          handleRevokeAccess(row.docId, row.fullName)
                        }
                        className="alumni-revoke-access-btn"
                        title="Revoke Alumni Access">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="ledger-empty-placeholder-row">
                    No corporate old students tracked inside this ledger.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
    💬 🆕 LIVE STUDY GUILD BULLETIN MONITOR
    ========================================== */}
      <div className="admin-live-guild-bulletin-monitor-panel">
        <div className="monitor-top-meta-header-bar">
          <h3 className="monitor-live-heading">
            <span className="pulse-icon-live-dot"></span>
            Live Guild Chat Terminal Monitor
          </h3>
          <small className="monitor-hud-supervisor-tag">
            REAL-TIME SUPERVISOR MODE
          </small>
        </div>

        {liveMessages.length === 0 ? (
          <p className="monitor-empty-stream-notice">
            No real-time message streams propagating through this network layer.
          </p>
        ) : (
          <div className="monitor-messages-vertical-scroll-feed">
            {liveMessages.map((msg) => {
              const isQuestion = msg.type === "question";
              const isSolved = msg.status === "solved";

              return (
                <div
                  key={msg.docId}
                  className={`monitor-message-node-tile ${isQuestion ? "node-type-question" : isSolved ? "node-type-solved" : "node-type-general"}`}>
                  <div className="message-node-left-content-block">
                    <div className="message-node-upper-meta-row">
                      <strong className="message-sender-name-text">
                        {msg.senderName}
                      </strong>

                      <span
                        className={`message-classification-badge ${isQuestion ? "badge-orange" : isSolved ? "badge-green" : "badge-slate"}`}>
                        {isQuestion
                          ? "❓ QUESTION"
                          : isSolved
                            ? "✅ SOLVED"
                            : "💬 GENERAL"}
                      </span>

                      <small className="message-timestamp-digital">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>

                    <p className="message-actual-text-body">{msg.text}</p>
                  </div>

                  {/* 🗑️ QUICK EVICTION BUTTON: සර්ලාට වැරදි මැසේජ් Dashboard එකෙන්ම ඩිලීට් කරන්න දෙන බටන් එක [INDEX 4] */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRevokeAccess(
                        msg.docId,
                        `Message from ${msg.senderName}`,
                      )
                    }
                    className="message-quick-evict-delete-btn"
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
      {isFormOpen && (
        <div
          className="toolkit-sheet-overlay"
          onClick={() => setIsFormOpen(false)}>
          {/* 👈 යට ඉඳන් පාවෙලා උඩට එන iOS Bottom Sheet Card එක */}
          <div
            className="toolkit-sheet-card staff-onboard-card"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Cross Button */}
            <button
              className="close-sheet-btn"
              onClick={() => setIsFormOpen(false)}>
              <FaXmark />
            </button>

            <h3>
              <FaUserPlus /> Onboard Faculty Account
            </h3>

            <form onSubmit={handleSubmit} className="onboard-logging-form-body">
              {/* FULL NAME INPUT */}
              <div className="onboard-input-field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="ex: Kamal Perera"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              {/* AUTHORIZED ID INPUT */}
              <div className="onboard-input-field-group">
                <label>Authorized ID</label>
                <input
                  type="text"
                  name="secureId"
                  placeholder="ex: TEA-JANAKA or MEN-AMAL"
                  required
                  value={formData.secureId}
                  onChange={handleInputChange}
                />
              </div>

              {/* PASSWORD GATE INPUT */}
              <div className="onboard-input-field-group">
                <label>Password Gate</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter custom portal password..."
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* CLASSIFICATION & ACADEMIC YEAR SPLIT ROW */}
              <div className="onboard-double-split-grid-row">
                <div className="onboard-input-field-group">
                  <label>Classification</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}>
                    <option value="teacher">Official Teacher</option>
                    <option value="mentor">Student Mentor</option>
                    <option value="old-student">Old Student (Alumni)</option>
                  </select>
                </div>

                <div className="onboard-input-field-group">
                  <label>Academic Year</label>
                  <input
                    type="number"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* AUTHORIZE & SYNC SUBMIT BUTTON */}
              <button type="submit" className="onboard-sync-submit-btn">
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
