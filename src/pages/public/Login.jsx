// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { db } from "../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";

// import PasswordField from "../../components/ui/PasswordField";

// const Login = () => {
//   const [studentId, setStudentId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("isLoggedIn") === "true") {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const cleanId = studentId.trim().toUpperCase();
//     const cleanPassword = password.trim();

//     try {
//       const q = query(collection(db, "students"), where("id", "==", cleanId));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const studentDoc = querySnapshot.docs[0];
//         const studentData = studentDoc.data();

//         if (studentData.password === cleanPassword) {
//           localStorage.setItem("user_id", cleanId);
//           localStorage.setItem("isLoggedIn", "true");
//           localStorage.setItem("studentUser", JSON.stringify(studentData));

//           const idParts = cleanId.split("-");
//           const subjectCode = idParts[1] || "M";
//           localStorage.setItem("user_subjects", subjectCode);

//           navigate("/dashboard");
//           window.location.reload();
//         } else {
//           setError("Incorrect Password!");
//         }
//       } else {
//         setError(
//           "Your ID is Not Approved or Invalid! Please check with your class card marker.",
//         );
//       }
//     } catch (err) {
//       console.error("Firebase Login Error:", err);
//       setError(
//         "A technical error occurred while logging in! Please try again.",
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="card-container login-card">
//       <img
//         src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f989/512.gif"
//         alt="live-emoji"
//         style={{
//           width: "90px",
//           height: "90px",
//           zIndex: "9999",
//           position: "absolute",
//           top: "25%",
//           left: "73%",
//           objectFit: "contain",
//         }}
//       />

//       <h2>Student Login Portal </h2>
//       <p>Enter your approved student ID and PIN to enter the dashboard.</p>

//       <form onSubmit={handleLogin} className="styled-form">
//         <div className="input-group">
//           <label>Your Smart Student ID</label>
//           <input
//             type="text"
//             placeholder="Enter your Verified Student ID..."
//             required
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//           />
//         </div>

//         <PasswordField
//           label=" Secret Login Password"
//           placeholder="Type Your Secret Password..."
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && (
//           <p style={{ color: "red", fontSize: "0.85rem", marginTop: "5px" }}>
//             {error}
//           </p>
//         )}

//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? "Logging..." : "Access Dashboard"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import PasswordField from "../../components/ui/PasswordField";

// const Login = () => {
//   const [studentId, setStudentId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // 🔐 දැනටමත් ලොග් වී ඇත්නම් ස්වයංක්‍රීයව අදාළ තැනට හරවා යැවීම [INDEX 4]
//     if (localStorage.getItem("isLoggedIn") === "true") {
//       navigate("/dashboard");
//     } else if (localStorage.getItem("isAdminLoggedIn") === "true") {
//       const activeFaculty =
//         localStorage.getItem("admin_faculty_subject") || "maths";
//       navigate(`/admin/${activeFaculty}/dashboard`);
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const cleanId = studentId.trim().toUpperCase();
//     const cleanPassword = password.trim();

//     try {
//       // ==========================================================================
//       // 👑 1. ADMIN / TEACHER LOGIN ROUTE (ID එක ADM- වලින් පටන් ගන්නේ නම්)
//       // ==========================================================================
//       if (cleanId.startsWith("ADM-")) {
//         const adminQuery = query(
//           collection(db, "admins"),
//           where("id", "==", cleanId),
//         );
//         const adminSnapshot = await getDocs(adminQuery);

//         if (!adminSnapshot.empty) {
//           // 🛠️ FIX: [0] දමා නිවැරදිව පළමු Document එක ලබා ගැනීම සිදුකළා
//           const adminDoc = adminSnapshot.docs[0];
//           const adminData = adminDoc.data();

//           if (adminData.password === cleanPassword) {
//             // Admin සෙෂන් එක සුරක්ෂිතව තබා ගැනීම [INDEX 4]
//             localStorage.setItem("isAdminLoggedIn", "true");
//             localStorage.setItem(
//               "admin_auth_token",
//               "SECURE_ADMIN_TOKEN_" + Date.now(),
//             );

//             // URL එක dynamic හැදීමට සර්ගේ විෂය (maths/science) database එකෙන් ගනී [INDEX 4, 51]
//             const facultySubject = adminData.subject
//               ? adminData.subject.toLowerCase()
//               : "maths";
//             localStorage.setItem("admin_faculty_subject", facultySubject);

//             // 🚀 පිටුව reload නොවී සැනින් Admin Sidebar එකට රීඩිරෙක්ට් වේ! [INDEX 4]
//             navigate(`/admin/${facultySubject}/dashboard`);
//             setLoading(false);
//             return; // 👈 මෙතනින්ම ලොගින් ලොජික් එක නවත්වනවා
//           } else {
//             setError("Incorrect Admin Password!");
//             setLoading(false);
//             return;
//           }
//         } else {
//           setError("Access Denied! Invalid Administrator Credentials.");
//           setLoading(false);
//           return;
//         }
//       }

//       // ==========================================================================
//       // 👦 2. STANDARD STUDENT LOGIN ROUTE (සාමාන්‍ය ශිෂ්‍ය ලොගින් එක)
//       // ==========================================================================
//       const studentQuery = query(
//         collection(db, "students"),
//         where("id", "==", cleanId),
//       );
//       const studentSnapshot = await getDocs(studentQuery);

//       if (!studentSnapshot.empty) {
//         // 🛠️ FIX: [0] දමා නිවැරදිව පළමු Document එක ලබා ගැනීම සිදුකළා
//         const studentDoc = studentSnapshot.docs[0];
//         const studentData = studentDoc.data();

//         if (studentData.password === cleanPassword) {
//           localStorage.setItem("user_id", cleanId);
//           localStorage.setItem("isLoggedIn", "true");
//           localStorage.setItem("studentUser", JSON.stringify(studentData));

//           // 🛠️ ඔයාගේ අලුත් ID Format එකෙන් (EDU-MES-11-...) විෂය කේතය (MES) වෙන් කරගැනීම [INDEX 4]
//           const idParts = cleanId.split("-");
//           const subjectCode = idParts[1] || "MES";
//           localStorage.setItem("user_subjects", subjectCode);

//           // 🚀 පිටුව reload කිරීම් කිසිවක් නැත! React State එකෙන්ම Dashboard එකට යයි [INDEX 4]
//           navigate("/dashboard");
//         } else {
//           setError("Incorrect Password!");
//         }
//       } else {
//         setError(
//           "Your ID is Not Approved or Invalid! Please check with your class card marker.",
//         );
//       }
//     } catch (err) {
//       console.error("Firebase Security Authentication Error:", err);
//       setError(
//         "A technical error occurred while logging in! Please try again.",
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="card-container login-card">
//       <img
//         src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f989/512.gif"
//         alt="live-emoji"
//         style={{
//           width: "90px",
//           height: "90px",
//           zIndex: "9999",
//           position: "absolute",
//           top: "25%",
//           left: "73%",
//           objectFit: "contain",
//         }}
//       />

//       <h2>Student Login Portal </h2>
//       <p>Enter your approved student ID and PIN to enter the dashboard.</p>

//       <form onSubmit={handleLogin} className="styled-form">
//         <div className="input-group">
//           <label>Your Smart Student ID</label>
//           <input
//             type="text"
//             placeholder="Enter your Verified Student ID..."
//             required
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//           />
//         </div>

//         <PasswordField
//           label=" Secret Login Password"
//           placeholder="Type Your Secret Password..."
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && (
//           <p style={{ color: "red", fontSize: "0.85rem", marginTop: "5px" }}>
//             {error}
//           </p>
//         )}

//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? "Logging..." : "Access Dashboard"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import PasswordField from "../../components/ui/PasswordField";

// const Login = () => {
//   // 🎛️ NEW: STUDENT සහ STAFF වෙන් කරන ACTIVE TAB STATE
//   const [activeTab, setActiveTab] = useState("student"); // student | staff [INDEX 4]
//   const [studentId, setStudentId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // 🔐 දැනටමත් ලොග් වී ඇත්නම් ස්වයංක්‍රීයව අදාළ තැනට හරවා යැවීම [INDEX 4]
//     if (localStorage.getItem("isLoggedIn") === "true") {
//       navigate("/dashboard");
//     } else if (localStorage.getItem("isStaffLoggedIn") === "true") {
//       // 👑 STAFF කෙනෙක් නම් කෙලින්ම ගිල්ඩ් චැට් එකට හරවා යවයි! [INDEX 4]
//       const staffSubject =
//         localStorage.getItem("admin_faculty_subject") || "maths";
//       navigate(`/student/${staffSubject}/guild-chat`);
//     } else if (localStorage.getItem("isAdminLoggedIn") === "true") {
//       const activeFaculty =
//         localStorage.getItem("admin_faculty_subject") || "maths";
//       navigate(`/admin/${activeFaculty}/dashboard`);
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const cleanId = studentId.trim().toUpperCase();
//     const cleanPassword = password.trim();

//     try {
//       // ==========================================================================
//       // 👑 1. ADMIN / TEACHER LOGIN ROUTE (ID එක ADM- වලින් පටන් ගන්නේ නම්)
//       // ==========================================================================
//       if (cleanId.startsWith("ADM-")) {
//         const adminQuery = query(
//           collection(db, "admins"),
//           where("id", "==", cleanId),
//         );
//         const adminSnapshot = await getDocs(adminQuery);

//         if (!adminSnapshot.empty) {
//           const adminDoc = adminSnapshot.docs[0];
//           const adminData = adminDoc.data();

//           if (adminData.password === cleanPassword) {
//             localStorage.setItem("isAdminLoggedIn", "true");
//             localStorage.setItem(
//               "admin_auth_token",
//               "SECURE_ADMIN_TOKEN_" + Date.now(),
//             );
//             const facultySubject = adminData.subject
//               ? adminData.subject.toLowerCase()
//               : "maths";
//             localStorage.setItem("admin_faculty_subject", facultySubject);

//             navigate(`/admin/${facultySubject}/dashboard`);
//             setLoading(false);
//             return;
//           } else {
//             setError("Incorrect Admin Password!");
//             setLoading(false);
//             return;
//           }
//         } else {
//           setError("Access Denied! Invalid Administrator Credentials.");
//           setLoading(false);
//           return;
//         }
//       }

//       // ==========================================================================
//       // 🔒 2. NEW STAFF & MENTORS LOGIN SYSTEM (STAFF TAB එක ACTIVE නම්) [INDEX 4]
//       // ==========================================================================
//       if (activeTab === "staff") {
//         const staffQuery = query(
//           collection(db, "guild_staff"),
//           where("secureId", "==", cleanId),
//         );
//         const staffSnapshot = await getDocs(staffQuery);

//         if (!staffSnapshot.empty) {
//           const staffDoc = staffSnapshot.docs[0];
//           const staffData = staffDoc.data();

//           if (staffData.password === cleanPassword) {
//             // 👑 STAFF සඳහා විශේෂිත SESSION KEY-LOCKS [INDEX 4]
//             localStorage.setItem("isStaffLoggedIn", "true");
//             localStorage.setItem("student_name", staffData.fullName); // 👈 සැබෑ නම ලොක් කරයි!
//             localStorage.setItem("student_role", staffData.role); // teacher | mentor

//             const staffSubject = staffData.subject
//               ? staffData.subject.toLowerCase()
//               : "maths";
//             localStorage.setItem("admin_faculty_subject", staffSubject);
//             // 🚀 කිසිම ඩෑෂ්බෝඩ් එකකට රස්තියාදු නොකර කෙලින්ම Guild Chat එකට පන්නයි! [INDEX 4]
//             navigate(`/student/${staffSubject}/guild-chat`);
//             setLoading(false);
//             return;
//           } else {
//             setError("Incorrect Staff Portal Password!");
//             setLoading(false);
//             return;
//           }
//         } else {
//           setError(
//             "Invalid Staff Identifier Credentials! Check with main administrator.",
//           );
//           setLoading(false);
//           return;
//         }
//       }

//       // ==========================================================================
//       // 👦 3. STANDARD STUDENT LOGIN ROUTE (සාමාන්‍ය ශිෂ්‍ය ලොගින් එක)
//       // ==========================================================================
//       const studentQuery = query(
//         collection(db, "students"),
//         where("id", "==", cleanId),
//       );
//       const studentSnapshot = await getDocs(studentQuery);

//       if (!studentSnapshot.empty) {
//         const studentDoc = studentSnapshot.docs[0];
//         const studentData = studentDoc.data();

//         if (studentData.password === cleanPassword) {
//           localStorage.setItem("user_id", cleanId);
//           localStorage.setItem("isLoggedIn", "true");
//           localStorage.setItem("studentUser", JSON.stringify(studentData));
//           localStorage.setItem("student_name", studentData.name); // 👈 චැට් බග් එක සදාකාලිකවම මෙතනින් හැදුවා! [INDEX 4]
//           localStorage.setItem("student_role", "student");

//           const idParts = cleanId.split("-");
//           const subjectCode = idParts[1] || "MES";
//           localStorage.setItem("user_subjects", subjectCode);

//           navigate("/dashboard");
//         } else {
//           setError("Incorrect Password!");
//         }
//       } else {
//         setError(
//           "Your ID is Not Approved or Invalid! Please check with your class card marker.",
//         );
//       }
//     } catch (err) {
//       console.error("Firebase Security Authentication Error:", err);
//       setError(
//         "A technical error occurred while logging in! Please try again.",
//       );
//     }

//     setLoading(false);
//   };
//   return (
//     <div className="card-container login-card" style={{ position: "relative" }}>
//       <img
//         src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f989/512.gif"
//         alt="live-emoji"
//         style={{
//           width: "90px",
//           height: "90px",
//           zIndex: "9999",
//           position: "absolute",
//           top: "40%",
//           left: "73%",
//           objectFit: "contain",
//         }}
//       />

//       {/* 🎛️ 1. NEW: DUAL PORTAL NAVIGATION SWITCHER TABS [INDEX 4] */}
//       <div
//         className="portal-tab-switcher-row"
//         style={{
//           display: "flex",
//           gap: "10px",
//           background: "#f4f6fa",
//           padding: "6px",
//           borderRadius: "10px",
//           marginBottom: "25px",
//           border: "1px solid #eef2ff",
//         }}>
//         <button
//           type="button"
//           onClick={() => {
//             setActiveTab("student");
//             setError("");
//           }}
//           style={{
//             flex: 1,
//             padding: "10px",
//             border: "none",
//             borderRadius: "8px",
//             fontWeight: "bold",
//             fontSize: "0.85rem",
//             cursor: "pointer",
//             transition: "0.2s",
//             background: activeTab === "student" ? "#0056ff" : "transparent",
//             color: activeTab === "student" ? "white" : "#001b42",
//           }}>
//            Student Entry
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             setActiveTab("staff");
//             setError("");
//           }}
//           style={{
//             flex: 1,
//             padding: "10px",
//             border: "none",
//             borderRadius: "8px",
//             fontWeight: "bold",
//             fontSize: "0.85rem",
//             cursor: "pointer",
//             transition: "0.2s",
//             background: activeTab === "staff" ? "#ff9900" : "transparent",
//             color: activeTab === "staff" ? "white" : "#001b42",
//           }}>
//            Staff & Mentors Gate
//         </button>
//       </div>

//       {/* 📢 DYNAMIC HEADINGS LOOP BASE ON TAB SELECTION [INDEX 4] */}
//       <h2>
//         {activeTab === "student"
//           ? "Student Login Portal"
//           : "Faculty Staff Portal"}
//       </h2>
//       <p>
//         {activeTab === "student"
//           ? "Enter your approved student ID and PIN to enter the dashboard."
//           : "Provide your cryptographically authorized secure ID and password frame."}
//       </p>

//       <form onSubmit={handleLogin} className="styled-form">
//         <div className="input-group">
//           <label>
//             {activeTab === "student"
//               ? "Your Smart Student ID"
//               : "Authorized Secure Staff ID"}
//           </label>
//           <input
//             type="text"
//             placeholder={
//               activeTab === "student"
//                 ? "Enter your Verified Student ID..."
//                 : "Enter your Faculty Secure ID"
//             }
//             required
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//           />
//         </div>

//         <PasswordField
//           label={
//             activeTab === "student"
//               ? "Secret Login Password"
//               : "Secure Gate Password"
//           }
//           placeholder="Type Your Secret Password..."
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && (
//           <p
//             style={{
//               color: "red",
//               fontSize: "0.85rem",
//               marginTop: "5px",
//               textAlign: "left",
//               fontWeight: "600",
//             }}>
//             ⚠️ {error}
//           </p>
//         )}

//         {/* DYNAMIC BUTTON TEXT & SUBMIT ENGINE */}
//         <button
//           type="submit"
//           className="login-btn"
//           disabled={loading}
//           style={{
//             background: activeTab === "student" ? "#0056ff" : "#ff9900",
//             transition: "background 0.2s",
//           }}>
//           {loading
//             ? "Authorizing..."
//             : activeTab === "student"
//               ? "Access Student Dashboard"
//               : "Unlock Study Guild Chat"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import PasswordField from "../../components/ui/PasswordField";

// import {
//   FaBarsStaggered,
//   FaX,
//   FaHouse,
//   FaHubspot,
//   FaCalendarDays,
//   FaAddressCard,
//   FaHeadphones,
// } from "react-icons/fa6";

const Login = () => {
  const [activeTab, setActiveTab] = useState("student"); // student | staff
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    } else if (localStorage.getItem("isStaffLoggedIn") === "true") {
      const staffSubject =
        localStorage.getItem("admin_faculty_subject") || "maths";
      navigate(`/student/${staffSubject}/guild-chat`);
    } else if (localStorage.getItem("isAdminLoggedIn") === "true") {
      const activeFaculty =
        localStorage.getItem("admin_faculty_subject") || "maths";
      navigate(`/admin/${activeFaculty}/dashboard`);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanId = studentId.trim().toUpperCase();
    const cleanPassword = password.trim();

    try {
      if (cleanId.startsWith("ADM-")) {
        const adminQuery = query(
          collection(db, "admins"),
          where("id", "==", cleanId),
        );
        const adminSnapshot = await getDocs(adminQuery);

        if (!adminSnapshot.empty) {
          const adminDoc = adminSnapshot.docs[0];
          const adminData = adminDoc.data();

          if (adminData.password === cleanPassword) {
            localStorage.setItem("isAdminLoggedIn", "true");
            localStorage.setItem(
              "admin_auth_token",
              "SECURE_ADMIN_TOKEN_" + Date.now(),
            );
            const facultySubject = adminData.subject
              ? adminData.subject.toLowerCase()
              : "maths";
            localStorage.setItem("admin_faculty_subject", facultySubject);

            navigate(`/admin/${facultySubject}/dashboard`);
            setLoading(false);
            return;
          } else {
            setError("Incorrect Admin Password!");
            setLoading(false);
            return;
          }
        } else {
          setError("Access Denied! Invalid Administrator Credentials.");
          setLoading(false);
          return;
        }
      }

      if (activeTab === "staff") {
        const staffQuery = query(
          collection(db, "guild_staff"),
          where("secureId", "==", cleanId),
        );
        const staffSnapshot = await getDocs(staffQuery);

        if (!staffSnapshot.empty) {
          const staffDoc = staffSnapshot.docs[0];
          const staffData = staffDoc.data();

          if (staffData.password === cleanPassword) {
            localStorage.setItem("isStaffLoggedIn", "true");
            localStorage.setItem("student_name", staffData.fullName);
            localStorage.setItem("student_role", staffData.role);
            const staffSubject = staffData.subject
              ? staffData.subject.toLowerCase()
              : "maths";
            localStorage.setItem("admin_faculty_subject", staffSubject);
            navigate(`/student/${staffSubject}/guild-chat`);
            setLoading(false);
            return;
          } else {
            setError("Incorrect Staff Portal Password!");
            setLoading(false);
            return;
          }
        } else {
          setError(
            "Invalid Staff Identifier Credentials! Check with main administrator.",
          );
          setLoading(false);
          return;
        }
      }

      const studentQuery = query(
        collection(db, "students"),
        where("id", "==", cleanId),
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (!studentSnapshot.empty) {
        const studentDoc = studentSnapshot.docs[0];
        const studentData = studentDoc.data();
        if (studentData.password === cleanPassword) {
          localStorage.setItem("user_id", cleanId);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("studentUser", JSON.stringify(studentData));
          localStorage.setItem("student_name", studentData.name);
          localStorage.setItem("student_role", "student");

          const idParts = cleanId.split("-");
          const subjectCode = idParts[1] || "MES";
          localStorage.setItem("user_subjects", subjectCode);

          navigate("/dashboard");
        } else {
          setError("Incorrect Password!");
        }
      } else {
        setError(
          "Your ID is Not Approved or Invalid! Please check with your class card marker.",
        );
      }
    } catch (err) {
      console.error("Firebase Security Authentication Error:", err);
      setError(
        "A technical error occurred while logging in! Please try again.",
      );
    }
    setLoading(false);
  };

  return (
    <div className="card-container login-card">
      {/* <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f989/512.gif"
        alt="live-emoji"
        className="live-emoji-gif"
        style={{
          width: "90px",
          height: "90px",
          zIndex: "9999",
          position: "absolute",
          top: "25%",
          left: "73%",
          objectFit: "contain",
        }}
      /> */}

      {/* 🎛 1. NEW: DUAL PORTAL NAVIGATION SWITCHER TABS */}
      <div className="portal-tab-switcher-row">
        <button
          type="button"
          onClick={() => {
            setActiveTab("student");
            setError("");
          }}
          className={`tab-btn ${activeTab === "student" ? "student-active" : ""}`}>
          Student Entry
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("staff");
            setError("");
          }}
          className={`tab-btn ${activeTab === "staff" ? "staff-active" : ""}`}>
          Staff & Mentors Gate
        </button>
      </div>

      {/* Headings */}
      <h2>
        {activeTab === "student"
          ? "Student Login Portal"
          : "Faculty Staff Portal"}
      </h2>
      <p className="portal-subtext">
        {activeTab === "student"
          ? "Enter your approved student ID and PIN to enter the dashboard."
          : "Provide your cryptographically authorized secure ID and password frame."}
      </p>

      <form onSubmit={handleLogin} className="styled-form">
        <div className="input-group">
          <label>
            {activeTab === "student"
              ? "Your Smart Student ID"
              : "Authorized Secure Staff ID"}
          </label>
          <input
            type="text"
            placeholder={
              activeTab === "student"
                ? "Enter your Verified Student ID..."
                : "Enter your Faculty Secure ID..."
            }
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <PasswordField
          label={
            activeTab === "student"
              ? "Secret Login Password"
              : "Secure Gate Password"
          }
          placeholder="Type Your Secret Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="auth-error-msg">⚠️ {error}</p>}

        {/* Dynamic Submit Button */}
        <button
          type="submit"
          className={`login-btn ${activeTab === "student" ? "btn-student" : "btn-staff"}`}
          disabled={loading}>
          {loading
            ? "Authorizing..."
            : activeTab === "student"
              ? "Access Student Dashboard"
              : "Unlock Study Guild Chat"}
        </button>
      </form>
    </div>
  );
};

export default Login;
