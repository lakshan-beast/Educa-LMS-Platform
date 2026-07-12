import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import Login from "../../pages/public/Login";

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
import EventDrawer from "../../pages/Future/EventDrawer";

const Header = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [activeSection, setActiveSection] = useState("home");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["home", "resources", "classes", "teachers", "contacts"];

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

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

          {/* 💻 DESKTOP NAVBAR */}
          <div className="desktop-navbar-links">
            <NavHashLink
              className={`desktop-link ${activeSection === "home" ? "active" : ""}`}
              smooth
              to="/#home">
              Home
            </NavHashLink>

            <NavHashLink
              className={`desktop-link ${activeSection === "resources" ? "active" : ""}`}
              smooth
              to="/#resources">
              Learning Hub
            </NavHashLink>

            <NavHashLink
              className={`desktop-link ${activeSection === "classes" ? "active" : ""}`}
              smooth
              to="/#classes">
              Classes Schedule
            </NavHashLink>

            <NavHashLink
              className={`desktop-link ${activeSection === "teachers" ? "active" : ""}`}
              smooth
              to="/#teachers">
              Our Tutors
            </NavHashLink>

            <NavHashLink
              className={`desktop-link ${activeSection === "contacts" ? "active" : ""}`}
              smooth
              to="/#contacts">
              Contacts us
            </NavHashLink>
          </div>

          <div className="header-actions">
            <button className="sign-btn" onClick={handleUserClick}>
              {isLoggedIn ? (
                <FaUserCircle style={{ color: "#c6d4fa" }} />
              ) : (
                <FaRegUserCircle style={{ color: "#00f1d1" }} />
              )}
            </button>
          </div>

          {/* 📱 MOBILE NAVIGATION MENU*/}
          <div
            className={`header-navbar ${isActive ? "nav-active" : ""}`}
            id="header-navbar">
            <button className="mobile-close-btn" onClick={toggleMenu}>
              <FaX className="close-icon" />
            </button>
            <div className="mobile-nav-header">
              <div className="header-logo">
                <div className="logo-circle">E</div>educa<span>.</span>
              </div>
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

      <EventDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

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
