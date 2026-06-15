import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import {
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaFolderOpen,
  FaBullhorn,
  FaUserPen,
} from "react-icons/fa6";

const ClassScheduleAdmin = () => {
  const [schedules, setSchedules] = useState([]);
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("DETAILS"); // 👑 DETAILS හෝ NOTICES විදිහට ස්ටේට් එක මාරු වේ මචං! [INDEX 4]

  useEffect(() => {
    // 1️⃣ 📡 TIMETABLE SCHEDULES LIVE STREAM [INDEX 51]
    const qSchedule = query(collection(db, "class_schedules"));
    const unsubscribeSchedule = onSnapshot(
      qSchedule,
      (snapshot) => {
        const scheduleList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchedules(scheduleList);
      },
      (err) => console.error("Schedule Stream Error:", err),
    );

    // 2️⃣ 📡 CLASS NOTICES LIVE STREAM [INDEX 51]
    const qNotice = query(
      collection(db, "notices"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribeNotice = onSnapshot(
      qNotice,
      (snapshot) => {
        const noticeList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotices(noticeList);
        setIsLoading(false);
      },
      (err) => {
        console.error("Notice Stream Error:", err);
        setIsLoading(false);
      },
    );

    return () => {
      unsubscribeSchedule();
      unsubscribeNotice();
    };
  }, []);

  return (
    <div className="schedule-admin-wrapper">
      {/* SECTION HEADER */}
      <div className="schedule-header">
        <h2>
          <FaCalendarDays className="icon" /> Academic{" "}
          <span>Schedules & Updates</span>
        </h2>
        <p>
          Access live class timetables and important subject announcements in
          one centralized space.
        </p>
      </div>

      {/* 👑 🎛️ SMART DUAL-TAB BUTTON CONTROLLER */}
      <div className="schedule-tab-control-row">
        <button
          onClick={() => setActiveTab("DETAILS")}
          className={`tab-toggle-btn ${activeTab === "DETAILS" ? "active" : ""}`}>
          📅 Class Details
        </button>
        <button
          onClick={() => setActiveTab("NOTICES")}
          className={`tab-toggle-btn ${activeTab === "NOTICES" ? "active" : ""}`}>
          📢 Class Notices
        </button>
      </div>

      {/* DYNAMIC VIEW PORTAL ROUTING */}
      {isLoading ? (
        <div className="schedule-loading">
          🔄 Streaming Live Cloud Portal Tiers...
        </div>
      ) : activeTab === "DETAILS" ? (
        /* ==================== 📅 VIEW 01: CLASS DETAILS GRID ==================== */
        schedules.length === 0 ? (
          <div className="schedule-empty">
            <FaFolderOpen className="empty-icon" />
            <p>No active class timetables found in the cloud.</p>
          </div>
        ) : (
          <div className="schedule-grid">
            {schedules.map((item) => (
              <div key={item.id} className="schedule-card">
                <span className="grade-badge">
                  {item.grade || "Grade 10/11"}
                </span>
                <h4>{item.subjectName || item.title}</h4>
                <div className="meta-row">
                  <FaClock /> <span>{item.classTime || "04:00 PM"}</span>
                </div>
                <div className="meta-row">
                  <FaLocationDot />{" "}
                  <span>
                    {item.classDay || "Weekly"} ({item.medium || "Sinhala"})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : /* ==================== 📢 VIEW 02: CLASS NOTICES GRID ==================== */
      notices.length === 0 ? (
        <div className="schedule-empty">
          <FaBullhorn className="empty-icon" />
          <p>No official academic announcements published yet.</p>
        </div>
      ) : (
        <div className="notice-grid">
          {notices.map((item) => (
            <div key={item.id} className="notice-card">
              <div className="notice-top-meta">
                <div className="meta-item">
                  <FaCalendarDays /> <span>{item.date || "Just Now"}</span>
                </div>
                <span className="type-badge">{item.type || "Notice"}</span>
              </div>
              <h4>
                {item.subject ? item.subject.toUpperCase() : "GENERAL"} - Grade{" "}
                {item.grade || "All"}
              </h4>
              <p className="notice-main-text">{item.text}</p>
              <div className="notice-footer-meta">
                <span>
                  <FaUserPen /> Faculty Lead:{" "}
                  <strong>{item.author || "Admin"}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassScheduleAdmin;
