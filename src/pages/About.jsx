// import React from "react";
import { FaGraduationCap, FaCircleCheck } from "react-icons/fa6";

const About = ({ onClose }) => {
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
            <FaGraduationCap />
          </div>
          <h2
            style={{
              color: "#03204b",
              margin: 0,
              fontWeight: "900",
              fontSize: "1.4rem",
              letterSpacing: "-0.5px",
            }}>
            The educa. Vision
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.82rem",
              marginTop: "4px",
              fontWeight: "600",
            }}>
            Cognitive Educational Ecosystem Architecture
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
          educa. is not a conventional learning management system built for
          passive video consumption. It is a next-generation cognitive
          educational ecosystem engineered to dynamically adapt to a student's
          personal absorption rate. By merging cloud automation with localized
          microcopy parameters, the platform functions as an elite 24/7 digital
          tutor, meticulously guiding Grade 10 and 11 candidates toward absolute
          academic dominance [INDEX 4].
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
            <FaCircleCheck /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
