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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import PasswordField from "../../components/ui/PasswordField";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 දැනටමත් ලොග් වී ඇත්නම් ස්වයංක්‍රීයව අදාළ තැනට හරවා යැවීම [INDEX 4]
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    } else if (localStorage.getItem("isAdminLoggedIn") === "true") {
      const activeFaculty =
        localStorage.getItem("admin_faculty_subject") || "maths";
      navigate(`/admin/${activeFaculty}/dashboard`);
    }
  }, [navigate]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   const cleanId = studentId.trim().toUpperCase();
  //   const cleanPassword = password.trim();

  //   try {
  //     // ==========================================================================
  //     // 👑 1. ADMIN / TEACHER LOGIN ROUTE (ID එක ADM- වලින් පටන් ගන්නේ නම්)
  //     // ==========================================================================
  //     if (cleanId.startsWith("ADM-")) {
  //       const adminQuery = query(
  //         collection(db, "admins"),
  //         where("id", "==", cleanId),
  //       );
  //       const adminSnapshot = await getDocs(adminQuery);

  //       if (!adminSnapshot.empty) {
  //         const adminDoc = adminSnapshot.docs[0];
  //         const adminData = adminDoc.data();

  //         if (adminData.password === cleanPassword) {
  //           // Admin සෙෂන් එක සුරක්ෂිතව තබා ගැනීම [INDEX 4]
  //           localStorage.setItem("isAdminLoggedIn", "true");
  //           localStorage.setItem(
  //             "admin_auth_token",
  //             "SECURE_ADMIN_TOKEN_" + Date.now(),
  //           );

  //           // URL එක dynamic හැදීමට සර්ගේ විෂය (maths/science) database එකෙන් ගනී [INDEX 4, 51]
  //           const facultySubject = adminData.subject
  //             ? adminData.subject.toLowerCase()
  //             : "maths";
  //           localStorage.setItem("admin_faculty_subject", facultySubject);

  //           // 🚀 පිටුව reload නොවී සැනින් Admin Sidebar එකට රීඩිරෙක්ට් වේ! [INDEX 4]
  //           navigate(`/admin/${facultySubject}/dashboard`);
  //           setLoading(false);
  //           return;
  //         } else {
  //           setError("Incorrect Admin Password!");
  //           setLoading(false);
  //           return;
  //         }
  //       } else {
  //         setError("Access Denied! Invalid Administrator Credentials.");
  //         setLoading(false);
  //         return;
  //       }
  //     }

  //     // ==========================================================================
  //     // 👦 2. STANDARD STUDENT LOGIN ROUTE (සාමාන්‍ය ශිෂ්‍ය ලොගින් එක)
  //     // ==========================================================================
  //     const studentQuery = query(
  //       collection(db, "students"),
  //       where("id", "==", cleanId),
  //     );
  //     const studentSnapshot = await getDocs(studentQuery);

  //     if (!studentSnapshot.empty) {
  //       const studentDoc = studentSnapshot.docs[0];
  //       const studentData = studentDoc.data();

  //       if (studentData.password === cleanPassword) {
  //         localStorage.setItem("user_id", cleanId);
  //         localStorage.setItem("isLoggedIn", "true");
  //         localStorage.setItem("studentUser", JSON.stringify(studentData));

  //         // 🛠️ ඔයාගේ අලුත් ID Format එකෙන් (EDU-MES-11-...) විෂය කේතය (MES) වෙන් කරගැනීම [INDEX 4]
  //         const idParts = cleanId.split("-");
  //         const subjectCode = idParts[1] || "MES";
  //         localStorage.setItem("user_subjects", subjectCode);

  //         // 🚀 පිටුව reload කිරීම් කිසිවක් නැත! React State එකෙන්ම Dashboard එකට යයි [INDEX 4]
  //         navigate("/dashboard");
  //       } else {
  //         setError("Incorrect Password!");
  //       }
  //     } else {
  //       setError(
  //         "Your ID is Not Approved or Invalid! Please check with your class card marker.",
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Firebase Security Authentication Error:", err);
  //     setError(
  //       "A technical error occurred while logging in! Please try again.",
  //     );
  //   }

  //   setLoading(false);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanId = studentId.trim().toUpperCase();
    const cleanPassword = password.trim();

    try {
      // ==========================================================================
      // 👑 1. ADMIN / TEACHER LOGIN ROUTE (ID එක ADM- වලින් පටන් ගන්නේ නම්)
      // ==========================================================================
      if (cleanId.startsWith("ADM-")) {
        const adminQuery = query(
          collection(db, "admins"),
          where("id", "==", cleanId),
        );
        const adminSnapshot = await getDocs(adminQuery);

        if (!adminSnapshot.empty) {
          // 🛠️ FIX: [0] දමා නිවැරදිව පළමු Document එක ලබා ගැනීම සිදුකළා
          const adminDoc = adminSnapshot.docs[0];
          const adminData = adminDoc.data();

          if (adminData.password === cleanPassword) {
            // Admin සෙෂන් එක සුරක්ෂිතව තබා ගැනීම [INDEX 4]
            localStorage.setItem("isAdminLoggedIn", "true");
            localStorage.setItem(
              "admin_auth_token",
              "SECURE_ADMIN_TOKEN_" + Date.now(),
            );

            // URL එක dynamic හැදීමට සර්ගේ විෂය (maths/science) database එකෙන් ගනී [INDEX 4, 51]
            const facultySubject = adminData.subject
              ? adminData.subject.toLowerCase()
              : "maths";
            localStorage.setItem("admin_faculty_subject", facultySubject);

            // 🚀 පිටුව reload නොවී සැනින් Admin Sidebar එකට රීඩිරෙක්ට් වේ! [INDEX 4]
            navigate(`/admin/${facultySubject}/dashboard`);
            setLoading(false);
            return; // 👈 මෙතනින්ම ලොගින් ලොජික් එක නවත්වනවා
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

      // ==========================================================================
      // 👦 2. STANDARD STUDENT LOGIN ROUTE (සාමාන්‍ය ශිෂ්‍ය ලොගින් එක)
      // ==========================================================================
      const studentQuery = query(
        collection(db, "students"),
        where("id", "==", cleanId),
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (!studentSnapshot.empty) {
        // 🛠️ FIX: [0] දමා නිවැරදිව පළමු Document එක ලබා ගැනීම සිදුකළා
        const studentDoc = studentSnapshot.docs[0];
        const studentData = studentDoc.data();

        if (studentData.password === cleanPassword) {
          localStorage.setItem("user_id", cleanId);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("studentUser", JSON.stringify(studentData));

          // 🛠️ ඔයාගේ අලුත් ID Format එකෙන් (EDU-MES-11-...) විෂය කේතය (MES) වෙන් කරගැනීම [INDEX 4]
          const idParts = cleanId.split("-");
          const subjectCode = idParts[1] || "MES";
          localStorage.setItem("user_subjects", subjectCode);

          // 🚀 පිටුව reload කිරීම් කිසිවක් නැත! React State එකෙන්ම Dashboard එකට යයි [INDEX 4]
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
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f989/512.gif"
        alt="live-emoji"
        style={{
          width: "90px",
          height: "90px",
          zIndex: "9999",
          position: "absolute",
          top: "25%",
          left: "73%",
          objectFit: "contain",
        }}
      />

      <h2>Student Login Portal </h2>
      <p>Enter your approved student ID and PIN to enter the dashboard.</p>

      <form onSubmit={handleLogin} className="styled-form">
        <div className="input-group">
          <label>Your Smart Student ID</label>
          <input
            type="text"
            placeholder="Enter your Verified Student ID..."
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <PasswordField
          label=" Secret Login Password"
          placeholder="Type Your Secret Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: "red", fontSize: "0.85rem", marginTop: "5px" }}>
            {error}
          </p>
        )}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging..." : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
};

export default Login;
