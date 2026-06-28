import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { FaTrashCan, FaCalendarDays, FaUserPen } from "react-icons/fa6";

const ClassNoticeVault = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedGrade, setSelectedGrade] = useState("6");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectNoticeId, setSelectNoticeId] = useState(null);

  const [formData, setFormData] = useState({
    type: "General-Notice",
    text: "",
  });

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
        console.error("Cloud Secure Notice Stream Error:", err);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [facultyFieldLock, selectedGrade]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.text.trim() === "") {
      setError("Please enter the announcement message!");
      setIsSubmitting(false);
      return;
    }

    const docId = "NOT-" + Date.now().toString().slice(-6);
    const noticeCloudData = {
      id: docId,
      type: formData.type,
      text: formData.text.trim(),
      date: new Date().toISOString().split("T")[0],
      grade: String(selectedGrade),
      subject: facultyFieldLock,
      author:
        facultyFieldLock === "maths"
          ? "Janaka Sir"
          : facultyFieldLock === "science"
            ? "Science Sir"
            : "English Teacher",
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "class_notices", docId), noticeCloudData);
      setSuccess(
        `The announcement was successfully broadcast live to Grade ${selectedGrade}!`,
      );
      setError("");
      setFormData({ type: "General-Notice", text: "" });
    } catch (err) {
      console.error("Cloud Save Notice Error:", err);
      setError("An error occurred while saving the announcement to the cloud!");
    }
    setIsSubmitting(false);
  };

  const handleDeleteNotice = (id) => {
    setSelectNoticeId(id);
    setIsModalOpen(true);
  };

  const confirmRemoveNotice = async () => {
    setIsModalOpen(false);
    if (!selectNoticeId) return;

    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "class_notices", selectNoticeId));
      setSuccess(
        "The announcement was successfully removed from Google Cloud!",
      );
      setError("");
    } catch (err) {
      console.error("Delete Notice Error:", err);
      setError("An error occurred while deleting the announcement cloud!");
    }
    setIsLoading(false);
  };

  return (
    <div className="vault-container">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Confirm Action</h3>
            <p>
              Are you sure you want to permanently remove this notice from
              Google Cloud?
            </p>
            <div className="actions-buttons">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-button">
                Cancel
              </button>
              <button onClick={confirmRemoveNotice} className="confirm-button">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div className="modal-overlay">
        <div className="modal-card">
          {error && <div className="error-content">⚠️ {error}</div>}
          {success && <div className="success-content">✓ {success}</div>}
        </div>
      </div> */}

      <div className="notice-vault-grid">
        {/* 📝 FORM PORTAL */}
        <form
          onSubmit={handleSubmit}
          className="vault-publish-form styled-form">
          <h3>
            Broadcast to Grade (
            {selectedGrade === "11-Paper" ? "11 Paper Class" : selectedGrade})
          </h3>

          <div className="input-group">
            <label>Select Grade Class</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}>
              <option value="6">Grade 6 </option>
              <option value="7">Grade 7 </option>
              <option value="8">Grade 8 </option>
              <option value="9">Grade 9 </option>
              <option value="10">Grade 10 </option>
              <option value="11">Grade 11 Theory/Revision</option>
              <option value="11-Paper">
                Grade 11 Premium Paper Class
              </option>{" "}
            </select>
          </div>

          <div className="input-group">
            <label>Notice Type / Event Tag</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="vault-dropdown">
              <option value="General-Notice"> General Notice</option>
              <option value="Exam-Schedules"> Exam Schedule</option>
              <option value="Parent-Meetings"> Parent Meeting</option>
              <option value="Special-Sessions"> Special Session</option>
            </select>
          </div>

          <div className="input-group">
            <label>Message Text Description</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Type the announcement details..."
              rows="5"></textarea>
          </div>
          {error && <div className="error-content"> {error}</div>}
          {success && <div className="success-content"> {success}</div>}

          <button type="submit" disabled={isSubmitting} className="login-btn">
            {isSubmitting ? "Broadcasting..." : "Publish to Class Portal"}
          </button>
        </form>

        {/* 📢 LIVE NOTICES STREAM VIEW */}
        <div className="vault-live-feed">
          <h3>Active Grade ({selectedGrade}) Notices</h3>

          {isLoading ? (
            <div className="vault-loading">Streaming Live Cloud Vault...</div>
          ) : notices.length === 0 ? (
            <div className="vault-empty">
              No announcements published for Grade {selectedGrade} yet.
            </div>
          ) : (
            <div className="vault-scroll-list">
              {notices.map((item) => (
                <div key={item.id} className="notice-card">
                  <div className="notice-top-meta">
                    <span className="badge-type-tag">{item.type}</span>
                    <small>
                      <FaCalendarDays /> {item.date}
                    </small>
                  </div>
                  <p className="notice-main-text">{item.text}</p>
                  <div className="notice-footer">
                    <span>
                      <FaUserPen /> {item.author}
                    </span>
                    <button
                      onClick={() => handleDeleteNotice(item.id)}
                      className="vault-delete-btn"
                      title="Delete Announcement">
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassNoticeVault;
