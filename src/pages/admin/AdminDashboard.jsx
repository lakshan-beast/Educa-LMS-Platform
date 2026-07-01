// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";

// import AllStudents from "./AllStudents";
// import AddStudentVault from "../../forms/AddStudentVault";
// import ClassMarksVault from "./ClassMarksVault";
// import PaymentsVault from "./PaymentsVault";
// import AbsentMark from "./AbsentVault";
// import NoticeBoard from "./NoticeVault";
// import ClassScheduleVault from "./ClassScheduleVault";
// import PaperHubUploadVault from "./PaperHubUploadVault";

// // import MailBox from "";

// import PasswordField from "../../components/ui/PasswordField";
// // import Loader from "../components/Loader";

// import {
//   FaUserPlus,
//   FaUsers,
//   FaGraduationCap,
//   FaMoneyCheckDollar,
//   FaUserXmark,
//   FaBullhorn,
//   FaLaptop,
//   FaRightFromBracket,
//   FaFolderOpen,
//   FaFolderPlus,
//   FaLock,
//   FaUserShield,
//   FaCalendarCheck,
// } from "react-icons/fa6";
// import { FaMailBulk } from "react-icons/fa";

// const AdminDashboard = () => {
//   const { subject } = useParams();
//   const navigate = useNavigate();
//   // const [isLoading, setIsLoading] = useState(true);

//   const adminCredentials = {
//     maths: { username: "MATHS-ADMIN", password: "Maths@Securepass" },
//     science: { username: "s", password: "s" },
//     english: { username: "e", password: "s" },
//   };

//   // 🎛️ States
//   const [isAgreed, setIsAgreed] = useState(false);
//   const [inputUsername, setInputUsername] = useState("");
//   const [password, setPassword] = useState("");
//   // const [inputPassword, setInputPassword] = useState("");

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loginError, setLoginError] = useState("");

//   const [selectedGrade, setSelectedGrade] = useState("11");
//   const [activeVault, setActiveVault] = useState("add-student");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

//   // 💻 Laptop/Desktop Lock check
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 1024);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 🔒 1. Mobile Lock Screen
//   if (isMobile) {
//     return (
//       <div className="admin-mobile-lock">
//         <FaLaptop className="laptop" />
//         <h2>
//           <FaLock /> Restricted Access
//         </h2>
//         <p>
//           For security reasons, please access this system from a laptop or
//           desktop computer.
//         </p>
//       </div>
//     );
//   }

//   // 🔐 2. Admin Login Handler
//   const handleAdminLogin = (e) => {
//     e.preventDefault();
//     const currentSubject = subject ? subject.toLowerCase() : "";
//     const validCredentials = adminCredentials[currentSubject];

//     if (validCredentials) {
//       if (
//         inputUsername.trim() === validCredentials.username &&
//         password.trim() === validCredentials.password
//       ) {
//         setIsAuthenticated(true);
//         setLoginError("");
//       } else {
//         setLoginError("Invalid Admin Username or Password!");
//         // setIsLoading(false);
//       }
//     } else {
//       setLoginError("Invalid Subject Dashboard Route!");
//       // setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setInputUsername("");
//     setPassword("");
//     navigate("/");
//   };

//   // if (isLoading) {
//   //   return <Loader />;
//   // }

//   return (
//     <>
//       {!isAuthenticated ? (
//         <div className="admin-login-wrapper">
//           <div className="card-container">
//             <div className="admin-logo">
//               <FaUserShield />
//             </div>
//             <h2>{subject?.toUpperCase()} Faculty Login</h2>
//             <p>
//               Enter official management credentials to unlock database hubs.
//             </p>
//             <form onSubmit={handleAdminLogin} className="styled-form">
//               <div className="input-group">
//                 <label>Admin Username</label>
//                 <input
//                   type="text"
//                   placeholder="Please Enter Your Admin User Name"
//                   required
//                   value={inputUsername}
//                   onChange={(e) => setInputUsername(e.target.value)}
//                 />
//               </div>

//               <PasswordField
//                 label=" Secret Login Password"
//                 placeholder="Type Your Paper-Slip Password..."
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <div className="legal-checkbox-group">
//                 <input
//                   className="legel-checkbox"
//                   type="checkbox"
//                   id="adminLegalAgree"
//                   checked={isAgreed}
//                   onChange={(e) => setIsAgreed(e.target.checked)}
//                   style={{
//                     marginRight: "6px",
//                   }}
//                 />
//                 <label htmlFor="adminLegalAgree">
//                   I am here as a legal obligor for data handling.
//                   <Link className="legel-link" to="/terms" target="_blank">
//                     Terms of Service
//                   </Link>
//                   &
//                   <Link className="legel-link" to="/privacy" target="_blank">
//                     Privacy Policy
//                   </Link>
//                   I have read and agree to the terms and conditions.
//                 </label>
//               </div>

//               {loginError && <p className="error-message">{loginError}</p>}

//               <button
//                 type="submit"
//                 className="start-btn admin-btn"
//                 disabled={!isAgreed}
//                 style={{
//                   opacity: isAgreed ? 1 : 0.5,
//                   cursor: isAgreed ? "pointer" : "not-allowed",
//                   transition: "0.3s",
//                 }}>
//                 Unlock Dashboard Gate
//               </button>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <div className="admin-dashboard-wrapper">
//           {/* 🏢 1. LEFT SIDEBAR */}
//           <aside className="admin-sidebar">
//             <div className="sidebar-header">
//               <h3>{subject?.toUpperCase()} Control</h3>
//               <span>Official Faculty Management</span>
//             </div>

//             <nav>
//               <button
//                 onClick={() => setActiveVault("all-students")}
//                 style={{
//                   background:
//                     activeVault === "all-students" ? "#ff4b2b" : "transparent",
//                 }}>
//                 <FaUsers /> <span> All Students Vault</span>
//               </button>

//               <button
//                 onClick={() => setActiveVault("add-student")}
//                 style={{
//                   background:
//                     activeVault === "add-student" ? "#ff4b2b" : "transparent",
//                 }}>
//                 <FaUserPlus /> <span> Add Student Vault</span>
//               </button>

//               <button
//                 onClick={() => setActiveVault("notices")}
//                 style={{
//                   background:
//                     activeVault === "notices" ? "#ff4b2b" : "transparent",
//                 }}>
//                 <FaBullhorn /> <span> Class Notice Vault</span>
//               </button>

//               <button
//                 onClick={() => setActiveVault("class-shedule")}
//                 style={{
//                   background:
//                     activeVault === "class-shedule" ? "#ff4b2b" : "transparent",
//                 }}>
//                 <FaCalendarCheck /> <span> Class Schedule Vault</span>
//               </button>

//               <button
//                 onClick={() => setActiveVault("paper-upload")}
//                 style={{
//                   background:
//                     activeVault === "paper-upload" ? "#ff4b2b" : "transparent",
//                 }}>
//                 <FaFolderPlus /> <span> Paper Upload Vault</span>
//               </button>

//               <button
//                 disabled="disable"
//                 onClick={() => setActiveVault("mail-box")}
//                 style={{
//                   background: "#83838369",
//                   cursor: "not-allowed",
//                 }}>
//                 <FaMailBulk /> <span> Mail Box</span>
//                 {/* <MailBox /> */}
//               </button>

//               <button
//                 disabled="disable"
//                 onClick={() => setActiveVault("class-marks")}
//                 style={{
//                   background: "#83838369",
//                   cursor: "not-allowed",
//                 }}>
//                 <FaGraduationCap /> <span> Class Paper Marks</span>
//               </button>

//               <button
//                 disabled="disable"
//                 onClick={() => setActiveVault("payments")}
//                 style={{
//                   background: "#83838369",
//                   cursor: "not-allowed",
//                 }}>
//                 <FaMoneyCheckDollar /> <span> Payments Vault</span>
//               </button>

//               <button
//                 disabled="disable"
//                 onClick={() => setActiveVault("absent-mark")}
//                 style={{
//                   background: "#83838369",
//                   cursor: "not-allowed",
//                 }}>
//                 <FaUserXmark /> <span>Today's Absent Vault</span>
//               </button>
//             </nav>

//             <button className="signout-panel" onClick={handleLogout}>
//               <FaRightFromBracket className="icon" /> Sign Out Panel
//             </button>
//           </aside>
//           {/* 💻 2. RIGHT MAIN CONTENT SCREEN (දකුණු පැත්තේ ප්‍රධාන තිරය) */}
//           <main>
//             {/* 👑 🆕 [THE EXCLUSIVE FIX]:
//             {activeVault !== "class-shedule" &&
//               activeVault !== "mail-box" &&
//               activeVault !== "all-students" &&
//               activeVault !== "notices" &&
//               activeVault !== "paper-upload" && (
//                 <header>
//                   <div className="top-content">
//                     <button
//                       onClick={() => setSelectedGrade("11")}
//                       style={{
//                         background:
//                           selectedGrade === "11" ? "white" : "transparent",
//                         color: selectedGrade === "11" ? "#1a0a54" : "#777",
//                       }}>
//                       Grade 11
//                     </button>
//                     <button
//                       onClick={() => setSelectedGrade("10")}
//                       style={{
//                         background:
//                           selectedGrade === "10" ? "white" : "transparent",
//                         color: selectedGrade === "10" ? "#1a0a54" : "#777",
//                       }}>
//                       Grade 10
//                     </button>
//                   </div>

//                   <div className="desc-content">
//                     <FaFolderOpen className="open-folder" /> Managing:{" "}
//                     <span>
//                       Grade {selectedGrade} ({subject?.toUpperCase()})
//                     </span>
//                   </div>
//                 </header>
//               )}

//             {/* 📋 DYNAMIC CONTENT VIEWS  */}
//             <div
//               className="dynamic-content"
//               style={{
//                 marginTop: "20px",
//                 height: "100vh",
//                 overflowY: "scroll",
//               }}>
//               {activeVault === "add-student" && (
//                 <AddStudentVault
//                   selectedGrade={selectedGrade}
//                   subject={subject}
//                 />
//               )}
//               {activeVault === "notices" && <NoticeBoard />}
//               {activeVault === "class-shedule" && <ClassScheduleVault />}

//               {activeVault === "paper-upload" && <PaperHubUploadVault />}
//               {/* {activeVault === "mail-box" && <MailBox />} */}

//               {activeVault === "all-students" && (
//                 <AllStudents selectedGrade={selectedGrade} subject={subject} />
//               )}

//               {activeVault === "class-marks" && (
//                 <ClassMarksVault
//                   selectedGrade={selectedGrade}
//                   subject={subject}
//                 />
//               )}

//               {activeVault === "payments" && (
//                 <PaymentsVault
//                   selectedGrade={selectedGrade}
//                   subject={subject}
//                 />
//               )}

//               {activeVault === "absent-mark" && (
//                 <AbsentMark selectedGrade={selectedGrade} subject={subject} />
//               )}
//             </div>
//           </main>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdminDashboard;

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import {
//   FaUsers,
//   FaBullhorn,
//   FaFilePdf,
//   // FaCalendarCheck,
//   FaChartLine,
// } from "react-icons/fa6";

// const AdminDashboard = () => {
//   const { subject } = useParams();
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   // 📈 Firestore එකෙන් සැබෑ දත්ත ප්‍රමාණයන් (Metrics) ගණනය කර ලෝඩ් කිරීම [INDEX 51]
//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       try {
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching dashboard metrics:", error);
//         setIsLoading(false);
//       }
//     };
//     fetchDashboardMetrics();
//   }, [subject]);

//   return (
//     <div
//       className="admin-analytics-dashboard"
//       style={{ animation: "fadeIn 0.5s ease" }}>
//       {/* 📊 TOP WELCOME HERO MATRIX */}
//       <div
//         className="dashboard-welcome-banner"
//         style={{
//           background: "linear-gradient(135deg, #001b42 0%, #002b66 100%)",
//           color: "white",
//           padding: "30px",
//           borderRadius: "12px",
//           marginBottom: "30px",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//         }}>
//         <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>
//           Welcome to {subject?.toUpperCase()} Analytics Core
//         </h1>
//         <p style={{ margin: "5px 0 0 0", opacity: 0.8, fontSize: "0.95rem" }}>
//           Monitor student performance, class schedules, and publish critical
//           notices in real-time [INDEX 51].
//         </p>
//       </div>

//       {/* 🎛️ HIGH-DENSITY METRICS GRID CARD */}
//       <div
//         className="metrics-cards-grid"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//           gap: "20px",
//           marginBottom: "30px",
//         }}>
//         {/* Card 1: Active Enrolled Students */}
//         <div
//           className="metric-card"
//           style={{
//             background: "white",
//             padding: "25px",
//             borderRadius: "10px",
//             boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
//             borderLeft: "4px solid #0056ff",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}>
//           <div>
//             <span
//               style={{
//                 color: "#8b949e",
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//               }}>
//               Enrolled Students
//             </span>
//             <h2
//               style={{
//                 margin: "5px 0 0 0",
//                 fontSize: "1.8rem",
//                 color: "#001b42",
//               }}>
//               245
//             </h2>
//           </div>
//           <div
//             style={{
//               background: "#eef2ff",
//               color: "#0056ff",
//               padding: "15px",
//               borderRadius: "50%",
//               fontSize: "1.3rem",
//               display: "flex",
//             }}>
//             <FaUsers />
//           </div>
//         </div>

//         {/* Card 2: Active Class Notices */}
//         <div
//           className="metric-card"
//           style={{
//             background: "white",
//             padding: "25px",
//             borderRadius: "10px",
//             boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
//             borderLeft: "4px solid #ff9900",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}>
//           <div>
//             <span
//               style={{
//                 color: "#8b949e",
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//               }}>
//               Live Notices
//             </span>
//             <h2
//               style={{
//                 margin: "5px 0 0 0",
//                 fontSize: "1.8rem",
//                 color: "#001b42",
//               }}>
//               12
//             </h2>
//           </div>
//           <div
//             style={{
//               background: "#fff7ed",
//               color: "#ff9900",
//               padding: "15px",
//               borderRadius: "50%",
//               fontSize: "1.3rem",
//               display: "flex",
//             }}>
//             <FaBullhorn />
//           </div>
//         </div>

//         {/* Card 3: Deployed Exam Papers */}
//         <div
//           className="metric-card"
//           style={{
//             background: "white",
//             padding: "25px",
//             borderRadius: "10px",
//             boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
//             borderLeft: "4px solid #10b981",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}>
//           <div>
//             <span
//               style={{
//                 color: "#8b949e",
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//               }}>
//               Uploaded Papers
//             </span>
//             <h2
//               style={{
//                 margin: "5px 0 0 0",
//                 fontSize: "1.8rem",
//                 color: "#001b42",
//               }}>
//               34
//             </h2>
//           </div>
//           <div
//             style={{
//               background: "#ecfdf5",
//               color: "#10b981",
//               padding: "15px",
//               borderRadius: "50%",
//               fontSize: "1.3rem",
//               display: "flex",
//             }}>
//             <FaFilePdf />
//           </div>
//         </div>
//       </div>

//       {/* 📈 SYSTEM OVERVIEW PLATFORM CARD */}
//       <div
//         className="system-status-panel"
//         style={{
//           background: "white",
//           padding: "30px",
//           borderRadius: "12px",
//           boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
//           display: "flex",
//           flexDirection: "column",
//           gap: "15px",
//         }}>
//         <h3
//           style={{
//             margin: 0,
//             color: "#001b42",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}>
//           <FaChartLine /> Institutional Live Infrastructure
//         </h3>
//         <p
//           style={{
//             margin: 0,
//             color: "#484848",
//             fontSize: "0.95rem",
//             lineHeight: "1.6",
//           }}>
//           Use the left sidebar navigation matrix to manage full student data
//           vaults, configure dynamic class schedules, or upload new model paper
//           tutes. All data updates will instantly reflect on the student
//           terminals via Firebase Cloud handlers [INDEX 4, 51].
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import { FaUsers, FaBullhorn, FaFilePdf, FaChartLine } from "react-icons/fa6";

// const AdminDashboard = () => {
//   const { subject } = useParams();
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [totalNotices, setTotalNotices] = useState(0);
//   const [totalPapers, setTotalPapers] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       setIsLoading(true);
//       try {
//         // 📊 1. Firebase එකෙන් සැබෑ ශිෂ්‍ය සංඛ්‍යාව ලබා ගැනීම [1]
//         const studentSnapshot = await getDocs(collection(db, "students"));
//         setTotalStudents(studentSnapshot.size);

//         // 📢 2. Firebase එකෙන් සැබෑ නිවේදන (Notices) සංඛ්‍යාව ලබා ගැනීම [1]
//         const noticeSnapshot = await getDocs(collection(db, "notices"));
//         setTotalNotices(noticeSnapshot.size);

//         // 📄 3. Firebase එකෙන් සැබෑ ප්‍රශ්න පත්‍ර (Papers) සංඛ්‍යාව ලබා ගැනීම [1]
//         const paperSnapshot = await getDocs(collection(db, "papers"));
//         setTotalPapers(paperSnapshot.size);
//       } catch (error) {
//         console.error("Error fetching dashboard metrics from Firebase:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardMetrics();
//   }, [subject]);

//   if (isLoading) {
//     return (
//       <div
//         className="admin-loading-state"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "50vh",
//           color: "#001b42",
//           fontWeight: "bold",
//         }}>
//         Streaming Live Operational Metrics from Cloud Ledger...
//       </div>
//     );
//   }

//   return (
//     <div
//       className="admin-analytics-dashboard"
//       style={{ animation: "fadeIn 0.5s ease" }}>
//       {/* 📊 TOP WELCOME HERO MATRIX */}
//       <div
//         className="dashboard-welcome-banner"
//         style={{
//           background: "linear-gradient(135deg, #001b42 0%, #002b66 100%)",
//           color: "white",
//           padding: "30px",
//           borderRadius: "12px",
//           marginBottom: "30px",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//         }}>
//         <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>
//           Welcome to {subject?.toUpperCase()} Analytics Core
//         </h1>
//         <p style={{ margin: "5px 0 0 0", opacity: 0.8, fontSize: "0.95rem" }}>
//           Monitor student performance, class schedules, and publish critical
//           notices in real-time [1].
//         </p>
//       </div>

//       {/* 🎛️ HIGH-DENSITY METRICS GRID CARD */}
//       <div
//         className="metrics-cards-grid"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//           gap: "20px",
//           marginBottom: "30px",
//         }}>
//         {/* Card 1: Active Enrolled Students */}
//         <div
//           className="metric-card"
//           style={{
//             background: "white",
//             padding: "25px",
//             borderRadius: "10px",
//             boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
//             borderLeft: "4px solid #0056ff",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}>
//           <div>
//             <span
//               style={{
//                 color: "#8b949e",
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//               }}>
//               Enrolled Students
//             </span>
//             <h2
//               style={{
//                 margin: "5px 0 0 0",
//                 fontSize: "1.8rem",
//                 color: "#001b42",
//               }}>
//               {totalStudents}
//             </h2>
//           </div>
//           <div
//             style={{
//               background: "#eef2ff",
//               color: "#0056ff",
//               padding: "15px",
//               borderRadius: "50%",
//               fontSize: "1.3rem",
//               display: "flex",
//             }}>
//             <FaUsers />
//           </div>
//         </div>

//         {/* Card 2: Active Class Notices */}
//         <div
//           className="metric-card"
//           style={{
//             background: "white",
//             padding: "25px",
//             borderRadius: "10px",
//             boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
//             borderLeft: "4px solid #ff9900",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}>
//           <div>
//             <span
//               style={{
//                 color: "#8b949e",
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//               }}>
//               Live Notices
//             </span>
//             <h2
//               style={{
//                 margin: "5px 0 0 0",
//                 fontSize: "1.8rem",
//                 color: "#001b42",
//               }}>
//               {totalNotices}
//             </h2>
//           </div>
//           <div
//             style={{
//               background: "#fff7ed",
//               color: "#ff9900",
//               padding: "15px",
//               borderRadius: "50%",
//               fontSize: "1.3rem",
//               display: "flex",
//             }}>
//             <FaBullhorn />
//           </div>
//         </div>

//         {/* Card 3: Deployed Exam Papers */}
//         <div
//           className="metric-card"
//           style={{
//             background: "white",
//             padding: "25px",
//             borderRadius: "10px",
//             boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
//             borderLeft: "4px solid #10b981",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}>
//           <div>
//             <span
//               style={{
//                 color: "#8b949e",
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//               }}>
//               Uploaded Papers
//             </span>
//             <h2
//               style={{
//                 margin: "5px 0 0 0",
//                 fontSize: "1.8rem",
//                 color: "#001b42",
//               }}>
//               {totalPapers}
//             </h2>
//           </div>
//           <div
//             style={{
//               background: "#ecfdf5",
//               color: "#10b981",
//               padding: "15px",
//               borderRadius: "50%",
//               fontSize: "1.3rem",
//               display: "flex",
//             }}>
//             <FaFilePdf />
//           </div>
//         </div>
//       </div>

//       {/* 📈 SYSTEM OVERVIEW PLATFORM CARD */}
//       <div
//         className="system-status-panel"
//         style={{
//           background: "white",
//           padding: "30px",
//           borderRadius: "12px",
//           boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
//           display: "flex",
//           flexDirection: "column",
//           gap: "15px",
//         }}>
//         <h3
//           style={{
//             margin: 0,
//             color: "#001b42",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}>
//           <FaChartLine /> Institutional Live Infrastructure
//         </h3>
//         <p
//           style={{
//             margin: 0,
//             color: "#484848",
//             fontSize: "0.95rem",
//             lineHeight: "1.6",
//           }}>
//           Use the left sidebar navigation matrix to manage full student data
//           vaults, configure dynamic class schedules, or upload new model paper
//           tutes. All data updates will instantly reflect on the student
//           terminals via Firebase Cloud handlers [1].
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { FaUsers, FaCalendarDays, FaChartPie, FaClock } from "react-icons/fa6";

const AdminDashboard = () => {
  const { subject } = useParams();
  const [totalStudents, setTotalStudents] = useState(0);
  const [genderData, setGenderData] = useState([
    { name: "Boys", value: 0 },
    { name: "Girls", value: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // 🗓️ Static Weekly Workflows - සතියේ දවස්වල පන්ති පැවැත්වෙන හැටි පෙන්වීමට
  const weeklySchedules = [
    { day: "Monday", time: "04:00 PM - 06:00 PM", class: "Grade 10 Theory" },
    { day: "Wednesday", time: "03:30 PM - 06:00 PM", class: "Grade 11 Theory" },
    {
      day: "Friday",
      time: "04:00 PM - 07:00 PM",
      class: "Grade 11 Paper Class",
    },
    {
      day: "Sunday",
      time: "08:00 AM - 12:00 PM",
      class: "O/L Master Revision",
    },
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      try {
        // 📊 1. Firebase එකෙන් සැබෑ ශිෂ්‍ය ලේඛනය ඇදලා ගැනීම [INDEX 51]
        const studentSnapshot = await getDocs(collection(db, "students"));
        const studentsList = studentSnapshot.docs.map((doc) => doc.data());

        setTotalStudents(studentsList.length);

        // 👦👧 2. Gender (Boys/Girls) ප්‍රමාණයන් වෙන් කර ගණනය කිරීම
        let boysCount = 0;
        let girlsCount = 0;

        studentsList.forEach((student) => {
          // ලියාපදිංචි වෙද්දී gender එක 'Male' හෝ 'Boy' නම්
          if (
            student.gender?.toLowerCase() === "male" ||
            student.gender?.toLowerCase() === "boy"
          ) {
            boysCount++;
          } else {
            girlsCount++; // නැතහොත් 'Female'/'Girl' ලෙස ගනී
          }
        });

        // 🛠️ චාට් එකට දත්ත සෙට් කිරීම
        setGenderData([
          { name: "Boys", value: boysCount || 0 },
          { name: "Girls", value: girlsCount || 0 },
        ]);
      } catch (error) {
        console.error("Dashboard database hydration error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [subject]);

  const COLORS = ["#0056ff", "#ff4bb4"]; // 🔵 Boys / 🔴 Girls පාටවල්

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          color: "#001b42",
          fontWeight: "bold",
        }}>
        Streaming Live Corporate Metrics from Cloud Ledger...
      </div>
    );
  }

  return (
    <div
      className="admin-analytics-dashboard"
      style={{
        animation: "fadeIn 0.5s ease",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}>
      {/* 👑 TOP HERO BANNER */}
      <div
        style={{
          background: "linear-gradient(135deg, #001b42 0%, #002b66 100%)",
          color: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}>
        <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>
          Welcome to {subject?.toUpperCase()} Faculty Core
        </h1>
        <p style={{ margin: "5px 0 0 0", opacity: 0.8, fontSize: "0.95rem" }}>
          Live institutional overview, gender distributions, and weekly
          operational loops.
        </p>
      </div>

      {/* 🎛️ MIDDLE LAYER: COUNTER + BURGER (DONUT) CHART */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
        }}>
        {/* Total Students Numeric Metrics Card */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
            borderLeft: "5px solid #0056ff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#8b949e",
            }}>
            <FaUsers style={{ fontSize: "1.4rem", color: "#0056ff" }} />
            <span
              style={{
                fontSize: "0.9rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}>
              Total Registered Students
            </span>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "3rem",
              color: "#001b42",
              fontWeight: "bold",
            }}>
            {totalStudents}
          </h2>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#8b949e" }}>
            Active subscribers verified within the database environment [INDEX
            51].
          </p>
        </div>

        {/* Total Students by Gender (Donut Chart Panel) */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}>
          <h3
            style={{
              margin: 0,
              color: "#001b42",
              fontSize: "1.05rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            <FaChartPie style={{ color: "#ff4bb4" }} /> Demographics (Gender
            Share)
          </h3>

          <div style={{ width: "100%", height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60} // 🍩 Donut එකක් වීමට innerRadius දැම්මා
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value">
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🗓️ BOTTOM LAYER: WEEKLY SCHEDULE MATRIX GRID */}
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
        }}>
        <h3
          style={{
            margin: "0 0 20px 0",
            color: "#001b42",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
          <FaCalendarDays style={{ color: "#0056ff" }} /> Core Weekly
          Operational Schedules
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
          }}>
          {weeklySchedules.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#f8faff",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #eef2ff",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}>
              <span
                style={{
                  color: "#0056ff",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                }}>
                {item.day}
              </span>
              <strong style={{ color: "#001b42", fontSize: "1.05rem" }}>
                {item.class}
              </strong>
              <small
                style={{
                  color: "#8b949e",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "5px",
                }}>
                <FaClock /> {item.time}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
