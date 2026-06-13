// import React from "react";
import {
  FaHourglassHalf,
  FaCircleCheck,
  FaSquarePollVertical,
  FaLightbulb,
} from "react-icons/fa6";

const ComingSoon = ({ onClose }) => {
  return (
    <div>
      <div className="privacy-card">
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
            <FaHourglassHalf />
          </div>
          <h2
            style={{
              color: "#03204b",
              margin: 0,
              fontWeight: "900",
              fontSize: "1.4rem",
              letterSpacing: "-0.5px",
            }}>
            Product Evolution Roadmap
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.82rem",
              marginTop: "4px",
              fontWeight: "600",
            }}>
            Next-Generation SaaS Architecture Pipeline
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
            <FaSquarePollVertical style={{ color: "#03204b" }} /> 📊 1.
            Enterprise Parent Gateway (Target: July 2026)
          </h4>
          <p style={{ marginTop: "6px", marginBottom: "16px" }}>
            A dedicated real-time analytical interface built for guardians to
            monitor cross-subject score tracking, automated attendance metrics,
            and direct administrative escalation paths without interfering with
            the minor's main terminal dashboard [INDEX 4].
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
            <FaLightbulb style={{ color: "#03204b" }} /> 🧠 2. AI Study Studio
            Hub (Target: August 2026)
          </h4>
          <p style={{ marginTop: "6px", marginBottom: "0" }}>
            A comprehensive, full-page workspace introducing real-time cognitive
            gap detection. The platform will dynamically analyze weak subject
            areas, generate custom revision test arrays, and assign specific
            micro-learning tasks automatically [INDEX 4].
          </p>
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
            <FaCircleCheck /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
