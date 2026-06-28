import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { FaCalendarCheck, FaLayerGroup } from "react-icons/fa6";

import Loader from "../components/Loader";

const LiveNoticeDisplay = () => {
  const [notices, setNotices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "class_notices"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const noticeList = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setNotices(noticeList);
        setIsLoading(false);
      },
      (err) => {
        console.error("Live Notice Stream Error:", err);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="notice-board-wrapper parts">
      <div className="notice-header">
        <h2>
          Institutional
          <span>Announcements</span>
        </h2>
        <p>
          Stay updated with the latest official notices, exam schedules, and
          class updates.
        </p>
      </div>

      {isLoading ? (
        <Loader />
      ) : notices.length === 0 ? (
        <div className="notice-empty">
          No official announcements published at the moment.
        </div>
      ) : (
        <div className="notice-grid">
          {notices.map((item) => (
            <div key={item.docId} className="notice-card card">
              <div className="notice-top-meta">
                <div className="meta-item">
                  <FaCalendarCheck />
                  <span>{item.date || "No Date"}</span>
                </div>
                <span className="type-badge">{item.type || "General"}</span>
              </div>

              <h4>
                {item.subject ? item.subject.toUpperCase() : "GENERAL"} - Grade{" "}
                {item.grade || "All"}
              </h4>

              <p className="notice-main-text">{item.text}</p>

              <div className="notice-footer">
                <span>
                  Published by:{" "}
                  <strong>{item.author || "Faculty Admin"}</strong>
                </span>
                <span className="subject-tag">
                  <FaLayerGroup /> {item.subject || "Common"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveNoticeDisplay;
