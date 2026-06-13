// import React from "react";
import { FaCode, FaCircleCheck } from "react-icons/fa6";

const NexusLabs = ({ onClose }) => {
  return (
    <div>
      <div className="privacy-card">
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div
            style={{
              width: "65px",
              height: "65px",
              background: "#001b42",
              color: "white",
              borderRadius: "50%",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.8rem",
              marginBottom: "12px",
              boxShadow: "0 8px 20px rgba(3,32,75,0.15)",
            }}>
            <FaCode />
          </div>
          <h2
            style={{
              color: "#001b42",
              margin: 0,
              fontWeight: "900",
              fontSize: "1.4rem",
              letterSpacing: "-0.5px",
            }}>
            NexusLabs Studio Signature
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.82rem",
              marginTop: "4px",
              fontWeight: "600",
            }}>
            High-Availability Cloud Infrastructure Blueprint
          </p>
        </div>

        <div
          className="legal-content"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            padding: "20px",
            background: "#f8fafc",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            fontSize: "0.88rem",
            lineHeight: "1.7",
            color: "#334155",
            textAlign: "justify",
          }}>
          This premium academic infrastructure was architected, coded, and
          deployed 100% from scratch by Lead Software Architect{" "}
          <strong>Lakshan</strong> [INDEX 4]. Engineered using a highly
          resilient single-page React framework, structured non-relational
          Google Firebase real-time database schemas, and clean cross-component
          state management topologies [INDEX 4, 51]. Designed for maximum
          scalability, zero latency, and ultimate product identity [INDEX 4].
        </div>

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
              background: "#001b42",
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
            <FaCircleCheck /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NexusLabs;
