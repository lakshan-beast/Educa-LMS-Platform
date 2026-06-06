import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import Login from "../pages/Login";

import {
  FaBarsStaggered,
  FaX,
  FaHouse,
  FaHubspot,
  FaCalendarDays,
  FaAddressCard,
  FaHeadphones,
} from "react-icons/fa6";

import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isActive, setIsActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
    setIsActive(false);
  };

  // [THE ACTIVE CHECKER]: 'isActive' Error එක සදහටම නැති කර දමන පිරිසිදුම ක්‍රමය
  const isLinkActive = (hashPath) => {
    return location.pathname + location.hash === hashPath;
  };

  return (
    <>
      <header id="header" className="header-section">
        <nav className="header">
          <FaBarsStaggered
            className="menu-btn"
            id="menu-btn"
            title="Menu"
            onClick={toggleMenu}
          />
          <a href="#home" className="header-logo">
            <div className="logo-circle">E</div>educa<span>.</span>
          </a>

          {/* 💻 DESKTOP NAVBAR (NO ICONS - EXECUTIVE LOOK) */}
          <div className="desktop-navbar-links">
            <NavHashLink
              className="desktop-link"
              smooth
              to="/#home"
              style={{
                color:
                  isLinkActive("/#home") ||
                  location.hash === "#home" ||
                  location.hash === ""
                    ? "#03204b"
                    : "#8d8d8d",
                borderBottom:
                  isLinkActive("/#home") ||
                  location.hash === "#home" ||
                  location.hash === ""
                    ? "2px solid #03204b"
                    : "2px solid transparent",
              }}>
              Home
            </NavHashLink>

            <NavHashLink
              className="desktop-link"
              smooth
              to="/#resources"
              style={{
                color: isLinkActive("/#resources") ? "#03204b" : "#8d8d8d",
                borderBottom: isLinkActive("/#resources")
                  ? "2px solid #03204b"
                  : "2px solid transparent",
              }}>
              Learning Hub
            </NavHashLink>

            <NavHashLink
              className="desktop-link"
              smooth
              to="/#classes"
              style={{
                color: isLinkActive("/#classes") ? "#03204b" : "#8d8d8d",
                borderBottom: isLinkActive("/#classes")
                  ? "2px solid #03204b"
                  : "2px solid transparent",
              }}>
              Class Schedule
            </NavHashLink>

            <NavHashLink
              className="desktop-link"
              smooth
              to="/#teachers"
              style={{
                color: isLinkActive("/#parent-portal") ? "#03204b" : "#8d8d8d",
                borderBottom: isLinkActive("/#parent-portal")
                  ? "2px solid #03204b"
                  : "2px solid transparent",
              }}>
              Our Tutors
            </NavHashLink>
            <NavHashLink
              className="desktop-link"
              smooth
              to="/#contacts"
              style={{
                color: isLinkActive("/#contacts") ? "#03204b" : "#8d8d8d",
                borderBottom: isLinkActive("/#contacts")
                  ? "2px solid #03204b"
                  : "2px solid transparent",
              }}>
              Contact us
            </NavHashLink>
          </div>

          <div className="header-actions">
            <button className="sign-btn" onClick={handleUserClick}>
              {isLoggedIn ? (
                <FaUserCircle style={{ color: "#03204b" }} />
              ) : (
                <FaRegUserCircle />
              )}
            </button>
          </div>

          {/* 📱 NEW APP-STYLE MOBILE TiOGGLE NAVIGATION MENU */}
          <div
            className={`header-navbar ${isActive ? "nav-active" : ""}`}
            id="header-navbar">
            <div className="mobile-nav-header">
              <div className="header-logo">
                <div className="logo-circle">E</div>educa<span>.</span>
              </div>

              <button className="mobile-close-btn" onClick={toggleMenu}>
                <FaX className="close-icon" />
              </button>
            </div>

            <div className="mobile-nav-links-grid">
              <NavHashLink
                to="/#home"
                className="mob-nav-card"
                onClick={toggleMenu}>
                <FaHouse /> <span>Home Page</span>
              </NavHashLink>
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
                to="/#teachers"
                className="mob-nav-card"
                onClick={toggleMenu}>
                <FaAddressCard /> <span>Our Tutors</span>
              </NavHashLink>
              <NavHashLink
                smooth
                to="/#contacts"
                className="mob-nav-card"
                onClick={toggleMenu}>
                <FaHeadphones /> <span>Contact us</span>
              </NavHashLink>
            </div>
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
