import { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // 👑 අපේ මධ්‍යම Firebase පාලම
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore"; // ☁️ Cloud Tools
import { FaBullhorn, FaCalendarCheck } from "react-icons/fa6"; // 👑 🆕 Creative Icons
import { ImSpinner } from "react-icons/im";

const LiveNoticeDisplay = ({ studentGrade, studentSubject }) => {
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNotice = async () => {
      setTimeout(() => setIsLoading(true), 0);
      try {
        // ☁️ Firebase එකෙන් ළමයාගේ ශ්‍රේණියට සහ විෂයට අදාළව දාපු අලුත්ම නිවේදනය (Notice) පමණක් Query කරයි
        const q = query(
          collection(db, "class_notices"),
          where("grade", "==", studentGrade || "11"),
          where("subject", "==", (studentSubject || "maths").toLowerCase()),
          orderBy("createdAt", "desc"), // 🕒 අලුත්ම නිවේදනය උඩටම ගනී
          limit(1), // ☝️ එකක් පමණක් පෙන්වයි
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docDoc = querySnapshot.docs[0];
          setNotice({ id: docDoc.id, ...docDoc.data() });
        } else {
          setNotice(null);
        }
      } catch (err) {
        console.error("Notice Fetch Error:", err);
      }
      setTimeout(() => setIsLoading(false), 0);
    };

    if (studentGrade && studentSubject) {
      fetchLatestNotice();
    }
  }, [studentGrade, studentSubject]);

  if (isLoading) {
    return (
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #edf2f9",
          textAlign: "center",
          color: "#03204b",
          fontWeight: "600",
          fontSize: "0.85rem",
        }}>
        <ImSpinner
          className="loading-spin"
          style={{ marginRight: "12px", animation: "spin 1s linear infinite" }}
        />
        Syncing Live Announcements...
      </div>
    );
  }

  if (!notice) {
    return (
      <div
        style={{
          background: "#f8faff",
          padding: "20px",
          borderRadius: "16px",
          border: "1px dashed #c7d2fe",
          textAlign: "center",
          color: "#777",
          fontSize: "0.85rem",
        }}>
        📢 No new special announcements from your teacher for today.
      </div>
    );
  }

  return (
    /* ==================== 👑 PREMIUM NOTICE DISPLAY CARD ==================== */
    <div
      className="premium-notice-card"
      style={{
        // background: "linear-gradient(135deg, #fffcf5 0%, #fff9e6 100%)", // 💡 කැපී පෙනෙන ලස්සන ක්‍රීම් වර්ණයක්
        borderLeft: "6px solid #f39c12", // ⚠️ Warning Yellow Border
        padding: "22px 25px",
        borderRadius: "18px",
        boxShadow: "0 6px 18px rgba(243,156,18,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        textAlign: "left",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#d35400",
            fontWeight: "800",
            fontSize: "0.95rem",
            letterSpacing: "0.3px",
          }}>
          <FaBullhorn
            className="blink-animation"
            style={{ fontSize: "1.1rem" }}
          />
          <span>LATEST CLASS NOTICE</span>
        </div>

        {/* Creative Date Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "white",
            padding: "5px 12px",
            borderRadius: "10px",
            fontSize: "0.78rem",
            color: "#555",
            fontWeight: "700",
            border: "1px solid #ffeaa7",
          }}>
          <FaCalendarCheck style={{ color: "#f39c12" }} />
          <span>{notice.dateClaim || "Today"}</span>
        </div>
      </div>

      {/* Main Notice Title */}
      <h4
        style={{
          margin: "5px 0 0",
          color: "#1a0a54",
          fontWeight: "800",
          fontSize: "1.1rem",
          lineHeight: "1.4",
        }}>
        {notice.title}
      </h4>

      {/* Detailed Content Box */}
      <p
        style={{
          margin: 0,
          color: "#444",
          fontSize: "0.88rem",
          lineHeight: "1.5",
          fontWeight: "500",
        }}>
        {notice.content}
      </p>
      {/* Teacher Sign Footer */}
      <div
        style={{
          textAlign: "right",
          borderTop: "1px solid #fde49e",
          paddingTop: "8px",
          marginTop: "4px",
          fontSize: "0.78rem",
          color: "#777",
          fontWeight: "600",
        }}>
        By:{" "}
        <span style={{ color: "#1a0a54" }}>
          {notice.author || "Management"}
        </span>
      </div>
    </div>
  );
};

export default LiveNoticeDisplay;
