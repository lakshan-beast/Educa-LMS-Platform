// import React from "react";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import {
  FaUsers,
  FaCalendarDays,
  FaBullhorn,
  FaFilePdf,
  FaRightFromBracket,
} from "react-icons/fa6";

import { FiLayout } from "react-icons/fi";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { subject } = useParams();

  const handleLogout = () => {
    localStorage.removeItem("admin_auth_token");
    localStorage.removeItem("admin_faculty_subject");
    navigate("/login");
  };

  return (
    <div
      className="admin-panel-root-wrapper"
      style={{ display: "flex", minHeight: "100vh", background: "#f8faff" }}>

      <aside
        className="admin-sidebar"
        style={{
          width: "260px",
          background: "#001b42",
          color: "white",
          padding: "25px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}>
        <div className="admin-brand-zone">
          <h2
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#00f7ff",
            }}>
            educa.{" "}
            <span style={{ fontSize: "0.8rem", color: "white", opacity: 0.7 }}>
              Control
            </span>
          </h2>
        </div>

        <nav
          className="admin-nav-links"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flexGrow: 1,
          }}>
          <Link
            to={`/admin/${subject}/dashboard`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.95rem",
            }}>
            <FiLayout />
            Analytics Hub
          </Link>
          <Link
            to={`/admin/${subject}/all-students`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.95rem",
            }}>
            <FaUsers /> Student Vault
          </Link>
          <Link
            to={`/admin/${subject}/schedules`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.95rem",
            }}>
            <FaCalendarDays /> Class Schedules
          </Link>
          <Link
            to={`/admin/${subject}/notices`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.95rem",
            }}>
            <FaBullhorn /> Notices Board
          </Link>
          <Link
            to={`/admin/${subject}/papers`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.95rem",
            }}>
            <FaFilePdf /> Academic Papers
          </Link>

          <Link
            to={`/admin/${subject}/staff-registry`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.95rem",
            }}>
            <FaFilePdf /> Chat Room
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "none",
            border: "none",
            color: "#ff4b4b",
            padding: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            textAlign: "left",
            fontSize: "0.95rem",
          }}>
          <FaRightFromBracket /> Terminate Session
        </button>
      </aside>

      {/* 💻 MAIN CONTENT SCREEN (TOPBAR + CONTENT VIEW) */}
      <div
        className="admin-content-backbone"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}>
        {/* 👑 TOPBAR HEADER */}
        <header
          className="admin-topbar"
          style={{
            background: "white",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            height: "120px",
            position: "relative",
            top: "0",
          }}>
          <div className="topbar-left-meta">
            <span
              style={{
                fontWeight: "bold",
                color: "#001b42",
                textTransform: "uppercase",
                background: "#eef2ff",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "0.85rem",
              }}>
              Active Faculty: {subject}
            </span>
          </div>
          <div
            className="topbar-right-profile"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontWeight: "bold",
                color: "#001b42",
                fontSize: "0.9rem",
              }}>
              Janaka Sir (Admin) 👋
            </span>
          </div>
        </header>

        {/* 📄 සියලුම ඇඩ්මින් පිටු (StudentManager, NoticeManager) ලෝඩ් වෙන්නේ මෙතනයි */}
        <main
          className="admin-page-render-view"
          style={{
            // padding: "30px",
            flexGrow: 1,
            overflowY: "auto",
            margin: "1rem",
          }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
