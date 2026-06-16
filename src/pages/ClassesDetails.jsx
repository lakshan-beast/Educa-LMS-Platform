import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { completeShedules } from "../data/completeShedule";
import {
  FaBook,
  FaCalendarCheck,
  // FaArrowLeft,
  FaPenToSquare,
  FaClockRotateLeft,
} from "react-icons/fa6";

const ClassesDetails = () => {
  const [selectedGrade, setSelectedGrade] = useState("6");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // 🕒 3. Auto-Time Status Calculator Logic
  const getClassStatus = (cls) => {
    if (cls.statusOverride === "Canceled") return "Canceled";
    if (cls.statusOverride === "Holiday") return "Holiday";

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

    // අද පන්තිය තියෙන දවස නම්, වෙලාව බලනවා
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

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

  const filteredClasses = completeShedules.filter(
    (cls) => cls.grade === selectedGrade,
  );

  return (
    <section className="parts" id="classesDetails">
      <div
        className="class-container"
        style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "1rem" }}>
        {/* <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
            color: "#001b42",
            textDecoration: "none",
            fontWeight: "bold",
          }}>
          <FaArrowLeft /> Back to Home Page */}
        {/* </Link> */}
        <h2 style={{ textAlign: "center" }}>
          Weekly <span>Class Schedule</span>
        </h2>

        {/* 🎓 4. Grade Selector Tabs (6-11 ශ්‍රේණි තෝරන්න බටන්ස් - ටැග් එක නිවැරදි කළා) */}
        <div
          className="grade-filter-tabs"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            margin: "30px 0",
            flexWrap: "wrap",
          }}>
          {["6", "7", "8", "9", "10", "11", "11 Paper Class"].map((grade) => (
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

        {/* ਪන්ਤੀ කාඩ්ස් පද්ධතිය */}
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
              const currentStatus = getClassStatus(cls); // Status එක හැදෙනවා

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
                      // marginBottom: "15px",
                    }}>
                    {/* status part */}
                    {/* <span
                      className={`status-badge ${currentStatus.toLowerCase()}`}>
                      {currentStatus === "Active" && "● Live Now"}
                      {currentStatus === "Upcoming" && "Upcoming"}
                      {currentStatus === "Ended" && "Class Ended"}
                      {currentStatus === "Canceled" && "Postponed"}
                    </span> */}

                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        margin: 0,
                        padding: " 6px",
                        // color: "#1a0a54",
                        color: "white",
                        borderRadius: "6px",
                        // borderLeft: "6px solid #001b42",
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
                        // color: "white",
                        // borderRadius: "6px",
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
                    {/* <p>
                      <FaClock /> {cls.startTime} - {cls.endTime}
                    </p> */}

                    {/* <span
                      className={`status-badge ${currentStatus.toLowerCase()}`}>
                      {currentStatus === "Active" && "● Live Now"}
                      {currentStatus === "Upcoming" && "Upcoming"}
                      {currentStatus === "Ended" && "Class Ended"}
                      {currentStatus === "Canceled" && "Postponed"}
                    </span> */}
                    {/* <p
                      style={{
                        marginTop: "5px",
                        fontSize: "0.9rem",
                        color: "#555",
                      }}>
                      <b>Current Lesson:</b> {cls.notice.lesson}
                    </p> */}
                  </div>

                  {/* Lesson Notice Section */}
                  <div
                    className="class-notice"
                    style={{
                      background:
                        currentStatus === "Canceled" ? "#f0f9ff" : "#f8faff",
                      padding: "10px 0",
                      // borderRadius: "8px",
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
                        // textTransform: "uppercase",
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
                          // marginTop: "12px",
                          color:
                            currentStatus === "Canceled"
                              ? "#03204b"
                              : "#062853",
                          // borderTop: "2px solid",
                        }}>
                        {cls.notice.lesson}
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
                      // borderRadius: "8px",
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
                          // marginTop: "12px",
                        }}>
                        {cls.notice.specialNote}
                      </span>
                    </p>
                  </div>

                  {/* Card Footer (Active Class Link Logic) */}
                  <div className="class-footer">
                    {currentStatus === "Active" ? (
                      // <a
                      //   href={cls.link}
                      //   target="_blank"
                      //   rel="noopener noreferrer"
                      //   className="start-btn"
                      //   style={{
                      //     width: "100%",
                      //     display: "flex",
                      //     justifyContent: "center",
                      //     alignItems: "center",
                      //     gap: "8px",
                      //     textDecoration: "none",
                      //     background:
                      //       "linear-gradient(to right, #ff4b2b, #ff416c)",
                      //     color: "white",
                      //     padding: "10px",
                      //     borderRadius: "8px",
                      //     fontWeight: "bold",
                      //   }}>
                      //   <FaVideo /> Join Live Class Now
                      // </a>
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
                        {/* {currentStatus === "Upcoming" && "Upcoming"}
                        {currentStatus === "Ended" && "Class Ended"}
                        {currentStatus === "Canceled" && "Postponed"} */}
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
