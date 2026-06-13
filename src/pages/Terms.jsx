// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaScaleBalanced,
//   FaShieldHalved,
//   FaFileContract,
//   FaCircleCheck,
//   FaCircleXmark,
// } from "react-icons/fa6";

// const Terms = () => {
//   const navigate = useNavigate();
//   const [hasAgreed, setHasAgreed] = useState(false);

//   const handleAccept = () => {
//     setHasAgreed(true);
//     alert("ඔබ සේවා කොන්දේසි සාර්ථකව පිළිගන්නා ලදී! 🟢");
//     navigate("/"); // හෝම් පේජ් එකට පන්නනවා
//   };

//   return (
//     <div
//       className="legal-wrapper"
//       style={{
//         padding: "50px 20px",
//         background: "#f8faff",
//         minHeight: "90vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}>
//       <div
//         className="legal-container"
//         style={{
//           maxWidth: "750px",
//           background: "white",
//           padding: "40px",
//           borderRadius: "24px",
//           boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
//           border: "1px solid #eef2ff",
//         }}>
//         {/* Header Icon */}
//         <div style={{ textAlign: "center", marginBottom: "30px" }}>
//           <div
//             style={{
//               width: "70px",
//               height: "70px",
//               background: "#1a0a54",
//               color: "white",
//               borderRadius: "50%",
//               display: "inline-flex",
//               justifyContent: "center",
//               alignItems: "center",
//               fontSize: "2rem",
//               marginBottom: "15px",
//             }}>
//             <FaFileContract />
//           </div>
//           <h2 style={{ color: "#1a0a54", margin: 0, fontWeight: "800" }}>
//             Terms of Service (සේවා කොන්දේසි)
//           </h2>
//           <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "5px" }}>
//             Last Updated: May 2026
//           </p>
//         </div>

//         {/* Legal Text Area */}
//         <div
//           className="legal-content"
//           style={{
//             maxHeight: "350px",
//             overflowY: "auto",
//             padding: "20px",
//             background: "#fcfcfd",
//             borderRadius: "16px",
//             border: "1px solid #eee",
//             fontSize: "0.92rem",
//             lineHeight: "1.6",
//             color: "#333",
//           }}>
//           <h4 style={{ color: "#1a0a54", marginTop: 0 }}>
//             <FaScaleBalanced /> 1. Intellectual Property Ownership
//           </h4>
//           <p>
//             The entire source code, user interface designs, visual assets, and
//             underlying software architecture of the <strong>educa.</strong>{" "}
//             platform are the exclusive intellectual property of{" "}
//             <strong>Lakshan (The Developer)</strong>. Users and faculties are
//             granted a limited, non-transferable license to access the system.
//             Any unauthorized copying, distribution, or reverse-engineering of
//             this software is strictly prohibited by law.
//           </p>

//           <h4 style={{ color: "#1a0a54" }}>
//             <FaShieldHalved /> 2. SaaS Subscription & Maintenance Agreement
//           </h4>
//           <p>
//             This platform operates under a Fixed Monthly Subscription Service
//             level agreement. Partnered teaching faculties are strictly bound to
//             settle the agreed monthly maintenance tokens to ensure uninterrupted
//             cloud hosting, database synchronization, and server operations.
//             Failure to settle dues within the designated cycle may result in
//             temporary administration panel deployment suspension.
//           </p>

//           <h4 style={{ color: "#1a0a54" }}>3. Permitted Academic Usage</h4>
//           <p>
//             The administrative portals, class logs, and score registries are
//             explicitly reserved for authorized card-marker staff and teachers.
//             Data entries must belong strictly to registered institutional
//             students. Any misuse of system parameters, script injections, or
//             brute-force logins will result in permanent programmatic IP
//             restriction.
//           </p>
//         </div>

//         {/* Interactive Confirmation and Decline Buttons */}
//         <div
//           style={{
//             marginTop: "30px",
//             borderTop: "1px solid #eee",
//             paddingTop: "25px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: "15px",
//           }}>
//           <button
//             onClick={() => navigate("/")}
//             style={{
//               background: "#fce4e4",
//               color: "#c0392b",
//               border: "none",
//               padding: "12px 24px",
//               borderRadius: "10px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "8px",
//               fontSize: "0.9rem",
//             }}>
//             <FaCircleXmark /> Decline / Cancel
//           </button>
//           <button
//             onClick={handleAccept}
//             style={{
//               background: "#1a0a54",
//               color: "white",
//               border: "none",
//               padding: "12px 30px",
//               borderRadius: "10px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "8px",
//               fontSize: "0.9rem",
//               boxShadow: "0 4px 12px rgba(26,10,84,0.2)",
//             }}>
//             <FaCircleCheck /> I Accept Terms
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Terms;

// new
// import React from "react";
// import {
//   FaFileContract,
//   FaComputer,
//   FaKey,
//   FaCircleCheck,
//   FaDatabase
// } from "react-icons/fa6";

// const Terms = ({ onClose }) => {
//   return (
//     <div>
//       <div className="privacy-card" style={{ padding: "10px 0" }}>

//         <div style={{ textAlign: "center", marginBottom: "25px" }}>
//           <div
//             style={{
//               width: "65px",
//               height: "65px",
//               background: "#03204b",
//               color: "white",
//               borderRadius: "50%",
//               display: "inline-flex",
//               justifyContent: "center",
//               alignItems: "center",
//               fontSize: "1.8rem",
//               marginBottom: "12px",
//               boxShadow: "0 8px 20px rgba(3,32,75,0.15)"
//             }}>
//             <FaFileContract />
//           </div>
//           <h2 style={{ color: "#03204b", margin: 0, fontWeight: "900", fontSize: "1.4rem", letterSpacing: "-0.5px" }}>
//             Platform Terms of Service
//           </h2>
//           <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: "4px", fontWeight: "600" }}>
//             Operational Guidelines & End-User License Agreement
//           </p>
//         </div>

//         <div
//           className="legal-content"
//           style={{
//             maxHeight: "300px",
//             overflowY: "auto",
//             padding: "20px",
//             background: "#f8fafc",
//             borderRadius: "16px",
//             border: "1px solid #e2e8f0",
//             fontSize: "0.85rem",
//             lineHeight: "1.6",
//             color: "#334155",
//           }}
//         >
//           <h4 style={{ color: "#03204b", marginTop: 0, fontSize: "0.9rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
//             <FaKey style={{ color: "#03204b" }} /> 1. Single-Device Authentication Lock
//           </h4>
//           <p style={{ marginTop: "6px", marginBottom: "16px" }}>
//             To maintain academic integrity, student access keys are strictly bound to a single hardware signature. Any automated script detection or parallel active sessions detected across multiple IP addresses will trigger an instant security lockdown on the respective student profile [INDEX 4].
//           </p>

//           <h4 style={{ color: "#03204b", fontSize: "0.9rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
//             <FaComputer style={{ color: "#03204b" }} /> 2. Intellectual Property & Anti-Piracy
//           </h4>
//           <p style={{ marginTop: "6px", marginBottom: "16px" }}>
//             All video lectures, custom evaluation blueprints, and predictive exam papers uploaded to educa. are protected under strict international copyright regulations. Any unauthorized distribution, recording, or extraction of content will lead to immediate legal termination of the account [INDEX 4].
//           </p>

//           <h4 style={{ color: "#03204b", fontSize: "0.9rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
//             <FaDatabase style={{ color: "#03204b" }} /> 3. Dynamic Automated Ledger Terms
//           </h4>
//           <p style={{ marginTop: "6px", marginBottom: "0" }}>
//             Subscription matrix tokens and invoice logs are verified programmatically through real-time web bridges. Access authorization to advanced multi-subject tiers is dynamically adjusted based on automated cloud system parameters synchronized with system ledgers [INDEX 51].
//           </p>
//         </div>

//         <div style={{ marginTop: "25px", borderTop: "1px solid #e2e8f0", paddingTop: "20px", textAlign: "right" }}>
//           <button
//             onClick={onClose}
//             style={{
//               background: "#03204b",
//               color: "white",
//               border: "none",
//               padding: "10px 24px",
//               borderRadius: "12px",
//               fontWeight: "700",
//               cursor: "pointer",
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "8px",
//               fontSize: "0.85rem",
//               transition: "0.2s"
//             }}
//           >
//             <FaCircleCheck /> Accept Terms & Proceed
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Terms;

// import React from "react";
import {
  FaScaleBalanced,
  FaShieldHalved,
  FaFileContract,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";

const Terms = ({ onClose }) => {
  const handleAccept = () => {
    alert("ඔබ සේවා කොන්දේසි සාර්ථකව පිළිගන්නා ලදී! 🟢");
    onClose();
  };

  return (
    <div>
      <div className="privacy-card">
        {/* Header Area */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div
            style={{
              width: "65px",
              height: "65px",
              background: "#03204b",
              color: "white",
              borderRadius: "50%",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.8rem",
              marginBottom: "12px",
              boxShadow: "0 8px 20px rgba(3,32,75,0.15)",
            }}>
            <FaFileContract />
          </div>
          <h2
            style={{
              color: "#03204b",
              margin: 0,
              fontWeight: "900",
              fontSize: "1.4rem",
              letterSpacing: "-0.5px",
            }}>
            Terms of Service
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.82rem",
              marginTop: "4px",
              fontWeight: "600",
            }}>
            Operational Guidelines & End-User License Agreement
          </p>
        </div>

        {/* Premium Core Legal Content */}
        <div
          className="legal-content"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            padding: "20px",
            background: "#f8fafc",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            fontSize: "0.85rem",
            lineHeight: "1.6",
            color: "#334155",
          }}>
          <h4
            style={{
              color: "#03204b",
              marginTop: 0,
              fontSize: "0.9rem",
              fontWeight: "800",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <FaScaleBalanced style={{ color: "#03204b" }} /> 1. Intellectual
            Property Ownership
          </h4>
          <p style={{ marginTop: "6px", marginBottom: "16px" }}>
            The entire source code, user interface designs, visual assets, and
            underlying software architecture of the <strong>educa.</strong>{" "}
            platform are the exclusive intellectual property of{" "}
            <strong>Lakshan (The Lead Architect)</strong> [INDEX 4]. Users and
            faculties are granted a limited, non-transferable license to access
            the system. Any unauthorized copying, distribution, or
            reverse-engineering of this software is strictly prohibited by law
            [INDEX 4].
          </p>

          <h4
            style={{
              color: "#03204b",
              fontSize: "0.9rem",
              fontWeight: "800",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <FaShieldHalved style={{ color: "#03204b" }} /> 2. SaaS Subscription
            & Maintenance Agreement
          </h4>
          <p style={{ marginTop: "6px", marginBottom: "16px" }}>
            This platform operates under a Fixed Monthly Subscription Service
            level agreement [INDEX 4]. Partnered teaching faculties are strictly
            bound to settle the agreed monthly maintenance tokens to ensure
            uninterrupted cloud hosting, database synchronization, and server
            operations [INDEX 4, 51]. Failure to settle dues within the
            designated cycle may result in temporary administration panel
            deployment suspension [INDEX 4].
          </p>

          <h4
            style={{
              color: "#03204b",
              fontSize: "0.9rem",
              fontWeight: "800",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <FaFileContract style={{ color: "#03204b" }} /> 3. Permitted
            Academic Usage
          </h4>
          <p style={{ marginTop: "6px", marginBottom: "0" }}>
            The administrative portals, class logs, and score registries are
            explicitly reserved for authorized card-marker staff and teachers
            [INDEX 4]. Data entries must belong strictly to registered
            institutional students [INDEX 4]. Any misuse of system parameters,
            script injections, or brute-force logins will result in permanent
            programmatic IP restriction [INDEX 4].
          </p>
        </div>
        {/* Action Button Footer Area */}
        <div
          style={{
            marginTop: "25px",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
          }}>
          <button
            onClick={onClose}
            style={{
              background: "#fee2e2",
              color: "#ef4444",
              border: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              transition: "0.2s",
            }}>
            <FaCircleXmark /> Decline / Cancel
          </button>
          <button
            onClick={handleAccept}
            style={{
              background: "#03204b",
              color: "white",
              border: "none",
              padding: "10px 24px",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              transition: "0.2s",
            }}>
            <FaCircleCheck /> I Accept Terms
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
