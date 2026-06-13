import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { allApprovedStudents } from "../data/approvedStudents";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

import PasswordField from "../components/PasswordField";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  // const [pin, setPin] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cleanId = studentId.trim().toUpperCase();
    const cleanPassword = password.trim(); // 🆕 Password එක ගත්තා

    // 🔍 1. මධ්‍යම ලැයිස්තුවෙන් මේ ශිෂ්‍ය ID එක තියෙන Object එක සොයාගන්නවා
    // const studentFound = allApprovedStudents.find(
    //   (student) => student.id === cleanId,
    // );

    try {
      // 1. ☁️ Firebase 'students' Collection එක පීරලා මේ නිශ්චිත ID එක තියෙන ළමයාව සොයයි
      const q = query(collection(db, "students"), where("id", "==", cleanId));
      const querySnapshot = await getDocs(q);
      // 🚀 ඔන්න සැබෑ Cloud GET (getDocs) එක!
      if (!querySnapshot.empty) {
        // 2. 👦 ID එක Cloud එකේ තිබේ නම්, ඒ ළමයාගේ දත්ත පේළිය කියවයි
        const studentDoc = querySnapshot.docs[0];
        const studentData = studentDoc.data();
        // 3. 🔐 Cloud එකේ සේව් වී ඇති Password එක සහ ළමයා ගහපු Password එක සමානද බලයි
        if (studentData.password === cleanPassword) {
          // 4. 💾 [THE EXCLUSIVE STORAGE MATCH]: ළමයාගේ සියලුම විස්තර බ්‍රවුසර් මතකයට (localStorage) දමයි
          localStorage.setItem("user_id", cleanId);
          localStorage.setItem("isLoggedIn", "true");
          // 👑 🆕 ඊයේ අපි ළමයාගේ නම Dashboard එකට ගන්න කතා වුණු 'studentUser' Object එක මෙතනදී සේව් කරයි!
          localStorage.setItem("studentUser", JSON.stringify(studentData));
          // ID එකෙන් Subject Code එක වෙන් කර ගැනීම (ex: EDU-MES-11-LAKSHAN -> MES)
          const idParts = cleanId.split("-");
          const subjectCode = idParts[1] || "M";
          localStorage.setItem("user_subjects", subjectCode);
          // 🚀 සාර්ථකව Dashboard එකට කැඳවාගෙන යයි!
          navigate("/dashboard");
          window.location.reload();
        } else {
          setError("Incorrect Password! ❌");
        }
      } else {
        // ID එක Firestore එකේ නැත්නම් දෙන පණිවිඩය
        setError(
          "Your ID is Not Approved or Invalid! Please check with your class card marker. ⚠️",
        );
      }
    } catch (err) {
      console.error("Firebase Login Error:", err);
      setError(
        "ලොගින් වීමේදී තාක්ෂණික දෝෂයක් සිදු විය! කරුණාකර නැවත උත්සාහ කරන්න. ❌",
      );
    }

    // if (studentFound) {
    //   // 🔍 2. ID එක හමු වුණොත්, ඒ Object එක ඇතුළේ තියෙන රහස් Password එක සමානද බලනවා
    //   if (studentFound.password === cleanPassword) {
    //     localStorage.setItem("user_id", cleanId);
    //     localStorage.setItem("isLoggedIn", "true");

    //     // ID එකෙන් Subject Code එක (MES) වෙන් කර ගැනීම
    //     const idParts = cleanId.split("-");
    //     const subjectCode = idParts[1];
    //     localStorage.setItem("user_subjects", subjectCode);

    //     navigate("/dashboard");
    //     window.location.reload();
    //   } else {
    //     setError("Incorrect Password!");
    //   }
    // } else {
    //   setError(
    //     "Your ID is Not Approved or Invalid! or Check with your class card marker.",
    //   );
    // }

    setLoading(false);
    // setIsLoggingIn(false);
  };

  return (
    // ... ඔයාගේ Login UI Form එක ...
    <div
      className="card-container login-card"
      style={{ maxWidth: "400px", margin: "40px auto", padding: "30px" }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f989/512.gif"
        alt="live-emoji"
        style={{
          width: "90px",
          height: "90px",
          zIndex: "9999",
          position: "absolute",
          top: "23.5%",
          left: "73%",
          objectFit: "contain",
        }}
      />

      <h2>Student Login Portal </h2>
      <p style={{ fontSize: "0.85rem", marginBottom: "20px" }}>
        Enter your approved student ID and PIN to enter the dashboard.
      </p>

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

        {/* 🔑 🔐 [THE MASTER REUSABLE FIELD]: පරණ පේළි 20 වෙනුවට එකම පේළියකින් ඇස් දෙකේ ලොජික් එකම වැඩ කරයි! */}
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

        <button
          type="submit"
          className="login-btn"
          style={{ width: "100%", marginTop: "15px" }}
          disabled={loading}>
          {loading ? "Logging In..." : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
};

export default Login;
