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

const ClassNoticeVault = ({ selectedGrade }) => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setError("Please enter the announcement message! ⚠️");
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
        "The announcement was successfully broadcast live to the entire site!",
      );
      setError("");
      setFormData({ type: "General-Notice", text: "" });
    } catch (err) {
      console.error("Cloud Save Notice Error:", err);
      setError("නිවේදනය Cloud එකට සේව් කිරීමේදී දෝෂයක් සිදු විය!");
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
      setError("නිවේදනය Cloudෙන් මැකීමේදී දෝෂයක් සිදු විය!");
    }
    setIsLoading(false);
  };

  return (
    <div className="notice-vault-container">
      {/* ⚠️ DELETE CONFIRMATION MODAL POPUP */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <h3>Confirm Action</h3>
            <p>
              Are you sure you want to permanently remove this notice from
              Google Cloud? [INDEX 4, 51]
            </p>
            <div className="modal-btn-row">
              <button
                onClick={confirmRemoveNotice}
                className="modal-confirm-btn">
                Yes, Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="notice-vault-grid">
        {/* 📝 FORM PORTAL */}
        <form onSubmit={handleSubmit} className="vault-publish-form">
          <h3>Broadcast to Grade {selectedGrade}</h3>

          {error && <div className="form-alert error-alert">{error}</div>}
          {success && <div className="form-alert success-alert">{success}</div>}

          <div className="vault-field">
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

          <div className="vault-field">
            <label>Message Text Description</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Type the announcement details..."
              rows="5"></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="vault-submit-btn">
            {isSubmitting ? "Broadcasting..." : "Publish to Class Portal"}
          </button>
        </form>

        {/* 📢 LIVE NOTICES STREAM VIEW */}
        <div className="vault-live-feed">
          <h3>Active Grade {selectedGrade} Notices</h3>

          {isLoading ? (
            <div className="vault-loading">Streaming Live Cloud Vault...</div>
          ) : notices.length === 0 ? (
            <div className="vault-empty">
              No announcements published for Grade {selectedGrade} yet.
            </div>
          ) : (
            <div className="vault-scroll-list">
              {notices.map((item) => (
                <div key={item.id} className="vault-notice-card">
                  <div className="vault-card-top">
                    <span className="badge-type-tag">{item.type}</span>
                    <small>
                      <FaCalendarDays /> {item.date}
                    </small>
                  </div>
                  <p className="vault-card-text">{item.text}</p>
                  <div className="vault-card-footer">
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
