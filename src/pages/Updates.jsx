// import React from "react";
import { FaRocket, FaCircleCheck } from "react-icons/fa6";

const Updates = ({ onClose }) => {
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
            <FaRocket />
          </div>
          <h2
            style={{
              color: "#03204b",
              margin: 0,
              fontWeight: "900",
              fontSize: "1.4rem",
              letterSpacing: "-0.5px",
            }}>
            Core Deployment Log (v1.5)
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.82rem",
              marginTop: "4px",
              fontWeight: "600",
            }}>
            Active Production Enhancements & Optimization Tiers
          </p>
        </div>

        <div
          className="legal-content"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            padding: "25px 20px",
            background: "#f8fafc",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            fontSize: "0.85rem",
            lineHeight: "1.8",
            color: "#334155",
          }}>
          <ul
            style={{
              margin: 0,
              paddingLeft: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
            <li>
              🔥 <strong>Neti AI Assistant Core:</strong> Integrated Refined
              Neti AI Chat Engine featuring cognitive sister persona
              configurations for gender-neutral local adaptation [INDEX 4].
            </li>
            <li>
              🌐 <strong>Live Multi-Subject Router:</strong> Deployed Live
              Multi-Subject Routing Engine linking the homepage frontend
              directly with localized administrative cloud clusters [INDEX 4].
            </li>
            <li>
              💬 <strong>Student Voices Ecosystem:</strong> Activated Student
              Voices Cloud Synchronization Framework with isolated like counters
              and real-time review filtering layers [INDEX 51].
            </li>
            <li>
              🎨 <strong>Executive Brand Refresh:</strong> Executed Monochrome
              Deep Blue Minimalist Layout Lock optimized for high-converting
              user experience metrics [INDEX 4].
            </li>
          </ul>
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
            <FaCircleCheck /> Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updates;
