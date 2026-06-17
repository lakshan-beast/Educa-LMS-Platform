import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import {
  FaVideo,
  FaLock,
  FaCircleDot,
  FaTriangleExclamation,
} from "react-icons/fa6";

import Loader from "../components/Loader";

const LiveClass = () => {
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClassActive, setIsClassActive] = useState(false);
  const [isCheatingAttempted, setIsCheatingAttempted] = useState(false);

  // 👑 🔐 [STUDENT SUBJECT METRICS ROUTER]:
  // දැනට ලොග් වෙලා ඉන්න ශිෂ්‍යයාගේ විෂය ID එක (M / S / E) මෙතනින් ඔටෝමැටිකවම හඳුනා ගනී මචං! [INDEX 4]
  const studentSubjectId = localStorage.getItem("student_subject_id") || "M";
  const documentPath =
    studentSubjectId === "M"
      ? "maths_live"
      : studentSubjectId === "S"
        ? "science_live"
        : "english_live";

  useEffect(() => {
    // 1️⃣ 📡 [REAL-TIME CLOUD CLASS SCHEDULE WATCHER]:
    // ඇඩ්මින් පැනල් එකෙන් සර් බටන් එක ඔබපු සැනින් Zoom Link එක ලයිව් අප්ඩේට් වේ මචං! [INDEX 4, 51]
    const unsubscribe = onSnapshot(
      doc(db, "live_class_controls", documentPath),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setClassData(data);

          // ⏰ සර්වර් එකෙන් එන startTime සහ endTime දැනට පවතින සැබෑ වෙලාව සමඟ සසඳා බලයි මචං
          const now = new Date();
          const start = new Date(data.startTime);
          const end = new Date(data.endTime);
          const activeStatus =
            now >= start && now <= end && data.isLiveEnabled === true;

          setIsClassActive(activeStatus);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Live Class Stream Error:", err);
        setIsLoading(false);
      },
    );

    // 2️⃣ 🔏 [THE STRICT ULTRA-SECURE STUDENT APP-BLOCK LOCK ENGINE]:
    // ළමයා පන්ති වෙලාවේ වෙනත් ඇප් එකකට හෝ ටැබ් එකකට මාරු වුවහොත් මුළු ස්ක්‍රීන් එකම බලෙන් වසා දමයි මචං! [INDEX 4]
    const handleVisibilityChange = () => {
      if (document.hidden && isClassActive) {
        setIsCheatingAttempted(true);
        alert(
          "🚨 WARNING: You are not allowed to leave the classroom terminal during an active session! Your screen is locked [INDEX 4].",
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [documentPath, isClassActive]);

  const handleJoinClass = () => {
    if (isClassActive && classData?.zoomLink) {
      window.open(classData.zoomLink, "_blank");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="live-class-panel-wrapper">
      {/* ⚠️ CHEATING LOCK OVERLAY DOCK */}
      {isCheatingAttempted && (
        <div className="secure-blocker-overlay">
          <div className="blocker-card">
            <FaTriangleExclamation className="warning-alarm-icon" />
            <h2>Terminal Access Suspended</h2>
            <p>
              You attempted to switch apps or minimize the dashboard during an
              active lecture framework [INDEX 4].
            </p>
            <button
              onClick={() => setIsCheatingAttempted(false)}
              className="unlock-btn">
              Return to Class Focus
            </button>
          </div>
        </div>
      )}

      {/* REGULAR PANEL BODY */}
      <div className="live-class-card-shell">
        <div className="class-status-banner">
          {isClassActive ? (
            <span className="badge-live-on">
              <FaCircleDot /> LIVE STREAM ACTIVE
            </span>
          ) : (
            <span className="badge-live-off">
              <FaLock /> TERMINAL LOCKED
            </span>
          )}
        </div>

        <h2 className="class-title">
          {classData?.title || "No Upcoming Lecture Allocated"}
        </h2>
        <p className="class-desc">
          Authorized Module Stream:{" "}
          <strong>
            {studentSubjectId === "M"
              ? "Mathematics"
              : studentSubjectId === "S"
                ? "Science"
                : "English"}
          </strong>
        </p>
        <div className="time-tracker-meta">
          <p>
            Schedule: {classData?.scheduleText || "Every Week Session Timing"}
          </p>
        </div>

        {/* DYNAMIC TIME ACTIVATED BUTTON */}
        <button
          onClick={handleJoinClass}
          disabled={!isClassActive}
          className={`zoom-trigger-btn ${isClassActive ? "active-ready" : "disabled-lock"}`}>
          <FaVideo />{" "}
          {isClassActive
            ? "Join Official Zoom Classroom Now"
            : "Classroom Locked Until Schedule Time"}
        </button>
      </div>
    </div>
  );
};

export default LiveClass;
