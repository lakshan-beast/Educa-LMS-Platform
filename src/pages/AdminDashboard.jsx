import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import AddStudentVault from "../components/admin/AddStudentVault";
import ClassMarksVault from "../components/admin/ClassMarksVault";
import PaymentsVault from "../components/admin/PaymentsVault";
import AbsentMark from "../components/admin/AbsentVault";
import NoticeBoard from "../components/admin/NoticeVault";
import ClassScheduleVault from "../components/admin/ClassScheduleVault";
import PaperHubUploadVault from "../components/admin/PaperHubUploadVault";

import MailBox from "../components/MailBox";

import PasswordField from "../components/PasswordField";

import {
  FaUserPlus,
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
      }
    } else {
      setLoginError("Invalid Subject Dashboard Route!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setInputUsername("");
    setPassword("");
    navigate("/");
  };

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
                  // style={{
                  //   padding: "12px",
                  //   borderRadius: "10px",
                  //   border: "1px solid #ddd",
                  // }}
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
                  // checked="checked"
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
                  </Link>{" "}
                  &
                  <Link className="legel-link" to="/privacy" target="_blank">
                    Privacy Policy
                  </Link>{" "}
                  I have read and agree to the terms and conditions.
                </label>
              </div>

              {loginError && <p className="error-message">{loginError}</p>}

              {/* 👑 Checkbox එක ටික් කරනකන් බටන් එක ඔබන්න බැරි වෙන්න Lock කර ඇත */}
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
          {/* 🏢 1. LEFT SIDEBAR (වම් පැත්තේ මෙනු තීරුව) */}
          <aside className="admin-sidebar">
            <div className="sidebar-header">
              <h3>{subject?.toUpperCase()} Control</h3>
              <span>Official Faculty Management</span>
            </div>

            <nav>
              <button
                onClick={() => setActiveVault("add-student")}
                style={{
                  background:
                    activeVault === "add-student" ? "#ff4b2b" : "transparent",
                }}>
                <FaUserPlus /> <span> Add Student Vault</span>
              </button>

              <button
                disabled="disable"
                onClick={() => setActiveVault("class-marks")}
                style={{
                  background: "grey",
                  cursor: "not-allowed",
                  // activeVault === "class-marks" ? "#ff4b2b" : "transparent",
                }}>
                <FaGraduationCap /> <span> Class Paper Marks</span>
              </button>

              <button
                onClick={() => setActiveVault("payments")}
                style={{
                  background:
                    activeVault === "payments" ? "#ff4b2b" : "transparent",
                }}>
                <FaMoneyCheckDollar /> <span> Payments Vault</span>
              </button>

              <button
                onClick={() => setActiveVault("absent-mark")}
                style={{
                  background:
                    activeVault === "absent-mark" ? "#ff4b2b" : "transparent",
                }}>
                <FaUserXmark /> <span>Today's Absent Vault</span>
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
                onClick={() => setActiveVault("mail-box")}
                style={{
                  background:
                    activeVault === "mail-box" ? "#ff4b2b" : "transparent",
                }}>
                <FaMailBulk /> <span> Mail Box</span>
                {/* <MailBox /> */}
              </button>
            </nav>

            <button className="signout-panel" onClick={handleLogout}>
              <FaRightFromBracket className="icon" /> Sign Out Panel
            </button>
          </aside>
          {/* 💻 2. RIGHT MAIN CONTENT SCREEN (දකුණු පැත්තේ ප්‍රධාන තිරය) */}
          <main>
            {/* 👑 🆕 [THE EXCLUSIVE FIX]: වෝල්ට් එක Class Schedule හෝ Paper Upload නොවන්නේ නම් පමණක් මේ මුළු හෙඩර් එකම පෙන්වයි */}
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

            {/* 📋 DYNAMIC CONTENT VIEWS (ඔබන බටන් එක අනුව පිටු මාරු වන කොටස) */}
            <div
              className="dynamic-content"
              style={{
                marginTop: "20px",
                height: "100vh",
                overflowY: "scroll",
              }}>
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

              {activeVault === "notices" && (
                <NoticeBoard selectedGrade={selectedGrade} subject={subject} />
              )}
              {activeVault === "class-shedule" && <ClassScheduleVault />}

              {activeVault === "paper-upload" && <PaperHubUploadVault />}
              {activeVault === "mail-box" && <MailBox />}
            </div>
          </main>{" "}
          {/* 👑 Fixed: අතහැරී තිබුණු main closing tag එක නිවැරදිව වැහුවා */}
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
