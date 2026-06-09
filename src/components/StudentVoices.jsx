// import { Link } from "react-router-dom";
// import { useState, useEffect, useCallback } from "react";

// import { db } from "../firebaseConfig";
// import {
//   collection,
//   getDocs,
//   query,
//   doc,
//   setDoc,
//   updateDoc,
//   increment,
//   orderBy,
// } from "firebase/firestore";
// import {
//   FaBullhorn,
//   FaPlus,
//   FaXmark,
//   //   FaGraduationCap,
//   //   FaHeartPulse,

//   //   FaCheck,
//   //   FaFilter,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa6";

// import { FaUserCircle } from "react-icons/fa";
// import { PiSealCheckFill } from "react-icons/pi";
// import { IoHeartSharp } from "react-icons/io5";
// {
//   /* <IoHeartSharp /> */
// }

// const StudentVoices = () => {
//   // 1. Core State Management
//   const [voices, setVoices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Popup Form එක පාලනය කිරීමට
//   const [activeFilter, setActiveFilter] = useState("ALL"); // ALL, maths, science, english

//   // 2. Popup Form State
//   const [formData, setFormData] = useState({
//     studentName: "",
//     olBatch: "2026",
//     voiceText: "",
//     maths: false, // Multiple Checkbox 1
//     science: false, // Multiple Checkbox 2
//     english: false, // Multiple Checkbox 3
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formError, setFormError] = useState("");

//   // ============================================================
//   // 📥 👑 [LIVE CLOUD FETCH ENGINE]: සජීවීව Cloud එකෙන් සිසුන්ගේ අදහස් ඇදලා ගන්නා පාලම
//   const fetchCloudVoices = useCallback(async () => {
//     setTimeout(() => setIsLoading(true), 0);
//     try {
//       const q = query(
//         collection(db, "student_voices"),
//         orderBy("createdAt", "desc"), // 🕒 අලුත්ම කමෙන්ට්ස් උඩටම ගනී
//       );

//       const querySnapshot = await getDocs(q);
//       const voiceList = [];

//       querySnapshot.forEach((doc) => {
//         voiceList.push({ id: doc.id, ...doc.data() });
//       });

//       setVoices(voiceList); // 🚀 සැබෑ Cloud දත්ත ටික මතකයට දැම්මා!
//     } catch (err) {
//       console.error("Fetch Voices Cloud Error:", err);
//     }
//     setTimeout(() => setIsLoading(false), 0);
//   }, []);

//   useEffect(() => {
//     // fetchCloudVoices();
//   }, [activeFilter, fetchCloudVoices]);
//   // ============================================================

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // 🧠 ☁️ [THE POPUP SUBMIT ENGINE]: කමෙන්ට් එක Cloud එකට යවා ක්ෂණිකව පෙන්වන හැටි
//   const handleVoiceSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     setIsSubmitting(true);

//     if (
//       formData.studentName.trim() === "" ||
//       formData.voiceText.trim() === ""
//     ) {
//       setFormError("Please fill in your name and comment correctly! ⚠️");
//       setIsSubmitting(false);
//       return;
//     }

//     // Checkboxes වලින් සිලෙක්ට් කරපු සර්ලාව Array එකකට ගනී (උඹ කියපු Checkbox Combo එක මචං)
//     const selectedTeachers = [];
//     if (formData.maths) selectedTeachers.push("maths");
//     if (formData.science) selectedTeachers.push("science");
//     if (formData.english) selectedTeachers.push("english");

//     if (selectedTeachers.length === 0) {
//       setFormError("Please select at least one class you attend! ⚠️");
//       setIsSubmitting(false);
//       return;
//     }

//     const docId = "VOI-" + Date.now().toString().slice(-6);

//     const voiceCloudData = {
//       id: docId,
//       studentName: formData.studentName.trim(),
//       olBatch: formData.olBatch,
//       selectedTeachers: selectedTeachers, // 💡 Array එකක් ලෙස සර්ලා ලස්සනට සේව් වේ
//       voiceText: formData.voiceText.trim(),
//       likesCount: 0, // Default Likes බිංදුවයි
//       createdAt: new Date().toISOString(),
//       avatarColor: formData.avatarColor || "#26136d", // 👑 🆕 FIXED: ළමයා තෝරන පාට Cloud එකට යවයි
//       //   createdAt: new Date().toISOString();
//     };

//     try {
//       await setDoc(doc(db, "student_voices", docId), voiceCloudData);
//       setIsModalOpen(false); // Popup එක වසයි
//       setFormData({
//         studentName: "",
//         olBatch: "2026",
//         voiceText: "",
//         maths: false,
//         science: false,
//         english: false,
//       }); // Form Reset
//       fetchCloudVoices(); // ලයිව් ලිස්ට් එක රීෆ්‍රෙෂ් කරයි
//     } catch (err) {
//       console.error("Cloud Save Voice Error:", err);
//       setFormError("Technical error occurred while publishing your voice! ❌");
//     }
//     setIsSubmitting(false);
//   };

//   // ❤️ ☁️ [THE REAL-TIME PULSE LIKES ENGINE]: එක තත්පරයෙන් සර්වර් එක ඇතුළෙන්ම ලයික් එක වැඩි කරයි!
//   const handleLikeIncrement = async (voiceId) => {
//     try {
//       const voiceDocRef = doc(db, "student_voices", voiceId);
//       // 🚀 Firebase increment(1) ආයුධය නිසා render loops වැටෙන්නේ නැත
//       await updateDoc(voiceDocRef, {
//         likesCount: increment(1),
//       });

//       // ලයිව් ස්ටේට් එක බ්‍රවුසර් එක ඇතුළෙන් ක්ෂණිකව අප්ඩේට් කර පෙන්වයි
//       setVoices((prevVoices) =>
//         prevVoices.map((v) =>
//           v.id === voiceId ? { ...v, likesCount: v.likesCount + 1 } : v,
//         ),
//       );
//     } catch (err) {
//       console.error("Like Increment Error:", err);
//     }
//   };

//   // 🎛️ 📊 [THE DYNAMIC TEACHER FILTER]: ළමයා උඩ ටැබ්ස් මාරු කරද්දී දත්ත වෙන් කරගන්නා හැටි
//   const filteredVoices = voices.filter((item) => {
//     if (activeFilter === "ALL") return true;
//     return (
//       item.selectedTeachers && item.selectedTeachers.includes(activeFilter)
//     );
//   });

//   return (
//     <div
//       className="student-voices-wrapper page-container"
//       style={{
//         padding: "40px 20px",
//         // width: "100%",
//         // fontFamily: "inherit",
//         marginTop: "5rem",
//       }}>
//       {/* ==================== 📊 TOP CONTAINER: LIVE COUNTER BAR ==================== */}
//       <div className="system-container">
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <Link className="back-btn" to="/">
//             <FaArrowLeft /> Back to Home
//           </Link>
//           <Link className="back-btn" to="/dashboard">
//             Back to Dashboard <FaArrowRight />
//           </Link>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginBottom: "30px",
//             flexWrap: "wrap",
//             gap: "30px",
//           }}>
//           <div>
//             <h2
//               style={{
//                 color: "#03204b",
//                 margin: "16px 0",
//                 fontWeight: "800",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "10px",
//                 fontSize: "1.6rem",
//               }}>
//               <FaBullhorn style={{ color: "#fd473a" }} /> Student Voices
//             </h2>
//             <p
//               style={{ color: "#666", fontSize: "0.85rem", margin: "5px 0 0" }}>
//               What our verified students say about their academic journey with
//               us.
//             </p>
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//             {/* 💬 👑 ALL COMMENTS COUNT BADGE: මිනිස්සුන්ට ඇත්තක් වගේ පේන සජීවී කවුන්ටරය */}
//             <div
//               style={{
//                 background: "#eef2ff",
//                 color: "#03204b",
//                 padding: "10px 18px",
//                 borderRadius: "12px",
//                 fontWeight: "800",
//                 fontSize: "0.9rem",
//                 border: "1px solid #d9e8ff",
//               }}>
//               Total Stories Shared: {voices.length}
//             </div>

//             {/* 📣 ADD NEW COMMENT BUTTON */}
//             <button
//               type="button"
//               onClick={() => setIsModalOpen(true)}
//               style={{
//                 background: "#fd473a",
//                 color: "white",
//                 border: "none",
//                 padding: "10px 20px",
//                 borderRadius: "12px",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 boxShadow: "0 4px 12px rgba(255,75,43,0.2)",
//                 transition: "0.3s",
//               }}>
//               <FaPlus /> Share Your Comment
//             </button>
//           </div>
//         </div>

//         {/* ==================== 🎛️ CENTER CONTAINER: DYNAMIC TEACHER FILTERS ==================== */}
//         <div
//           style={{
//             display: "flex",
//             gap: "10px",
//             // marginBottom: "25px",
//             flexWrap: "wrap",
//             background: "#f4f7ff",
//             padding: "8px",
//             borderRadius: "14px",
//             border: "1px solid #e2e8f0",
//             width: "fit-content",
//             margin: "0 auto 25px auto",
//           }}>
//           <button
//             type="button"
//             onClick={() => setActiveFilter("ALL")}
//             style={{
//               padding: "8px 16px",
//               borderRadius: "10px",
//               border: "none",
//               fontWeight: "bold",
//               fontSize: "0.85rem",
//               cursor: "pointer",
//               background: activeFilter === "ALL" ? "#03204b" : "transparent",
//               color: activeFilter === "ALL" ? "white" : "#555",
//               // border: activeFilter === "ALL" ? "white" : "#555",
//               transition: "0.2s",
//             }}>
//             All Voices
//           </button>
//           <button
//             type="button"
//             onClick={() => setActiveFilter("maths")}
//             style={{
//               padding: "8px 16px",
//               borderRadius: "10px",
//               border: "none",
//               fontWeight: "bold",
//               fontSize: "0.85rem",
//               cursor: "pointer",
//               background: activeFilter === "maths" ? "#03204b" : "transparent",
//               color: activeFilter === "maths" ? "white" : "#555",
//               transition: "0.2s",
//             }}>
//             Janaka Sir (Maths)
//           </button>
//           <button
//             type="button"
//             onClick={() => setActiveFilter("science")}
//             style={{
//               padding: "8px 16px",
//               borderRadius: "10px",
//               border: "none",
//               fontWeight: "bold",
//               fontSize: "0.85rem",
//               cursor: "pointer",
//               background:
//                 activeFilter === "science" ? "#03204b" : "transparent",
//               color: activeFilter === "science" ? "white" : "#555",
//               transition: "0.2s",
//             }}>
//             Amila Sir (Science)
//           </button>
//           <button
//             type="button"
//             onClick={() => setActiveFilter("english")}
//             style={{
//               padding: "8px 16px",
//               borderRadius: "10px",
//               border: "none",
//               fontWeight: "bold",
//               fontSize: "0.85rem",
//               cursor: "pointer",
//               background:
//                 activeFilter === "english" ? "#03204b" : "transparent",
//               color: activeFilter === "english" ? "white" : "#555",
//               transition: "0.2s",
//             }}>
//             English Class
//           </button>
//         </div>

//         {/* ==================== 📄 CONTENT ZONE: COMMENTS CONTAINER GRID ==================== */}
//         {isLoading ? (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "40px",
//               color: "#03204b",
//               fontWeight: "bold",
//             }}>
//             Loading Live Student Voices...
//           </div>
//         ) : (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//               gap: "20px",
//             }}>
//             {filteredVoices.length > 0 ? (
//               filteredVoices.map((item) => (
//                 <div
//                   key={item.id}
//                   className="comment-box-card"
//                   style={{
//                     background: "white",
//                     padding: "25px",
//                     borderRadius: "20px",
//                     border: "2px solid #d8e8ff",
//                     boxShadow: "0 4px 15px rgba(3, 32, 75, 0.3)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     gap: "15px",
//                     position: "relative",
//                     textAlign: "left",
//                     // background: "red",
//                   }}>
//                   <div>
//                     {/* Card Header Info */}
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "flex-start",
//                         marginBottom: "12px",
//                         // borderBottom: "2px solid #d4e4fc",
//                       }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           // justifyContent: "space-between",
//                           gap: "10px",
//                         }}>
//                         <div style={{ fontSize: "2.2rem", color: "#cbd5e1" }}>
//                           <FaUserCircle />
//                         </div>
//                         <div>
//                           <h4
//                             style={{
//                               margin: 0,
//                               color: "#03204b",
//                               fontWeight: "800",
//                               fontSize: "0.95rem",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "6px",
//                             }}>
//                             {item.studentName}
//                             <span
//                               style={{
//                                 color: "#fd473a",
//                                 display: "flex",
//                                 alignItems: "center",
//                               }}>
//                               <PiSealCheckFill style={{ fontSize: "1.2rem" }} />
//                             </span>
//                           </h4>
//                           <small
//                             style={{
//                               color: "#777",
//                               display: "block",
//                               marginTop: "3px",
//                               fontWeight: "bold",
//                             }}>
//                             O/L Batch: {item.olBatch}
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Main Voice Comment Text */}
//                     <p
//                       style={{
//                         margin: 0,
//                         color: "#444",
//                         fontSize: "0.88rem",
//                         lineHeight: "1.6",
//                         fontWeight: "500",
//                         fontStyle: "italic",
//                       }}>
//                       "{item.voiceText}"
//                     </p>
//                   </div>

//                   {/* Card Footer: Teacher Tags & Premium Like Button */}
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       borderTop: "2px solid #d4e4fc",
//                       paddingTop: "12px",
//                       marginTop: "5px",
//                     }}>
//                     <div
//                       style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
//                       {item.selectedTeachers &&
//                         item.selectedTeachers.map((t, i) => (
//                           <span
//                             key={i}
//                             style={{
//                               background:
//                                 t === "maths"
//                                   ? "#eef2ff"
//                                   : t === "science"
//                                     ? "#fff0f0"
//                                     : "#e8f8f5",
//                               color:
//                                 t === "maths"
//                                   ? "#4b6bfb"
//                                   : t === "science"
//                                     ? "#fd473a"
//                                     : "#2ecc71",
//                               padding: "2px 8px",
//                               borderRadius: "6px",
//                               fontSize: "0.7rem",
//                               fontWeight: "bold",
//                             }}>
//                             {t === "maths"
//                               ? "Maths"
//                               : t === "science"
//                                 ? "Science"
//                                 : "English"}
//                           </span>
//                         ))}
//                     </div>

//                     {/* ❤️ HIGH-TECH PULSE LIKE BUTTON */}
//                     <button
//                       type="button"
//                       onClick={() => handleLikeIncrement(item.id)}
//                       style={{
//                         background: "#dde7f7",
//                         color: "#03204b",
//                         border: "none",
//                         padding: "6px 12px",
//                         borderRadius: "10px",
//                         fontWeight: "bold",
//                         fontSize: "1rem",
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "6px",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.background = "#ffdce2")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.background = "#fff0f2")
//                       }>
//                       <IoHeartSharp className="pulse-animation" />
//                       <span>{item.likesCount}</span>
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div
//                 style={{
//                   gridColumn: "1 / -1",
//                   textAlign: "center",
//                   padding: "40px",
//                   color: "#aaa",
//                   background: "#f8faff",
//                   borderRadius: "15px",
//                   border: "1px dashed #ccc",
//                 }}>
//                 No comments shared for this category yet. [INDEX 51]
//               </div>
//             )}
//           </div>
//         )}
//         {/* ==================== 🚨 THE POPUP FORM DYNAMIC OVERLAY (MODAL POPUP) ==================== */}
//         {isModalOpen && (
//           <div
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "100vh",
//               background: "rgba(26, 10, 84, 0.4)",
//               backdropFilter: "blur(4px)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               zIndex: 99999,
//             }}>
//             <div
//               style={{
//                 background: "white",
//                 padding: "30px",
//                 borderRadius: "24px",
//                 maxWidth: "450px",
//                 width: "90%",
//                 boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
//                 position: "relative",
//                 textAlign: "left",
//               }}>
//               {/* Close Cross Button */}
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   position: "absolute",
//                   top: "20px",
//                   right: "20px",
//                   background: "#ddeeff",
//                   border: "none",
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   cursor: "pointer",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   color: "#555",
//                   fontSize: " 1.3rem",
//                 }}>
//                 <FaXmark />
//               </button>

//               <h3
//                 style={{
//                   color: "#03204b",
//                   margin: "0 0 5px",
//                   fontWeight: "800",
//                   fontSize: "1.3rem",
//                 }}>
//                 Share Your Experience
//               </h3>
//               <p
//                 style={{
//                   color: "#666",
//                   fontSize: "0.8rem",
//                   margin: "0 0 20px",
//                 }}>
//                 Share your class experience live with other students and
//                 parents.
//               </p>

//               {formError && (
//                 <div
//                   style={{
//                     background: "#fdedec",
//                     borderLeft: "4px solid #e74c3c",
//                     color: "#c0392b",
//                     padding: "10px",
//                     borderRadius: "6px",
//                     fontSize: "0.8rem",
//                     fontWeight: "bold",
//                     marginBottom: "15px",
//                   }}>
//                   ⚠️ {formError}
//                 </div>
//               )}

//               <form className="styled-form" onSubmit={handleVoiceSubmit}>
//                 {/* Input Name */}
//                 <div className="input-group">
//                   <label
//                     style={{
//                       fontWeight: "600",
//                       fontSize: "0.8rem",
//                       color: "#03204b",
//                       display: "block",
//                       marginBottom: "5px",
//                     }}>
//                     Your Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="studentName"
//                     placeholder="ex: Lakshan Sandaruwan"
//                     required
//                     value={formData.studentName}
//                     onChange={handleInputChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       borderRadius: "8px",
//                       border: "1px solid #ddd",
//                       fontSize: "0.85rem",
//                     }}
//                   />
//                 </div>

//                 {/* Dropdown Batch */}
//                 <div className="input-group">
//                   <label
//                     style={{
//                       fontWeight: "600",
//                       fontSize: "0.8rem",
//                       color: "#03204b",
//                       display: "block",
//                       marginBottom: "5px",
//                     }}>
//                     O/L Exam Batch
//                   </label>
//                   <select
//                     name="olBatch"
//                     value={formData.olBatch}
//                     onChange={handleInputChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       borderRadius: "8px",
//                       border: "1px solid #ddd",
//                       fontWeight: "bold",
//                       background: "white",
//                       fontSize: "0.85rem",
//                     }}>
//                     <option value="2017">2017 O/L</option>
//                     <option value="2018">2018 O/L</option>
//                     <option value="2019">2019 O/L</option>
//                     <option value="2020">2020 O/L</option>
//                     <option value="2021">2021 O/L</option>
//                     <option value="2022">2022 O/L</option>
//                     <option value="2023">2023 O/L</option>
//                     <option value="2024">2024 O/L</option>
//                     <option value="2025">2025 O/L</option>
//                     <option value="2026">2026 O/L</option>
//                     <option value="Parents">Parents</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 {/* Multiple Checkboxes Block */}
//                 <div className="input-group">
//                   <label
//                     style={{
//                       fontWeight: "600",
//                       fontSize: "0.8rem",
//                       color: "#03204b",
//                       display: "block",
//                       marginBottom: "5px",
//                     }}>
//                     Select Attending Classes (Multiple)
//                   </label>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       gap: "15px",
//                       background: "#f8fafc",
//                       padding: "10px",
//                       borderRadius: "8px",
//                       border: "1px solid #e2e8f0",
//                     }}>
//                     <label
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "5px",
//                         fontSize: "0.82rem",
//                         fontWeight: "bold",
//                         color: "#4b6bfb",
//                         cursor: "pointer",
//                       }}>
//                       <input
//                         type="checkbox"
//                         name="maths"
//                         checked={formData.maths}
//                         onChange={handleInputChange}
//                       />{" "}
//                       Maths
//                     </label>
//                     <label
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "5px",
//                         fontSize: "0.82rem",
//                         fontWeight: "bold",
//                         color: "#fd473a",
//                         cursor: "pointer",
//                       }}>
//                       <input
//                         type="checkbox"
//                         name="science"
//                         checked={formData.science}
//                         onChange={handleInputChange}
//                       />{" "}
//                       Science
//                     </label>
//                     <label
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "5px",
//                         fontSize: "0.82rem",
//                         fontWeight: "bold",
//                         color: "#2ecc71",
//                         cursor: "pointer",
//                       }}>
//                       <input
//                         type="checkbox"
//                         name="english"
//                         checked={formData.english}
//                         onChange={handleInputChange}
//                       />{" "}
//                       English
//                     </label>
//                   </div>
//                 </div>

//                 {/* Textarea Comment */}
//                 <div className="input-group">
//                   <label
//                     style={{
//                       fontWeight: "600",
//                       fontSize: "0.8rem",
//                       color: "#03204b",
//                       display: "block",
//                       marginBottom: "5px",
//                     }}>
//                     Your Message / Review
//                   </label>
//                   <textarea
//                     name="voiceText"
//                     rows="4"
//                     placeholder="Write your thoughts about the class here..."
//                     required
//                     value={formData.voiceText}
//                     onChange={handleInputChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       borderRadius: "8px",
//                       border: "1px solid #ddd",
//                       fontSize: "0.85rem",
//                       resize: "none",
//                       lineHeight: "1.4",
//                       fontFamily: "inherit",
//                     }}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     background: "#fd473a",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "8px",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                     boxShadow: "0 4px 12px rgba(255,75,43,0.2)",
//                     marginTop: "5px",
//                   }}>
//                   {isSubmitting ? " Publishing Live..." : " Share My Voice"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* 👑 KEYFRAMES ANIMATIONS CSS CONTROL */}
//         <style>{`
//         @keyframes popupFade {
//           from { transform: scale(0.9); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }
//         .pulse-animation {
//           animation: heartBeat 1.5s infinite ease-in-out;
//         }
//         @keyframes heartBeat {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.25); }
//           100% { transform: scale(1); }
//         }
//       `}</style>
//       </div>
//     </div>
//   );
// };

// export default StudentVoices;

import { useState, useEffect, useCallback } from "react";
import { db } from "../firebaseConfig"; // 👑 අපේ මධ්‍යම Firebase පාලම ගත්තා
import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  updateDoc,
  increment,
  orderBy,
} from "firebase/firestore"; // ☁️ Cloud Advanced Tools
import {
  FaBullhorn,
  FaPlus,
  FaXmark,
  // FaCheckCircle,
  FaHeartPulse,
  FaUsersGear,
  FaUsers,
  FaChalkboardUser,
  FaIdCard,
} from "react-icons/fa6"; // 👑 🆕 Phosphor/FontAwesome Styled Roles Combo ගත්තා [INDEX 55]

// import {  } from "react-icons/fa";
import { PiSealCheckFill, PiStudent } from "react-icons/pi";
// import { IoHeartSharp } from "react-icons/io5";

const StudentVoicesComponent = () => {
  // 1. Core State Management
  const [notices, setNotices] = useState([]); // voices list
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Popup Controller
  const [activeFilter, setActiveFilter] = useState("ALL"); // Teacher Filters

  // 2. 👑 🆕 [THE ULTIMATE DYNAMIC FORM STATE]: උඹ කියපු හැම ස්මාර්ට් විචල්‍යයක්ම මෙතනට ලොක් කළා
  const [formData, setFormData] = useState({
    studentName: "",
    userRole: "Student", // Default Role: Student, Parent, Alumni
    olBatch: "2026 O/L", // For Students
    parentGrade: "Grade 11", // For Parents
    alumniJob: "Software Engineer", // For Alumni
    customJob: "", // For Custom Text Input
    avatarType: "boy", // boy, girl, neuter
    avatarColor: "#4b6bfb", // Default educa. Blue Theme
    voiceText: "",
    maths: false,
    science: false,
    english: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // ============================================================
  // 📥 👑 [LIVE CLOUD FETCH ENGINE]: සජීවීව Cloud එකෙන් දත්ත ඇදලා ගන්නා පාලම
  const fetchCloudVoices = useCallback(async () => {
    setTimeout(() => setIsLoading(true), 0);
    try {
      const q = query(
        collection(db, "student_voices"),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const voiceList = [];
      querySnapshot.forEach((doc) => {
        voiceList.push({ id: doc.id, ...doc.data() });
      });
      setNotices(voiceList);
    } catch (err) {
      console.error("Fetch Voices Error:", err);
    }
    setTimeout(() => setIsLoading(false), 0);
  }, []);

  // 🚀 FIXED: activeFilter එක මාරු වෙද්දී Infinite renders වැටෙන්නේ නැති වෙන්න useCallback වලින් බැන්දා
  useEffect(() => {
    // fetchCloudVoices();
  }, [activeFilter, fetchCloudVoices]);
  // ============================================================

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🧠 ☁️ [THE DYNAMIC SUBMIT ENGINE]: භූමිකාව අනුව නිවැරදි identityClaim එක හදා Cloud යවන හැටි
  const handleVoiceSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    if (
      formData.studentName.trim() === "" ||
      formData.voiceText.trim() === ""
    ) {
      setFormError("Please enter your name and message correctly! ⚠️");
      setIsSubmitting(false);
      return;
    }

    const selectedTeachers = [];
    if (formData.maths) selectedTeachers.push("maths");
    if (formData.science) selectedTeachers.push("science");
    if (formData.english) selectedTeachers.push("english");

    if (selectedTeachers.length === 0) {
      setFormError("Please select at least one class! ⚠️");
      setIsSubmitting(false);
      return;
    }

    // 👑 🔐 [THE IDENTITY CLAIM COMPOSER]: භූමිකාව අනුව සැබෑ නිල බැජ් වචනය මෙතැනදී තීරණය වේ
    let finalIdentity = "Verified Member";
    if (formData.userRole === "Student")
      `finalIdentity = ${formData.olBatch} Student`;
    if (formData.userRole === "Parent")
      `finalIdentity = Parent of ${formData.parentGrade} Student`;
    if (formData.userRole === "Alumni") {
      finalIdentity =
        formData.alumniJob === "Other"
          ? formData.customJob.trim()
          : formData.alumniJob;
    }

    const docId = "VOI-" + Date.now().toString().slice(-6);
    const voiceCloudData = {
      id: docId,
      studentName: formData.studentName.trim(),
      userRole: formData.userRole,
      identityClaim: finalIdentity || "Alumni", // 🚀 නිල පාලම සැකසුණා මචං
      avatarType: formData.avatarType,
      avatarColor: formData.avatarColor,
      selectedTeachers: selectedTeachers,
      voiceText: formData.voiceText.trim(),
      likesCount: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "student_voices", docId), voiceCloudData);
      setIsModalOpen(false);
      setFormData({
        studentName: "",
        userRole: "Student",
        olBatch: "2026 O/L",
        parentGrade: "Grade 11",
        alumniJob: "Software Engineer",
        customJob: "",
        avatarType: "boy",
        avatarColor: "#4b6bfb",
        voiceText: "",
        maths: false,
        science: false,
        english: false,
      });
      fetchCloudVoices();
    } catch (err) {
      console.error("Cloud Save Error:", err);
      setFormError("Technical error occurred while publishing! ❌");
    }
    setIsSubmitting(false);
  };

  // ❤️ ☁️ [THE REAL-TIME TOGGLE LIKE/UNLIKE ENGINE]
  const handleLikeIncrement = async (voiceId) => {
    try {
      const voiceDocRef = doc(db, "student_voices", voiceId);
      const likedVoices =
        JSON.parse(localStorage.getItem("liked_voices")) || [];
      const hasLiked = likedVoices.includes(voiceId);

      if (!hasLiked) {
        await updateDoc(voiceDocRef, { likesCount: increment(1) });
        likedVoices.push(voiceId);
        localStorage.setItem("liked_voices", JSON.stringify(likedVoices));
        setNotices((prev) =>
          prev.map((v) =>
            v.id === voiceId ? { ...v, likesCount: v.likesCount + 1 } : v,
          ),
        );
      } else {
        await updateDoc(voiceDocRef, { likesCount: increment(-1) });
        const updatedLikes = likedVoices.filter((id) => id !== voiceId);
        localStorage.setItem("liked_voices", JSON.stringify(updatedLikes));
        setNotices((prev) =>
          prev.map((v) =>
            v.id === voiceId ? { ...v, likesCount: v.likesCount - 1 } : v,
          ),
        );
      }
    } catch (err) {
      console.error("Like Error:", err);
    }
  };

  // 👑 🆕 [THE ROLE ICON MAPPER]: Role එක අනුව Premium filled icon එකක් පින්තාරු කරයි [INDEX 55]
  const renderRoleIcon = (type) => {
    if (type === "boy") return <PiStudent />;
    if (type === "girl") return <FaUsersGear />;
    if (type === "parent") return <FaUsers />;
    if (type === "teacher") return <FaChalkboardUser />;
    return <FaIdCard />;
  };

  const filteredNotices = notices.filter((item) => {
    if (activeFilter === "ALL") return true;
    return (
      item.selectedTeachers && item.selectedTeachers.includes(activeFilter)
    );
  });

  return (
    <div
      className="student-voices-wrapper page-container"
      style={{
        padding: "40px 0",
        width: "100%",
        fontFamily: "inherit",
        paddingTop: "7rem",
      }}>
      {/* ==================== 📊 TOP CONTAINER: LIVE COUNTER BAR ==================== */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px",
        }}>
        <div>
          <h2
            style={{
              color: "#1a0a54",
              margin: 0,
              fontWeight: "800",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "1.6rem",
            }}>
            <FaBullhorn style={{ color: "#ff4b2b" }} /> Student Voices
          </h2>
          <p style={{ color: "#666", fontSize: "0.85rem", margin: "5px 0 0" }}>
            What our verified students, parents, and alumni say about us [INDEX
            4, 51].
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* 💬 ALL COMMENTS COUNT BADGE */}
          <div
            style={{
              background: "#eef2ff",
              color: "#4b6bfb",
              padding: "10px 18px",
              borderRadius: "12px",
              fontWeight: "800",
              fontSize: "0.9rem",
              border: "1px solid #d9e8ff",
            }}>
            💬 Total Stories Shared: {notices.length}
          </div>

          {/* 📣 ADD NEW COMMENT BUTTON */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              background: "#ff4b2b",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(255,75,43,0.2)",
            }}>
            <FaPlus /> Share Your Voice
          </button>
        </div>
      </div>

      {/* ==================== 🎛️ CENTER CONTAINER: DYNAMIC TEACHER FILTERS ==================== */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "25px",
          flexWrap: "wrap",
          background: "#f4f7ff",
          padding: "8px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          width: "fit-content",
        }}>
        <button
          type="button"
          onClick={() => setActiveFilter("ALL")}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            fontSize: "0.85rem",
            cursor: "pointer",
            background: activeFilter === "ALL" ? "#1a0a54" : "transparent",
            color: activeFilter === "ALL" ? "white" : "#555",
          }}>
          All Voices
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("maths")}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            fontSize: "0.85rem",
            cursor: "pointer",
            background: activeFilter === "maths" ? "#1a0a54" : "transparent",
            color: activeFilter === "maths" ? "white" : "#555",
          }}>
          Janaka Sir (Maths)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("science")}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            fontSize: "0.85rem",
            cursor: "pointer",
            background: activeFilter === "science" ? "#1a0a54" : "transparent",
            color: activeFilter === "science" ? "white" : "#555",
          }}>
          Amila Sir (Science)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("english")}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            fontSize: "0.85rem",
            cursor: "pointer",
            background: activeFilter === "english" ? "#1a0a54" : "transparent",
            color: activeFilter === "english" ? "white" : "#555",
          }}>
          English Class
        </button>
      </div>

      {/* ==================== 📄 CONTENT ZONE: COMMENTS CONTAINER GRID ==================== */}
      {isLoading ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#1a0a54",
            fontWeight: "bold",
          }}>
          🔄 Loading Live Student Voices...
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}>
          {filteredNotices.length > 0 ? (
            filteredNotices.map((item) => (
              <div
                key={item.id}
                className="comment-box-card"
                style={{
                  background: "white",
                  padding: "25px",
                  borderRadius: "20px",
                  border: "1px solid #edf2f9",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.01)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "15px",
                  position: "relative",
                  textAlign: "left",
                }}>
                <div>
                  {/* Card Header Info */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}>
                      {/* 🎨 👑 [THE DYNAMIC AVATAR]: ළමයා තෝරපු නිල පාටින් සහ Role Icon එකෙන් හැඩවන රවුම */}
                      <div
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "50%",
                          background: item.avatarColor || "#1a0a54",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "1.3rem",
                          color: "white",
                        }}>
                        {renderRoleIcon(item.avatarType)}
                      </div>

                      <div>
                        <h4
                          style={{
                            margin: 0,
                            color: "#1a0a54",
                            fontWeight: "800",
                            fontSize: "0.95rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}>
                          {item.studentName}
                          <span
                            style={{
                              color: "#4b6bfb",
                              display: "flex",
                              alignItems: "center",
                            }}>
                            <PiSealCheckFill style={{ fontSize: "0.85rem" }} />
                          </span>
                        </h4>
                        {/* ⚡ 👑 [THE EXCLUSIVE IDENTITY CLAIM BADGE]: ළමයා, දෙමාපියන් හෝ Alumni බව පෙන්වන නිල පේළිය */}
                        <small
                          style={{
                            color: "#666",
                            display: "block",
                            marginTop: "3px",
                            fontWeight: "700",
                            fontSize: "0.78rem",
                          }}>
                          Status: {item.identityClaim || "Verified Member"}
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Main Voice Comment Text */}
                  <p
                    style={{
                      margin: 0,
                      color: "#444",
                      fontSize: "0.88rem",
                      lineHeight: "1.6",
                      fontWeight: "500",
                      fontStyle: "italic",
                    }}>
                    "{item.voiceText}"
                  </p>
                </div>

                {/* Card Footer: Teacher Tags & Premium Like Button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "12px",
                    marginTop: "5px",
                  }}>
                  <div
                    style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {item.selectedTeachers &&
                      item.selectedTeachers.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            background:
                              t === "maths"
                                ? "#eef2ff"
                                : t === "science"
                                  ? "#fff0f0"
                                  : "#e8f8f5",
                            color:
                              t === "maths"
                                ? "#4b6bfb"
                                : t === "science"
                                  ? "#ff4b2b"
                                  : "#2ecc71",
                            padding: "2px 8px",
                            borderRadius: "6px",
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                          }}>
                          {t === "maths"
                            ? "Maths"
                            : t === "science"
                              ? "Science"
                              : "English"}
                        </span>
                      ))}
                  </div>

                  {/* ❤️ HIGH-TECH PULSE LIKE BUTTON (Toggle Logic) */}
                  <button
                    type="button"
                    onClick={() => handleLikeIncrement(item.id)}
                    style={{
                      background: "#fff0f2",
                      color: "#ff4b2b",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#ffdce2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff0f2")
                    }>
                    <FaHeartPulse className="pulse-animation" />
                    <span>{item.likesCount}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
                color: "#aaa",
                background: "#f8faff",
                borderRadius: "15px",
                border: "1px dashed #ccc",
              }}>
              No comments shared for this category yet. [INDEX 51]
            </div>
          )}
        </div>
      )}
      {/* ==================== 🚨 THE POPUP FORM DYNAMIC OVERLAY (MODAL POPUP) ==================== */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(26, 10, 84, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "24px",
              maxWidth: "460px",
              width: "90%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              position: "relative",
              textAlign: "left",
              maxHeight: "90vh",
              overflowY: "auto",
            }}>
            {/* Close Cross Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#f1f5f9",
                border: "none",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#555",
              }}>
              <FaXmark />
            </button>

            <h3
              style={{
                color: "#1a0a54",
                margin: "0 0 5px",
                fontWeight: "800",
                fontSize: "1.3rem",
              }}>
              📣 Share Your Experience
            </h3>
            <p
              style={{ color: "#666", fontSize: "0.8rem", margin: "0 0 20px" }}>
              ඔබේ පන්ති අත්දැකීම අනෙකුත් සිසුන් සහ දෙමාපියන් සමඟ ලයිව් බෙදා ගන්න
              [INDEX 51].
            </p>

            {formError && (
              <div
                style={{
                  background: "#fdedec",
                  borderLeft: "4px solid #e74c3c",
                  color: "#c0392b",
                  padding: "10px",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}>
                ⚠️ {formError}
              </div>
            )}

            <form
              onSubmit={handleVoiceSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* 1. INPUT NAME */}
              <div className="input-group">
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "0.82rem",
                    color: "#1a0a54",
                    display: "block",
                    marginBottom: "5px",
                  }}>
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  placeholder="ex: Lakshan Sandaruwan"
                  required
                  value={formData.studentName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              {/* 2. CORE ROLE SELECTOR */}
              <div className="input-group">
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "0.82rem",
                    color: "#1a0a54",
                    display: "block",
                    marginBottom: "5px",
                  }}>
                  👤 Select Your Role
                </label>
                <select
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                    background: "white",
                    fontSize: "0.85rem",
                  }}>
                  <option value="Student">🎓 Current Scholar / Student</option>
                  <option value="Parent">👪 Guardian / Proud Parent</option>
                  <option value="Alumni">
                    🚀 Distinguished Alumni (ආදි ශිෂ්‍ය)
                  </option>
                </select>
              </div>

              {/* ==================== 🧠 CONDITION 01: IF STUDENT SELECTED ==================== */}
              {formData.userRole === "Student" && (
                <div
                  className="input-group"
                  style={{ animation: "popupFade 0.2s ease" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "0.82rem",
                      color: "#1a0a54",
                      display: "block",
                      marginBottom: "5px",
                    }}>
                    O/L Exam Batch
                  </label>
                  <select
                    name="olBatch"
                    value={formData.olBatch}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      fontWeight: "bold",
                      background: "white",
                      fontSize: "0.85rem",
                    }}>
                    <option value="2024 O/L">2024 O/L Batch</option>
                    <option value="2025 O/L">2025 O/L Batch</option>
                    <option value="2026 O/L">2026 O/L Batch</option>
                    <option value="2027 O/L">2027 O/L Batch</option>
                  </select>
                </div>
              )}

              {/* ==================== 🧠 CONDITION 02: IF PARENT SELECTED ==================== */}
              {formData.userRole === "Parent" && (
                <div
                  className="input-group"
                  style={{ animation: "popupFade 0.2s ease" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "0.82rem",
                      color: "#1a0a54",
                      display: "block",
                      marginBottom: "5px",
                    }}>
                    👪 Your Child's Grade (ශ්‍රේණිය)
                  </label>
                  <select
                    name="parentGrade"
                    value={formData.parentGrade}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      fontWeight: "bold",
                      background: "white",
                      fontSize: "0.85rem",
                    }}>
                    {[
                      "Grade 6",
                      "Grade 7",
                      "Grade 8",
                      "Grade 9",
                      "Grade 10",
                      "Grade 11",
                    ].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* ==================== 🧠 CONDITION 03: IF ALUMNI SELECTED ==================== */}
              {formData.userRole === "Alumni" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    animation: "popupFade 0.2s ease",
                  }}>
                  <div className="input-group">
                    <label
                      style={{
                        fontWeight: "600",
                        fontSize: "0.82rem",
                        color: "#1a0a54",
                        display: "block",
                        marginBottom: "5px",
                      }}>
                      Distinguished Profession
                    </label>
                    <select
                      name="alumniJob"
                      value={formData.alumniJob}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontWeight: "bold",
                        background: "white",
                        fontSize: "0.85rem",
                      }}>
                      <option value="Software Engineer">
                        💻 Software Engineer
                      </option>
                      <option value="Medical Doctor">🩺 Medical Doctor</option>
                      <option value="Attorney-at-Law">
                        ⚖️ Attorney-at-Law (නීතිඥ)
                      </option>
                      <option value="Civil Engineer">🛠️ Civil Engineer</option>
                      <option value="Other">
                        ✏️ Other Profession (වෙනත් ਰස්සාවක්)
                      </option>
                    </select>
                  </div>

                  {/* Custom Job Input Box */}
                  {formData.alumniJob === "Other" && (
                    <div
                      className="input-group"
                      style={{ animation: "popupFade 0.2s ease" }}>
                      <label
                        style={{
                          fontWeight: "600",
                          fontSize: "0.8rem",
                          color: "#ff4b2b",
                          display: "block",
                          marginBottom: "5px",
                        }}>
                        Type Your Profession
                      </label>
                      <input
                        type="text"
                        name="customJob"
                        placeholder="ex: Graphic Designer / Architect"
                        required
                        value={formData.customJob}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ff4b2b",
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 3. MULTIPLE CHECKBOXES */}
              <div className="input-group">
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "0.82rem",
                    color: "#1a0a54",
                    display: "block",
                    marginBottom: "5px",
                  }}>
                  Select Attending Classes (Multiple)
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    background: "#f8fafc",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "0.82rem",
                      fontWeight: "bold",
                      color: "#4b6bfb",
                      cursor: "pointer",
                    }}>
                    <input
                      type="checkbox"
                      name="maths"
                      checked={formData.maths}
                      onChange={handleInputChange}
                    />{" "}
                    Maths
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "0.82rem",
                      fontWeight: "bold",
                      color: "#ff4b2b",
                      cursor: "pointer",
                    }}>
                    <input
                      type="checkbox"
                      name="science"
                      checked={formData.science}
                      onChange={handleInputChange}
                    />{" "}
                    Science
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "0.82rem",
                      fontWeight: "bold",
                      color: "#2ecc71",
                      cursor: "pointer",
                    }}>
                    <input
                      type="checkbox"
                      name="english"
                      checked={formData.english}
                      onChange={handleInputChange}
                    />{" "}
                    English
                  </label>
                </div>
              </div>

              {/* 4. 👦 👧 CHARACTER AVATAR RADIO SELECTOR */}
              <div className="input-group">
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "0.82rem",
                    color: "#1a0a54",
                    display: "block",
                    marginBottom: "5px",
                  }}>
                  Choose Avatar Type
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    background: "#fcfcfd",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #eee",
                  }}>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                    <input
                      type="radio"
                      name="avatarType"
                      value="boy"
                      checked={formData.avatarType === "boy"}
                      onChange={handleInputChange}
                    />{" "}
                    👦 Boy
                  </label>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                    <input
                      type="radio"
                      name="avatarType"
                      value="girl"
                      checked={formData.avatarType === "girl"}
                      onChange={handleInputChange}
                    />{" "}
                    👧 Girl
                  </label>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                    <input
                      type="radio"
                      name="avatarType"
                      value="neuter"
                      checked={formData.avatarType === "neuter"}
                      onChange={handleInputChange}
                    />{" "}
                    👤 Neutral
                  </label>
                </div>
              </div>

              {/* 5. 🎨 PREMIUM COLOR DOTS PICKER SYSTEM (සිලෙක්ට් වුණු එක මැද හරි ලකුණ පත්තු වේ) */}
              <div className="input-group">
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "0.82rem",
                    color: "#1a0a54",
                    display: "block",
                    marginBottom: "5px",
                  }}>
                  Select Profile Theme Color
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    marginTop: "4px",
                  }}>
                  {["#4b6bfb", "#ff4b2b", "#2ecc71", "#f1c40f", "#9b59b6"].map(
                    (color) => (
                      <div
                        key={color}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            avatarColor: color,
                          }))
                        }
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          background: color,
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          fontSize: "0.75rem",
                          boxShadow:
                            formData.avatarColor === color
                              ? `0 0 0 3px white, 0 0 0 5px ${color}`
                              : "none",
                          transition: "0.2s",
                        }}>
                        {formData.avatarColor === color && <PiSealCheckFill />}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* 6. TEXTAREA COMMENT */}
              <div className="input-group">
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "0.82rem",
                    color: "#1a0a54",
                    display: "block",
                    marginBottom: "5px",
                  }}>
                  Your Message / Review
                </label>
                <textarea
                  name="voiceText"
                  rows="3"
                  placeholder="පන්තිය ගැන ඔයාගේ අවංක අදහස මෙතන ලියන්න මචං..."
                  required
                  value={formData.voiceText}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "0.85rem",
                    resize: "none",
                    lineHeight: "1.4",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#ff4b2b",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(255,75,43,0.2)",
                  marginTop: "5px",
                }}>
                {isSubmitting
                  ? "⏳ Publishing Live..."
                  : "📣 Broadcast My Voice"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== 👑 KEYFRAMES ANIMATIONS CSS CONTROL ==================== */}
      <style>{`
        @keyframes popupFade {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .pulse-animation {
          animation: heartBeat 1.2s infinite ease-in-out;
        }
        @keyframes heartBeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default StudentVoicesComponent;
