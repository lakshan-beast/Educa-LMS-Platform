import { useState } from "react";

import ClassesDetails from "./ClassesDetails";
import LiveNoticeDisplay from "../components/LiveNotice";

const TabController = () => {
  const [activeTab, setActiveTab] = useState("SCHEDULE");

  return (
    <div className="tab-system-wrapper">
      {/* 👑 🎛️ CENTRAL CONTROL BUTTONS ROW */}
      <div className="tab-control-buttons">
        <button
          onClick={() => setActiveTab("SCHEDULE")}
          className={`tab-btn ${activeTab === "SCHEDULE" ? "active" : ""}`}>
          📅 Class Schedule
        </button>
        <button
          onClick={() => setActiveTab("NOTICE")}
          className={`tab-btn ${activeTab === "NOTICE" ? "active" : ""}`}>
          📢 Class Notices
        </button>
      </div>

      {/* 📡 DYNAMIC COMPONENT INJECTION PORTAL */}
      <div className="tab-content-display">
        {activeTab === "SCHEDULE" && <ClassesDetails />}
        {activeTab === "NOTICE" && <LiveNoticeDisplay />}
      </div>
    </div>
  );
};

export default TabController;
