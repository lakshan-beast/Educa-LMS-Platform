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
        <div className="privacy-top">
          <div className="privacy-header">
            <FaHourglassHalf />
          </div>
          <h2>Product Evolution Roadmap</h2>
          <p>Next-Generation SaaS Architecture Pipeline</p>
        </div>

        <div className="privacy-container">
          <h4>
            <FaSquarePollVertical className="icon" /> Enterprise Parent
            Gateway (Target: July 2026)
          </h4>
          <p>
            A dedicated real-time analytical interface built for guardians to
            monitor cross-subject score tracking, automated attendance metrics,
            and direct administrative escalation paths without interfering with
            the minor's main terminal dashboard.
          </p>

          <h4>
            <FaLightbulb className="icon" /> AI Study Studio Hub (Target:
            August 2026)
          </h4>
          <p className="last-bottom">
            A comprehensive, full-page workspace introducing real-time cognitive
            gap detection. The platform will dynamically analyze weak subject
            areas, generate custom revision test arrays, and assign specific
            micro-learning tasks automatically .
          </p>
        </div>

        <div className="privacy-actions">
          <button onClick={onClose} className="close-button">
            <FaCircleCheck /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
