// import React from "react";
import { FaCode, FaCircleCheck } from "react-icons/fa6";

const NexusLabs = ({ onClose }) => {
  return (
    <div>
      <div className="privacy-card">
        <div className="privacy-top">
          <div className="privacy-header">
            <FaCode />
          </div>
          <h2>NexusLabs Studio Signature</h2>
          <p>High-Availability Cloud Infrastructure Blueprint</p>
        </div>

        <div className="privacy-container">
          This premium academic infrastructure was architected, coded, and
          deployed 100% from scratch by Lead Software Architect
          <strong>Lakshan</strong>. Engineered using a highly resilient
          single-page React framework, structured non-relational Google Firebase
          real-time database schemas, and clean cross-component state management
          topologies. Designed for maximum scalability, zero latency, and
          ultimate product identity.
        </div>

        

        <div className="privacy-actions">
          <button onClick={onClose} className="close-button">
            <FaCircleCheck /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NexusLabs;
