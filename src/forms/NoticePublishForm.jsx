// import { useState } from "react";
// import { db } from "../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { FaBullhorn, FaXmark } from "react-icons/fa6";

// const NoticePublishForm = ({
//   isOpen,
//   onClose,
//   selectedGrade,
//   facultyFieldLock,
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [formData, setFormData] = useState({
//     type: "General-Notice",
//     text: "",
//     isUrgent: false, // 📣 අලුතින් එකතු කළ Urgent Toggle එක
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");
//     setSuccess("");

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
//       isUrgent: formData.isUrgent,
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
//       setSuccess("Announcement successfully broadcast live!");
//       setFormData({ type: "General-Notice", text: "", isUrgent: false });
//       setTimeout(() => {
//         onClose();
//         setSuccess("");
//       }, 1500);
//     } catch (err) {
//       console.error("Cloud Save Notice Error:", err);
//       setError("An error occurred while saving to the cloud!");
//     }
//     setIsSubmitting(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="admin-modal-overlay"
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background: "rgba(0,0,0,0.5)",
//         backdropFilter: "blur(4px)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 10000,
//       }}>
//       <div
//         className="admin-modal-card"
//         style={{
//           background: "white",
//           padding: "30px",
//           borderRadius: "12px",
//           width: "500px",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//           position: "relative",
//         }}>
//         <button
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "20px",
//             background: "none",
//             border: "none",
//             fontSize: "1.2rem",
//             cursor: "pointer",
//             color: "#8b949e",
//           }}>
//           <FaXmark />
//         </button>

//         <h3
//           style={{
//             margin: "0 0 5px 0",
//             color: "#001b42",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}>
//           <FaBullhorn style={{ color: "#ff9900" }} /> Broadcast Notice (Grade{" "}
//           {selectedGrade})
//         </h3>
//         <p
//           style={{
//             margin: "0 0 20px 0",
//             color: "#8b949e",
//             fontSize: "0.85rem",
//           }}>
//           Publish real-time announcements to the student terminals [INDEX 4].
//         </p>

//         {error && (
//           <div
//             style={{
//               color: "#ff4b4b",
//               fontSize: "0.85rem",
//               marginBottom: "10px",
//             }}>
//             ⚠️ {error}
//           </div>
//         )}
//         {success && (
//           <div
//             style={{
//               color: "#10b981",
//               fontSize: "0.85rem",
//               marginBottom: "10px",
//             }}>
//             ✓ {success}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             <label
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#001b42",
//               }}>
//               Notice Type / Event Tag
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//               style={{
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #d2d6dc",
//                 background: "white",
//               }}>
//               <option value="General-Notice">General Notice</option>
//               <option value="Exam-Schedules">Exam Schedule</option>
//               <option value="Parent-Meetings">Parent Meeting</option>
//               <option value="Special-Sessions">Special Session</option>
//             </select>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             <label
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#001b42",
//               }}>
//               Message Description
//             </label>
//             <textarea
//               name="text"
//               value={formData.text}
//               onChange={handleInputChange}
//               placeholder="Type the announcement details..."
//               rows="4"
//               style={{
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #d2d6dc",
//                 resize: "none",
//                 outline: "none",
//               }}></textarea>
//           </div>

//           {/* 🚨 URGENT CHECKBOX TOGGLE */}
//           <label
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               fontSize: "0.85rem",
//               fontWeight: "bold",
//               color: "#ff4b4b",
//               background: "#fff5f5",
//               padding: "10px",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}>
//             <input
//               type="checkbox"
//               name="isUrgent"
//               checked={formData.isUrgent}
//               onChange={handleInputChange}
//             />
//             Mark as High-Priority Urgent Notice (Triggers Dashboard Alert)
//           </label>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             style={{
//               background: "#ff9900",
//               color: "white",
//               border: "none",
//               padding: "12px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               marginTop: "5px",
//             }}>
//             {isSubmitting ? "Broadcasting..." : "Publish to Class Portal"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NoticePublishForm;

// import { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { FaBullhorn, FaXmark } from "react-icons/fa6";

// const NoticePublishForm = ({
//   isOpen,
//   onClose,
//   selectedGrade,
//   facultyFieldLock,
// }) => {
//   const currentFacultySubject =
//     localStorage.getItem("admin_faculty_subject") || "maths";
//   const subject = currentFacultySubject.toLowerCase();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // 👑 FIXED Logic: පිටතින් එන selectedGrade එක වෙනස් වෙද්දී Form එක ඇතුළේ grade එකත් Auto-Update වේ [INDEX 4]
//   const [targetGrade, setTargetGrade] = useState(selectedGrade);

//   useEffect(() => {
//     if (selectedGrade) {
//       setTargetGrade(selectedGrade);
//     }
//   }, [selectedGrade, isOpen]);

//   const [formData, setFormData] = useState({
//     type: "General-Notice",
//     text: "",
//     isUrgent: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");
//     setSuccess("");

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
//       isUrgent: formData.isUrgent,
//       date: new Date().toISOString().split("T")[0],
//       grade: String(targetGrade), // 👈 තෝරාගත් Grade එක Firestore එකට යයි [INDEX 51]
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
//       setSuccess("Announcement successfully broadcast live!");
//       setFormData({ type: "General-Notice", text: "", isUrgent: false });
//       setTimeout(() => {
//         onClose();
//         setSuccess("");
//       }, 1500);
//     } catch (err) {
//       console.error("Cloud Save Notice Error:", err);
//       setError("An error occurred while saving to the cloud!");
//     }
//     setIsSubmitting(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="admin-modal-overlay"
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background: "rgba(0,0,0,0.5)",
//         backdropFilter: "blur(4px)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 10000,
//       }}>
//       <div
//         className="admin-modal-card"
//         style={{
//           background: "white",
//           padding: "30px",
//           borderRadius: "12px",
//           width: "500px",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//           position: "relative",
//         }}>
//         <button
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "20px",
//             background: "none",
//             border: "none",
//             fontSize: "1.2rem",
//             cursor: "pointer",
//             color: "#8b949e",
//           }}>
//           <FaXmark />
//         </button>

//         <h3
//           style={{
//             margin: "0 0 5px 0",
//             color: "#001b42",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}>
//           <FaBullhorn style={{ color: "#ff9900" }} /> Broadcast Notice Portal
//         </h3>
//         <p
//           style={{
//             margin: "0 0 20px 0",
//             color: "#8b949e",
//             fontSize: "0.85rem",
//           }}>
//           Publish real-time announcements to the student terminals [INDEX 4].
//         </p>

//         {error && (
//           <div
//             style={{
//               color: "#ff4b4b",
//               fontSize: "0.85rem",
//               marginBottom: "10px",
//             }}>
//             ⚠️ {error}
//           </div>
//         )}
//         {success && (
//           <div
//             style={{
//               color: "#10b981",
//               fontSize: "0.85rem",
//               marginBottom: "10px",
//             }}>
//             ✓ {success}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//           {/* 👑 NEW FIXED DROP DOWN: Form එක ඇතුළෙත් Grade එක වෙනස් කරන්න හෝ Auto-Select වෙන්න හදපු Dropdown එක */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             <label
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#001b42",
//               }}>
//               Target Academic Grade Class
//             </label>
//             <select
//               value={targetGrade}
//               onChange={(e) => setTargetGrade(e.target.value)}
//               style={{
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #d2d6dc",
//                 background: "white",
//               }}>
//               <option value="6">Grade 6</option>
//               <option value="7">Grade 7</option>
//               <option value="8">Grade 8</option>
//               <option value="9">Grade 9</option>
//               <option value="10">Grade 10</option>
//               <option value="11">Grade 11 Theory/Revision</option>
//               <option value="11-Paper">Grade 11 Premium Paper Class</option>
//             </select>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             <label
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#001b42",
//               }}>
//               Notice Type / Event Tag
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//               style={{
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #d2d6dc",
//                 background: "white",
//               }}>
//               <option value="General-Notice">General Notice</option>
//               <option value="Exam-Schedules">Exam Schedule</option>
//               <option value="Parent-Meetings">Parent Meeting</option>
//               <option value="Special-Sessions">Special Session</option>
//             </select>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             <label
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#001b42",
//               }}>
//               Message Description
//             </label>
//             <textarea
//               name="text"
//               value={formData.text}
//               onChange={handleInputChange}
//               placeholder="Type the announcement details..."
//               rows="4"
//               style={{
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #d2d6dc",
//                 resize: "none",
//                 outline: "none",
//               }}></textarea>
//           </div>

//           <label
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               fontSize: "0.85rem",
//               fontWeight: "bold",
//               color: "#ff4b4b",
//               background: "#fff5f5",
//               padding: "10px",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}>
//             <input
//               type="checkbox"
//               name="isUrgent"
//               checked={formData.isUrgent}
//               onChange={handleInputChange}
//             />
//             Mark as High-Priority Urgent Notice (Triggers Dashboard Alert)
//           </label>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             style={{
//               background: "#ff9900",
//               color: "white",
//               border: "none",
//               padding: "12px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               marginTop: "5px",
//             }}>
//             {isSubmitting ? "Broadcasting..." : "Publish to Class Portal"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NoticePublishForm;

// import { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { FaBullhorn, FaXmark } from "react-icons/fa6";

// const NoticePublishForm = ({
//   isOpen,
//   onClose,
//   selectedGrade,
//   facultyFieldLock,
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // 👑 FIXED: මුලින්ම selectedGrade එක Default Value එක විදිහට කෙලින්ම දෙනවා
//   const [targetGrade, setTargetGrade] = useState(selectedGrade);

//   // 👑 FIXED: Infinite Cascading Renders වැළැක්වීමට කොන්දේසියක් දැමීම [INDEX 4]
//   useEffect(() => {
//     if (isOpen && selectedGrade && targetGrade !== selectedGrade) {
//       setTargetGrade(selectedGrade);
//     }
//   }, [selectedGrade, isOpen, targetGrade]);

//   const [formData, setFormData] = useState({
//     type: "General-Notice",
//     text: "",
//     isUrgent: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");
//     setSuccess("");

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
//       isUrgent: formData.isUrgent,
//       date: new Date().toISOString().split("T")[0],
//       grade: String(targetGrade),
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
//       setSuccess("Announcement successfully broadcast live!");
//       setFormData({ type: "General-Notice", text: "", isUrgent: false });
//       setTimeout(() => {
//         onClose();
//         setSuccess("");
//       }, 1500);
//     } catch (err) {
//       console.error("Cloud Save Notice Error:", err);
//       setError("An error occurred while saving to the cloud!");
//     }
//     setIsSubmitting(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="admin-modal-overlay"
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background: "rgba(0,0,0,0.5)",
//         backdropFilter: "blur(4px)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 10000,
//       }}>
//       <div
//         className="admin-modal-card"
//         style={{
//           background: "white",
//           padding: "30px",
//           borderRadius: "12px",
//           width: "500px",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//           position: "relative",
//         }}>
//         <button
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "20px",
//             background: "none",
//             border: "none",
//             fontSize: "1.2rem",
//             cursor: "pointer",
//             color: "#8b949e",
//           }}>
//           <FaXmark />
//         </button>

//         <h3
//           style={{
//             margin: "0 0 5px 0",
//             color: "#001b42",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}>
//           <FaBullhorn style={{ color: "#ff9900" }} /> Broadcast Notice Portal
//         </h3>
//         <p
//           style={{
//             margin: "0 0 20px 0",
//             color: "#8b949e",
//             fontSize: "0.85rem",
//           }}>
//           Publish real-time announcements to the student terminals [INDEX 4].
//         </p>

//         {error && (
//           <div
//             style={{
//               color: "#ff4b4b",
//               fontSize: "0.85rem",
//               marginBottom: "10px",
//             }}>
//             ⚠️ {error}
//           </div>
//         )}
//         {success && (
//           <div
//             style={{
//               color: "#10b981",
//               fontSize: "0.85rem",
//               marginBottom: "10px",
//             }}>
//             ✓ {success}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             <label
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#001b42",
//               }}>
//               Target Academic Grade Class
//             </label>
//             <select
//               value={targetGrade}
//               onChange={(e) => setTargetGrade(e.target.value)}
//               style={{
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #d2d6dc",
//                 background: "white",
//               }}>
//               <option value="6">Grade 6</option>
//               <option value="7">Grade 7</option>
//               <option value="8">Grade 8</option>
//               <option value="9">Grade 9</option>
//               <option value="10">Grade 10</option>
//               <option value="11">Grade 11 Theory/Revision</option>
//               <option value="11-Paper">Grade 11 Premium Paper Class</option>
//             </select>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             <label
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#001b42",
//               }}>
//               Notice Type / Event Tag
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//               style={{
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #d2d6dc",
//                 background: "white",
//               }}>
//               <option value="General-Notice">General Notice</option>
//               <option value="Exam-Schedules">Exam Schedule</option>
//               <option value="Parent-Meetings">Parent Meeting</option>
//               <option value="Special-Sessions">Special Session</option>
//             </select>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             <label
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#001b42",
//               }}>
//               Message Description
//             </label>
//             <textarea
//               name="text"
//               value={formData.text}
//               onChange={handleInputChange}
//               placeholder="Type the announcement details..."
//               rows="4"
//               style={{
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #d2d6dc",
//                 resize: "none",
//                 outline: "none",
//               }}></textarea>
//           </div>

//           <label
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               fontSize: "0.85rem",
//               fontWeight: "bold",
//               color: "#ff4b4b",
//               background: "#fff5f5",
//               padding: "10px",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}>
//             <input
//               type="checkbox"
//               name="isUrgent"
//               checked={formData.isUrgent}
//               onChange={handleInputChange}
//             />
//             Mark as High-Priority Urgent Notice (Triggers Dashboard Alert)
//           </label>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             style={{
//               background: "#ff9900",
//               color: "white",
//               border: "none",
//               padding: "12px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               marginTop: "5px",
//             }}>
//             {isSubmitting ? "Broadcasting..." : "Publish to Class Portal"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NoticePublishForm;

import { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { FaBullhorn, FaXmark } from "react-icons/fa6";

const NoticePublishForm = ({ isOpen, onClose, selectedGrade }) => {
  // 🔐 dynamic subject සහ author එක සෙෂන් එකෙන්ම පිරිසිදුවට ගලවා ගැනීම [INDEX 4]
  const currentFacultySubject =
    localStorage.getItem("admin_faculty_subject") || "maths";
  const facultyFieldLock = currentFacultySubject.toLowerCase();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 📝 Core Form States (targetGrade එක default විදිහට selectedGrade එකම ගනී)
  const [targetGrade, setTargetGrade] = useState(selectedGrade);
  const [formData, setFormData] = useState({
    type: "General-Notice",
    text: "",
    isUrgent: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    if (formData.text.trim() === "") {
      setError("Please enter the announcement message!");
      setIsSubmitting(false);
      return;
    }

    // 👑 DYNAMIC AUTHOR LOGIC: දැනට ලොග් වෙලා ඉන්න විෂය අනුව ගුරුවරයා ස්වයංක්‍රීයවම තීරණය වේ
    let liveAuthor = "Janaka Sir";
    if (facultyFieldLock === "science") liveAuthor = "Science Sir";
    if (facultyFieldLock === "english") liveAuthor = "English Teacher";

    const docId = "NOT-" + Date.now().toString().slice(-6);
    const noticeCloudData = {
      id: docId,
      type: formData.type,
      text: formData.text.trim(),
      isUrgent: formData.isUrgent,
      date: new Date().toISOString().split("T")[0],
      grade: String(targetGrade || selectedGrade), // 👈 loop ඇති කරන්නේ නැතිව කෙලින්ම grade එක සේව් වේ [INDEX 51]
      subject: facultyFieldLock,
      author: liveAuthor, // 👈 dynamic author එක Firestore එකට යයි [INDEX 51]
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "class_notices", docId), noticeCloudData);
      setSuccess("Announcement successfully broadcast live!");
      setFormData({ type: "General-Notice", text: "", isUrgent: false });
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1500);
    } catch (err) {
      console.error("Cloud Save Notice Error:", err);
      setError("An error occurred while saving to the cloud!");
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="admin-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 10000,
      }}>
      <div
        className="admin-modal-card"
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "500px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          position: "relative",
        }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
            color: "#8b949e",
          }}>
          <FaXmark />
        </button>

        <h3
          style={{
            margin: "0 0 5px 0",
            color: "#001b42",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
          <FaBullhorn style={{ color: "#ff9900" }} /> Broadcast Notice Portal
        </h3>
        <p
          style={{
            margin: "0 0 20px 0",
            color: "#8b949e",
            fontSize: "0.85rem",
          }}>
          Publish real-time announcements to the student terminals [INDEX 4].
        </p>

        {error && (
          <div
            style={{
              color: "#ff4b4b",
              fontSize: "0.85rem",
              marginBottom: "10px",
            }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: "#10b981",
              fontSize: "0.85rem",
              marginBottom: "10px",
            }}>
            ✓ {success}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Target Academic Grade Class
            </label>
            <select
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d2d6dc",
                background: "white",
              }}>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11 Theory/Revision</option>
              <option value="11-Paper">Grade 11 Premium Paper Class</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Notice Type / Event Tag
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d2d6dc",
                background: "white",
              }}>
              <option value="General-Notice">General Notice</option>
              <option value="Exam-Schedules">Exam Schedule</option>
              <option value="Parent-Meetings">Parent Meeting</option>
              <option value="Special-Sessions">Special Session</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Message Description
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Type the announcement details..."
              rows="4"
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d2d6dc",
                resize: "none",
                outline: "none",
              }}></textarea>
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              color: "#ff4b4b",
              background: "#fff5f5",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}>
            <input
              type="checkbox"
              name="isUrgent"
              checked={formData.isUrgent}
              onChange={handleInputChange}
            />
            Mark as High-Priority Urgent Notice (Triggers Dashboard Alert)
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "#ff9900",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "5px",
            }}>
            {isSubmitting ? "Broadcasting..." : "Publish to Class Portal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoticePublishForm;
