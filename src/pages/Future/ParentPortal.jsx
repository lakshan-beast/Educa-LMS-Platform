import { useState } from "react";
import { Link } from "react-router-dom";

import {
  // parentGeneralNotices,
  parentFeesTable,
  parentAttendanceTable,
} from "../../data/parentPortalData";

import PasswordField from "../../components/ui/PasswordField";

import {
  FaUserShield,
  // FaKey,
  // FaBell,
  FaMagnifyingGlass,
  FaMoneyCheckDollar,
  FaCalendarCheck,
  FaUserXmark,
  FaArrowLeft,
} from "react-icons/fa6";

import { allApprovedStudents } from "../../data/approvedStudents";
// import { NoticeBoard } from "../components/admin/NoticeVault";
import LiveNoticeDisplay from "../public/LiveNotice";

const ParentPortal = () => {
  // Gate Security States
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Search Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // 🔒 1. Login Security Gate Handler
  const handleParentLogin = (e) => {
    e.preventDefault();
    const cleanId = studentId.trim().toUpperCase();
    const cleanPassword = password.trim();

    const studentFound = allApprovedStudents.find(
      (student) => student.id === cleanId,
    );

    if (studentFound) {
      if (studentFound.password === cleanPassword) {
        setIsAuthenticated(true);
        setSearchQuery(cleanId);
        setError("");
      } else {
        setError("The password entered is incorrect!");
      }
    } else {
      setError(
        "Invalid or unapproved student ID number. Please contact Card Marker.",
      );
    }
  };

  const todayAbsentList = parentAttendanceTable.filter(
    (r) => r.status === "Absent",
  );

  const filteredFees = parentFeesTable.filter((r) =>
    r.studentId.includes(searchQuery.trim().toUpperCase()),
  );

  const filteredAttendance = parentAttendanceTable.filter((r) =>
    r.studentId.includes(searchQuery.trim().toUpperCase()),
  );

  return (
    <div className="parent-portal-wrapper page-container">
      <div className="system-container">
        <Link to="/" className="back-btn">
          <FaArrowLeft /> Back to Home page
        </Link>

        {!isAuthenticated ? (
          // ==================== 🔒 SCREEN 01: SECURITY LOGIN GATE ====================
          <div
            className="card-container"
            style={{
              // margin: "40px auto",
              // padding: "35px 30px",
              // borderRadius: "24px",
              // boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              // background: "white",
              textAlign: "center",
              maxWidth: "350px",
              minWidth: "300px",
              width: "100%",
            }}>
            <div
              style={{
                margin: "0 auto 15px",
                width: "65px",
                height: "65px",
                background: "#03204b",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.8rem",
              }}>
              <FaUserShield />
            </div>
            <h2
              style={{
                color: "#03204b",
                fontWeight: "800",
                marginBottom: "8px",
              }}>
              Parent Portal
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#666",
                marginBottom: "25px",
                lineHeight: "1.5",
              }}>
              Log in to confidentially check your child's fee records,
              attendance, and class announcements.
            </p>

            <form
              onSubmit={handleParentLogin}
              className="styled-form"
              style={{ textAlign: "left" }}>
              <div className="input-group">
                <label>Student ID</label>
                <input
                  type="text"
                  placeholder="ex: EDU-MES-11-..."
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>

              <PasswordField
                label=" Secret Login Password"
                placeholder="Type Your Paper-Slip Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.85rem",
                    marginBottom: "15px",
                    fontWeight: "500",
                  }}>
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="start-btn"
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#03204b",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "20px",
                }}>
                View Reports
              </button>
            </form>
          </div>
        ) : (
          // ==================== 🔓 SCREEN 02: MAIN PARENT PORTAL DASHBOARD ====================
          <div className="parent-main-dashboard">
            {/* 📢 A. GENERAL NOTICE BOARD */}
            {/* <div
              className="card-container"
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "20px",
                marginBottom: "30px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              }}>
              <h3
                style={{
                  color: "#26136d",
                  margin: "0 0 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                <FaBell style={{ color: "#ff4b2b" }} /> Public class bulletin
                board (පොදු පන්ති නිවේදන)
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}>
                {parentGeneralNotices.map((notice) => (
                  <div
                    key={notice.id}
                    style={{
                      background: "#fff4f2",
                      padding: "12px 15px",
                      borderRadius: "10px",
                      borderLeft: "4px solid #f7786f",
                    }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "#333",
                        lineHeight: "1.5",
                      }}>
                      <span
                        style={{
                          background: "#f7786f",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "5px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}>
                        {notice.type}
                      </span>
                      {notice.text}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}

            <LiveNoticeDisplay studentSubjects={[]} />

            {/* 🔍 B. SEARCH PORTAL BAR */}
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "30px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.01)",
              }}>
              <FaMagnifyingGlass
                style={{ color: "#26136d", fontSize: "1.2rem" }}
              />
              <input
                type="text"
                placeholder="Search by entering the child's ID number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              />
            </div>

            {/* 💰 C. FEES REPORT TABLE */}
            <div
              className="card-container"
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "20px",
                marginBottom: "30px",
                overflowX: "auto",
              }}>
              <h3>
                <FaMoneyCheckDollar style={{ color: "#2ecc71" }} /> Class Fees
                Report Table
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.92rem",
                  textAlign: "left",
                  marginTop: "15px",
                }}>
                <thead>
                  <tr style={{ background: "#26136d", color: "white" }}>
                    <th style={{ padding: "12px" }}>Student ID</th>
                    <th style={{ padding: "12px" }}>Class</th>
                    <th style={{ padding: "12px" }}>Grade</th>
                    <th style={{ padding: "12px" }}>Status</th>
                    <th style={{ padding: "12px" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFees.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid #eee",
                        background:
                          row.studentId === studentId.toUpperCase()
                            ? "#fffde9"
                            : "transparent",
                      }}>
                      <td style={{ padding: "12px", fontWeight: "bold" }}>
                        {row.studentId}
                      </td>
                      <td style={{ padding: "12px" }}>{row.class}</td>
                      <td style={{ padding: "12px" }}>Grade {row.grade}</td>
                      <td
                        style={{
                          padding: "12px",
                          color: row.feesStatus === "Paid" ? "green" : "red",
                          fontWeight: "bold",
                        }}>
                        {row.feesStatus === "Paid" ? "✓ Paid" : "✗ Unpaid"}
                      </td>
                      <td style={{ padding: "12px", fontWeight: "bold" }}>
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📅 D. ATTENDANCE REPORT TABLE */}
            <div
              className="card-container"
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "20px",
                marginBottom: "30px",
                overflowX: "auto",
              }}>
              <h3>
                <FaCalendarCheck style={{ color: "#4b6bfb" }} /> Student
                Attendance Report Table (ශිෂ්‍ය පැමිණීමේ වාර්තා වගුව)
              </h3>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.92rem",
                  textAlign: "left",
                  marginTop: "15px",
                }}>
                <thead>
                  <tr style={{ background: "#26136d", color: "white" }}>
                    <th style={{ padding: "12px" }}>Student ID</th>
                    <th style={{ padding: "12px" }}>Subject</th>
                    <th style={{ padding: "12px" }}>Date</th>
                    <th style={{ padding: "12px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid #eee",
                        background:
                          row.studentId === studentId.toUpperCase()
                            ? "#fffde9"
                            : "transparent",
                      }}>
                      <td style={{ padding: "12px", fontWeight: "bold" }}>
                        {row.studentId}
                      </td>
                      <td style={{ padding: "12px" }}>{row.class}</td>
                      <td style={{ padding: "12px" }}>{row.date}</td>
                      <td
                        style={{
                          padding: "12px",
                          color: row.status === "Present" ? "green" : "red",
                          fontWeight: "bold",
                        }}>
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📅 E. TODAY'S ABSENT LIST (පොදු ලැයිස්තුව) */}
            <div
              className="card-container"
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "20px",
                overflowX: "auto",
                border: "1px solid rgba(231,76,60,0.2)",
              }}>
              <h3 style={{ color: "#c0392b", marginBottom: "15px" }}>
                <FaUserXmark /> Today's Absent Student IDs
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.92rem",
                  textAlign: "left",
                }}>
                <thead>
                  <tr style={{ background: "#e74c3c", color: "white" }}>
                    <th style={{ padding: "12px" }}>Absent Student ID</th>
                    <th style={{ padding: "12px" }}>Subject</th>
                    <th style={{ padding: "12px" }}>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAbsentList.map((row, i) => {
                    const idParts = row.studentId.split("-");
                    // 🧠 Array Crash Error එක නිවැරදි කර නමේ මුල් අකුරු 3 පමණක් පෙන්වන සුරක්ෂිත Masking ලොජික් එක
                    const maskedName = idParts[3]
                      ? idParts[3].substring(0, 3) + "XXXX"
                      : "XXXX";
                    const finalMaskedId = `${idParts[0]}-${idParts[1]}-${idParts[2]}-${maskedName}-${idParts[4]}`;

                    return (
                      <tr
                        key={i}
                        style={{
                          borderBottom: "1px solid #fdedec",
                          background:
                            row.studentId === studentId.toUpperCase()
                              ? "#fdf2f2"
                              : "transparent",
                        }}>
                        <td
                          style={{
                            padding: "12px",
                            fontWeight: "bold",
                            color: "#c0392b",
                          }}>
                          {finalMaskedId}
                        </td>
                        <td style={{ padding: "12px" }}>{row.class}</td>
                        <td style={{ padding: "12px" }}>Grade {row.grade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="start-btn"
              style={{
                width: "100%",
                marginTop: "30px",
                padding: "12px",
                background: "#26136d",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}>
              Logout Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentPortal;
