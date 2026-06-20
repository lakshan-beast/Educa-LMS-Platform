import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import AllStudents from "../components/admin/AllStudents";
import AddStudentVault from "../components/admin/AddStudentVault";
import ClassMarksVault from "../components/admin/ClassMarksVault";
import PaymentsVault from "../components/admin/PaymentsVault";
import AbsentMark from "../components/admin/AbsentVault";
import NoticeBoard from "../components/admin/NoticeVault";
import ClassScheduleVault from "../components/admin/ClassScheduleVault";
import PaperHubUploadVault from "../components/admin/PaperHubUploadVault";

import MailBox from "../components/MailBox";

import PasswordField from "../components/PasswordField";
// import Loader from "../components/Loader";

import {
  FaUserPlus,
  FaUsers,
  FaGraduationCap,
  FaMoneyCheckDollar,
  FaUserXmark,
  FaBullhorn,
  FaLaptop,
  FaRightFromBracket,
  FaFolderOpen,
  FaFolderPlus,
  FaLock,
  FaUserShield,
  FaCalendarCheck,
} from "react-icons/fa6";
import { FaMailBulk } from "react-icons/fa";

const AdminDashboard = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);

  const adminCredentials = {
    maths: { username: "MATHS-ADMIN", password: "Maths@Securepass" },
    science: { username: "SCIENCE-ADMIN", password: "science@securepass" },
    english: { username: "ENGLISH-ADMIN", password: "english@securepass" },
  };

  // 🎛️ States
  const [isAgreed, setIsAgreed] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [inputPassword, setInputPassword] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [selectedGrade, setSelectedGrade] = useState("11");
  const [activeVault, setActiveVault] = useState("add-student");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // 💻 Laptop/Desktop Lock check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔒 1. Mobile Lock Screen
  if (isMobile) {
    return (
      <div className="admin-mobile-lock">
        <FaLaptop className="laptop" />
        <h2>
          <FaLock /> Restricted Access
        </h2>
        <p>
          For security reasons, please access this system from a laptop or
          desktop computer.
        </p>
      </div>
    );
  }

  // 🔐 2. Admin Login Handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    const currentSubject = subject ? subject.toLowerCase() : "";
    const validCredentials = adminCredentials[currentSubject];

    if (validCredentials) {
      if (
        inputUsername.trim() === validCredentials.username &&
        password.trim() === validCredentials.password
      ) {
        setIsAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError("Invalid Admin Username or Password!");
        // setIsLoading(false);
      }
    } else {
      setLoginError("Invalid Subject Dashboard Route!");
      // setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setInputUsername("");
    setPassword("");
    navigate("/");
  };

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      {!isAuthenticated ? (
        <div className="admin-login-wrapper">
          <div className="card-container">
            <div className="admin-logo">
              <FaUserShield />
            </div>
            <h2>{subject?.toUpperCase()} Faculty Login</h2>
            <p>
              Enter official management credentials to unlock database hubs.
            </p>
            <form onSubmit={handleAdminLogin} className="styled-form">
              <div className="input-group">
                <label>Admin Username</label>
                <input
                  type="text"
                  placeholder="Please Enter Your Admin User Name"
                  required
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                />
              </div>

              <PasswordField
                label=" Secret Login Password"
                placeholder="Type Your Paper-Slip Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="legal-checkbox-group">
                <input
                  className="legel-checkbox"
                  type="checkbox"
                  id="adminLegalAgree"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  style={{
                    marginRight: "6px",
                  }}
                />
                <label htmlFor="adminLegalAgree">
                  I am here as a legal obligor for data handling.
                  <Link className="legel-link" to="/terms" target="_blank">
                    Terms of Service
                  </Link>
                  &
                  <Link className="legel-link" to="/privacy" target="_blank">
                    Privacy Policy
                  </Link>
                  I have read and agree to the terms and conditions.
                </label>
              </div>

              {loginError && <p className="error-message">{loginError}</p>}

              <button
                type="submit"
                className="start-btn admin-btn"
                disabled={!isAgreed}
                style={{
                  opacity: isAgreed ? 1 : 0.5,
                  cursor: isAgreed ? "pointer" : "not-allowed",
                  transition: "0.3s",
                }}>
                Unlock Dashboard Gate
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-dashboard-wrapper">
          {/* 🏢 1. LEFT SIDEBAR */}
          <aside className="admin-sidebar">
            <div className="sidebar-header">
              <h3>{subject?.toUpperCase()} Control</h3>
              <span>Official Faculty Management</span>
            </div>

            <nav>
              <button
                onClick={() => setActiveVault("all-students")}
                style={{
                  background:
                    activeVault === "all-students" ? "#ff4b2b" : "transparent",
                }}>
                <FaUsers /> <span> All Students Vault</span>
              </button>

              <button
                onClick={() => setActiveVault("add-student")}
                style={{
                  background:
                    activeVault === "add-student" ? "#ff4b2b" : "transparent",
                }}>
                <FaUserPlus /> <span> Add Student Vault</span>
              </button>

              <button
                onClick={() => setActiveVault("notices")}
                style={{
                  background:
                    activeVault === "notices" ? "#ff4b2b" : "transparent",
                }}>
                <FaBullhorn /> <span> Class Notice Vault</span>
              </button>

              <button
                onClick={() => setActiveVault("class-shedule")}
                style={{
                  background:
                    activeVault === "class-shedule" ? "#ff4b2b" : "transparent",
                }}>
                <FaCalendarCheck /> <span> Class Schedule Vault</span>
              </button>

              <button
                onClick={() => setActiveVault("paper-upload")}
                style={{
                  background:
                    activeVault === "paper-upload" ? "#ff4b2b" : "transparent",
                }}>
                <FaFolderPlus /> <span> Paper Upload Vault</span>
              </button>

              <button
                disabled="disable"
                onClick={() => setActiveVault("mail-box")}
                style={{
                  background: "#83838369",
                  cursor: "not-allowed",
                }}>
                <FaMailBulk /> <span> Mail Box</span>
                {/* <MailBox /> */}
              </button>

              <button
                disabled="disable"
                onClick={() => setActiveVault("class-marks")}
                style={{
                  background: "#83838369",
                  cursor: "not-allowed",
                }}>
                <FaGraduationCap /> <span> Class Paper Marks</span>
              </button>

              <button
                disabled="disable"
                onClick={() => setActiveVault("payments")}
                style={{
                  background: "#83838369",
                  cursor: "not-allowed",
                }}>
                <FaMoneyCheckDollar /> <span> Payments Vault</span>
              </button>

              <button
                disabled="disable"
                onClick={() => setActiveVault("absent-mark")}
                style={{
                  background: "#83838369",
                  cursor: "not-allowed",
                }}>
                <FaUserXmark /> <span>Today's Absent Vault</span>
              </button>
            </nav>

            <button className="signout-panel" onClick={handleLogout}>
              <FaRightFromBracket className="icon" /> Sign Out Panel
            </button>
          </aside>
          {/* 💻 2. RIGHT MAIN CONTENT SCREEN (දකුණු පැත්තේ ප්‍රධාන තිරය) */}
          <main>
            {/* 👑 🆕 [THE EXCLUSIVE FIX]:  */}
            {activeVault !== "class-shedule" &&
              activeVault !== "mail-box" &&
              activeVault !== "paper-upload" && (
                <header>
                  <div className="top-content">
                    <button
                      onClick={() => setSelectedGrade("11")}
                      style={{
                        background:
                          selectedGrade === "11" ? "white" : "transparent",
                        color: selectedGrade === "11" ? "#1a0a54" : "#777",
                      }}>
                      Grade 11
                    </button>
                    <button
                      onClick={() => setSelectedGrade("10")}
                      style={{
                        background:
                          selectedGrade === "10" ? "white" : "transparent",
                        color: selectedGrade === "10" ? "#1a0a54" : "#777",
                      }}>
                      Grade 10
                    </button>
                  </div>

                  <div className="desc-content">
                    <FaFolderOpen className="open-folder" /> Managing:{" "}
                    <span>
                      Grade {selectedGrade} ({subject?.toUpperCase()})
                    </span>
                  </div>
                </header>
              )}

            {/* 📋 DYNAMIC CONTENT VIEWS  */}
            <div
              className="dynamic-content"
              style={{
                marginTop: "20px",
                height: "100vh",
                overflowY: "scroll",
              }}>
              {activeVault === "all-students" && <AllStudents />}
              {activeVault === "add-student" && (
                <AddStudentVault
                  selectedGrade={selectedGrade}
                  subject={subject}
                />
              )}

              {activeVault === "class-marks" && (
                <ClassMarksVault
                  selectedGrade={selectedGrade}
                  subject={subject}
                />
              )}

              {activeVault === "payments" && (
                <PaymentsVault
                  selectedGrade={selectedGrade}
                  subject={subject}
                />
              )}

              {activeVault === "absent-mark" && (
                <AbsentMark selectedGrade={selectedGrade} subject={subject} />
              )}

              {activeVault === "notices" && <NoticeBoard />}
              {activeVault === "class-shedule" && <ClassScheduleVault />}

              {activeVault === "paper-upload" && <PaperHubUploadVault />}
              {activeVault === "mail-box" && <MailBox />}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
