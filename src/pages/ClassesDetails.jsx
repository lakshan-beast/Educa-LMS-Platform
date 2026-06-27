import { useState, useEffect } from "react";

import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import {
  FaBook,
  FaCalendarCheck,
  FaPenToSquare,
  FaClockRotateLeft,
} from "react-icons/fa6";

const ClassesDetails = () => {
  const [selectedGrade, setSelectedGrade] = useState("6");
  const [currentTime, setCurrentTime] = useState(new Date());

  // ☁️ [CLOUD STATE]
  const [completeShedules, setCompleteShedules] = useState([]);

  // 1. Cloud Real-time Sync
  useEffect(() => {
    const schedulesRef = collection(db, "schedules");

    // Cloud auto-update
    const unsubscribe = onSnapshot(schedulesRef, (querySnapshot) => {
      const classesArray = [];
      querySnapshot.forEach((doc) => {
        classesArray.push({ id: doc.id, ...doc.data() });
      });
      setCompleteShedules(classesArray);

      console.log(classesArray);
    });

    return () => unsubscribe();
  }, []);

  // 2.Update Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // 🕒 3. Auto-Time Status Calculator Logic
  const getClassStatus = (cls) => {
    if (cls.overrideStatus === "Canceled") return "Canceled";
    if (cls.overrideStatus === "Holiday") return "Holiday";

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayName = daysOfWeek[currentTime.getDay()];

    if (currentDayName !== cls.day) {
      return "Upcoming";
    }

    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    if (!cls.startTime || !cls.endTime) return "Upcoming";
    const [startH, startM] = cls.startTime.split(":").map(Number);
    const [endH, endM] = cls.endTime.split(":").map(Number);

    const startTotalMinutes = startH * 60 + startM;
    const endTotalMinutes = endH * 60 + endM;

    if (
      currentTotalMinutes >= startTotalMinutes &&
      currentTotalMinutes <= endTotalMinutes
    ) {
      return "Active";
    } else if (currentTotalMinutes > endTotalMinutes) {
      return "Ended";
    }

    return "Upcoming";
  };

  //  4.  Grade Filter
  const filteredClasses = completeShedules.filter(
    (cls) => cls.grade === selectedGrade,
  );

  return (
    <section className="parts" id="classesDetails">
      <div
        className="class-container"
        style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "1rem" }}>
        <h2 style={{ textAlign: "center" }}>
          Weekly <span>Class Schedule</span>
        </h2>

        {/* 🎓 4. Grade Selector Tabs */}
        <div
          className="grade-filter-tabs"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            margin: "30px 0",
            flexWrap: "wrap",
          }}>
          {["6", "7", "8", "9", "10", "11", "Paper Class"].map((grade) => (
            <button
              key={grade}
              className={`grade-tab-btn ${selectedGrade === grade ? "active-tab" : ""}`}
              onClick={() => setSelectedGrade(grade)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
              }}>
              Grade {grade}
            </button>
          ))}
        </div>

        <div
          className="class-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
            padding: "1rem 0rem",
          }}>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls) => {
              const currentStatus = getClassStatus(cls);

              return (
                <div
                  key={cls.id}
                  className={`card-container class-schedule-card status-${currentStatus.toLowerCase()}`}>
                  {/* Card Header */}
                  <div
                    className="class-card-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        margin: 0,
                        padding: " 6px",
                        color: "white",
                        borderRadius: "6px",
                        background:
                          currentStatus === "Active" ? "#ff2c4b" : "#001c42e3",
                      }}>
                      <FaClockRotateLeft /> {cls.startTime} - {cls.endTime}
                    </p>
                    <span
                      className="class-day"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        margin: 0,
                        padding: " 6px",
                        color: "#03204b",
                        fontWeight: "600",
                        borderBottom: "2px solid #001b42",
                      }}>
                      <FaCalendarCheck /> {cls.day}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="class-body" style={{ margin: "3px 0" }}>
                    <h3 style={{ color: "#03204b" }}>{cls.subject}</h3>
                    <p
                      style={{
                        marginBottom: "5px",
                        textAlign: "left",
                        padding: "0",
                      }}>
                      Teacher: <b>{cls.teacher}</b>
                    </p>
                  </div>

                  {/* Lesson Notice Section */}
                  <div
                    className="class-notice"
                    style={{
                      background:
                        currentStatus === "Canceled" ? "#f0f9ff" : "#f8faff",
                      padding: "10px 0",
                      borderLeft:
                        currentStatus === "Canceled"
                          ? "4px solid #001b42"
                          : "4px solid #1877f2",
                      marginBottom: "0px",
                      display: "flex",
                      textAlign: "left",
                    }}>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#03204b",
                        textAlign: "left",
                        margin: 0,
                        fontWeight: "600",
                      }}>
                      <FaBook
                        style={{
                          color:
                            currentStatus === "Canceled"
                              ? "#1a0a54"
                              : "#1877f2",
                          marginRight: "5px",
                        }}
                      />{" "}
                      <b>Current Lesson:</b>
                      <span
                        style={{
                          display: "block",
                          color:
                            currentStatus === "Canceled"
                              ? "#03204b"
                              : "#062853",
                        }}>
                        {cls.notice.currentLesson}
                      </span>
                    </p>
                  </div>

                  {/* Notice Section */}
                  <div
                    className="class-notice"
                    style={{
                      background:
                        currentStatus === "Canceled" ? "#fff0f0" : "#fff4f2",
                      padding: "10px 0",
                      borderLeft:
                        currentStatus === "Canceled"
                          ? "4px solid #fd473a"
                          : "4px solid #f7786f",
                      marginBottom: "15px",
                      display: "flex",
                      textAlign: "left",
                    }}>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#03204b",
                        textAlign: "left",
                        margin: 0,
                        fontWeight: "600",
                      }}>
                      <FaPenToSquare
                        style={{
                          color:
                            currentStatus === "Canceled"
                              ? "#fd473a"
                              : "#dd1305",
                          marginRight: "5px",
                        }}
                      />{" "}
                      <b>Special Note:</b>
                      <span
                        style={{
                          display: "block",
                          color:
                            currentStatus === "Canceled"
                              ? "#fd473a"
                              : "#dd1305",
                        }}>
                        {cls.notice.specialNote}
                      </span>
                    </p>
                  </div>

                  {/* Card Footer (Active Class Link Logic) */}
                  <div className="class-footer">
                    {currentStatus === "Active" ? (
                      <span
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          textDecoration: "none",
                          background:
                            "linear-gradient(to right, #ff4b2b, #ff416c)",
                          color: "white",
                          padding: "10px",
                          borderRadius: "8px",
                          fontWeight: "bold",
                        }}
                        className={`status-badge ${currentStatus.toLowerCase()}`}>
                        {currentStatus === "Active" && "● Live Now"}
                      </span>
                    ) : (
                      <button
                        className="browse-btn"
                        disabled
                        style={{
                          maxWidth: "300px",
                          width: "100%",
                          cursor: "not-allowed",
                          opacity: "0.6",
                          padding: "10px",
                          borderRadius: "8px",
                        }}>
                        {currentStatus === "Canceled"
                          ? "Class Canceled"
                          : `Class Starts on ${cls.day}`}
                      </button>
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
                color: "#777",
              }}>
              No classes scheduled for Grade {selectedGrade} yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassesDetails;
