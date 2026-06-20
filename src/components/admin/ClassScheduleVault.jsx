import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   // doc,
// } from "firebase/firestore";

import {
  FaCalendarDays,
  FaClock,
  FaCircleXmark,
  FaPause,
  FaVideo,
  FaPenToSquare,
} from "react-icons/fa6";

import { doc, setDoc, onSnapshot } from "firebase/firestore";

const ClassScheduleVault = () => {
  const { subject } = useParams();

  // 👑 [LOCAL GRADE STATE]: 6 සිට 11 දක්වා පාලනය කිරීමට වෙනම ස්ටේට් එකක්
  const [localGrade, setLocalGrade] = useState("11");

  // ☁️ [CLOUD CURRENT SCHEDULE STATE]: Cloud එකෙන් එන දත්ත තබා ගැනීමට
  const [currentSchedule, setCurrentSchedule] = useState(null);

  const [formData, setFormData] = useState({
    targetDateTime: "",
    weekPicker: "",
    currentLesson: "",
    specialNotes: "",
    zoomLink: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔄 1. Cloud එකෙන් Real-time Data Sync කිරීම (onSnapshot)
  useEffect(() => {
    if (!subject || !localGrade) return;

    // Firestore එකේ document path එක නිර්මාණය කිරීම: schedules/grade_subject
    const docRef = doc(db, "schedules", `${localGrade}_${subject}`);

    // Cloud එකේ වෙනස්කම් සිදු වූ සැනින් App එකට Update වේ
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        setCurrentSchedule(cloudData);
        setFormData({
          weekPicker: cloudData.weekPicker || "",
          targetDateTime: cloudData.targetDateTime || "",
          currentLesson: cloudData.currentLesson || "",
          specialNotes: cloudData.specialNotes || "",
          zoomLink: cloudData.zoomLink || "",
        });
      } else {
        setCurrentSchedule(null);
        setFormData({
          weekPicker: "",
          targetDateTime: "",
          currentLesson: "",
          specialNotes: "",
          zoomLink: "",
        });
      }
    });

    return () => unsubscribe();
  }, [localGrade, subject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ☁️ 2. Class Situation Override එක Cloud Update කිරීම
  const handleStatusOverride = async (statusType) => {
    if (!currentSchedule) {
      setError("Please enter the class details first and save! ⚠️");
      return;
    }

    try {
      const docRef = doc(db, "schedules", `${localGrade}_${subject}`);
      // Cloud එකේ තියෙන data එකට overrideStatus එක විතරක් merge කරනවා
      await setDoc(docRef, { overrideStatus: statusType }, { merge: true });

      setSuccess(
        `The class situation was successfully changed! 🟢 (${statusType})`,
      );
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Cloud update failed! Please try again. 🔴");
      setTimeout(() => setError(""), 4000);
    }
  };

  // ☁️ 3. Form එක Submit කරන විට සම්පූර්ණ Data එක Cloud එකට යැවීම
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = {
      grade: localGrade,
      subject: subject,
      className: `Grade ${localGrade} ${subject?.toUpperCase()}`,
      teacherName:
        subject === "maths"
          ? "Janaka Sir"
          : subject === "science"
            ? "Science Sir"
            : "English Teacher",
      targetDateTime: formData.targetDateTime,
      currentLesson: formData.currentLesson,
      specialNotes: formData.specialNotes,
      zoomLink: formData.zoomLink,
      weekPicker: formData.weekPicker,
      overrideStatus: currentSchedule?.overrideStatus || "AUTO", // කලින් status එකක් තිබ්බොත් ඒකම ගන්නවා, නැත්නම් AUTO
    };

    try {
      const docRef = doc(db, "schedules", `${localGrade}_${subject}`);
      // මුළු දත්තයම Cloud Firestore එකට Save කිරීම (තිබුනොත් Overwrite වේ)
      await setDoc(docRef, newRecord);

      setSuccess(
        `Grade ${localGrade} The schedule was successfully updated in Cloud! 🟢`,
      );
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Failed to save data to Cloud! 🔴");
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="vault-container">
      <div className="vault-header">
        <h3>
          <FaCalendarDays /> Class Schedule Vault ({subject?.toUpperCase()})
        </h3>
        <p>
          Control the date, time, lesson, and Zoom link for classes by grade
          (6-11).
        </p>
      </div>
      {error && <div className="error-content">⚠️ {error}</div>}
      {success && <div className="success-content">✓ {success}</div>}

      <div className="schedule-form">
        <div className="schedule-content">
          <h4>
            <FaPenToSquare /> Update Class Details
          </h4>
          <form onSubmit={handleSubmit} className="styled-form">
            <div className="input-group">
              <label>Select School Grade</label>
              <select
                value={localGrade}
                onChange={(e) => setLocalGrade(e.target.value)}>
                {["6", "7", "8", "9", "10", "11", "11 Paper Class"].map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Class Date & Start Time</label>
              <input
                type="datetime-local"
                name="targetDateTime"
                required
                value={formData.targetDateTime}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Class Week</label>
              <input
                type="week"
                name="weekPicker"
                required
                value={formData.weekPicker}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Current Lesson</label>
              <input
                type="text"
                name="currentLesson"
                placeholder="ex: Lesson 01 - Core Concept"
                required
                value={formData.currentLesson}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Special Notes</label>
              <input
                type="text"
                name="specialNotes"
                placeholder="ex: Bring previous week tutes..."
                value={formData.specialNotes}
                onChange={handleInputChange}
              />
            </div>

            {(localGrade === "10" || localGrade === "11") && (
              <div className="input-group">
                <label>Live Zoom Link</label>
                <input
                  type="url"
                  name="zoomLink"
                  placeholder="https://zoom.us..."
                  required
                  value={formData.zoomLink}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {localGrade !== "10" && localGrade !== "11" && (
              <div className="zoom-condition">
                ℹ️ Zoom links are currently not available for grades 6 - 9. Only
                class details are displayed on the home page.
              </div>
            )}

            <button type="submit" className="start-btn">
              Save & Reset to Auto Countdown
            </button>
          </form>
        </div>

        {/* // classes actions  */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              background: "#fffdfd",
              padding: "20px",
              borderRadius: "16px",
              border: "1px dashed #e74c3c",
            }}>
            <h4
              style={{
                margin: "0 0 15px",
                color: "#1a0a54",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <FaClock style={{ color: "#ff4b2b" }} /> Manual Control Dashboard
            </h4>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginBottom: "20px",
                lineHeight: "1.4",
              }}>
              Use the buttons below to instantly change the class status in an
              emergency.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={() => handleStatusOverride("FORCE_ACTIVE")}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#2ecc71",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 4px 10px rgba(46,204,113,0.2)",
                }}>
                <FaVideo /> FORCE ACTIVE
              </button>
              <button
                onClick={() => handleStatusOverride("POSTPONED")}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#f39c12",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 4px 10px rgba(243,156,18,0.2)",
                }}>
                <FaPause /> POSTPONE CLASS
              </button>
              <button
                onClick={() => handleStatusOverride("CLOSED")}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 4px 10px rgba(231,76,60,0.2)",
                }}>
                <FaCircleXmark /> CLOSED CLASS
              </button>
            </div>
          </div>

          <div
            style={{
              background: "#f4f7ff",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #c7d2fe",
              fontSize: "0.85rem",
              fontWeight: "bold",
              color: "#1e1b4b",
            }}>
            📢 Grade {localGrade} Currently live status :{" "}
            <span
              style={{
                color:
                  currentSchedule?.overrideStatus === "CLOSED"
                    ? "red"
                    : currentSchedule?.overrideStatus === "POSTPONED"
                      ? "orange"
                      : "green",
              }}>
              {currentSchedule?.overrideStatus || "AUTO COUNTDOWN"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleVault;
