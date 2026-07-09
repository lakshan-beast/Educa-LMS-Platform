// import { useState, useEffect } from "react";
// import { db } from "../../firebaseConfig";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   doc,
//   setDoc,
//   deleteDoc,
// } from "firebase/firestore";

// import { FaTrashCan, FaCalendarDays, FaUserPen } from "react-icons/fa6";

// const ClassNoticeVault = () => {
//   const [notices, setNotices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [selectedGrade, setSelectedGrade] = useState("6");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectNoticeId, setSelectNoticeId] = useState(null);

//   const [formData, setFormData] = useState({
//     type: "General-Notice",
//     text: "",
//   });

//   const currentFacultySubject =
//     localStorage.getItem("admin_faculty_subject") || "MATHS";
//   const facultyFieldLock = currentFacultySubject.toLowerCase();

//   useEffect(() => {
//     const q = query(
//       collection(db, "class_notices"),
//       where("subject", "==", facultyFieldLock),
//       where("grade", "==", String(selectedGrade)),
//       orderBy("createdAt", "desc"),
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const noticeList = snapshot.docs.map((doc) => ({
//           docId: doc.id,
//           ...doc.data(),
//         }));
//         setNotices(noticeList);
//         setIsLoading(false);
//       },
//       (err) => {
//         console.error("Cloud Secure Notice Stream Error:", err);
//         setIsLoading(false);
//       },
//     );

//     return () => unsubscribe();
//   }, [facultyFieldLock, selectedGrade]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (formData.text.trim() === "") {
//       setError("Please enter the announcement message!");
//       setIsSubmitting(false);
//       return;
//     }

//     const docId = "NOT-" + Date.now().toString().slice(-6);
//     const noticeCloudData = {
//       id: docId,
//       type: formData.type,
//       text: formData.text.trim(),
//       date: new Date().toISOString().split("T")[0],
//       grade: String(selectedGrade),
//       subject: facultyFieldLock,
//       author:
//         facultyFieldLock === "maths"
//           ? "Janaka Sir"
//           : facultyFieldLock === "science"
//             ? "Science Sir"
//             : "English Teacher",
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await setDoc(doc(db, "class_notices", docId), noticeCloudData);
//       setSuccess(
//         `The announcement was successfully broadcast live to Grade ${selectedGrade}!`,
//       );
//       setError("");
//       setFormData({ type: "General-Notice", text: "" });
//     } catch (err) {
//       console.error("Cloud Save Notice Error:", err);
//       setError("An error occurred while saving the announcement to the cloud!");
//     }
//     setIsSubmitting(false);
//   };

//   const handleDeleteNotice = (id) => {
//     setSelectNoticeId(id);
//     setIsModalOpen(true);
//   };

//   const confirmRemoveNotice = async () => {
//     setIsModalOpen(false);
//     if (!selectNoticeId) return;

//     setIsLoading(true);
//     try {
//       await deleteDoc(doc(db, "class_notices", selectNoticeId));
//       setSuccess(
//         "The announcement was successfully removed from Google Cloud!",
//       );
//       setError("");
//     } catch (err) {
//       console.error("Delete Notice Error:", err);
//       setError("An error occurred while deleting the announcement cloud!");
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className="vault-container">
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-card">
//             <h3>Confirm Action</h3>
//             <p>
//               Are you sure you want to permanently remove this notice from
//               Google Cloud?
//             </p>
//             <div className="actions-buttons">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="cancel-button">
//                 Cancel
//               </button>
//               <button onClick={confirmRemoveNotice} className="confirm-button">
//                 Yes, Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* <div className="modal-overlay">
//         <div className="modal-card">
//           {error && <div className="error-content">⚠️ {error}</div>}
//           {success && <div className="success-content">✓ {success}</div>}
//         </div>
//       </div> */}

//       <div className="notice-vault-grid">
//         {/* 📝 FORM PORTAL */}
//         <form
//           onSubmit={handleSubmit}
//           className="vault-publish-form styled-form">
//           <h3>
//             Broadcast to Grade (
//             {selectedGrade === "11-Paper" ? "11 Paper Class" : selectedGrade})
//           </h3>

//           <div className="input-group">
//             <label>Select Grade Class</label>
//             <select
//               value={selectedGrade}
//               onChange={(e) => setSelectedGrade(e.target.value)}>
//               <option value="6">Grade 6 </option>
//               <option value="7">Grade 7 </option>
//               <option value="8">Grade 8 </option>
//               <option value="9">Grade 9 </option>
//               <option value="10">Grade 10 </option>
//               <option value="11">Grade 11 Theory/Revision</option>
//               <option value="11-Paper">
//                 Grade 11 Premium Paper Class
//               </option>{" "}
//             </select>
//           </div>

//           <div className="input-group">
//             <label>Notice Type / Event Tag</label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//               className="vault-dropdown">
//               <option value="General-Notice"> General Notice</option>
//               <option value="Exam-Schedules"> Exam Schedule</option>
//               <option value="Parent-Meetings"> Parent Meeting</option>
//               <option value="Special-Sessions"> Special Session</option>
//             </select>
//           </div>

//           <div className="input-group">
//             <label>Message Text Description</label>
//             <textarea
//               name="text"
//               value={formData.text}
//               onChange={handleInputChange}
//               placeholder="Type the announcement details..."
//               rows="5"></textarea>
//           </div>
//           {error && <div className="error-content"> {error}</div>}
//           {success && <div className="success-content"> {success}</div>}

//           <button type="submit" disabled={isSubmitting} className="login-btn">
//             {isSubmitting ? "Broadcasting..." : "Publish to Class Portal"}
//           </button>
//         </form>

//         {/* 📢 LIVE NOTICES STREAM VIEW */}
//         <div className="vault-live-feed">
//           <h3>Active Grade ({selectedGrade}) Notices</h3>

//           {isLoading ? (
//             <div className="vault-loading">Streaming Live Cloud Vault...</div>
//           ) : notices.length === 0 ? (
//             <div className="vault-empty">
//               No announcements published for Grade {selectedGrade} yet.
//             </div>
//           ) : (
//             <div className="vault-scroll-list">
//               {notices.map((item) => (
//                 <div key={item.id} className="notice-card">
//                   <div className="notice-top-meta">
//                     <span className="badge-type-tag">{item.type}</span>
//                     <small>
//                       <FaCalendarDays /> {item.date}
//                     </small>
//                   </div>
//                   <p className="notice-main-text">{item.text}</p>
//                   <div className="notice-footer">
//                     <span>
//                       <FaUserPen /> {item.author}
//                     </span>
//                     <button
//                       onClick={() => handleDeleteNotice(item.id)}
//                       className="vault-delete-btn"
//                       title="Delete Announcement">
//                       <FaTrashCan />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassNoticeVault;

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
    <div
      className="vault-container"
      style={{
        maxWidth: "900px",
        width: "100%",
        height: "100vh",
        maxHeight: "700px",
        overflowY: scroll,
      }}>
      {/* HEADER SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}>
        <div>
          <h1 style={{ margin: 0, color: "#001b42", fontSize: "1.5rem" }}>
            {currentFacultySubject} {subjects} Notice Dispatch
          </h1>
          <p
            style={{
              margin: "5px 0 0 0",
              color: "#8b949e",
              fontSize: "0.9rem",
            }}>
            Manage and broadcast live announcements to targeted grade clusters
            [INDEX 4].
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          style={{
            background: "#ff9900",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
          <FaBullhorn /> Broadcast New Notice
        </button>
      </div>

      {/* FILTER CONTROL DOCK */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          background: "white",
          padding: "15px 20px",
          borderRadius: "12px",
        }}>
        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: "600",
            color: "#8b949e",
            alignSelf: "center",
            marginRight: "10px",
          }}>
          Filter by Grade:
        </span>
        {["6", "7", "8", "9", "10", "11", "11-Paper"].map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGrade(g)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: "none",
              background: selectedGrade === g ? "#0056ff" : "#f4f6fa",
              color: selectedGrade === g ? "white" : "#001b42",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}>
            {g === "11-Paper" ? "11 Paper" : `Grade ${g}`}
          </button>
        ))}
      </div>

      {/* LIVE FEED RECEPTACLE */}
      <div
        style={{ background: "white", padding: "25px", borderRadius: "12px" }}>
        <h3
          style={{
            margin: "0 0 20px 0",
            color: "#001b42",
            fontSize: "1.05rem",
          }}>
          Active Core Feed (
          {selectedGrade === "11-Paper"
            ? "11 Paper Class"
            : `Grade ${selectedGrade}`}
          )
        </h3>
        {isLoading ? (
          <div style={{ color: "#8b949e", fontWeight: "600" }}>
            Streaming Live Notices from Cloud Ledger...
          </div>
        ) : notices.length === 0 ? (
          <div
            style={{
              color: "#8b949e",
              fontStyle: "italic",
              padding: "10px 0",
            }}>
            No announcements published for this cluster yet.
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {notices.map((item) => {
              const badgeStyle = getTypeColor(item.type);
              return (
                <div
                  key={item.docId}
                  style={{
                    border: item.isUrgent
                      ? "1px solid #ff4b4b"
                      : "1px solid #eef2ff",
                    background: item.isUrgent ? "#fffaf5" : "#f8faff",
                    padding: "20px",
                    borderRadius: "8px",
                    position: "relative",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}>
                    <span
                      style={{
                        background: badgeStyle.bg,
                        color: badgeStyle.color,
                        padding: "4px 10px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}>
                      {item.isUrgent ? "🔥 URGENT | " : ""}
                      {item.type.replace("-", " ")}
                    </span>
                    <small
                      style={{
                        color: "#8b949e",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "0.8rem",
                      }}>
                      <FaCalendarDays /> {item.date}
                    </small>
                  </div>
                  <p
                    style={{
                      margin: "0 0 15px 0",
                      color: "#001b42",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                    }}>
                    {item.text}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid #eef2ff",
                      paddingTop: "10px",
                    }}>
                    <span
                      style={{
                        color: "#8b949e",
                        fontSize: "0.85rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}>
                      <FaUserPen /> {item.author}
                    </span>
                    <button
                      onClick={() => handleDeleteNotice(item.docId)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff4b4b",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
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
