// // 👑 🔐 [THE MASTER LIVE ADMIN MAILBOX ENGINE]:
// // Firebase onSnapshot ඔත්තුකරු සහ නම්බර් සේව් නොකර WhatsApp Reply යවන ස්මාර්ට් පද්ධතිය මචං! [INDEX 4, 51]

// import { useState, useEffect } from "react";
// import { db } from "../../firebaseConfig";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import {
//   FaEnvelope,
//   FaWhatsapp,
//   FaTrashCan,
//   FaFolderOpen,
// } from "react-icons/fa6";

// import { FaCheckCircle } from "react-icons/fa";

// const AdminDashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentAdminSubject, setCurrentAdminSubject] = useState("MATHS"); // 👑 MATHS / SCIENCE / ENGLISH විදිහට මාරු කළ හැක [INDEX 4]

//   // 1️⃣ 📡 [REAL-TIME SNAPSHOT WATCHER LOGIC]:
//   // සයිට් එක රීෆ්‍රෙෂ් කර කර ඉන්න ඕනේ නැහැ, මැසේජ් එකක් වැටුණු සැනින් ලයිව් අප්ඩේට් වේ මචං! [INDEX 4, 51]
//   useEffect(() => {
//     // setIsLoading(true);

//     // 🚀 විෂය අනුව සහ Unread මැසේජ් විතරක් වෙන් කරගන්නා Cloud Filter එක [INDEX 51]
//     const q = query(
//       collection(db, "contact_messages"),
//       where("subject", "==", currentAdminSubject),
//       where("status", "==", "unread"),
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const msgList = snapshot.docs.map((doc) => ({
//           docId: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(msgList);
//         setIsLoading(false);
//       },
//       (err) => {
//         console.error("Mailbox Listener Error:", err);
//         setIsLoading(false);
//       },
//     );

//     return () => unsubscribe();
//   }, [currentAdminSubject]);

//   // 2️⃣ 💬 [THE QUICK WHATSAPP AUTOMATION HOOK]:
//   // දෙමාපියන්ගේ නම්බර් ලැප් එකේ සේව් කර කර වද වෙන්න ඕනේ නැහැ මචං! [INDEX 4]
//   const handleWhatsappReply = (phone, fullName, massageText) => {
//     const cleanPhone = phone.replace(/[^0-9]/g, ""); // නම්බර් එක පිරිසිදු කරයි
//     const formattedPhone = cleanPhone.startsWith("0")
//       ? "94" + cleanPhone.substring(1)
//       : cleanPhone;

//     const replyMessage = `educa. Academic Support (${currentAdminSubject}) 🏛️\n\nDear Parent/Student (${fullName}),\nRegarding your inquiry: "${massageText}"\n\n[Type your reply here]`;
//     const whatsappUrl = `https://wa.me${formattedPhone}?text=${encodeURIComponent(replyMessage)}`;

//     window.open(whatsappUrl, "_blank"); // WhatsApp චැට් එක වෙනම ටැබ් එකක ලයිව් ඕපන් කරවයි! [INDEX 4]
//   };

//   // 3️⃣ 🔓 MARK AS READ DOCUMENT UPDATE
//   const handleMarkAsRead = async (docId) => {
//     try {
//       await updateDoc(doc(db, "contact_messages", docId), { status: "read" }); // Cloud එකේ status එක read කරයි [INDEX 51]
//     } catch (err) {
//       console.error("Mark Read Error:", err);
//     }
//   };

//   // 4️⃣ 🗑️ DELETE MESSAGE DOCUMENT FROM CLOUD
//   const handleDeleteMessage = async (docId) => {
//     if (
//       window.confirm(
//         "Are you sure you want to permanently delete this message?",
//       )
//     ) {
//       try {
//         await deleteDoc(doc(db, "contact_messages", docId)); // Cloud එකෙන්ම සදහටම මකා දමයි [INDEX 51]
//       } catch (err) {
//         console.error("Delete Error:", err);
//       }
//     }
//   };

//   return (
//     <div
//       className="admin-mailbox-wrapper"
//       style={{
//         padding: "40px 20px",
//         maxWidth: "1200px",
//         margin: "0 auto",
//         textAlign: "left",
//       }}>
//       {/* HEADER SECTION */}
//       <div
//         className="admin-header"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           borderBottom: "2px solid #e2e8f0",
//           paddingBottom: "20px",
//           marginBottom: "30px",
//         }}>
//         <div>
//           <h1
//             style={{
//               color: "#03204b",
//               margin: 0,
//               fontWeight: "900",
//               fontSize: "2rem",
//             }}>
//             Academic Admin Mailbox
//           </h1>
//           <p
//             style={{
//               color: "#64748b",
//               margin: "5px 0 0 0",
//               fontSize: "0.9rem",
//             }}>
//             Real-time student inquiry management terminal powered by Firebase
//             [INDEX 51].
//           </p>
//         </div>

//         {/* SUBJECT SWITCHER DRILL */}
//         <select
//           value={currentAdminSubject}
//           onChange={(e) => setCurrentAdminSubject(e.target.value)}
//           style={{
//             padding: "10px 16px",
//             borderRadius: "12px",
//             border: "1px solid #cbd5e1",
//             fontSize: "0.9rem",
//             color: "#03204b",
//             fontWeight: "700",
//             background: "#f8fafc",
//             cursor: "pointer",
//           }}>
//           <option value="MATHS">📐 Mathematics Admin</option>
//           <option value="SCIENCE">🔬 Science Admin</option>
//           <option value="ENGLISH">🔤 English Admin</option>
//         </select>
//       </div>

//       {/* LIVE MAILBOX VISUAL GRID */}
//       {isLoading ? (
//         <div
//           style={{
//             textAlign: "center",
//             padding: "40px",
//             color: "#03204b",
//             fontWeight: "700",
//           }}>
//           Loading Live Mailbox Streams...
//         </div>
//       ) : messages.length === 0 ? (
//         <div
//           style={{
//             textAlign: "center",
//             padding: "60px",
//             background: "#f8fafc",
//             borderRadius: "20px",
//             border: "1px solid #e2e8f0",
//             color: "#64748b",
//           }}>
//           <FaFolderOpen
//             style={{
//               fontSize: "2.5rem",
//               marginBottom: "15px",
//               color: "#cbd5e1",
//             }}
//           />
//           <p style={{ margin: 0, fontWeight: "600" }}>
//             No unread inquiries inside {currentAdminSubject} cluster.
//           </p>
//         </div>
//       ) : (
//         <div
//           className="mailbox-grid"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
//             gap: "20px",
//           }}>
//           {messages.map((msg) => (
//             <div
//               key={msg.docId}
//               className="mail-card"
//               style={{
//                 background: "white",
//                 padding: "25px",
//                 borderRadius: "20px",
//                 boxShadow: "0 10px 25px rgba(3,32,75,0.04)",
//                 border: "1px solid #eef2ff",
//                 position: "relative",
//               }}>
//               {/* NEW MESSAGE RED DOT ALARM */}
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "20px",
//                   right: "20px",
//                   background: "#ef4444",
//                   color: "white",
//                   fontSize: "0.7rem",
//                   fontWeight: "800",
//                   padding: "4px 8px",
//                   borderRadius: "8px",
//                 }}>
//                 🔴 NEW
//               </span>

//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "12px",
//                   marginBottom: "15px",
//                 }}>
//                 <div
//                   style={{
//                     background: "#e0f2fe",
//                     color: "#03204b",
//                     width: "40px",
//                     height: "40px",
//                     borderRadius: "50%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     fontSize: "1.1rem",
//                   }}>
//                   <FaEnvelope />
//                 </div>
//                 <div>
//                   <h4
//                     style={{
//                       margin: 0,
//                       color: "#03204b",
//                       fontWeight: "800",
//                       fontSize: "1.05rem",
//                     }}>
//                     {msg.fullfullName}
//                   </h4>
//                   <small style={{ color: "#64748b", fontWeight: "600" }}>
//                     📞 {msg.phone}
//                   </small>
//                 </div>
//               </div>

//               <p
//                 style={{
//                   color: "#334155",
//                   fontSize: "0.9rem",
//                   lineHeight: "1.6",
//                   background: "#f8fafc",
//                   padding: "14px",
//                   borderRadius: "12px",
//                   margin: "0 0 20px 0",
//                   minHeight: "60px",
//                 }}>
//                 {msg.messageText}
//               </p>

//               {/* ACTION BUTTON ENGINE CONNECTIONS */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   borderTop: "1px solid #f1f5f9",
//                   paddingTop: "15px",
//                 }}>
//                 <button
//                   onClick={() =>
//                     handleWhatsappReply(
//                       msg.phone,
//                       msg.fullfullName,
//                       msg.messageText,
//                     )
//                   }
//                   style={{
//                     background: "#22c55e",
//                     color: "white",
//                     border: "none",
//                     padding: "8px 14px",
//                     borderRadius: "8px",
//                     fontWeight: "700",
//                     fontSize: "0.82rem",
//                     cursor: "pointer",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: "6px",
//                   }}>
//                   <FaWhatsapp /> WhatsApp Reply
//                 </button>
//                 <div style={{ display: "flex", gap: "8px" }}>
//                   <button
//                     onClick={() => handleMarkAsRead(msg.docId)}
//                     title="Mark as Read"
//                     style={{
//                       background: "#f1f5f9",
//                       color: "#03204b",
//                       border: "none",
//                       width: "34px",
//                       height: "34px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}>
//                     <FaCheckCircle />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteMessage(msg.docId)}
//                     title="Delete Message"
//                     style={{
//                       background: "#fee2e2",
//                       color: "#ef4444",
//                       border: "none",
//                       width: "34px",
//                       height: "34px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}>
//                     <FaTrashCan />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

// import { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import {
//   FaEnvelope,
//   FaWhatsapp,
//   // FaCheckCircle,
//   FaTrashCan,
//   FaFolderOpen,
// } from "react-icons/fa6";
// import { FaCheckCircle } from "react-icons/fa";

// const AdminDashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentAdminSubject, setCurrentAdminSubject] = useState("MATHS");

//   useEffect(() => {
//     // setIsLoading(true);

//     const q = query(
//       collection(db, "contact_messages"),
//       where("subject", "==", currentAdminSubject),
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const msgList = snapshot.docs.map((doc) => ({
//           docId: doc.id,
//           ...doc.data(),
//         }));

//         msgList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         setMessages(msgList);
//         setIsLoading(false);
//       },
//       (err) => {
//         console.error("Subject Mailbox Fetch Error:", err);
//         setIsLoading(false);
//       },
//     );

//     return () => unsubscribe();
//   }, [currentAdminSubject]);

//   const handleWhatsappReply = (phone, fullName, massageText) => {
//     const cleanPhone = phone.replace(/[^0-9]/g, "");
//     const formattedPhone = cleanPhone.startsWith("0")
//       ? "94" + cleanPhone.substring(1)
//       : cleanPhone;

//     const replyMessage = `educa. Academic Support (${currentAdminSubject}) 🏛️\n\nDear Parent/Student (${fullName}),\nRegarding your inquiry: "${massageText}"\n\n[Type your reply here]`;
//     const whatsappUrl = `https://wa.me${formattedPhone}?text=${encodeURIComponent(replyMessage)}`;

//     window.open(whatsappUrl, "_blank");
//   };

//   const handleMarkAsRead = async (docId) => {
//     try {
//       await updateDoc(doc(db, "contact_messages", docId), { status: "read" });
//     } catch (err) {
//       console.error("Mark Read Status Error:", err);
//     }
//   };

//   const handleDeleteMessage = async (docId) => {
//     if (
//       window.confirm(
//         "Are you sure you want to permanently delete this message?",
//       )
//     ) {
//       try {
//         await deleteDoc(doc(db, "contact_messages", docId));
//       } catch (err) {
//         console.error("Delete Document Error:", err);
//       }
//     }
//   };

//   return (
//     <div className="admin-mailbox-wrapper">
//       <div className="admin-header">
//         <div>
//           <h1>Academic Admin Mailbox</h1>
//           <p>Real-time subject-specific student inquiry management terminal.</p>
//         </div>

//         <select
//           value={currentAdminSubject}
//           onChange={(e) => setCurrentAdminSubject(e.target.value)}>
//           <option value="MATHS">📐 Mathematics Admin</option>
//           <option value="SCIENCE">🔬 Science Admin</option>
//           <option value="ENGLISH">🔤 English Admin</option>
//         </select>
//       </div>

//       {isLoading ? (
//         <div className="mailbox-loading">
//           🔄 Routing Live {currentAdminSubject} Core...
//         </div>
//       ) : messages.length === 0 ? (
//         <div className="mailbox-empty">
//           <FaFolderOpen className="empty-icon" />
//           <p>No inquiries found inside {currentAdminSubject} cluster.</p>
//         </div>
//       ) : (
//         <div className="mailbox-grid">
//           {messages.map((msg) => (
//             <div
//               key={msg.docId}
//               className="mail-card"
//               style={{ opacity: msg.status === "read" ? 0.65 : 1 }}>
//               {msg.status !== "read" && (
//                 <span className="mail-badge">🔴 NEW</span>
//               )}
//               {msg.status === "read" && (
//                 <span className="mail-badge" style={{ background: "#64748b" }}>
//                   ✓ READ
//                 </span>
//               )}

//               <div className="mail-user-block">
//                 <div className="mail-avatar">
//                   <FaEnvelope />
//                 </div>
//                 <div>
//                   <h4>{msg.fullfullName}</h4>
//                   <small>📞 {msg.phone}</small>
//                 </div>
//               </div>

//               <p className="mail-text">{msg.messageText}</p>
//               <div className="mail-actions">
//                 <button
//                   onClick={() =>
//                     handleWhatsappReply(
//                       msg.phone,
//                       msg.fullfullName,
//                       msg.messageText,
//                     )
//                   }
//                   className="whatsapp-btn">
//                   <FaWhatsapp /> WhatsApp Reply
//                 </button>
//                 <div className="control-btn-group">
//                   {msg.status !== "read" && (
//                     <button
//                       onClick={() => handleMarkAsRead(msg.docId)}
//                       title="Mark as Read"
//                       className="read-btn">
//                       <FaCheckCircle />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDeleteMessage(msg.docId)}
//                     title="Delete Message"
//                     className="delete-btn">
//                     <FaTrashCan />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  FaEnvelope,
  FaWhatsapp,
  FaTrashCan,
  FaFolderOpen,
  FaShieldHalved,
} from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const AdminMailbox = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 👑 🔐 [THE EXCLUSIVE MULTI-USER SESSION LOCK]:
  // දැනට ලොග් වී ඉන්න ගුරුවරයාගේ විෂය කුමක්ද කියා හඳුනා ගනී (Default එක maths මචං)
  const currentFacultyRole = localStorage.getItem("current_faculty_role") || "";

  useEffect(() => {
    // setIsLoading(true);

    // 📡 සර්වර් මට්ටමෙන්ම තමන්ගේ විෂයට අදාළ ලා අකුරු ලේබල් (maths/science/english) විතරක් ලයිව් ෆිල්ටර් කරයි! [INDEX 51]
    const q = query(
      collection(db, "contact_messages"),
      where("subject", "==", currentFacultyRole.toLowerCase()),
      where("status", "==", "unread"), // 🔥 තවමත් කියවා නැති අලුත් මේල්ස් විතරක්ම ගනී මචං [INDEX 51]
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgList = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));

        // 📅 අලුතින්ම ආපු පණිවිඩ හැම තිස්සෙම ලිස්ට් එකේ උඩින්ම පෙන්වයි
        msgList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setMessages(msgList);
        setIsLoading(false);
      },
      (err) => {
        console.error("Secure Cloud Mailbox Sync Error:", err);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [currentFacultyRole]);

  const handleWhatsappReply = (phone, fullName, massageText) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("0")
      ? "94" + cleanPhone.substring(1)
      : cleanPhone;

    const replyMessage = `educa. Academic Support (${currentFacultyRole.toUpperCase()}) 🏛️\n\nDear Parent/Student (${fullName}),\nRegarding your inquiry: "${massageText}"\n\n[Type your reply here]`;
    const whatsappUrl = `https://wa.me${formattedPhone}?text=${encodeURIComponent(replyMessage)}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleMarkAsRead = async (docId) => {
    try {
      await updateDoc(doc(db, "contact_messages", docId), { status: "read" }); // Cloud එකේ status එක read කර ලිස්ට් එකෙන් පිරිසිදු කරයි [INDEX 51]
    } catch (err) {
      console.error("Mark Read Error:", err);
    }
  };

  const handleDeleteMessage = async (docId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this inquiry?",
      )
    ) {
      try {
        await deleteDoc(doc(db, "contact_messages", docId)); // සදහටම ක්ලවුඩ් එකෙන් මකා දමයි [INDEX 51]
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  return (
    <div className="admin-mailbox-wrapper">
      <div className="admin-header">
        <div>
          <h1>
            <FaShieldHalved /> {currentFacultyRole.toUpperCase()} Faculty Inbox
          </h1>
          <p>
            Secure subject-isolated real-time incoming student inquiry
            management terminal [INDEX 4].
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="mailbox-loading">
          🔄 Routing Secure {currentFacultyRole.toUpperCase()} Live Streams...
        </div>
      ) : messages.length === 0 ? (
        <div className="mailbox-empty">
          <FaFolderOpen className="empty-icon" />
          <p>
            Your inbox is perfectly clean. No unread inquiries inside{" "}
            {currentFacultyRole} cluster [INDEX 4].
          </p>
        </div>
      ) : (
        <div className="mailbox-grid">
          {messages.map((msg) => (
            <div key={msg.docId} className="mail-card">
              <span className="mail-badge">🔴 NEW</span>

              <div className="mail-user-block">
                <div className="mail-avatar">
                  <FaEnvelope />
                </div>
                <div>
                  <h4>{msg.fullfullName}</h4>
                  <small>📞 {msg.phone}</small>
                </div>
              </div>
              <p className="mail-text">{msg.messageText || msg.message}</p>

              <div className="mail-actions">
                <button
                  onClick={() =>
                    handleWhatsappReply(
                      msg.phone,
                      msg.fullfullName,
                      msg.messageText || msg.message,
                    )
                  }
                  className="whatsapp-btn">
                  <FaWhatsapp /> WhatsApp Reply
                </button>
                <div className="control-btn-group">
                  <button
                    onClick={() => handleMarkAsRead(msg.docId)}
                    title="Mark as Read"
                    className="read-btn">
                    <FaCheckCircle />
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(msg.docId)}
                    title="Delete Inquiry"
                    className="delete-btn">
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMailbox;
