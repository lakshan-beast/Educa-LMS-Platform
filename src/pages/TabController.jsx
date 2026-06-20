import { useState } from "react";
import { Link } from "react-router-dom";

import ClassesDetails from "./ClassesDetails";
import LiveNoticeDisplay from "../components/LiveNotice";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const TabController = () => {
  const [activeTab, setActiveTab] = useState("SCHEDULE");

  return (
    <div className="tab-system-wrapper page-container">
      <div className="system-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link className="back-btn" to="/">
            <FaArrowLeft /> Back to Home
          </Link>
          <Link className="back-btn" to="/dashboard">
            Back to Dashboard <FaArrowRight />
          </Link>
        </div>

        {/* 👑 🎛️ CENTRAL CONTROL BUTTONS ROW */}
        <div className="tab-control-buttons">
          <button
            onClick={() => setActiveTab("SCHEDULE")}
            className={`tab-btn ${activeTab === "SCHEDULE" ? "active" : ""}`}>
            Class Schedule
          </button>
          <button
            onClick={() => setActiveTab("NOTICE")}
            className={`tab-btn ${activeTab === "NOTICE" ? "active" : ""}`}>
            Class Notices
          </button>
        </div>

        {/* 📡 DYNAMIC COMPONENT INJECTION PORTAL */}
        <div className="tab-content-display">
          {activeTab === "SCHEDULE" && <ClassesDetails />}
          {activeTab === "NOTICE" && <LiveNoticeDisplay />}
        </div>
      </div>
    </div>
  );
};

export default TabController;
