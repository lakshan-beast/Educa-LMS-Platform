// import React from "react";
import { FaRocket, FaCircleCheck } from "react-icons/fa6";

const Updates = ({ onClose }) => {
  return (
    <div>
      <div className="privacy-card">
        <div className="privacy-top">
          <div className="privacy-header">
            <FaRocket />
          </div>
          <h2>Core Deployment Log (v1)</h2>
          <p>Active Production Enhancements & Optimization Tiers</p>
        </div>

        <div className="privacy-container">
          <ul>
            <li>
              🔥 <strong>Neti AI Assistant Core:</strong> Integrated Refined
              Neti AI Chat Engine featuring cognitive sister persona
              configurations for gender-neutral local adaptation.
            </li>
            <li>
              🌐 <strong>Live Multi-Subject Router:</strong> Deployed Live
              Multi-Subject Routing Engine linking the homepage frontend
              directly with localized administrative cloud clusters.
            </li>
            <li>
              💬 <strong>Student Voices Ecosystem:</strong> Activated Student
              Voices Cloud Synchronization Framework with isolated like counters
              and real-time review filtering layers.
            </li>
            <li>
              🎨 <strong>Executive Brand Refresh:</strong> Executed Monochrome
              Deep Blue Minimalist Layout Lock optimized for high-converting
              user experience metrics.
            </li>
          </ul>
        </div>

        <div className="privacy-actions">
          <button onClick={onClose} className="close-button">
            <FaCircleCheck /> Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updates;
