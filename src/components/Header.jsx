// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { NavHashLink } from "react-router-hash-link";

// import NotificationCenter from "./NotificationCenter";
// import Login from "../pages/Login";

// import {
//   FaBarsStaggered,
//   // FaRegCopyright,
//   // FaRocket,
//   // FaRegCircle,
//   FaBell,
//   FaX,
// } from "react-icons/fa6";
// import { FaRegUserCircle } from "react-icons/fa";

// const Header = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [showNotif, setShowNotif] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   const toggleMenu = () => {
//     setIsActive(!isActive);
//   };

//   const notifications = [
//     {
//       id: 1,
//       subject: "Maths",
//       message: "අද රාත්‍රී 8ට විශේෂ අමතර පන්තියක් පැවැත්වේ.",
//       time: "10 mins ago",
//     },
//     {
//       id: 2,
//       subject: "Science",
//       message: "නව නිබන්ධනය Paper Hub එකට එක් කර ඇත.",
//       time: "1 hour ago",
//     },
//     {
//       id: 3,
//       subject: "English",
//       message: "Closed",
//       time: "2 hour ago",
//     },
//   ];

//   return (
//     <>
//       <header id="header" className="header-section">
//         <nav className="header">
//           <FaBarsStaggered
//             className="menu-btn"
//             id="menu-btn"
//             title="Menu"
//             onClick={toggleMenu}
//           />

//           <a href="#home" className="header-logo">
//             <div className="logo-circle">E</div>educa<span>.</span>
//           </a>

//           <div
//             className={`header-navbar ${isActive ? "nav-active" : ""}`}
//             id="header-navbar">
//             <Link
//               to="/#home"
//               className={({ isActive }) =>
//                 isActive ? "nav-active active" : ""
//               }>
//               Home
//             </Link>

//             <NavHashLink
//               smooth
//               to="/#resources"
//               className={({ isActive }) =>
//                 isActive ? "nav-active active" : ""
//               }>
//               Learning Hub
//             </NavHashLink>

//             <NavHashLink
//               smooth
//               to="/#classes"
//               className={({ isActive }) =>
//                 isActive ? "nav-active active" : ""
//               }>
//               Class Schedule
//             </NavHashLink>

//             <Link
//               to="/tools"
//               className={({ isActive }) =>
//                 isActive ? "nav-active active" : ""
//               }>
//               Smart Tools
//             </Link>

//             <Link
//               to="/quizzes"
//               className={({ isActive }) =>
//                 isActive ? "nav-active active" : ""
//               }>
//               Skill Test
//             </Link>

//             {/* <div className="header-copyrights">
//               <a href="#home" className="header-logo">
//                 <FaRegCircle /> educa<span>.</span>
//               </a>
//               <p>
//                 <FaRocket />
//                 Version 1.0
//               </p>
//               <p>
//                 <FaRegCopyright />
//                 <span> {new Date().getFullYear()}</span> All rights reserved.
//               </p>
//             </div> */}
//           </div>

//           <div className="header-actions">
//             <div
//               className="notif-bell-wrapper"
//               onClick={() => setShowNotif(!showNotif)}>
//               <FaBell className="notif-bell" />
//               {notifications.length > 0 && (
//                 <span className="notif-count"></span>
//               )}
//             </div>

//             {showNotif && (
//               <NotificationCenter
//                 notifications={notifications}
//                 onClose={() => setShowNotif(false)}
//               />
//             )}

//             <button className="sign-btn" onClick={() => setShowLogin(true)}>
//               <FaRegUserCircle />
//             </button>
//           </div>
//         </nav>
//       </header>

//       <div
//         className={`overlay ${isActive ? "active" : ""}`}
//         onClick={toggleMenu}></div>

//       {/* Login Popup Overlay */}
//       {showLogin && (
//         <div className="login-overlay" onClick={() => setShowLogin(false)}>
//           <div className="login-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="close-modal" onClick={() => setShowLogin(false)}>
//               <FaX className="close-btn " />
//             </button>
//             <Login />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import Login from "../pages/Login";

import {
  FaBarsStaggered,
  FaX,
  FaHouse,
  FaHubspot,
  FaCalendarDays,
  FaRegCopyright,
  FaAddressCard,
  FaHeadphones,
} from "react-icons/fa6";

import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isActive, setIsActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  // const [showNotif, setShowNotif] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setShowLogin(true);
    }
    setIsActive(false); // ඩෑෂ්බෝඩ් යද්දී මොබයිල් මෙනු එක වහන්න
  };

  // 👑 🆕 [THE ACTIVE CHECKER]: 'isActive' Error එක සදහටම නැති කර දමන පිරිසිදුම ක්‍රමය
  const isLinkActive = (hashPath) => {
    return location.pathname + location.hash === hashPath;
  };

  return (
    <>
      <header id="header" className="header-section">
        <nav className="header">
          {/* Hamburger Menu Icon */}
          <FaBarsStaggered
            className="menu-btn"
            id="menu-btn"
            title="Menu"
            onClick={toggleMenu}
          />
          <a href="#home" className="header-logo">
            <div className="logo-circle">E</div>educa<span>.</span>
          </a>
          {/* ==================== 💻 👑 🆕 DESKTOP NAVBAR (NO ICONS - EXECUTIVE LOOK) ==================== */}
          <div
            className="desktop-navbar-links"
            style={{ display: "flex", alignItems: "center", gap: "25px" }}>
            <NavHashLink
              smooth
              to="/#home"
              style={{
                textDecoration: "none",
                fontSize: "0.93rem",
                fontWeight: "700",
                color:
                  isLinkActive("/#home") ||
                  location.hash === "#home" ||
                  location.hash === ""
                    ? "#26136d"
                    : "#555",
                borderBottom:
                  isLinkActive("/#home") ||
                  location.hash === "#home" ||
                  location.hash === ""
                    ? "2px solid #26136d"
                    : "2px solid transparent",
                padding: "6px 0",
                transition: "0.3s",
              }}>
              Home
            </NavHashLink>

            <NavHashLink
              smooth
              to="/#resources"
              style={{
                textDecoration: "none",
                fontSize: "0.93rem",
                fontWeight: "700",
                color: isLinkActive("/#resources") ? "#26136d" : "#555",
                borderBottom: isLinkActive("/#resources")
                  ? "2px solid #26136d"
                  : "2px solid transparent",
                padding: "6px 0",
                transition: "0.3s",
              }}>
              Learning Hub
            </NavHashLink>

            <NavHashLink
              smooth
              to="/#classes"
              style={{
                textDecoration: "none",
                fontSize: "0.93rem",
                fontWeight: "700",
                color: isLinkActive("/#classes") ? "#26136d" : "#555",
                borderBottom: isLinkActive("/#classes")
                  ? "2px solid #26136d"
                  : "2px solid transparent",
                padding: "6px 0",
                transition: "0.3s",
              }}>
              Class Schedule
            </NavHashLink>

            <NavHashLink
              smooth
              to="/#parent-portal"
              style={{
                textDecoration: "none",
                fontSize: "0.93rem",
                fontWeight: "700",
                color: isLinkActive("/#parent-portal") ? "#26136d" : "#555",
                borderBottom: isLinkActive("/#parent-portal")
                  ? "2px solid #26136d"
                  : "2px solid transparent",
                padding: "6px 0",
                transition: "0.3s",
              }}>
              Student Portal
            </NavHashLink>
            <NavHashLink
              smooth
              to="/#contacts"
              style={{
                textDecoration: "none",
                fontSize: "0.93rem",
                fontWeight: "700",
                color: isLinkActive("/#contacts") ? "#26136d" : "#555",
                borderBottom: isLinkActive("/#contacts")
                  ? "2px solid #26136d"
                  : "2px solid transparent",
                padding: "6px 0",
                transition: "0.3s",
              }}>
              Contact us
            </NavHashLink>
          </div>
          {/* ========================================================================= */}
          {/* ========================================================================= */}
          {/* 📱 NEW APP-STYLE MOBILE TiOGGLE NAVIGATION MENU */}
          <div
            className={`header-navbar ${isActive ? "nav-active" : ""}`}
            id="header-navbar">
            {/* 1. TOP CONTAINER: Logo & Close Button */}
            <div className="mobile-nav-header">
              <div className="header-logo">
                <div className="logo-circle">E</div>educa<span>.</span>
              </div>

              <button className="mobile-close-btn" onClick={toggleMenu}>
                <FaX className="close-icon" />
              </button>
            </div>

            {/* 2. CENTER CONTAINER: The Smart Grid Links */}
            <div className="mobile-nav-links-grid">
              <Link to="/#home" className="mob-nav-card" onClick={toggleMenu}>
                <FaHouse /> <span>Home</span>
              </Link>
              <NavHashLink
                smooth
                to="/#resources"
                className="mob-nav-card"
                onClick={toggleMenu}>
                <FaHubspot /> <span>Learning Hub</span>
              </NavHashLink>
              <NavHashLink
                smooth
                to="/#classes"
                className="mob-nav-card"
                onClick={toggleMenu}>
                <FaCalendarDays /> <span>Class Schedule</span>
              </NavHashLink>
              <NavHashLink
                smooth
                to="/#parent-portal"
                className="mob-nav-card"
                onClick={toggleMenu}>
                <FaAddressCard /> <span>Student Portal</span>
              </NavHashLink>
              <NavHashLink
                smooth
                to="/#contacts"
                className="mob-nav-card"
                onClick={toggleMenu}>
                <FaHeadphones /> <span>Contact us</span>
              </NavHashLink>
            </div>

            {/* 3. BOTTOM CONTAINER: Legals & Version Claim */}
            <div className="mobile-nav-footer">
              <p>
                <FaRegCopyright /> {new Date().getFullYear()} Educa. All Rights
                Reserved.
              </p>
            </div>
          </div>
          {/* ========================================================================= */}
          <div className="header-actions">
            <button className="sign-btn" onClick={handleUserClick}>
              {isLoggedIn ? (
                <FaUserCircle style={{ color: "#1d10ac" }} />
              ) : (
                <FaRegUserCircle style={{ color: "#f7786f" }} />
              )}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`overlay ${isActive ? "active" : ""}`}
        onClick={toggleMenu}></div>

      {/* Login Popup */}
      {showLogin && (
        <div className="login-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowLogin(false)}>
              <FaX className="close-btn" />
            </button>
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
