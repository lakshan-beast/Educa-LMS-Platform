import { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // 👑 අපේ මධ්‍යම Firebase පාලම
import {
  collection,
  // getDocs,
  query,
  // where,
  orderBy,
  // limit,
  onSnapshot,
} from "firebase/firestore"; // ☁️ Cloud Tools
import {
  FaBullhorn,
  FaCalendarCheck,
  FaLayerGroup,
  // FaUserPen,
} from "react-icons/fa6"; // 👑 🆕 Creative Icons
// import { ImSpinner } from "react-icons/im";

const LiveNoticeDisplay = () => {
  const [notices, setNotices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchLatestNotice = async () => {
  //     setTimeout(() => setIsLoading(true), 0);

  //     try {
  //       // ☁️ Firebase එකෙන් ළමයාගේ ශ්‍රේණියට සහ විෂයට අදාළව දාපු අලුත්ම නිවේදනය (Notice) පමණක් Query කරයි
  //       const q = query(
  //         collection(db, "class_notices"),
  //         // where("grade", "==", studentGrade || "11"),
  //         where("grade", "==", String(studentGrade)),

  //         where("subject", "==", (studentSubject || "maths").toLowerCase()),
  //         orderBy("createdAt", "desc"), // 🕒 අලුත්ම නිවේදනය උඩටම ගනී
  //         limit(1),
  //       );

  //       const querySnapshot = await getDocs(q);

  //       if (!querySnapshot.empty) {
  //         const docDoc = querySnapshot.docs[0];
  //         setNotice({ id: docDoc.id, ...docDoc.data() });
  //       } else {
  //         setNotice(null);
  //       }
  //     } catch (err) {
  //       console.error("Notice Fetch Error:", err);
  //     }
  //     setTimeout(() => setIsLoading(false), 0);
  //   };

  //   if (studentGrade && studentSubject) {
  //     fetchLatestNotice();
  //   }

  //   const loadLiveNoticeNow = async () => {
  //     if (studentGrade && studentSubject) {
  //       await fetchLatestNotice();
  //     }
  //   };

  //   loadLiveNoticeNow();
  // }, [studentGrade, studentSubject]);

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

  //   if (isLoading) {
  //     return (
  //       <div
  //         style={{
  //
  //         }}>
  //         <ImSpinner
  //           className="loading-spin"
  //           style={{ marginRight: "12px", animation: "spin 1s linear infinite" }}
  //         />
  //         Syncing Live Announcements...
  //       </div>
  //     );
  //   }

  //   if (!notices) {
  //     return (
  //       <div
  //         style={{
  //
  //         }}>
  //         📢 No new special announcements from your teacher for today.
  //       </div>
  //     );
  //   }

  //   return (
  //     /* ==================== 👑 PREMIUM NOTICE DISPLAY CARD ==================== */
  //     <div
  //       className="premium-notice-card"
  //       style={{
  //         // background: "linear-gradient(135deg, #fffcf5 0%, #fff9e6 100%)", // 💡 කැපී පෙනෙන ලස්සන ක්‍රීම් වර්ණයක්
  //         borderLeft: "6px solid #f39c12", // ⚠️ Warning Yellow Border
  //         padding: "22px 25px",
  //         borderRadius: "18px",
  //         boxShadow: "0 6px 18px rgba(243,156,18,0.04)",
  //         display: "flex",
  //         flexDirection: "column",
  //         gap: "12px",
  //         textAlign: "left",
  //         width: "100%",
  //         position: "relative",
  //         overflow: "hidden",
  //       }}>
  //       {/* Header Row */}
  //       <div
  //         style={{
  //
  //         }}>
  //         <div
  //           style={{
  //             display: "flex",
  //             alignItems: "center",
  //             gap: "10px",
  //             color: "#d35400",
  //             fontWeight: "800",
  //             fontSize: "0.95rem",
  //             letterSpacing: "0.3px",
  //           }}>
  //           <FaBullhorn
  //             className="blink-animation"
  //             style={{ fontSize: "1.1rem" }}
  //           />
  //           <span>LATEST CLASS NOTICE</span>
  //         </div>

  //         {/* Creative Date Badge */}
  //         <div
  //           style={{
  //             display: "flex",
  //             alignItems: "center",
  //             gap: "6px",
  //             background: "white",
  //             padding: "5px 12px",
  //             borderRadius: "10px",
  //             fontSize: "0.78rem",
  //             color: "#555",
  //             fontWeight: "700",
  //             border: "1px solid #ffeaa7",
  //           }}>
  //           <FaCalendarCheck style={{ color: "#f39c12" }} />
  //           <span>{notices.date || "Today"}</span>
  //         </div>
  //       </div>

  //       {/* Main Notice Title */}
  //       <h4
  //         style={{
  //           margin: "5px 0 0",
  //           color: "#1a0a54",
  //           fontWeight: "800",
  //           fontSize: "1.1rem",
  //           lineHeight: "1.4",
  //         }}>
  //         {notices.type}
  //         <span>{notices.subect}</span>
  //       </h4>

  //       {/* Detailed Content Box */}
  //       <p
  //         style={{
  //
  //         }}>
  //         {notices.text}
  //       </p>
  //       {/* Teacher Sign Footer */}
  //       <div
  //         style={{
  //
  //         }}>
  //         By:{" "}
  //         <span style={{ color: "#1a0a54" }}>
  //           {notices.author || "Management"}
  //         </span>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="notice-board-wrapper parts">
      <div className="notice-header">
        <h2>
          <FaBullhorn className="icon" /> Institutional{" "}
          <span>Announcements</span>
        </h2>
        <p>
          Stay updated with the latest official notices, exam schedules, and
          class updates.
        </p>
      </div>

      {isLoading ? (
        <div className="notice-loading">
          🔄 Streaming Live Academic Notices...
        </div>
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

              <div className="notice-footer-meta">
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

// import { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
// import { FaBullhorn, FaCalendarDays } from "react-icons/fa6";

// const NoticeBoard = () => {
//   const [notices, setNotices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 👑 🔐 [THE EXCLUSIVE LIVE NOTICE OBSERVER]:
//   // සයිට් එක refresh කර කර ඉන්න ඕනේ නැහැ, ඇඩ්මින් එකෙන් නොටිස් එකක් දාපු සැනින් ලයිව් අප්ඩේට් වේ මචං! [INDEX 4, 51]
//   useEffect(() => {
//     const q = query(
//       collection(db, "class_notices"),
//       orderBy("createdAt", "desc"), // 🔥 අලුත්ම නිවේදන හැම තිස්සෙම ලිස්ට් එකේ උඩින්ම පෙන්වයි මචං! [INDEX 4]
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const noticeList = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setNotices(noticeList);
//         setIsLoading(false);
//       },
//       (err) => {
//         console.error("Live Notice Stream Error:", err);
//         setIsLoading(false);
//       },
//     );

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="notice-board-wrapper page-container">
//       <div className="notice-header">
//         <h2>
//           <FaBullhorn className="icon" /> Institutional{" "}
//           <span>Announcements</span>
//         </h2>
//         <p>
//           Stay updated with the latest official notices, exam schedules, and
//           class updates.
//         </p>
//       </div>

//       {isLoading ? (
//         <div className="notice-loading">
//           🔄 Streaming Live Academic Notices...
//         </div>
//       ) : notices.length === 0 ? (
//         <div className="notice-empty">
//           No official announcements published at the moment.
//         </div>
//       ) : (
//         <div className="notice-grid">
//           {notices.map((item) => (
//             <div key={item.id} className="notice-card">
//               <div className="notice-date-meta">
//                 <FaCalendarDays />
//                 <span>
//                   {item.createdAt
//                     ? new Date(item.createdAt).toLocaleDateString()
//                     : "Just Now"}
//                 </span>
//               </div>
//               <h4>{item.title}</h4>
//               <p>{item.noticeText || item.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticeBoard;

// import { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
// import {
//   FaBullhorn,
//   FaCalendarDays,
//   FaUserPen,
//   FaLayerGroup,
// } from "react-icons/fa6";

// const NoticeBoard = () => {
//   const [notices, setNotices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // 🚀 [THE MASTER LIVE NOTICE STREAMER]:
//     // ඔයාගේ සැබෑ Firebase පෙට්ටියේ නම notices ද නැතහොත් වෙනස්ද කියා මීටරේ තබාගන්න මචං! [INDEX 4, 51]
//     const q = query(
//       collection(db, "class_notices"),
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
//         console.error("Live Notice Stream Error:", err);
//         setIsLoading(false);
//       },
//     );

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="notice-board-wrapper">
//       <div className="notice-header">
//         <h2>
//           <FaBullhorn className="icon" /> Institutional{" "}
//           <span>Announcements</span>
//         </h2>
//         <p>
//           Stay updated with the latest official notices, exam schedules, and
//           class updates.
//         </p>
//       </div>

//       {isLoading ? (
//         <div className="notice-loading">
//           🔄 Streaming Live Academic Notices...
//         </div>
//       ) : notices.length === 0 ? (
//         <div className="notice-empty">
//           No official announcements published at the moment.
//         </div>
//       ) : (
//         <div className="notice-grid">
//           {notices.map((item) => (
//             <div key={item.docId} className="notice-card">
//               <div className="notice-top-meta">
//                 <div className="meta-item">
//                   <FaCalendarDays />
//                   <span>{item.date || "No Date"}</span>
//                 </div>
//                 <span className="type-badge">{item.type || "General"}</span>
//               </div>

//               <h4>
//                 {item.subject ? item.subject.toUpperCase() : "GENERAL"} - Grade{" "}
//                 {item.grade || "All"}
//               </h4>

//               <p className="notice-main-text">{item.text}</p>

//               <div className="notice-footer-meta">
//                 <span>
//                   <FaUserPen /> Published by:{" "}
//                   <strong>{item.author || "Faculty Admin"}</strong>
//                 </span>
//                 <span className="subject-tag">
//                   <FaLayerGroup /> {item.subject || "Common"}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticeBoard;

// author
// "Janaka Sir"
// (string)

// createdAt
// "2026-06-08T05:37:00.299Z"
// (string)

// date
// "2026-06-18"
// (string)

// grade
// "11"
// (string)

// id
// "NOT-020299"
// (string)

// subject
// "maths"
// (string)

// text
// "A special Zoom meeting will be held for all Grade 11 parents on Sunday, June 21, 2026 at 9:00 AM. Participation is mandatory."
// (string)

// type
// "Parent-Meetings"
