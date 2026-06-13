// // import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaShieldHalved,
//   FaUserLock,
//   FaEyeSlash,
//   FaCircleCheck,
//   //   FaCircleXmark,
// } from "react-icons/fa6";

// const Privacy = () => {
//   const navigate = useNavigate();

//   // const [showGenModal, setShowGenModal] = useState(false);

//   return (
//     <div>
//       <div className="privacy-card">
//         {/* {showGenModal && ( */}
//         <button
//           className="close-x"
//           // onClick={() => setShowGenModal(true)}
//           style={{
//             position: "absolute",
//             top: "10px",
//             right: "20px",
//             background: "none",
//             border: "none",
//             fontSize: "2rem",
//             cursor: "pointer",
//           }}>
//           &times;
//         </button>
//         {/* // )} */}
//         {/* Header Icon */}
//         <div style={{ textAlign: "center", marginBottom: "30px" }}>
//           <div
//             style={{
//               width: "70px",
//               height: "70px",
//               background: "#2ecc71",
//               color: "white",
//               borderRadius: "50%",
//               display: "inline-flex",
//               justifyContent: "center",
//               alignItems: "center",
//               fontSize: "2rem",
//               marginBottom: "15px",
//             }}>
//             <FaShieldHalved />
//           </div>
//           <h2 style={{ color: "#1a0a54", margin: 0, fontWeight: "800" }}>
//             Privacy Policy
//           </h2>
//           <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "5px" }}>
//             Student & Parent Data Integrity Standard
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
//             <FaUserLock /> 1. Student Identity Safeguarding
//           </h4>
//           <p>
//             We are fully committed to protecting the dynamic privacy of minors.
//             Student identities, test scores, and mobile tracking records
//             compiled within this system are explicitly restricted from any
//             third-party advertising or public data brokers. Data sets are
//             securely maintained inside Google Firebase servers with robust
//             algorithmic constraints.
//           </p>

//           <h4 style={{ color: "#1a0a54" }}>
//             <FaEyeSlash /> 2. Dynamic Identity Masking (XXXX Logic)
//           </h4>
//           <p>
//             To preserve student confidentiality on communal indices, the
//             platform executes a native identity mask algorithm across all public
//             interfaces. Student identification strings rendered on global logs
//             are programmatically converted into an untraceable layout (e.g.,{" "}
//             <code>EDU-MES-11-LAKXXXXX-9999</code>), ensuring complete localized
//             obscurity.
//           </p>

//           <h4 style={{ color: "#1a0a54" }}>3. Data Application Scope</h4>
//           <p>
//             Administrative staff collect student metadata solely for direct
//             parent communication triggers. Financial ledgers and weekly progress
//             reports are rendered instantly to unique parental gateways via
//             automated web string integrations linked directly with WhatsApp
//             messaging protocols.
//           </p>
//         </div>

//         {/* Confirmation Action Button */}
//         <div
//           style={{
//             marginTop: "30px",
//             borderTop: "1px solid #eee",
//             paddingTop: "25px",
//             textAlign: "right",
//           }}>
//           <button
//             onClick={() => navigate("/")}
//             style={{
//               background: "#2ecc71",
//               color: "white",
//               border: "none",
//               padding: "12px 35px",
//               borderRadius: "10px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "8px",
//               fontSize: "0.9rem",
//               boxShadow: "0 4px 12px rgba(46,204,113,0.2)",
//             }}>
//             <FaCircleCheck /> Acknowledge Privacy
//           </button>
//         </div>
//       </div>
//     </div>
//     // )}
//   );
// };

// export default Privacy;

// import React from "react";
import {
  FaShieldHalved,
  FaUserLock,
  FaEyeSlash,
  FaCircleCheck,
  FaSquarePollVertical,
} from "react-icons/fa6";

const Privacy = ({ onClose }) => {
  return (
    <div>
      <div className="privacy-card">
        {/* Header Icon & Brand Sub-heading */}
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
            <FaShieldHalved />
          </div>
          <h2
            style={{
              color: "#03204b",
              margin: 0,
              fontWeight: "900",
              fontSize: "1.4rem",
              letterSpacing: "-0.5px",
            }}>
            Data Privacy Standard
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.82rem",
              marginTop: "4px",
              fontWeight: "600",
            }}>
            Enterprise Student & Parent Information Integrity
          </p>
        </div>

        {/* Professional High-Converting Legal Content */}
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
            <FaUserLock style={{ color: "#03204b" }} /> 1. Next-Gen Identity
            Safeguarding
          </h4>
          <p style={{ marginTop: "6px", marginBottom: "16px" }}>
            We are deeply committed to ensuring absolute protection for all
            minor students. Personal identities, parental contact grids, and
            academic scores managed within educa. are strictly restricted from
            external third-party access, tracking networks, or public data
            brokers. All credentials are fully encrypted and secured within
            isolated Google Firebase Enterprise clusters [INDEX 51].
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
            <FaEyeSlash style={{ color: "#03204b" }} /> 2. Real-Time
            Cryptographic Masking
          </h4>
          <p style={{ marginTop: "6px", marginBottom: "16px" }}>
            To sustain maximum confidentiality across communal interfaces, the
            platform executes a native tokenized string-masking algorithm.
            Public log tables, leaderboard indexes, and verification indices
            never render real names, programmatically transforming strings into
            decentralized formats (e.g., <code>EDU-11-LAKXXXXX-9999</code>)
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
            <FaSquarePollVertical style={{ color: "#03204b" }} /> 3. Verified
            Multi-Subject Scope
          </h4>
          <p style={{ marginTop: "6px", marginBottom: "0" }}>
            Academic infrastructure metadata is used solely to route immediate
            progress insights. Performance metrics, weekly lesson trackers, and
            exam summaries are instantly distributed to unique parental gateways
            using secure, high-availability data integrations synced perfectly
            with local institution parameters [INDEX 4].
          </p>
        </div>

        {/* Action Button: Calls the parent closing method */}
        <div
          style={{
            marginTop: "25px",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "20px",
            textAlign: "right",
          }}>
          <button
            onClick={onClose}
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
            <FaCircleCheck /> Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
