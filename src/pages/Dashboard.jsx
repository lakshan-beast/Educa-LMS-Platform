import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBookOpen,
  FaArrowLeft,
  FaLock,
  FaRightFromBracket,
} from "react-icons/fa6";
import { FaCrown } from "react-icons/fa6";
// import { HiOutlineHome } from "react-icons/hi";
// <HiOutlineHome />;
import { IoCalendarOutline } from "react-icons/io5";

import { IoHomeOutline } from "react-icons/io5";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import { IoBarChartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

import ScoreAnalytics from "../components/ScorenAnalytics";
import { premiumStudentsList } from "../data/approvedStudents";

import AIChatWidget from "../components/AIChatWidget";
// import LiveClass from "./LiveClass";

const Dashboard = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("user_id") || "";
  const userSubjects = localStorage.getItem("user_subjects") || "";

  const isPremiumUser = premiumStudentsList.includes(
    studentId.trim().toUpperCase(),
  );

  // 2. Countdown State (2026 O/L Exam - Target Date: Dec 8, 2026)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  const nowYear = new Date().getFullYear();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }

    const examDate = new Date("2026-12-08T08:30:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = examDate - now;

      if (difference < 0) {
        clearInterval(interval);
      } else {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const loggedInUser = JSON.parse(localStorage.getItem("studentUser")) || {};

  const studentFirstName = loggedInUser.fullName
    ? loggedInUser.fullName.split(" ")[0]
    : "Student";

  // 🔒 Subject Lock Checking Logic
  const hasAccess = (subLetter) => {
    return userSubjects.includes(subLetter);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const getGreetings = () => {
    const hr = new Date().getHours();

    if (hr < 10) {
      return {
        text: "Good Morning",
        animUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f31e/512.gif",
      };
    }

    if (hr < 14) {
      return {
        text: "Good Afternoon",
        animUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/26c5/512.gif",
      };
    }

    if (hr < 19) {
      return {
        text: "Good Evening",
        animUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f3d5/512.gif",
      };
    }

    return {
      text: "Good Night",
      animUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f31b/512.gif",
    };
  };

  const greeting = getGreetings();

  return (
    <div className="dashboard-wrapper page-container">
      <div className="system-container">
        {/* <Link className="back-btn" to="/">
          <FaArrowLeft /> Back to Home Page
        </Link> */}

        {/* <div className="quick-actions">
          <Link>
            <IoHomeOutline className="icons" />
          </Link>
          <Link>
            <IoCalendarOutline className="icons" />
          </Link>
          <Link>
            <IoChatbubbleEllipsesOutline className="icons" />
          </Link>
          <Link>
            <IoBarChartOutline className="icons" />
          </Link>
          <Link>
            <IoLogOutOutline className="icons" />
          </Link>
        </div> */}

        <div className="dashboard-grid">
          <div className="welcome-banner">
            <img
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f6f8/512.gif"
              alt="live-emoji"
              style={{
                width: "250px",
                height: "250px",
                zIndex: "999",
                position: "absolute",
                top: "5%",
                left: "15%",
                objectFit: "contain",
                display: "none",
              }}
            />

            <h1
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: 0,
              }}>
              <span>
                {greeting.text}, {studentFirstName}!
              </span>

              <img
                src={greeting.animUrl}
                alt="live-emoji"
                style={{ width: "50px", height: "50px", objectFit: "contain" }}
              />
            </h1>
            <span> Grade 11 - {nowYear} O/L Batch</span>
            <p className="student-id">
              <span className="id">{studentId}</span>{" "}
            </p>

            {/* <p>Your password is secure and encrypted.</p> */}

            {/* <div className="more-btns">
              <Link to="/tab-controller" className="fullclasss-btn">
                View Full Timetable & Notices
              </Link>
            </div> */}

            <div className="quick-actions">
              <Link>
                <IoHomeOutline className="icons" />
              </Link>
              <Link>
                <IoCalendarOutline className="icons" />
              </Link>
              <Link>
                <IoChatbubbleEllipsesOutline className="icons" />
              </Link>
              <Link>
                <IoBarChartOutline className="icons" />
              </Link>
              <Link>
                <IoLogOutOutline className="icons signout" />
              </Link>
            </div>

            {/* <button onClick={handleLogout} className="browse-btn signout-btn">
              <FaRightFromBracket className="icon" />
              Sign Out
            </button> */}
          </div>

          <div className="side-dash-content">
            {/* ⏰ D. 2026 O/L Exam Countdown Clock Area */}
            <div className="card-container countdown-card">
              <h4>
                {/* <FaHourglassHalf /> */}
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/231b/512.gif"
                  alt="live-emoji"
                  style={{
                    width: "20px",
                    height: "20px",
                    objectFit: "contain",
                  }}
                  // refferrerPolicy="no-referrer"
                />{" "}
                2026 - O/L Exam Countdown
              </h4>
              <div className="countdown-tiles">
                <div>
                  <h3>{countdown.days}</h3>
                  <small>Days</small>
                </div>
                <div>
                  <h3>{countdown.hours}</h3>
                  <small>Hours</small>
                </div>
                <div>
                  <h3>{countdown.mins}</h3>
                  <small>Mins</small>
                </div>
                <div>
                  <h3 className="seconds">{countdown.secs}</h3>
                  <small>Secs</small>
                </div>
              </div>
              <p>* Target Date: December 08, 2026</p>
            </div>
          </div>
        </div>

        {/* <div className="dashboard-grids"> */}
        {/* 🔒 C. Core Subject Enrolment & Study Vault Redirection Area */}

        <div className="subjects-section">
          <h3>Your Enrolled Class Portals</h3>
          <div className="subjects-grid">
            {/* 1. MATHEMATICS PORTAL */}
            <div
              className={`subject-portal-card ${!hasAccess("M") ? "locked" : ""}`}
              style={{
                opacity: hasAccess("M") ? 1 : 0.6,
              }}>
              {!hasAccess("M") && (
                <div className="locked">
                  <FaLock className="lock-icon" /> Locked
                </div>
              )}

              <h4>Mathematics Class</h4>
            </div>

            {/* 2. SCIENCE PORTAL */}
            <div
              className={`subject-portal-card ${!hasAccess("S") ? "locked" : ""}`}
              style={{
                // borderLeft: "5px solid #2ecc71",
                opacity: hasAccess("S") ? 1 : 0.6,
              }}>
              {!hasAccess("S") && (
                <div className="locked">
                  <FaLock className="lock-icon" />
                </div>
              )}
              <h4>Science Class</h4>
              {hasAccess("S") ? (
                <Link to="/paper-hub/science" className="browse-btn paper-btn">
                  <FaBookOpen /> Study Vault
                </Link>
              ) : (
                <p className="not-allowed ">
                  Not enrolled in this subject. Contact card marker.
                </p>
              )}
            </div>

            {/* 3. ENGLISH PORTAL */}
            <div
              className={`subject-portal-card ${!hasAccess("E") ? "locked" : ""}`}
              style={{
                // borderLeft: "5px solid #ff9f43",
                opacity: hasAccess("E") ? 1 : 0.6,
              }}>
              {!hasAccess("E") && (
                <div className="locked">
                  <FaLock className="lock-icon" /> Locked
                </div>
              )}
              <h4>English Class</h4>
              {hasAccess("E") ? (
                <Link to="/paper-hub/english" className="browse-btn paper-btn">
                  <FaBookOpen /> Study Vault
                </Link>
              ) : (
                <p className="not-allowed">
                  Not enrolled in this subject. Contact card marker.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* 
        <div>
          <LiveClass />
        </div> */}
        {/* <div className="notice-area">
          <LiveNoticeDisplay
            // studentGrade={loggedGrade.grade}
            studentSubjects={userSubjects}
          />
        </div> */}

        {/* <div className="first-loads">
          <div className="first-loading">
            {/* <div className="loads"></div> 
          </div>
          <div className="first-loading"></div>
          <div className="first-loading"></div>
          <div className="first-loading"></div>
          <div className="first-loading"></div>
          <div className="first-loading"></div>
          <div className="first-loading"></div>
        </div> */}

        {/* if (isLoading) {
  return (
    <div className="first-loads">
      <div className="first-loading"></div>
    </div>
  );
} */}

        {/* if (isLoading) {
  return (
    <div className="first-loads">
      <div className="playstore-edu-loader"></div>
      <p>Syncing Live Campus Ledger...</p>
    </div>
  );
} */}

        {/* if (isLoading) {
  return (
    <div className="first-loads-fullscreen-overlay">
      <div className="shape-burst-loader-hub">
        <div className="burst-particle" style={{ "--x": "0px", "--y": "-35px" }}></div>
        <div className="burst-particle" style={{ "--x": "32px", "--y": "-12px" }}></div>
        <div className="burst-particle" style={{ "--x": "20px", "--y": "28px" }}></div>
        <div className="burst-particle" style={{ "--x": "-20px", "--y": "28px" }}></div>
        <div className="burst-particle" style={{ "--x": "-32px", "--y": "-12px" }}></div>
      </div>
      <span>Syncing Live Campus Portal...</span>
    </div>
  );
} */}

        {/* import { FaSquare, FaCircle, FaPlay, FaDiamond, FaAward } from "react-icons/fa6"; // 👈 උඩින් ඉම්පෝට් කරගන්න මචං [INDEX 4]

if (isLoading) {
  return (
    <div className="first-loads-fullscreen-overlay">
      <div className="shape-burst-loader-hub">
        {/* 👑 🗛 REACT ICONS DIRECTLY INJECTED AS 3D PARTICLES 
        <div className="burst-particle-icon" style={{ "--x": "0px", "--y": "-38px" }}><FaSquare /></div>
        <div className="burst-particle-icon" style={{ "--x": "35px", "--y": "-12px" }}><FaCircle /></div>
        <div className="burst-particle-icon" style={{ "--x": "22px", "--y": "30px" }}><FaPlay style={{ transform: "rotate(-90deg)" }} /></div>
        <div className="burst-particle-icon" style={{ "--x": "-22px", "--y": "30px" }}><FaDiamond /></div>
        <div className="burst-particle-icon" style={{ "--x": "-35px", "--y": "-12px" }}><FaAward /></div>
      </div>
      <span>Syncing Live Campus Portal...</span>
    </div>
  );
} */}

        {/* <div className="first-loads">
          <div className="first-loading"></div>
          <p>loading</p>
        </div>

        <div className="first-loads">
          <div className="playstore-edu-loader"></div>
          <p>Syncing Live Campus Ledger...</p>
        </div>

        <div className="first-loads-fullscreen-overlay">
          <div className="shape-burst-loader-hub">
            <div
              className="burst-particle"
              style={{ "--x": "0px", "--y": "-35px" }}></div>
            <div
              className="burst-particle"
              style={{ "--x": "32px", "--y": "-12px" }}></div>
            <div
              className="burst-particle"
              style={{ "--x": "20px", "--y": "28px" }}></div>
            <div
              className="burst-particle"
              style={{ "--x": "-20px", "--y": "28px" }}></div>
            <div
              className="burst-particle"
              style={{ "--x": "-32px", "--y": "-12px" }}></div>
          </div>
          <span>Syncing Live Campus Portal...</span>
        </div>

        <div className="first-loads-fullscreen-overlay">
          <div className="shape-burst-loader-hub">
            {/* 👑 🗛 REACT ICONS DIRECTLY INJECTED AS 3D PARTICLES *
            <div
              className="burst-particle-icon"
              style={{ "--x": "0px", "--y": "-38px" }}>
              <FaBookOpen />
            </div>
            <div
              className="burst-particle-icon"
              style={{ "--x": "35px", "--y": "-12px" }}>
              <FaFlask />
            </div>
            <div
              className="burst-particle-icon"
              style={{ "--x": "22px", "--y": "30px" }}>
              <FaBrain style={{ transform: "rotate(-90deg)" }} />
            </div>
            <div
              className="burst-particle-icon"
              style={{ "--x": "-22px", "--y": "30px" }}>
              <FaCompass />
            </div>
            <div
              className="burst-particle-icon"
              style={{ "--x": "-35px", "--y": "-12px" }}>
              <FaAward />
            </div>
          </div>
          <span>Syncing Live Campus Portal...</span>
        </div> */}

        <div className="premium-tracker-zone">
          {isPremiumUser ? (
            <ScoreAnalytics />
          ) : (
            <div className="premium-lock-card">
              <div className="premium-crown-logo">
                <FaCrown className="crown" />
              </div>

              <div>
                <FaLock className="premium-lock-logo" />
              </div>

              <h3>Unlock O/L Progress Analytics Tracker </h3>
              <p className="premium-desc">
                Activate Sri Lanka's first smart system that can track your
                mistakes and weaknesses by graphing your paper scores for all 9
                of your O/L subjects individually (Line Graph).
              </p>

              {/* විශේෂ දීමනාව */}
              <div className="offer-content">
                <span className="offer-text">Limited Lifetime Offer</span>
                <h2>
                  Free Claim <span className="old-price">Rs.990</span>
                </h2>
              </div>

              {/* WhatsApp Payment Trigger Button */}
              <div>
                <button type="button" className="claim-btn start-btn">
                  Waiting...
                </button>
              </div>
            </div>
          )}
        </div>

        <AIChatWidget />
      </div>
    </div>
  );
};

export default Dashboard;
