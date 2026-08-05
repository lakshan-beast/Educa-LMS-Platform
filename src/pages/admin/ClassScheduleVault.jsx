import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, setDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import {
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
        await deleteDoc(docRef); 
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
            class frameworks.
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
            const isForceActive =
              currentSchedule?.overrideStatus === "FORCE_ACTIVE";

            return (
              <div
                key={grade}
                className={`schedule-matrix-card ${isForceActive ? "neon-pulse-active" : ""} status-${currentSchedule?.overrideStatus?.toLowerCase() || "none"}`}
                style={{
                  borderColor:
                    statusConfig.border || "rgba(255, 255, 255, 0.05)",
                  background: statusConfig.bg || "rgba(15, 23, 42, 0.55)",
                }}>
                <div className="card-top-meta-zone">
                  <span className="faculty-badge">
                    {grade === "11-Paper-Class" ? "11 Paper" : `Grade ${grade}`}{" "}
                    Framework
                  </span>
                  <span
                    className={`status-pill ${currentSchedule?.overrideStatus?.toLowerCase() || "auto"}`}>
                    {statusConfig.badge || "🕒 AUTO"}
                  </span>
                </div>

                {currentSchedule ? (
                  <div className="card-body-parameters">
                    <p className="param-row">
                      <FaBookOpen /> <span>Lesson:</span>{" "}
                      <strong>
                        {currentSchedule.currentLesson || "Not Configured"}
                      </strong>
                    </p>
                    <p className="param-row">
                      <FaClock /> <span>Timeline:</span>{" "}
                      <strong>
                        {currentSchedule.targetDateTime
                          ? new Date(
                              currentSchedule.targetDateTime,
                            ).toLocaleString()
                          : "No Date Set"}
                      </strong>
                    </p>

                    {currentSchedule.specialNotes && (
                      <p className="special-instructions-alert">
                        <FaNoteSticky /> <span>Note:</span>{" "}
                        <strong>{currentSchedule.specialNotes}</strong>
                      </p>
                    )}

                    {currentSchedule.zoomLink && (
                      <div className="secure-link-gating-badge">
                        🔒 Secure Link Active (
                        {currentSchedule.zoomLink.slice(0, 20)}...)
                      </div>
                    )}

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
                        className="override-action-btn force-auto"
                        title="Reset to Auto Countdown">
                        Active Countdown
                      </button>

                      {/* 🗑️ DELETE FRAMEWORK BUTTON */}
                      <button
                        onClick={() => handleDeleteSchedule(grade)}
                        className="override-action-btn force-delete"
                        title="Reset Framework Timeline">
                        Delete Schedule
                      </button>
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
