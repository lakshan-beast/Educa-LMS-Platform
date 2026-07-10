// import { useState, useEffect } from "react";

// import { db } from "../../firebaseConfig";
// import { collection, onSnapshot } from "firebase/firestore";

// import Loader from "../../components/ui/Loader";

// import {
//   FaBook,
//   FaCalendarCheck,
//   FaPenToSquare,
//   FaClockRotateLeft,
// } from "react-icons/fa6";

// const ClassesDetails = () => {
//   const [selectedGrade, setSelectedGrade] = useState("6");
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isLoading, setIsLoading] = useState(true);

//   // ☁️ [CLOUD STATE]
//   const [completeShedules, setCompleteShedules] = useState([]);

//   // 1. Cloud Real-time Sync
//   useEffect(() => {
//     const schedulesRef = collection(db, "schedules");

//     // Cloud auto-update
//     const unsubscribe = onSnapshot(schedulesRef, (querySnapshot) => {
//       const classesArray = [];
//       querySnapshot.forEach((doc) => {
//         classesArray.push({ id: doc.id, ...doc.data() });
//       });
//       setCompleteShedules(classesArray);
//       setIsLoading(false);
//       console.log(classesArray);
//     });

//     return () => unsubscribe();
//   }, []);

//   // 2.Update Timer
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 30000);
//     return () => clearInterval(timer);
//   }, []);

//   // 🕒 3. Auto-Time Status Calculator Logic
//   const getClassStatus = (cls) => {
//     if (cls.overrideStatus === "Canceled") return "Canceled";
//     if (cls.overrideStatus === "Holiday") return "Holiday";

//     const daysOfWeek = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ];
//     const currentDayName = daysOfWeek[currentTime.getDay()];

//     if (currentDayName !== cls.day) {
//       return "Upcoming";
//     }

//     const currentHours = currentTime.getHours();
//     const currentMinutes = currentTime.getMinutes();
//     const currentTotalMinutes = currentHours * 60 + currentMinutes;

//     if (!cls.startTime || !cls.endTime) return "Upcoming";
//     const [startH, startM] = cls.startTime.split(":").map(Number);
//     const [endH, endM] = cls.endTime.split(":").map(Number);

//     const startTotalMinutes = startH * 60 + startM;
//     const endTotalMinutes = endH * 60 + endM;

//     if (
//       currentTotalMinutes >= startTotalMinutes &&
//       currentTotalMinutes <= endTotalMinutes
//     ) {
//       return "Active";
//     } else if (currentTotalMinutes > endTotalMinutes) {
//       return "Ended";
//     }

//     return "Upcoming";
//   };

//   //  4.  Grade Filter
//   const filteredClasses = completeShedules.filter(
//     (cls) => cls.grade === selectedGrade,
//   );

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <section className="parts" id="classesDetails">
//       <div
//         className="class-container"
//         style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "1rem" }}>
//         <h2 style={{ textAlign: "center" }}>
//           Weekly <span>Class Schedule</span>
//         </h2>

//         {/* 🎓 4. Grade Selector Tabs */}
//         <div
//           className="grade-filter-tabs"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "10px",
//             margin: "30px 0",
//             flexWrap: "wrap",
//           }}>
//           {["6", "7", "8", "9", "10", "11", "Paper Class"].map((grade) => (
//             <button
//               key={grade}
//               className={`grade-tab-btn ${selectedGrade === grade ? "active-tab" : ""}`}
//               onClick={() => setSelectedGrade(grade)}
//               style={{
//                 padding: "8px 16px",
//                 borderRadius: "20px",
//                 cursor: "pointer",
//               }}>
//               Grade {grade}
//             </button>
//           ))}
//         </div>

//         {isLoading ? (
//           <Loader />
//         ) : (
//           <div
//             className="class-grid"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//               gap: "10px",
//               padding: "1rem 0rem",
//             }}>
//             {filteredClasses.length > 0 ? (
//               filteredClasses.map((cls) => {
//                 const currentStatus = getClassStatus(cls);

//                 return (
//                   <div
//                     key={cls.id}
//                     className={`card-container class-schedule-card status-${currentStatus.toLowerCase()}`}>
//                     {/* Card Header */}
//                     <div
//                       className="class-card-header"
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}>
//                       <p
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "8px",
//                           margin: 0,
//                           padding: " 6px",
//                           color: "white",
//                           borderRadius: "6px",
//                           background:
//                             currentStatus === "Active"
//                               ? "#ff2c4b"
//                               : "#001c42e3",
//                         }}>
//                         <FaClockRotateLeft /> {cls.startTime} - {cls.endTime}
//                       </p>
//                       <span
//                         className="class-day"
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "8px",
//                           margin: 0,
//                           padding: " 6px",
//                           color: "#03204b",
//                           fontWeight: "600",
//                           borderBottom: "2px solid #001b42",
//                         }}>
//                         <FaCalendarCheck /> {cls.day}
//                       </span>
//                     </div>

//                     {/* Card Body */}
//                     <div className="class-body" style={{ margin: "3px 0" }}>
//                       <h3 style={{ color: "#03204b" }}>{cls.subject}</h3>
//                       <p
//                         style={{
//                           marginBottom: "5px",
//                           textAlign: "left",
//                           padding: "0",
//                         }}>
//                         Teacher: <b>{cls.teacher}</b>
//                       </p>
//                     </div>

//                     {/* Lesson Notice Section */}
//                     <div
//                       className="class-notice"
//                       style={{
//                         background:
//                           currentStatus === "Canceled" ? "#f0f9ff" : "#f8faff",
//                         padding: "10px 0",
//                         borderLeft:
//                           currentStatus === "Canceled"
//                             ? "4px solid #001b42"
//                             : "4px solid #1877f2",
//                         marginBottom: "0px",
//                         display: "flex",
//                         textAlign: "left",
//                       }}>
//                       <p
//                         style={{
//                           fontSize: "0.85rem",
//                           color: "#03204b",
//                           textAlign: "left",
//                           margin: 0,
//                           fontWeight: "600",
//                         }}>
//                         <FaBook
//                           style={{
//                             color:
//                               currentStatus === "Canceled"
//                                 ? "#1a0a54"
//                                 : "#1877f2",
//                             marginRight: "5px",
//                           }}
//                         />{" "}
//                         <b>Current Lesson:</b>
//                         <span
//                           style={{
//                             display: "block",
//                             color:
//                               currentStatus === "Canceled"
//                                 ? "#03204b"
//                                 : "#062853",
//                           }}>
//                           {cls.notice.currentLesson}
//                         </span>
//                       </p>
//                     </div>

//                     {/* Notice Section */}
//                     <div
//                       className="class-notice"
//                       style={{
//                         background:
//                           currentStatus === "Canceled" ? "#fff0f0" : "#fff4f2",
//                         padding: "10px 0",
//                         borderLeft:
//                           currentStatus === "Canceled"
//                             ? "4px solid #fd473a"
//                             : "4px solid #f7786f",
//                         marginBottom: "15px",
//                         display: "flex",
//                         textAlign: "left",
//                       }}>
//                       <p
//                         style={{
//                           fontSize: "0.85rem",
//                           color: "#03204b",
//                           textAlign: "left",
//                           margin: 0,
//                           fontWeight: "600",
//                         }}>
//                         <FaPenToSquare
//                           style={{
//                             color:
//                               currentStatus === "Canceled"
//                                 ? "#fd473a"
//                                 : "#dd1305",
//                             marginRight: "5px",
//                           }}
//                         />{" "}
//                         <b>Special Note:</b>
//                         <span
//                           style={{
//                             display: "block",
//                             color:
//                               currentStatus === "Canceled"
//                                 ? "#fd473a"
//                                 : "#dd1305",
//                           }}>
//                           {cls.notice.specialNote}
//                         </span>
//                       </p>
//                     </div>

//                     {/* Card Footer (Active Class Link Logic) */}
//                     <div className="class-footer">
//                       {currentStatus === "Active" ? (
//                         <span
//                           style={{
//                             width: "100%",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             gap: "8px",
//                             textDecoration: "none",
//                             background:
//                               "linear-gradient(to right, #ff4b2b, #ff416c)",
//                             color: "white",
//                             padding: "10px",
//                             borderRadius: "8px",
//                             fontWeight: "bold",
//                           }}
//                           className={`status-badge ${currentStatus.toLowerCase()}`}>
//                           {currentStatus === "Active" && "● Live Now"}
//                         </span>
//                       ) : (
//                         <button
//                           className="browse-btn"
//                           disabled
//                           style={{
//                             maxWidth: "300px",
//                             width: "100%",
//                             cursor: "not-allowed",
//                             opacity: "0.6",
//                             padding: "10px",
//                             borderRadius: "8px",
//                           }}>
//                           {currentStatus === "Canceled"
//                             ? "Class Canceled"
//                             : `Class Starts on ${cls.day}`}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p
//                 style={{
//                   textAlign: "center",
//                   gridColumn: "1/-1",
//                   color: "#777",
//                 }}>
//                 No classes scheduled for Grade {selectedGrade} yet.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ClassesDetails;

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
import {
  FaCalendarCheck,
  // FaNoteSticky,
  FaLock,
  FaBullhorn,
  FaGoogle,
} from "react-icons/fa6";

const ClassesDetails = () => {
  const [selectedGrade, setSelectedGrade] = useState("6");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // ☁️ CLOUD STATES
  const [completeSchedules, setCompleteSchedules] = useState([]);
  const [latestNotice, setLatestNotice] = useState(null);

  // 🔄 1. Cloud Real-time Sync for Schedules [INDEX 51]
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

  // 🔄 2. Dynamic Fetching of Latest Notice for selected Grade [INDEX 51]
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

  // 🧠 4. Dynamic Live Countdown Calculator Logic [INDEX 4]
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

  // 👑 FIXED: $ ලකුණ නිවැරදිව දමා URL එක සකස් කළා
  const buildGoogleCalendarUrl = (cls) => {
    if (!cls.targetDateTime) return "#";
    const start = new Date(cls.targetDateTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // පැය 2ක් ලෙස ගනී

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
            // display: "grid",
            // gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            // gap: "25px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls) => {
              // const isLive = cls.overrideStatus === "FORCE_ACTIVE";
              // const isPaused = cls.overrideStatus === "POSTPONED";
              // const isClosed = cls.overrideStatus === "ENDED";

              // 👑 FIXED LOGIC MATRIX: ඇඩ්මින් CLOSED කළ සැනින් Live සහ Paused සහමුලින්ම අක්‍රිය (False) වේ! [INDEX 4]
              // const isClosed = cls.overrideStatus === "CLOSED";
              // const isLive = cls.overrideStatus === "FORCE_ACTIVE" && !isClosed;
              // const isPaused = cls.overrideStatus === "POSTPONED" && !isClosed;

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
                  key={cls.id}
                  disabled={isClosed || isPaused}
                  // style={{
                  //   opacity: isClosed ? "0.4" : "0.6",
                  //   cursor: "not-allowed",
                  // }}
                  className={`public-schedule-card ${isLive ? "pulse-neon-live" : isPaused ? "card-postponed" : ""}`}>
                  {/* CARD TOP META BAR */}
                  {/* {isClosed
                    ? "Class Session Ended"
                    : isPaused
                      ? "Class Session Postponed"
                      : "Portal Room Locked"} */}
                  <div className="card-top-bar-meta">
                    <span
                      className={`status-tag-pill ${isLive ? "live" : isPaused ? "postponed" : isClosed ? "closed" : "upcoming"}`}>
                      {isLive
                        ? "🔴 LIVE NOW"
                        : isPaused
                          ? "⚠️ POSTPONED"
                          : isClosed
                            ? "🏁 SESSION ENDED" // 👈 FIXED: Close කළ සැනින් උඩ Badge එකත් ලස්සනට මාරු වේ!
                            : "🕒 UPCOMING"}
                    </span>
                    <small className="timeline-week-marker">
                      <FaCalendarCheck /> {cls.weekPicker || "Week N/A"}
                    </small>
                  </div>

                  {/* ⏳ CORE REAL-TIME LIVE COUNTDOWN HUB */}
                  {!isLive && !isPaused && !isClosed && cls.targetDateTime && (
                    <div className="live-countdown-timer-dock">
                      <span className="countdown-label">
                        {/* T-Minus to Live Terminal: */}
                      </span>
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
                      {/* <FaBookOpen className="icon-v" /> */}
                      <p>
                        Active Lesson:
                        <span>{cls.currentLesson || "Not Specified"}</span>
                      </p>
                    </div>
                    <div className="parameter-data-row">
                      {/* <FaClock className="icon-v" />{" "} */}
                      <p>
                        Start Target:
                        <span>
                          {cls.targetDateTime
                            ? new Date(cls.targetDateTime).toLocaleString()
                            : "No Date Set"}
                        </span>
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
                    {/* ✅ බ්‍රවුසර් එකෙන් Block නොවී ආරක්ෂිතව Google Calendar open වන හැටි */}
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
                        to="dashboard"
                        className="action-button-gate live-join-btn">
                        <FaLock /> Access Dashboard to Join Zoom
                      </Link>
                    ) : (
                      <div className="disabled-action-flow-wrapper">
                        {cls.targetDateTime && (
                          // <a
                          //   href={buildGoogleCalendarUrl(cls)}
                          //   target="_blank"
                          //   rel="noreferrer"
                          //   className="google-calendar-anchor-link"
                          //   title="Sync Reminder to Google Calendar">
                          //   <FaGoogle /> Add Reminder
                          // </a>

                          // <button
                          //   type="button"
                          //   onClick={() => {
                          //     const calendarUrl = buildGoogleCalendarUrl(cls);
                          //     if (calendarUrl !== "#") {
                          //       window.open(
                          //         calendarUrl,
                          //         "_blank",
                          //         "noopener,noreferrer",
                          //       );
                          //     }
                          //   }}
                          //   className="google-calendar-anchor-link"
                          //   style={{
                          //     background: "none",
                          //     border: "none",
                          //     cursor: "pointer",
                          //     display: "flex",
                          //     alignItems: "center",
                          //     gap: "8px",
                          //     color: "#8b949e",
                          //     fontSize: "0.8rem",
                          //     fontWeight: "bold",
                          //     margin: "0 auto",
                          //     padding: "5px",
                          //   }}
                          //   title="Sync Reminder to Google Calendar">
                          //   <FaGoogle /> Add Reminder
                          // </button>

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
