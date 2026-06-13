import React, { useState } from "react";

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <footer
      style={{
        background: "#f8fafc",
        padding: "50px 20px",
        borderTop: "1px solid #e2e8f0",
        marginTop: "80px",
        textAlign: "left",
      }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "40px",
        }}>
        {/* ==================== ⚖️ SECTION 01: LEGAL DATA ==================== */}
        <div style={{ flex: "1", minWidth: "220px" }}>
          <h4
            style={{
              color: "#03204b",
              fontSize: "0.95rem",
              fontWeight: "800",
              marginBottom: "15px",
              letterSpacing: "0.5px",
            }}>
            LEGAL COMPLIANCE
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#475569",
            }}>
            <span
              onClick={() => setActiveModal("PRIVACY")}
              style={{ cursor: "pointer", transition: "0.2s" }}>
              🔒 Privacy Policy
            </span>
            <span
              onClick={() => setActiveModal("TERMS")}
              style={{ cursor: "pointer", transition: "0.2s" }}>
              📄 Terms of Service
            </span>
          </div>
        </div>

        {/* ==================== 🚀 SECTION 02: PLATFORM EVOLUTION ==================== */}
        <div style={{ flex: "1", minWidth: "220px" }}>
          <h4
            style={{
              color: "#03204b",
              fontSize: "0.95rem",
              fontWeight: "800",
              marginBottom: "15px",
              letterSpacing: "0.5px",
            }}>
            PLATFORM EVOLUTION
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#475569",
            }}>
            <span
              onClick={() => setActiveModal("UPDATES")}
              style={{ cursor: "pointer", transition: "0.2s" }}>
              🚀 System Version Updates
            </span>
            <span
              onClick={() => setActiveModal("COMING_SOON")}
              style={{ cursor: "pointer", transition: "0.2s" }}>
              ⏳ Coming Soon Engine
            </span>
          </div>
        </div>

        {/* ==================== 💻 SECTION 03: CORPORATE IDENTITY ==================== */}
        <div style={{ flex: "1", minWidth: "220px" }}>
          <h4
            style={{
              color: "#03204b",
              fontSize: "0.95rem",
              fontWeight: "800",
              marginBottom: "15px",
              letterSpacing: "0.5px",
            }}>
            CORPORATE IDENTITY
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#475569",
            }}>
            <span
              onClick={() => setActiveModal("ABOUT")}
              style={{ cursor: "pointer", transition: "0.2s" }}>
              🧠 About educa. Platform
            </span>
            <span
              onClick={() => setActiveModal("NEXUS_LABS")}
              style={{ cursor: "pointer", transition: "0.2s" }}>
              💻 NexusLabs Studio
            </span>
          </div>
        </div>
      </div>

      {/* COPYRIGHT TEXT LAYER */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto 0 auto",
          paddingTop: "20px",
          borderTop: "1px solid #e2e8f0",
          textAlign: "center",
        }}>
        <small
          style={{ color: "#94a3b8", fontSize: "0.78rem", fontWeight: "500" }}>
          © 2026 educa. All Rights Reserved. Architected by NexusLabs Studio.
        </small>
      </div>

      {/* ==================== 🔏 THE CENTRAL BLUR MODAL WINDOW ENGINE ==================== */}
      {activeModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(3, 32, 75, 0.4)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999999,
          }}>
          <div
            style={{
              background: "white",
              padding: "35px",
              borderRadius: "24px",
              maxWidth: "520px",
              width: "90%",
              boxShadow: "0 25px 50px rgba(3,32,75,0.18)",
              position: "relative",
              textAlign: "left",
              border: "1px solid #eef2ff",
            }}>
            {/* CLOSE BUTTON */}
            <button
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
            {/* DYNAMIC CARD ROUTER */}
            {activeModal === "PRIVACY" && (
              <>
                <h3
                  style={{
                    color: "#03204b",
                    margin: "0 0 12px 0",
                    fontSize: "1.2rem",
                    fontWeight: "800",
                  }}>
                  🔒 Privacy Policy
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    lineHeight: "1.6",
                    margin: 0,
                  }}>
                  නංගිලා මල්ලිලාගේ සියලුම පැවරුම්, ලකුණු සහ Neti AI චැට් දත්ත
                  Google Cloud Storage හරහා 100%ක්ම රහස්‍යව සහ සුරක්ෂිතව සංකේතනය
                  (Encrypt) කර තබා ගන්නා බව educa. පද්ධතිය සහතික කරයි. 🛡️✨
                </p>
              </>
            )}

            {activeModal === "TERMS" && (
              <>
                <h3
                  style={{
                    color: "#03204b",
                    margin: "0 0 12px 0",
                    fontSize: "1.2rem",
                    fontWeight: "800",
                  }}>
                  📄 Terms of Service
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    lineHeight: "1.6",
                    margin: 0,
                  }}>
                  educa. Smart LMS පද්ධතියේ ඇති වීඩියෝ පන්ති, ටියුට්ස් සහ පේපර්
                  දත්ත කිසිවක් බාහිර පුද්ගලයන් අතර බෙදා හැරීම සපුරා තහනම් වේ.
                  එක් ගිණුමකින් ලොග් විය හැක්කේ එකම එක උපකරණයකින් (Single Device
                  Lock) විතරමයි ළමයෝ. 🔒
                </p>
              </>
            )}

            {activeModal === "UPDATES" && (
              <>
                <h3
                  style={{
                    color: "#03204b",
                    margin: "0 0 12px 0",
                    fontSize: "1.2rem",
                    fontWeight: "800",
                  }}>
                  🚀 System Version Updates (v1.5)
                </h3>
                <ul
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    lineHeight: "1.7",
                    margin: 0,
                    paddingLeft: "20px",
                  }}>
                  <li>🟢 Neti අක්කා Real-Time AI Chat Engine Live! [v1.5]</li>
                  <li>
                    🟢 Student Voices Cloud Feedback & Likes API Sync [v1.4]
                  </li>
                  <li>
                    🟢 Multi-Subject Live Contact Routing Infrastructure [v1.2]
                  </li>
                  <li>
                    🟢 Monochrome Deep Blue #03204b Minimalist Theme Lock [v1.0]
                  </li>
                </ul>
              </>
            )}

            {activeModal === "COMING_SOON" && (
              <>
                <h3
                  style={{
                    color: "#03204b",
                    margin: "0 0 12px 0",
                    fontSize: "1.2rem",
                    fontWeight: "800",
                  }}>
                  ⏳ Coming Soon Engine Roadmap
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    lineHeight: "1.6",
                    margin: 0,
                  }}>
                  <strong>1. Smart Parent Portal (July 2026):</strong>{" "}
                  දෙමාපියන්ට දරුවාගේ ලකුණු සහ ප්‍රගතිය සජීවීව බලන live ද්වාරය.{" "}
                  <br />
                  <br />
                  <strong>2. AI Study Studio (August 2026):</strong> ශිෂ්‍යයන්ගේ
                  දුර්වලතා හඳුනාගෙන පැය 24 පුරා වැඩ කරන Full-Page පාඩම්
                  සැලසුම්කරුවා!
                </p>
              </>
            )}

            {activeModal === "ABOUT" && (
              <>
                <h3
                  style={{
                    color: "#03204b",
                    margin: "0 0 12px 0",
                    fontSize: "1.2rem",
                    fontWeight: "800",
                  }}>
                  🧠 About educa. Smart LMS
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    lineHeight: "1.6",
                    margin: 0,
                  }}>
                  educa. කියන්නේ නිකන්ම නිකන් සාමාන්‍ය LMS එකක් නෙවෙයි. මේක
                  ශිෂ්‍යයන්ගේ දුර්වලතා හඳුනාගෙන, ලකුණු විග්‍රහ කරලා, පෞද්ගලික
                  ගුරුවරයෙක් වගේ මඟ පෙන්වන ලංකාවේ ප්‍රථම Smart Cognitive
                  Educational SaaS Ecosystem එකයි මචං!
                </p>
              </>
            )}

            {activeModal === "NEXUS_LABS" && (
              <>
                <h3
                  style={{
                    color: "#03204b",
                    margin: "0 0 12px 0",
                    fontSize: "1.2rem",
                    fontWeight: "800",
                  }}>
                  💻 NexusLabs Studio Signature
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    lineHeight: "1.6",
                    margin: 0,
                  }}>
                  This premium cognitive infrastructure was architected, coded,
                  and deployed 100% from scratch by Lead Software Architect{" "}
                  <strong>Lakshan</strong>. Engineered using React, Firebase
                  High-Availability Architecture, and Monochrome UI Bindings.
                  All engineering rights reserved © 2026.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

{
  /* <li>
              <Link
                to="/privacy"
                onClick={() => setShowGenModal(true)}
                onMouseEnter={(e) => (e.target.style.color = "#ff4b2b")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}>
                <FaCaretRight className="footer-icon" /> Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                onClick={() => setShowGenModal(true)}
                onMouseEnter={(e) => (e.target.style.color = "#ff4b2b")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}>
                <FaCaretRight className="footer-icon" /> Terms of Services
              </Link>
            </li> */
}

{
  showGenModal && (
    <div
      className="login-overlay"
      onClick={() => {
        setShowGenModal(false);
        setGeneratedID("");
      }}>
      <div
        className="login-modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "400px",
          width: "100%",
          position: "relative",
          // display: "none",
        }}>
        <button
          className="close-x"
          onClick={() => {
            // showLegelCard(false);
            setGeneratedID("");
          }}
          style={{
            position: "absolute",
            top: "50px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "2rem",
            cursor: "pointer",
          }}>
          &times;
        </button>

        <h3 style={{ color: "#26136d", marginBottom: "10px" }}>
          Generate Student ID
        </h3>
        <p
          style={{
            fontSize: "0.8rem",
            color: "#666",
            marginBottom: "20px",
          }}>
          Enter your details. Give the generated ID to your class card marker
          for activation.
        </p>

        <form onSubmit={handleGenerate} className="styled-form">
          <div className="input-group" style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: "600",
                marginBottom: "5px",
              }}>
              <FaUser /> Your Name (One Word)
            </label>
            <input
              type="text"
              name="name"
              placeholder="ex: LAKSHAN"
              required
              onChange={handleChange}
              value={formData.name}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div
            className="input-group select-subjects"
            style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: "600",
                marginBottom: "5px",
              }}>
              Select Enrolled Subjects
            </label>
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "5px",
                fontSize: "0.9rem",
              }}>
              <label>
                <input
                  type="checkbox"
                  name="maths"
                  checked={formData.maths}
                  onChange={handleChange}
                />{" "}
                Maths
              </label>
              <label>
                <input
                  type="checkbox"
                  name="english"
                  checked={formData.english}
                  onChange={handleChange}
                />{" "}
                English
              </label>
              <label>
                <input
                  type="checkbox"
                  name="science"
                  checked={formData.science}
                  onChange={handleChange}
                />{" "}
                Science
              </label>
            </div>
          </div>
          <div className="input-group" style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: "600",
                marginBottom: "5px",
              }}>
              <FaKey /> Create 4-Digit PIN
            </label>
            <input
              type="text"
              name="pin"
              maxLength="4"
              placeholder="ex: 0305"
              required
              onChange={handleChange}
              value={formData.pin}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          {/* Form එක ඇතුළත PIN field එකට යටින් මේ Password කොටස පේස්ට්
              කරන්න: */}
          <div className="input-group" style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: "600",
                marginBottom: "5px",
              }}>
              <FaKey /> Create Secret Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter a strong password"
              required
              onChange={handleChange}
              value={formData.password}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            style={{
              width: "100%",
              padding: "12px",
              background: "#26136d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
            Generate ID
          </button>

          <div
            style={{
              textAlign: "right",
              marginTop: "5px",
              marginBottom: "15px",
            }}>
            <a
              href={
                `https://wa.me/94740130305?text=Hello%20Support%20Team,%20I%20forgot%20my%20Educa%20account%20Password.%20Please%20help%20me%20to%20recover%20it.%20My%20Name%20is:%20` +
                formData.name
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.8rem",
                color: "#ff4b2b",
                textDecoration: "none",
                fontWeight: "600",
                textAlign: "center",
              }}>
              Password Forget? (Contact Support)
            </a>
          </div>
        </form>

        {/* ID එක සාර්ථකව හැදුනට පස්සේ පේන කොටස */}
        {generatedID && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f4f7ff",
              borderRadius: "12px",
              border: "1px dashed #4b6bfb",
              textAlign: "center",
            }}>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#555",
                fontWeight: "bold",
              }}>
              HI, YOUR STUDENT ID:
            </span>

            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "800",
                color: "#26136d",
                margin: "8px 0",
                letterSpacing: "0.5px",
              }}>
              {generatedID}
            </div>

            <form
              action="https://formspree.io"
              method="POST"
              style={{ marginTop: "10px" }}>
              <input type="hidden" name="Student_Name" value={formData.name} />
              <input type="hidden" name="Generated_ID" value={generatedID} />
              <input
                type="hidden"
                name="Account_Password"
                value={formData.password}
              />{" "}
              {/* 🆕 Password එක එකතු කළා */}
              <button
                type="submit"
                className="start-btn"
                style={{ width: "100%", padding: "10px" }}>
                Request Activation
              </button>
            </form>

            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedID);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              style={{
                width: "100%",
                padding: "8px",
                background: "#eef2ff",
                border: "1px solid #4b6bfb",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                color: "#4b6bfb",
              }}>
              {copied ? "✓ Copied!" : "Copy Student ID"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
