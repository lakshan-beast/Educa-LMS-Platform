// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import { db } from "../../firebaseConfig";
// import { doc, setDoc, onSnapshot } from "firebase/firestore";

// // import NotificationToast from "../NotificationToast";

// import {
//   FaCalendarDays,
//   FaCircleXmark,
//   FaPause,
//   FaVideo,
//   FaPenToSquare,
// } from "react-icons/fa6";

// const ClassScheduleVault = () => {
//   const { subject } = useParams();

//   // 👑 [LOCAL GRADE STATE]: 6 සිට 11 දක්වා පාලනය කිරීමට වෙනම ස්ටේට් එකක්
//   const [localGrade, setLocalGrade] = useState("11");

//   // ☁️ [CLOUD CURRENT SCHEDULE STATE]: Cloud එකෙන් එන දත්ත තබා ගැනීමට
//   const [currentSchedule, setCurrentSchedule] = useState(null);

//   const [formData, setFormData] = useState({
//     targetDateTime: "",
//     weekPicker: "",
//     currentLesson: "",
//     specialNotes: "",
//     zoomLink: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // 🔄 1. Cloud එකෙන් Real-time Data Sync කිරීම (onSnapshot)
//   useEffect(() => {
//     if (!subject || !localGrade) return;

//     // Firestore එකේ document path එක නිර්මාණය කිරීම: schedules/grade_subject
//     // const docRef = doc(db, "schedules", `${localGrade}_${subject}`);
//     const docRef = doc(
//       db,
//       "schedules",
//       `${localGrade.replace(/\s+/g, "-")}_${subject}`,
//     );

//     // Cloud එකේ වෙනස්කම් සිදු වූ සැනින් App එකට Update වේ
//     const unsubscribe = onSnapshot(docRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const cloudData = docSnap.data();
//         setCurrentSchedule(cloudData);
//         setFormData({
//           weekPicker: cloudData.weekPicker || "",
//           targetDateTime: cloudData.targetDateTime || "",
//           currentLesson: cloudData.currentLesson || "",
//           specialNotes: cloudData.specialNotes || "",
//           zoomLink: cloudData.zoomLink || "",
//         });
//       } else {
//         setCurrentSchedule(null);
//         setFormData({
//           weekPicker: "",
//           targetDateTime: "",
//           currentLesson: "",
//           specialNotes: "",
//           zoomLink: "",
//         });
//       }
//     });

//     return () => unsubscribe();
//   }, [localGrade, subject]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ☁️ 2. Class Situation Override එක Cloud Update කිරීම
//   const handleStatusOverride = async (statusType) => {
//     if (!currentSchedule) {
//       setError("Please enter the class details first and save! ⚠️");
//       return;
//     }

//     try {
//       // const docRef = doc(db, "schedules", `${localGrade}_${subject}`);
//       const docRef = doc(
//         db,
//         "schedules",
//         `${localGrade.replace(/\s+/g, "-")}_${subject}`,
//       );
//       // Cloud එකේ තියෙන data එකට overrideStatus එක විතරක් merge කරනවා
//       await setDoc(docRef, { overrideStatus: statusType }, { merge: true });

//       setSuccess(
//         `The class situation was successfully changed! 🟢 (${statusType})`,
//       );
//       setTimeout(() => setSuccess(""), 4000);
//     } catch {
//       setError("Cloud update failed! Please try again. 🔴");
//       setTimeout(() => setError(""), 4000);
//     }
//   };

//   // ☁️ 3. Form එක Submit කරන විට සම්පූර්ණ Data එක Cloud එකට යැවීම
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newRecord = {
//       grade: localGrade,
//       subject: subject,
//       classNames: `Grade ${localGrade} ${subject?.toUpperCase()}`,
//       teacherName:
//         subject === "maths"
//           ? "Janaka Sir"
//           : subject === "science"
//             ? "Science Sir"
//             : "English Teacher",
//       targetDateTime: formData.targetDateTime,
//       currentLesson: formData.currentLesson,
//       specialNotes: formData.specialNotes,
//       zoomLink: formData.zoomLink,
//       weekPicker: formData.weekPicker,
//       overrideStatus: currentSchedule?.overrideStatus || "AUTO", // කලින් status එකක් තිබ්බොත් ඒකම ගන්නවා, නැත්නම් AUTO
//     };

//     try {
//       // const docRef = doc(db, "schedules", `${localGrade}_${subject}`);
//       const docRef = doc(
//         db,
//         "schedules",
//         `${localGrade.replace(/\s+/g, "-")}_${subject}`,
//       );
//       // මුළු දත්තයම Cloud Firestore එකට Save කිරීම (තිබුනොත් Overwrite වේ)
//       await setDoc(docRef, newRecord);

//       setSuccess(
//         `Grade ${localGrade} The schedule was successfully updated in Cloud! 🟢`,
//       );
//       setTimeout(() => setSuccess(""), 4000);
//     } catch {
//       setError("Failed to save data to Cloud! 🔴");
//       setTimeout(() => setError(""), 4000);
//     }
//   };

//   // 🎥 Zoom Link එක පෙන්විය යුතු ශ්‍රේණි ද කියා පරික්ෂා කරන සරල Function එකක්
//   const isZoomRequired = ["10", "11", "11 Paper Class"].includes(localGrade);

//   return (
//     <div className="vault-container">
//       <div className="vault-header">
//         <h3>
//           <FaCalendarDays /> Class Schedule Vault ({subject?.toUpperCase()})
//         </h3>
//         <p>
//           Control the date, time, lesson, and Zoom link for classes by grade
//           (6-11).
//         </p>
//       </div>
//       {error && <div className="error-content">⚠️ {error}</div>}
//       {success && <div className="success-content">✓ {success}</div>}
//       <div className="schedule-form">
//         <div className="schedule-content">
//           <h4>
//             <FaPenToSquare /> Update Class Details
//           </h4>
//           <form onSubmit={handleSubmit} className="styled-form">
//             <div className="input-group">
//               <label>Select School Grade</label>
//               <select
//                 value={localGrade}
//                 onChange={(e) => setLocalGrade(e.target.value)}>
//                 {["6", "7", "8", "9", "10", "11", "11 Paper Class"].map((g) => (
//                   <option key={g} value={g}>
//                     Grade {g}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="input-group">
//               <label>Class Date & Start Time</label>
//               <input
//                 type="datetime-local"
//                 name="targetDateTime"
//                 required
//                 value={formData.targetDateTime}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="input-group">
//               <label>Class Week</label>
//               <input
//                 type="week"
//                 name="weekPicker"
//                 required
//                 value={formData.weekPicker}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="input-group">
//               <label>Current Lesson</label>
//               <input
//                 type="text"
//                 name="currentLesson"
//                 placeholder="ex: Lesson 01 - Core Concept"
//                 required
//                 value={formData.currentLesson}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="input-group">
//               <label>Special Notes</label>
//               <input
//                 type="text"
//                 name="specialNotes"
//                 placeholder="ex: Bring previous week tutes..."
//                 value={formData.specialNotes}
//                 onChange={handleInputChange}
//               />
//             </div>

//             {isZoomRequired && (
//               <div className="input-group">
//                 <label>Live Zoom Link</label>
//                 <input
//                   type="url"
//                   name="zoomLink"
//                   placeholder="https://zoom.us..."
//                   required
//                   value={formData.zoomLink}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             )}

//             {isZoomRequired && (
//               <div className="zoom-condition">
//                 Zoom links are currently not available for grades 6 - 9. Only
//                 class details are displayed on the home page.
//               </div>
//             )}

//             <button type="submit" className="start-btn">
//               Save & Reset to Auto Countdown
//             </button>
//           </form>
//         </div>{" "}
//         {/* schedule-content END */}
//         {/* 🎛️ ADMIN OVERRIDE TRIGGERS (FORCE LIVE, POSTPONE, CLOSE CONTROLLER PANEL) */}
//         <div
//           className="schedule-content status-override-panel"
//           style={{ height: "fit-content" }}>
//           <h4>⚡ Live Remote Broadcast Controls</h4>
//           <p
//             style={{
//               fontSize: "0.85rem",
//               color: "#666",
//               marginBottom: "15px",
//             }}>
//             හදිසි අවස්ථාවකදී පන්තියේ සජීවී තත්ත්වය මෙතනින් සැනින් වෙනස් කළ හැක.
//           </p>

//           <div
//             className="override-buttons-grid"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "10px",
//               marginBottom: "20px",
//             }}>
//             <button
//               type="button"
//               onClick={() => handleStatusOverride("FORCE_ACTIVE")}
//               className="override-btn live"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 padding: "12px",
//                 background: "#e8f8f5",
//                 border: "1px solid #2ecc71",
//                 color: "#27ae60",
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}>
//               <FaVideo /> FORCE LIVE NOW (LIVE NOW Badge)
//             </button>

//             <button
//               type="button"
//               onClick={() => handleStatusOverride("POSTPONED")}
//               className="override-btn postpone"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 padding: "12px",
//                 background: "#fff9e6",
//                 border: "1px solid #f39c12",
//                 color: "#d35400",
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}>
//               <FaPause /> POSTPONE CLASS (CLASS POSTPONED)
//             </button>

//             <button
//               type="button"
//               onClick={() => handleStatusOverride("CLOSED")}
//               className="override-btn close"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 padding: "12px",
//                 background: "#fdedec",
//                 border: "1px solid #e74c3c",
//                 color: "#c0392b",
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}>
//               <FaCircleXmark /> CLOSE CLASS TERMINAL (AUTO COUNTDOWN)
//             </button>
//           </div>

//           <div
//             style={{
//               background: "#f4f7ff",
//               padding: "15px",
//               borderRadius: "12px",
//               border: "1px solid #c7d2fe",
//               fontSize: "0.85rem",
//               fontWeight: "bold",
//               color: "#1e1b4b",
//             }}>
//             📢 Grade {localGrade} Currently live status:{" "}
//             <span
//               style={{
//                 color:
//                   currentSchedule?.overrideStatus === "CLOSED"
//                     ? "red"
//                     : currentSchedule?.overrideStatus === "POSTPONED"
//                       ? "orange"
//                       : "green",
//               }}>
//               {currentSchedule?.overrideStatus || "AUTO COUNTDOWN"}
//             </span>
//           </div>
//         </div>
//       </div>{" "}
//       {/* DISPLAY SIDE (LIVE CARD DATA MATRIX) - SAFE RE-RENDER MATRIX */}
//       <div className="schedule-content live-preview-panel">
//         <h4>Live Schedule Status Overview</h4>

//         <div
//           className="secure-schedule-preview-card"
//           style={{
//             background: "#0d1117",
//             border: "1px solid #30363d",
//             padding: "20px",
//             borderRadius: "10px",
//             marginTop: "15px",
//           }}>
//           <div
//             className="card-top-meta"
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "15px",
//               borderBottom: "1px solid #21262d",
//               paddingBottom: "10px",
//             }}>
//             <span style={{ color: "#ffd700", fontWeight: "bold" }}>
//               {currentSchedule.className || ""}
//             </span>
//             <small style={{ color: "#8b949e" }}>
//               ⏰ {currentSchedule.weekPicker || "N/A"}
//             </small>
//           </div>

//           <div
//             className="card-body-metrics"
//             style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//             <p style={{ margin: 0 }}>
//               <strong style={{ color: "#58a6ff" }}>📖 Active Lesson:</strong>{" "}
//               {currentSchedule.currentLesson || "Not Specified"}
//             </p>

//             {/* 🛠️ Safe Date Formatting Fix: දිනයක් නැතිනම් Crash නොවී පාලනය කරයි */}
//             <p style={{ margin: 0 }}>
//               <strong style={{ color: "#58a6ff" }}>📅 Target Time:</strong>{" "}
//               {currentSchedule.targetDateTime
//                 ? new Date(currentSchedule.targetDateTime).toLocaleString()
//                 : "No Date Set"}
//             </p>

//             <p style={{ margin: 0 }}>
//               <strong style={{ color: "#58a6ff" }}>👨‍🏫 Faculty:</strong>{" "}
//               {currentSchedule.teacherName || ""}
//             </p>

//             {currentSchedule.specialNotes && (
//               <p
//                 style={{
//                   margin: 0,
//                   background: "rgba(255,215,0,0.05)",
//                   padding: "10px",
//                   borderRadius: "6px",
//                   borderLeft: "3px solid #ffd700",
//                   color: "#c9d1d9",
//                 }}>
//                 💡 <strong>Note:</strong> {currentSchedule.specialNotes}
//               </p>
//             )}

//             {currentSchedule.zoomLink && (
//               <a
//                 href={currentSchedule.zoomLink}
//                 target="_blank"
//                 rel="noreferrer"
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: "8px",
//                   color: "#58a6ff",
//                   textDecoration: "none",
//                   marginTop: "10px",
//                   fontWeight: "bold",
//                 }}>
//                 🔗 Virtual Meeting Link (Click to Launch)
//               </a>
//             )}
//           </div>
//         </div>
//         {/* )} */}
//       </div>
//     </div>
//   );
// };

// export default ClassScheduleVault;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, setDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import {
  // FaCalendarDays,
  FaVideo,
  FaPause,
  FaCircleXmark,
  FaClock,
  FaBookOpen,
  FaNoteSticky,
} from "react-icons/fa6";
import ScheduleSubmitForm from "../../forms/ScheduleSubmitForm";

const ScheduleManager = () => {
  const { subject } = useParams();
  const currentFacultySubject = subject ? subject.toLowerCase() : "maths";

  const [schedules, setSchedules] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("11");

  const gradesList = ["6", "7", "8", "9", "10", "11", "11-Paper-Class"];

  useEffect(() => {
    if (!currentFacultySubject) return;

    const unsubscribes = gradesList.map((grade) => {
      const docRef = doc(db, "schedules", `${grade}_${currentFacultySubject}`);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setSchedules((prev) => ({ ...prev, [grade]: docSnap.data() }));
        } else {
          setSchedules((prev) => ({ ...prev, [grade]: null }));
        }
      });
    });

    setIsLoading(false);

    return () => unsubscribes.forEach((unsub) => unsub());
  }, [currentFacultySubject]);

  const handleStatusOverride = async (grade, statusType) => {
    try {
      const docRef = doc(db, "schedules", `${grade}_${currentFacultySubject}`);
      await setDoc(docRef, { overrideStatus: statusType }, { merge: true });
    } catch (err) {
      console.error("Cloud status override failed:", err);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "FORCE_ACTIVE")
      return {
        border: "2px solid #2ecc71",
        badge: "🔴 LIVE NOW",
        bg: "rgba(46, 204, 113, 0.05)",
      };
    if (status === "POSTPONED")
      return {
        border: "1px solid #f39c12",
        badge: "⏳ POSTPONED",
        bg: "rgba(243, 156, 18, 0.05)",
      };
    if (status === "CLOSED")
      return {
        border: "1px solid #1228f3",
        badge: "⏳ CLOSED",
        bg: "rgba(18, 33, 243, 0.05)",
      };
    return {
      border: "1px solid #30363d",
      badge: "📅 AUTO COUNTDOWN",
      bg: "transparent",
    };
  };

  // 👑 වැරදුණු Schedule එකක් permanently ඩේටාබේස් එකෙන් මකා දැමීම
  const handleDeleteSchedule = async (grade) => {
    if (
      window.confirm(
        `Are you sure you want to permanently reset Grade ${grade} timeline?`,
      )
    ) {
      try {
        const docRef = doc(
          db,
          "schedules",
          `${grade}_${currentFacultySubject}`,
        );
        await deleteDoc(docRef); // 👈 Firestore එකෙන් document එකම මකා දමයි [INDEX 51]
      } catch (err) {
        console.error("Cloud document deletion failed:", err);
      }
    }
  };

  return (
    <div className="schedule-manager-container">
      {/* 👑 MANAGER HEADER */}
      <div className="manager-top-bar">
        <div className="header-meta">
          <h1>{subject?.toUpperCase()} Timeline Controller</h1>
          <p>
            Manage dynamic constraints, force live statuses, or restructure full
            class frameworks [INDEX 4].
          </p>
        </div>
        <div className="action-zone">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="grade-selector-dropdown">
            {gradesList.map((g) => (
              <option key={g} value={g}>
                {g === "11-Paper-Class" ? "11 Paper Class" : `Grade ${g}`}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsFormOpen(true)}
            className="create-schedule-btn">
            + Structure Timeline
          </button>
        </div>
      </div>

      {/* 📊 GRID OF ALL 7 CLASSES */}
      {isLoading ? (
        <div className="ledger-loading">
          Streaming Isolated Core Parameters...
        </div>
      ) : (
        <div className="schedules-matrix-grid">
          {gradesList.map((grade) => {
            const currentSchedule = schedules[grade];
            const statusConfig = getStatusStyle(
              currentSchedule?.overrideStatus,
            );

            return (
              <div
                key={grade}
                className={`schedule -
                  matrix -
                  card ${currentSchedule?.overrideStatus === "FORCE_ACTIVE" ? "neon-pulse-active" : ""}} style={{ border: statusConfig.border, background: statusConfig.bg }`}>
                <div className="card-top-meta-zone">
                  <span className="faculty-badge">
                    {grade === "11-Paper-Class" ? "11 Paper" : `Grade ${grade}`}{" "}
                    Framework
                  </span>
                  <span
                    className={`status-pill ${currentSchedule?.overrideStatus?.toLowerCase()}`}>
                    {statusConfig.badge}
                  </span>
                </div>
                {currentSchedule ? (
                  <div className="card-body-parameters">
                    <p>
                      <FaBookOpen /> <span>Lesson:</span>{" "}
                      {currentSchedule.currentLesson || "Not Configured"}
                    </p>
                    <p>
                      <FaClock /> <span>Timeline:</span>{" "}
                      {currentSchedule.targetDateTime
                        ? new Date(
                            currentSchedule.targetDateTime,
                          ).toLocaleString()
                        : "No Date Set"}
                    </p>
                    {currentSchedule.specialNotes && (
                      <p className="special-instructions-alert">
                        <FaNoteSticky /> <span>Note:</span>{" "}
                        {currentSchedule.specialNotes}
                      </p>
                    )}
                    {currentSchedule.zoomLink && (
                      <div className="secure-link-gating-badge">
                        🔒 Secure Link Active (
                        {currentSchedule.zoomLink.slice(0, 20)}...)
                      </div>
                    )}

                    {/* 🎛️ CORE LIVE OPERATION CONTROLLERS */}
                    <div className="operational-control-hub">
                      <button
                        onClick={() =>
                          handleStatusOverride(grade, "FORCE_ACTIVE")
                        }
                        className="override-action-btn force-live"
                        title="Force Live Now">
                        <FaVideo /> Live
                      </button>
                      <button
                        onClick={() => handleStatusOverride(grade, "POSTPONED")}
                        className="override-action-btn force-postpone"
                        title="Postpone Class">
                        <FaPause /> Pause
                      </button>
                      <button
                        onClick={() => handleStatusOverride(grade, "CLOSED")}
                        className="override-action-btn force-close"
                        title="Close Session">
                        <FaCircleXmark /> Closed
                      </button>
                      {/* 🔄 RESET TO AUTO COUNTDOWN BUTTON */}
                      <button
                        onClick={() => handleStatusOverride(grade, "AUTO")}
                        style={{
                          background: "#f4f7ff",
                          color: "#0056ff",
                          border: "1px solid #c7d2fe",
                          padding: "8px",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                        title="Reset to Auto Countdown">
                        🔄 Active Countdown
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(grade)}
                        style={{
                          background: "#fff5f5",
                          color: "#ff4b4b",
                          border: "none",
                          padding: "8px",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                        title="Reset Framework Timeline">
                        🗑️ Delete Schedule
                      </button>

                      {/* <button
                        disabled={isClosed || isPaused}
                        className="action-button-gate disabled-btn"
                        style={{
                          opacity: isClosed ? "0.4" : "0.6",
                          cursor: "not-allowed",
                        }}>
                        {isClosed
                          ? "Class Session Ended"
                          : isPaused
                            ? "Class Session Postponed"
                            : "Portal Room Locked"}
                      </button> */}
                    </div>
                  </div>
                ) : (
                  <div className="empty-parameter-state">
                    No timeline allocated inside this cluster index. Click
                    Structure Timeline to spin a frame.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 📝 POPUP MODAL CONTROL */}
      <ScheduleSubmitForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedGrade={selectedGrade}
        subject={currentFacultySubject}
      />
    </div>
  );
};

export default ScheduleManager;
