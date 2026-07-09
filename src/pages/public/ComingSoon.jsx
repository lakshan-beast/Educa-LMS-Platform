// import React from "react";
import {
  FaHourglassHalf,
  FaCircleCheck,
  FaSquarePollVertical,
  FaLightbulb,
  FaComments,
  FaExpand,
  FaChartLine,
  FaAward,
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

        {/* <div className="privacy-container">
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
          </p> */}
        {/* </div> */}

        {/* 👑 UPDATED: NEXT-GENERATION ENTERPRISE PRODUCT ROADMAP POPUP MODAL */}
        <div
          className="roadmap-header-wrapper"
          style={{ marginBottom: "20px" }}>
          <h2>Product Evolution Roadmap</h2>
          <p
            style={{
              margin: "5px 0 0 0",
              color: "#8b949e",
              fontSize: "0.9rem",
            }}>
            Next-Generation SaaS Architecture Pipeline [INDEX 4]
          </p>
        </div>

        <div
          className="privacy-container"
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* 1. ENTERPRISE PARENT GATEWAY */}
          <div>
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 8px 0",
                color: "#001b42",
                fontSize: "0.95rem",
              }}>
              <FaSquarePollVertical
                className="icon"
                style={{ color: "#0056ff" }}
              />{" "}
              Enterprise Parent Gateway (Target: July 2026)
            </h4>
            <p
              style={{
                margin: 0,
                color: "#484848",
                fontSize: "0.85rem",
                lineHeight: "1.5",
              }}>
              A dedicated real-time analytical interface built for guardians to
              monitor cross-subject score tracking, automated attendance
              metrics, and direct administrative financial approval loops
              without interfering with the minor's main terminal dashboard
              [INDEX 4, 51].
            </p>
          </div>

          {/* 2. PEER-TO-PEER MENTOR STUDY GUILD CHAT */}
          <div>
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 8px 0",
                color: "#001b42",
                fontSize: "0.95rem",
              }}>
              <FaComments className="icon" style={{ color: "#ff9900" }} />{" "}
              Peer-to-Peer Study Guild (Target: July 2026)
            </h4>
            <p
              style={{
                margin: 0,
                color: "#484848",
                fontSize: "0.85rem",
                lineHeight: "1.5",
              }}>
              An interactive 100% full-screen community network connecting Grade
              11 students with verified peer mentors and teachers [INDEX 4].
              Features an anonymous crowd-sourced unsolved question filter
              system with zero-storage auto-delete protocols [INDEX 4, 51].
            </p>
          </div>

          {/* 3. HARDWARE-FREE QR PAYMENT GATE */}
          <div>
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 8px 0",
                color: "#001b42",
                fontSize: "0.95rem",
              }}>
              <FaExpand className="icon" style={{ color: "#10b981" }} />{" "}
              Automated QR Attendance Gate (Target: August 2026)
            </h4>
            <p
              style={{
                margin: 0,
                color: "#484848",
                fontSize: "0.85rem",
                lineHeight: "1.5",
              }}>
              A zero-hardware software scanning engine enabling faculty markers
              to audit student cards directly via mobile cameras [INDEX 4].
              Supports real-time balance collections, instant zoom lock
              evictions, and automatic regular/free card waivers [INDEX 4, 51].
            </p>
          </div>

          {/* 4. SMART SCORE-ANALYTICS LEDGER */}
          <div>
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 8px 0",
                color: "#001b42",
                fontSize: "0.95rem",
              }}>
              <FaChartLine className="icon" style={{ color: "#ff4b4b" }} />{" "}
              Smart Subject Score Analytics (Target: August 2026)
            </h4>
            <p
              style={{
                margin: 0,
                color: "#484848",
                fontSize: "0.85rem",
                lineHeight: "1.5",
              }}>
              A self-diagnostic progress workspace where students document
              scores across 9 core national subjects [INDEX 4]. Integrates
              automatic line-graph progression analysis with drop-down cognitive
              gap error tagging [INDEX 4].
            </p>
          </div>

          {/* 5. GAMIFIED ELITE LEADERBOARD */}
          <div>
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 8px 0",
                color: "#001b42",
                fontSize: "0.95rem",
              }}>
              <FaAward className="icon" style={{ color: "#ffd700" }} /> Gamified
              Wall of Fame (Target: September 2026)
            </h4>
            <p
              style={{
                margin: 0,
                color: "#484848",
                fontSize: "0.85rem",
                lineHeight: "1.5",
              }}>
              A premium public-facing merit terminal showcasing the Top 10 exam
              elite scorers directly on the home page [INDEX 4]. Includes a
              multi-tier profile badge rewards matrix highlighting the top 20
              active streak holders [INDEX 4].
            </p>
          </div>

          {/* 6. AI STUDY STUDIO HUB (OLD CORE) */}
          <div>
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 8px 0",
                color: "#001b42",
                fontSize: "0.95rem",
              }}>
              <FaLightbulb className="icon" style={{ color: "#a855f7" }} /> AI
              Study Studio Hub (Target: September 2026)
            </h4>
            <p
              className="last-bottom"
              style={{
                margin: 0,
                color: "#484848",
                fontSize: "0.85rem",
                lineHeight: "1.5",
              }}>
              A comprehensive workspace introducing real-time cognitive gap
              detection. The platform will dynamically analyze weak areas,
              generate custom revision test arrays, and assign specific
              micro-learning tasks automatically [INDEX 4].
            </p>
          </div>
        </div>

        {/* <div
          className="privacy-actions"
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <button
            onClick={onClose}
            className="close-button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#0056ff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
            <FaCircleCheck /> Back to Dashboard
          </button>
        </div> */}

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
