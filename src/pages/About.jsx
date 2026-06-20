// import React from "react";
import { FaGraduationCap, FaCircleCheck } from "react-icons/fa6";

const About = ({ onClose }) => {
  return (
    <div>
      <div className="privacy-card">
        <div className="privacy-top">
          <div className="privacy-header">
            <FaGraduationCap />
          </div>
          <h2>The educa. Vision</h2>
          <p>Cognitive Educational Ecosystem Architecture</p>
        </div>

        <div className="privacy-container">
          educa. is not a conventional learning management system built for
          passive video consumption. It is a next-generation cognitive
          educational ecosystem engineered to dynamically adapt to a student's
          personal absorption rate. By merging cloud automation with localized
          microcopy parameters, the platform functions as an elite 24/7 digital
          tutor, meticulously guiding Grade 10 and 11 candidates toward absolute
          academic dominance.
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

export default About;
