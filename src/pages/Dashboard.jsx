import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

import AIChatWidget from "../components/AIChatWidget";

import { FaCrown, FaUser } from "react-icons/fa6";
import { BiError } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { PiPassword } from "react-icons/pi";
import { FaMobile } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { ImFire } from "react-icons/im";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaBookOpen, FaLock } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";

import {
  IoCalendarOutline,
  IoHomeOutline,
  IoBarChartOutline,
  IoChatbubbleEllipsesOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import ScoreAnalytics from "../components/ScorenAnalytics";
import { premiumStudentsList } from "../data/approvedStudents";

const Dashboard = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("user_id") || "";
  const userSubjects = localStorage.getItem("user_subjects") || "";
  // const [students, setStudents] = useState([]);

  const nowYear = new Date().getFullYear();

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

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. දැනට ලොග් වී සිටින ශිෂ්‍යයාගේ ID එක (උදාහරණයක් ලෙස)
  // සත්‍ය වශයෙන්ම ලොග් වන විට ලැබෙන ID එක මෙතනට ආදේශ කරන්න
  // const loggedInId = "EDU-MES-11-SADUNNIMSARA-0803";

  // 2. Firebase එකෙන් දත්ත සොයා ගන්නා Function එක
  async function getStudentByField(id) {
    try {
      const studentRef = collection(db, "students");
      const q = query(studentRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // පළමු ලේඛනයේ (Document) දත්ත ලබාගෙන return කිරීම
        return querySnapshot.docs[0].data();
      } else {
        console.log("No such student was found.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  // 3. පිටුව (Page) load වන විටම function එක run කිරීම
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getStudentByField(studentId); // මෙතනදී function එක call වේ
      setStudentData(data);
      setLoading(false);
    }
    loadData();
  }, [studentId]);

  // 4. දත්ත screen එකේ පෙන්වීම
  if (loading) return <p>(Loading...)</p>;
  if (!studentData) return <p>No such student's Details was found.</p>;

  const greeting = getGreetings();

  return (
    <div className="dashboard-wrapper page-container">
      <div className="system-container">
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

            <h1>
              <span>
                {greeting.text}, {studentFirstName}!
              </span>

              <img
                src={greeting.animUrl}
                alt="live-emoji"
                style={{ width: "50px", height: "50px", objectFit: "contain" }}
              />
            </h1>

            <div className="user-details">
              <p className="user-name">
                <FaUser /> {studentData.fullName}{" "}
                <span>
                  {studentData.status === "approved" ? (
                    <BiError />
                  ) : (
                    <FcApproval className="approved-badge" />
                  )}
                </span>
              </p>

              <p>
                <FaGraduationCap /> Grade {studentData.grade} - {nowYear} O/L
                Batch
              </p>

              <div className="user-security">
                <p>
                  <ImFire /> {studentData.id}
                </p>
                <p>
                  <PiPassword /> {studentData.password}
                </p>
              </div>
              <div className="user-number">
                <p>
                  <FaMobile /> Your Number : {studentData.studentMobile}
                </p>
                <p>
                  <BiSolidPhoneCall /> Parent Number :{" "}
                  {studentData.parentMobile}
                </p>
              </div>

              <div className="user-subjects">
                {studentData.maths && (
                  <span>
                    Maths <IoIosCheckmarkCircle className="check-icon" />
                  </span>
                )}
                {studentData.science && (
                  <span>
                    Science <IoIosCheckmarkCircle className="check-icon" />
                  </span>
                )}
                {studentData.english && (
                  <span>
                    English <IoIosCheckmarkCircle className="check-icon" />
                  </span>
                )}
              </div>
            </div>

            <div className="quick-actions">
              <Link smooth to="/">
                <IoHomeOutline className="icons" />
              </Link>
              <Link smooth to="/classes-details">
                <IoCalendarOutline className="icons" />
              </Link>
              <Link smooth to="/student-voices">
                <IoChatbubbleEllipsesOutline className="icons" />
              </Link>
              <Link smooth to="/result-hub">
                <IoBarChartOutline className="icons" />
              </Link>
              <button onClick={handleLogout}>
                <IoLogOutOutline className="icons signout" />
              </button>
            </div>
          </div>

          <div className="sub-grid">
            <div className="subjects-section">
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
                    <Link
                      to="/paper-hub/science"
                      className="browse-btn paper-btn">
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
                    <Link
                      to="/paper-hub/english"
                      className="browse-btn paper-btn">
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

            <div className="side-dash-content">
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
        </div>

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
