import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  FaTrashCan,
  FaCalendarDays,
  FaUserPen,
  FaBullhorn,
} from "react-icons/fa6";
import NoticePublishForm from "../../forms/NoticePublishForm"; // 👈 Popup Form එක ලින්ක් කළා

const NoticeManager = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState("11");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { subjects } = useParams();

  const currentFacultySubject =
    localStorage.getItem("admin_faculty_subject") || "MATHS";
  const facultyFieldLock = currentFacultySubject.toLowerCase();

  useEffect(() => {
    const q = query(
      collection(db, "class_notices"),
      where("subject", "==", facultyFieldLock),
      where("grade", "==", String(selectedGrade)),
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
        console.error("Notice Stream Error:", err);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [facultyFieldLock, selectedGrade]);

  const handleDeleteNotice = async (docId) => {
    if (
      window.confirm("Are you sure you want to permanently remove this notice?")
    ) {
      try {
        await deleteDoc(doc(db, "class_notices", docId));
      } catch (err) {
        console.error("Delete Notice Error:", err);
      }
    }
  };

  // Badges වලට විවිධ වර්ණ ලබා දීමේ ලොජික් එක 🎨
  const getTypeColor = (type) => {
    if (type === "Exam-Schedules") return { bg: "#fff5f5", color: "#ff4b4b" };
    if (type === "Special-Sessions") return { bg: "#ecfdf5", color: "#10b981" };
    if (type === "Parent-Meetings") return { bg: "#f0fdfa", color: "#0d9488" };
    return { bg: "#eef2ff", color: "#0056ff" };
  };

  return (
    <div className="notice-dispatcher-root-container">
      {/* 👑 LAYER A: HEADER CONTROLLER ZONE */}
      <div className="dispatcher-top-header-zone">
        <div>
          <h1>
            {currentFacultySubject} {subjects} Notice Dispatch
          </h1>
          <p className="dispatcher-subtext">
            Manage and broadcast live announcements to targeted grade clusters.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="broadcast-trigger-btn">
          <FaBullhorn /> Broadcast New Notice
        </button>
      </div>

      {/* 💊 LAYER B: FILTER CONTROL DOCK */}
      <div className="grade-filter-dock-row">
        <span className="dock-meta-label">Filter by Grade:</span>
        {["6", "7", "8", "9", "10", "11", "11-Paper"].map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGrade(g)}
            className={`grade-filter-pill ${selectedGrade === g ? "pill-active" : ""}`}>
            {g === "11-Paper" ? "11 Paper" : `Grade ${g}`}
          </button>
        ))}
      </div>

      {/* 💻 LAYER C: LIVE FEED RECEPTACLE */}
      <div className="live-feed-receptacle-panel">
        <h3 className="feed-core-heading">
          Active Core Feed (
          {selectedGrade === "11-Paper"
            ? "11 Paper Class"
            : `Grade ${selectedGrade}`}
          )
        </h3>

        {isLoading ? (
          <div className="live-ledger-streaming-state">
            Streaming Live Notices from Cloud Ledger...
          </div>
        ) : notices.length === 0 ? (
          <div className="live-ledger-empty-notice">
            No announcements published for this cluster yet.
          </div>
        ) : (
          <div className="notice-vertical-stack-feed">
            {notices.map((item) => {
              const badgeStyle = getTypeColor(item.type);
              return (
                <div
                  key={item.docId}
                  className={`notice-bulletin-node-card ${item.isUrgent ? "urgent-alert-node" : ""}`}>
                  <div className="node-top-meta-bar">
                    <span
                      className="node-category-tag"
                      style={{
                        background: badgeStyle.bg,
                        color: badgeStyle.color,
                      }}>
                      {item.isUrgent ? "🔥 URGENT | " : ""}
                      {item.type.replace("-", " ")}
                    </span>
                    <small className="node-logged-date">
                      <FaCalendarDays /> {item.date}
                    </small>
                  </div>

                  <p className="node-actual-text-message">{item.text}</p>

                  <div className="node-footer-action-hub">
                    <span className="node-author-tag">
                      <FaUserPen /> {item.author}
                    </span>
                    <button
                      onClick={() => handleDeleteNotice(item.docId)}
                      className="node-delete-btn"
                      title="Delete Announcement">
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* POPUP MODAL CONTROL */}
      <NoticePublishForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedGrade={selectedGrade}
        facultyFieldLock={facultyFieldLock}
      />
    </div>
  );
};

export default NoticeManager;
