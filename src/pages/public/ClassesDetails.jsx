import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import Loader from "../../components/ui/Loader";
import { FaLock, FaBullhorn, FaGoogle } from "react-icons/fa6";

const ClassesDetails = () => {
  const [selectedGrade, setSelectedGrade] = useState("6");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // ☁️ CLOUD STATES
  const [completeSchedules, setCompleteSchedules] = useState([]);
  const [latestNotice, setLatestNotice] = useState(null);

  // 🔄 1. Cloud Real-time Sync for Schedules
  useEffect(() => {
    const schedulesRef = collection(db, "schedules");
    const unsubscribe = onSnapshot(schedulesRef, (querySnapshot) => {
      const classesArray = [];
      querySnapshot.forEach((doc) => {
        classesArray.push({ id: doc.id, ...doc.data() });
      });
      setCompleteSchedules(classesArray);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔄 2. Dynamic Fetching of Latest Notice for selected Grade
  useEffect(() => {
    const noticesRef = collection(db, "class_notices");
    const q = query(
      noticesRef,
      where("grade", "==", String(selectedGrade)),
      orderBy("createdAt", "desc"),
      limit(1),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setLatestNotice(snapshot.docs[0].data());
      } else {
        setLatestNotice(null);
      }
    });

    return () => unsubscribe();
  }, [selectedGrade]);

  // ⏱️ 3. Live Countdown & Clock Refresh Engine (Runs every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🧠 4. Dynamic Live Countdown Calculator Logic
  const calculateCountdown = (targetDateTimeStr) => {
    if (!targetDateTimeStr) return "No Time Set";
    const targetTime = new Date(targetDateTimeStr);
    const difference = targetTime - currentTime;

    if (difference <= 0) return "Class Started";

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  const buildGoogleCalendarUrl = (cls) => {
    if (!cls.targetDateTime) return "#";
    const start = new Date(cls.targetDateTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const formatTime = (date) =>
      date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const dates = `${formatTime(start)}/${formatTime(end)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(cls.className || "Educa Class")}&dates=${dates}&details=${encodeURIComponent(cls.currentLesson || "Active Lesson")}&location=Educa+LMS+Dashboard`;
  };

  // 👑 6. FIXED RE-ACTIVE ENGINE STATUS GATE [INDEX 4]
  const getClassStatus = (cls) => {
    if (cls.overrideStatus === "CLOSED") return "Ended";
    if (cls.overrideStatus === "POSTPONED") return "Postponed";
    if (cls.overrideStatus === "FORCE_ACTIVE") return "Active";
    return "Upcoming";
  };

  const filteredClasses = completeSchedules.filter(
    (cls) => cls.grade === selectedGrade,
  );

  if (isLoading) return <Loader />;

  return (
    <section
      className="classes-public-timetable-section parts"
      id="classesDetails">
      <div className="class-container">
        <div
          className="section-title-zone"
          style={{ textAlignment: "center", marginBottom: "40px" }}>
          <h2>
            Weekly <span>Class Schedules</span>
          </h2>
          <p>
            Monitor live operations, structured counts, and sync terminal
            schedules in real-time .
          </p>
        </div>
        {/* 🎓 GRADE SELECTOR FILTER TABS */}
        <div
          className="grade-filter-tabs"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}>
          {["6", "7", "8", "9", "10", "11", "11-Paper-Class"].map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              style={{
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                background: selectedGrade === grade ? "#00f1d1" : "#f4f6fa",
                color: selectedGrade === grade ? "white" : "#001b42",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "0.85rem",
                transition: "0.3s",
              }}>
              {grade === "11-Paper-Class" ? "11 Paper Class" : `Grade ${grade}`}
            </button>
          ))}
        </div>

        {/* 📊 CORE TIMETABLE CLASSES MATRIX GRID */}
        <div
          className="class-grid"
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls) => {
              const currentStatus = getClassStatus(cls);
              const isClosed = cls.overrideStatus === "CLOSED";
              const isLive =
                currentStatus === "Active" ||
                (cls.overrideStatus === "FORCE_ACTIVE" && !isClosed);
              const isPaused =
                currentStatus === "Postponed" ||
                (cls.overrideStatus === "POSTPONED" && !isClosed);

              return (
                <div
                  disabled={isClosed || isPaused}
                  className={`public-schedule-card ${isLive ? "pulse-neon-live" : isPaused ? "card-postponed" : isClosed ? "card-session-ended" : "card-upcoming"}`}>
                  {/* CARD TOP META BAR */}
                  <div className="card-top-bar-meta">
                    <span
                      className={`status-tag-pill ${isLive ? "live" : isPaused ? "postponed" : isClosed ? "closed" : "upcoming"}`}>
                      {isLive
                        ? "🔴 LIVE NOW"
                        : isPaused
                          ? "⚠️ POSTPONED"
                          : isClosed
                            ? "🏁 SESSION ENDED"
                            : "🕒 UPCOMING"}
                    </span>
                    <small className="timeline-week-marker">
                      {cls.weekPicker || "Week N/A"}
                    </small>
                  </div>

                  {/* ⏳ CORE REAL-TIME LIVE COUNTDOWN HUB */}
                  {!isLive && !isPaused && !isClosed && cls.targetDateTime && (
                    <div className="live-countdown-timer-dock">
                      <span className="countdown-label"></span>
                      <code className="countdown-clock-digits">
                        {calculateCountdown(cls.targetDateTime)}
                      </code>
                    </div>
                  )}

                  {/* MAIN CARD BODY */}
                  <div className="card-body-details">
                    <h3 className="subject-core-title">
                      {cls.className || "Academic View"}
                    </h3>
                    <span className="faculty-tag-title">
                      {cls.teacherName || "Official Faculty"}
                    </span>

                    <div className="parameter-data-row">
                      <p>
                        <span>Active Lesson:</span>
                        {cls.currentLesson || "Not Specified"}
                      </p>
                    </div>
                    <div className="parameter-data-row">
                      <p>
                        <span>Start Target:</span>
                        {cls.targetDateTime
                          ? new Date(cls.targetDateTime).toLocaleString()
                          : "No Date Set"}
                      </p>
                    </div>

                    {cls.specialNotes && (
                      <div className="special-instruction-box">
                        <p>Notice :</p> <span>{cls.specialNotes}</span>
                      </div>
                    )}
                  </div>

                  {/* 📢 LATEST CLASS NOTICE FEED LINK */}
                  {latestNotice && (
                    <div className="latest-notice-broadcast-banner">
                      <div className="notice-banner-header">
                        <FaBullhorn /> <span>Latest Bulletin Board Alert:</span>
                      </div>
                      <p>"{latestNotice.text}"</p>
                    </div>
                  )}

                  {/* 👟 CARD FOOTER ACTION ZONE */}
                  <div className="card-action-footer-matrix">
                    <button
                      type="button"
                      onClick={() => {
                        const calendarUrl = buildGoogleCalendarUrl(cls);
                        if (calendarUrl !== "#") {
                          window.open(
                            calendarUrl,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }
                      }}
                      className="google-calendar-anchor-link"
                      title="Sync Reminder to Google Calendar">
                      <FaGoogle /> Add Reminder
                    </button>

                    {isLive ? (
                      <Link
                        to="/dashboard"
                        className="action-button-gate live-join-btn">
                        <FaLock /> Access Dashboard to Join Zoom
                      </Link>
                    ) : (
                      <div className="disabled-action-flow-wrapper">
                        {cls.targetDateTime && (
                          <button
                            disabled
                            className="action-button-gate disabled-btn">
                            {isPaused
                              ? "Class Session Postponed"
                              : "Room Locked"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p
              style={{
                textAlign: "center",
                gridColumn: "1/-1",
                color: "#8b949e",
                fontStyle: "italic",
                padding: "30px 0",
              }}>
              No institutional pipelines scheduled for this grade tier yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassesDetails;
