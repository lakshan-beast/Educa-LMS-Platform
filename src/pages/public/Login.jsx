import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import PasswordField from "../../components/ui/PasswordField";

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
