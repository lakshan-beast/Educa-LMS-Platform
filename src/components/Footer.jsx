import { useState } from "react";
import { NavHashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

import {
  FaFacebook,
  FaRocket,
  FaSquareCheck,
  FaRegCopyright,
  FaWhatsapp,
  FaYoutube,
  FaCaretRight,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

import {
  FaEnvelope,
  FaLaptopCode,
  FaUsers,
  FaTelegram,
  FaHeart,
} from "react-icons/fa";

import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Updates from "../pages/Updates";
import ComingSoon from "../pages/ComingSoon";
import About from "../pages/About";
import NexusLabs from "../pages/NexusLabs";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState(null);

  // ID Generator Popup එක පාලනය කරන State
  // const [showGenModal, setShowGenModal] = useState(false);
  // // const [showPrivacyCard, setShowPrivacyCard] = useState(false);
  // // const [showTermsCard, setShowTermsCard] = useState(false);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   pin: "",
  //   password: "",
  //   maths: false,
  //   english: false,
  //   science: false,
  // });

  // const [generatedID, setGeneratedID] = useState("");
  // const [copied, setCopied] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  // ID එක හදන රටාව (Grade 11 විතරක් නිසා කෙලින්ම 11 දැම්මා)
  // const handleGenerate = (e) => {
  //   e.preventDefault();
  //   let subCode = "";
  //   if (formData.maths) subCode += "m";
  //   if (formData.english) subCode += "e";
  //   if (formData.science) subCode += "s";

  //   if (!subCode) {
  //     alert("Please select at least one subject!");
  //     return;
  //   }

  //   const cleanName = formData.name.replace(/\s+/g, "").toUpperCase();
  //   const finalID = `EDU-${subCode.toUpperCase()}-11-${cleanName}-${formData.pin}`;
  //   setGeneratedID(finalID);
  //   setCopied(false);
  // };

  return (
    <footer className="footer" data-aos="fade-up">
      <div className="footer-contents">
        {/* footer logo */}
        <div className="footer-card ">
          <a href="#home" className="header-logo footer-logo">
            <div className="logo-circle">E</div>educa<span>.</span>
          </a>
          <p>
            Clear lessons, smart tracking, and proven exam success for every
            student.
          </p>

          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaTelegram />
            </a>
            <a href="https://wa.me" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* footer quick link */}
        <div className="footer-card footer-links">
          <h3>Quick Navigation</h3>
          <ul>
            <li>
              <NavHashLink smooth to="/#home">
                <FaCaretRight className="footer-icon" /> Home Portal
              </NavHashLink>
            </li>
            <li>
              <NavHashLink smooth to="/#resources">
                <FaCaretRight className="footer-icon" /> Academic Resources
              </NavHashLink>
            </li>
            <li>
              <NavHashLink smooth to="/#classes">
                <FaCaretRight className="footer-icon" /> Class Schedules
              </NavHashLink>
            </li>

            <li>
              <a href="https://www.doenets.lk/examresults">
                <FaCaretRight className="footer-icon" /> National O/L Results
              </a>
            </li>
            <li>
              <NavHashLink smooth to="/#teachers">
                <FaCaretRight className="footer-icon" /> Our Expert Faculty
              </NavHashLink>
            </li>
            <li>
              <NavHashLink smooth to="/#information">
                <FaCaretRight className="footer-icon" /> Why Study with us
              </NavHashLink>
            </li>
            <li>
              <NavHashLink smooth to="/#contacts">
                <FaCaretRight className="footer-icon" /> Contact Support
              </NavHashLink>
            </li>
          </ul>
        </div>

        {/* footer links  */}
        <div className="footer-card footer-links">
          <h3>Study Resources</h3>
          <ul>
            <li>
              <Link to="/student-voices">
                <FaCaretRight className="footer-icon" /> Students Feedbacks
              </Link>
            </li>
            <li>
              <Link to="/tool">
                <FaCaretRight className="footer-icon" /> Smart Study Tools
              </Link>
            </li>
            <li>
              <Link to="/quizze">
                <FaCaretRight className="footer-icon" /> Interactive Quizzes
              </Link>
            </li>
            <li>
              <Link to="/paper-hub">
                <FaCaretRight className="footer-icon" /> Past & Target Papers
              </Link>
            </li>
            <li>
              <Link to="/daily-question">
                <FaCaretRight className="footer-icon" /> Daily Learning Mission
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-card footer-contact">
          <h3>Contact Information</h3>
          <p>
            <a href="tel:+94 77 123 4567" className="contact-link">
              <FaPhone className="footer-icon" /> +94 77 *** ****
            </a>
          </p>
          <p>
            <a
              href="mailto:support@educa.lk"
              className="contact-link"
              id="contact-email">
              <FaEnvelope className="footer-icon" /> support@educa.lk
            </a>
          </p>
          <p>
            <FaLocationDot className="footer-icon" /> 123, Education Lane,
            Colombo
          </p>

          <div className="subject-contacts">
            <p>
              For subject specific help, use our
              <NavHashLink className="contact-button" to="/#contact-form">
                Contact Form
              </NavHashLink>
            </p>
          </div>
        </div>
      </div>

      {/* footer bottom section  */}
      <div className="footer-contents footer-bottom" id="footer-bottom">
        {/* footer legels  */}
        <div className=" footer-card footer-legels">
          <h3>Legal Complaince</h3>
          <ul>
            <li>
              <span
                onClick={() => setActiveModal("PRIVACY")}
                className="secret-gen-link">
                <FaCaretRight className="footer-icon" /> Privacy Policy
              </span>
            </li>

            <li>
              <span
                onClick={() => setActiveModal("TERMS")}
                className="secret-gen-link">
                <FaCaretRight className="footer-icon" />
                Terms of Services
              </span>
            </li>

            <li>
              <div className="contact-support">
                <a
                  href={`https://wa.me/94740130305?text=Hello%20Support%20Team,%20I%20forgot%20my%20Educa%20account%20Password.%20Please%20help%20me%20to%20recover%20it.%20My%20Name%20is:%20`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaCaretRight className="footer-icon" /> Password Forget?
                  (Contact Support)
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className=" footer-card footer-legels">
          <h3>Platform Evolution</h3>
          <ul>
            <li>
              <span
                onClick={() => setActiveModal("UPDATES")}
                className="secret-gen-link">
                <FaCaretRight className="footer-icon" /> System Version Updates
              </span>
            </li>

            <li>
              <span
                onClick={() => setActiveModal("COMING_SOON")}
                className="secret-gen-link">
                <FaCaretRight className="footer-icon" /> Coming Soon Engine
              </span>
            </li>
          </ul>
        </div>

        <div className=" footer-card footer-legels">
          <h3>Corporate Identity</h3>
          <ul>
            <li>
              <span
                onClick={() => setActiveModal("ABOUT")}
                className="secret-gen-link">
                <FaCaretRight className="footer-icon" /> About educa. Platform
              </span>
            </li>

            <li>
              <span
                onClick={() => setActiveModal("NEXUS_LABS")}
                className="secret-gen-link">
                <FaCaretRight className="footer-icon" /> NexusLabs Studio
              </span>
            </li>
          </ul>
        </div>

        {/* footer badge level */}
        <div className="footer-card badge-levelup">
          <h3>Biuld for Sri Lankan | O/L Students</h3>
          <p>
            <FaRocket className="footer-icon" />
            Version 1.5 Production
          </p>
          <p>
            <FaSquareCheck className="footer-icon" />
            Verified Academic Links
          </p>
          <p>
            <FaLaptopCode className="footer-icon" />
            last updated :<span> 2026 June</span>
          </p>
          <p>
            <FaUsers className="footer-icon" />
            Community Reviewed & Approved
          </p>
        </div>

        {/* footer copyright info */}
        <div className="footer-card footer-copyrights">
          <p>
            Copyright <FaRegCopyright /> {currentYear} <span>Educa.</span> - A
            Product of <span>NexusLabs</span> Sri Lanka. All rights reserved.
          </p>
          <br />
          <p>
            Designed & Engineered <FaHeart /> by
            <a
              className="author-link"
              // href="http://github.com/lakshan-beast"
              href="https://lakshan-sandeepa-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer">
              Lakshan
            </a>
          </p>
        </div>
      </div>

      {/* ================= 🎁 ID GENERATOR POPUP MODAL ================= */}

      {/* // activeModel  */}
      {activeModal && (
        <div
          className="login-overlay"
          onClick={() => {
            setActiveModal(false);
          }}>
          <div onClick={(e) => e.stopPropagation()}>
            <button
              className="close-x"
              onClick={() => setActiveModal(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "none",
                background: "#f1f5f9",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#666",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              ✕
            </button>

            {activeModal === "PRIVACY" && (
              <Privacy onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "TERMS" && (
              <Terms onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "UPDATES" && (
              <Updates onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "COMING_SOON" && (
              <ComingSoon onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "ABOUT" && (
              <About onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "NEXUS_LABS" && (
              <NexusLabs onClose={() => setActiveModal(null)} />
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
