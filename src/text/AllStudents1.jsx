// import { useState, useEffect } from "react";
// import { db } from "../../firebaseConfig";
// import {
//   collection,
//   query,
//   onSnapshot,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import {
//   FaUsers,
//   FaUserPen,
//   FaUserMinus,
//   FaCheck,
//   FaXmark,
//   FaMagnifyingGlass,
// } from "react-icons/fa6";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // 📝 UPDATE STATE MANAGEMENT LOGIC
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     fullName: "",
//     phone: "",
//     grade: "",
//     medium: "",
//   });

//   useEffect(() => {
//     // 📡 [REAL-TIME CLOUD STUDENTS WATCHER]:
//     // Firebase එකට අලුතින් ළමයෙක් ඇඩ් කරපු සැනින් මේ ලැයිස්තුව Refresh නොවී ලයිව් අප්ඩේට් වේ! [INDEX 51]
//     const q = query(collection(db, "students"));
//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const studentList = snapshot.docs.map((doc) => ({
//           docId: doc.id,
//           ...doc.data(),
//         }));
//         setStudents(studentList);
//         setIsLoading(false);
//       },
//       (err) => {
//         console.error("Cloud Students Fetch Error:", err);
//         setIsLoading(false);
//       },
//     );

//     return () => unsubscribe();
//   }, []);

//   // 🔄 START LIVE EDIT MODE
//   const startEdit = (student) => {
//     setEditingId(student.docId);
//     setEditForm({
//       fullName: student.fullName || "",
//       phone: student.phone || "",
//       grade: student.grade || "",
//       medium: student.medium || "",
//     });
//   };

//   // 🔓 SUBMIT UPDATED DATA TO CLOUD
//   const handleUpdateStudent = async (docId) => {
//     try {
//       await updateDoc(doc(db, "students", docId), editForm); // Firebase එකේ දත්ත ලයිව් වෙනස් කරයි [INDEX 51]
//       setEditingId(null);
//     } catch (err) {
//       console.error("Update Student Error:", err);
//     }
//   };

//   // 🗑️ PERMANENTLY REMOVE STUDENT FROM CLASS
//   const handleDeleteStudent = async (docId, name) => {
//     if (
//       window.confirm(
//         `Are you sure you want to permanently remove ${name} from the institute database?`,
//       )
//     ) {
//       try {
//         await deleteDoc(doc(db, "students", docId)); // Cloud එකෙන් සදහටම මකා දමයි [INDEX 51]
//       } catch (err) {
//         console.error("Delete Student Error:", err);
//       }
//     }
//   };

//   // 🔍 LIVE SEARCH FILTER DRILL
//   const filteredStudents = students.filter(
//     (student) =>
//       student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.phone?.includes(searchTerm),
//   );

//   return (
//     <div className="all-students-wrapper">
//       {/* TERMINAL HEADER */}
//       <div className="students-header">
//         <div>
//           <h1>
//             <FaUsers /> Institutional Student Registry
//           </h1>
//           <p>
//             Live database control center to monitor, update, or suspend
//             registered student profiles.
//           </p>
//         </div>

//         {/* SMART SEARCH BAR INTERFACE */}
//         <div className="search-box-bar">
//           <FaMagnifyingGlass />
//           <input
//             type="text"
//             placeholder="Search by Name, Student ID, or Phone..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="registry-loading">
//           🔄 Syncing Live Student Cloud Ledger...
//         </div>
//       ) : filteredStudents.length === 0 ? (
//         <div className="registry-empty">
//           No matching registered students found in this cluster.
//         </div>
//       ) : (
//         <div className="students-table-scroll-shield">
//           <table className="students-management-table">
//             <thead>
//               <tr>
//                 <th>Student ID</th>
//                 <th>Full Name</th>
//                 <th>Phone Number</th>
//                 <th>Grade</th>

//                 <th>Medium</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStudents.map((student) => (
//                 <tr
//                   key={student.docId}
//                   className={
//                     editingId === student.docId ? "row-editing-active" : ""
//                   }>
//                   {/* STUDENT ID (STAYS HARD-LOCKED) */}
//                   <td>
//                     <strong>{student.studentId || "PENDING"}</strong>
//                   </td>

//                   {/* DYNAMIC FIELD ROUTING (EDIT VS VIEW) */}
//                   {editingId === student.docId ? (
//                     <>
//                       <td>
//                         <input
//                           type="text"
//                           value={editForm.fullName}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               fullName: e.target.value,
//                             })
//                           }
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={editForm.phone}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, phone: e.target.value })
//                           }
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={editForm.grade}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, grade: e.target.value })
//                           }
//                           style={{ width: "60px" }}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={editForm.medium}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, medium: e.target.value })
//                           }
//                           style={{ width: "90px" }}
//                         />
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => handleUpdateStudent(student.docId)}
//                           className="action-btn save-btn"
//                           title="Save Changes">
//                           <FaCheck />
//                         </button>
//                         <button
//                           onClick={() => setEditingId(null)}
//                           className="action-btn cancel-btn"
//                           title="Cancel">
//                           <FaXmark />
//                         </button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td>{student.fullName}</td>
//                       <td>{student.phone}</td>
//                       <td>Grade {student.grade}</td>
//                       <td>{student.medium}</td>
//                       <td>
//                         <button
//                           onClick={() => startEdit(student)}
//                           className="action-btn edit-btn"
//                           title="Edit Profile">
//                           <FaUserPen />
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleDeleteStudent(student.docId, student.fullName)
//                           }
//                           className="action-btn delete-btn"
//                           title="Remove Student">
//                           <FaUserMinus />
//                         </button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import {
  FaUsers,
  FaUserPen,
  FaUserMinus,
  FaCheck,
  FaXmark,
  FaMagnifyingGlass,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 👑 MULTI-LEVEL FILTER STATES (Grade 10/11 & Gender Filter Toggles) [INDEX 4]
  const [activeGrade, setActiveGrade] = useState("10");
  const [activeGender, setActiveGender] = useState("ALL");

  // 🔒 PRIVACY DATA MASKING SHOW/HIDE TOGGLES [INDEX 4]
  const [revealedIds, setRevealedIds] = useState({});

  // 📝 UPDATE STATE MANAGEMENT LOGIC
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    phone: "",
    guardianPhone: "",
    grade: "",
    medium: "",
    gender: "",
    subjects: [],
  });

  // 👑 🔐 [THE EXCLUSIVE TEACHER PRIVACY LOCK]:
  // දැනට ලොග් වෙලා ඉන්න ගුරුවරයාගේ විෂය (MATHS / SCIENCE / ENGLISH) අනුව විතරක් ළමයි ෆිල්ටර් වේ මචං! [INDEX 4]
  const currentFacultySubject =
    localStorage.getItem("admin_faculty_subject") || "maths";

  //   useEffect(() => {
  //     // setIsLoading(true);

  //     // 📡 සර්වර් මට්ටමෙන්ම තමන්ගේ විෂයට අදාළ ළමයි විතරක් ලයිව් ෆිල්ටර් කරලා අල්ලා ගනී මචං! [INDEX 51]
  //     const q = query(
  //       collection(db, "students"),
  //       where("subjects", "array-contains", currentFacultySubject.toLowerCase()),
  //     );

  //     const unsubscribe = onSnapshot(
  //       q,
  //       (snapshot) => {
  //         const studentList = snapshot.docs.map((doc) => ({
  //           docId: doc.id,
  //           ...doc.data(),
  //         }));
  //         setStudents(studentList);
  //         setIsLoading(false);
  //       },
  //       (err) => {
  //         console.error("Cloud Secure Sync Error:", err);
  //         setIsLoading(false);
  //       },
  //     );

  //     return () => unsubscribe();
  //   }, [currentFacultySubject]);

  useEffect(() => {
    // setIsLoading(true);

    // 👑 🔐 [THE EXCLUSIVE CASE-INSENSITIVE FILTER LOCK]:
    // .toLowerCase() දමපු නිසා සර්වර් එකේ "maths" කියලා තිබුණත් නූලටම ගළපා ලයිව් ඇද ගනී මචං! [INDEX 4, 51]
    const q = query(
      collection(db, "students"),
      where("subjects", "array-contains", currentFacultySubject.toLowerCase()),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const studentList = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setStudents(studentList);
        setIsLoading(false);
      },
      (err) => {
        console.error("Cloud Secure Sync Error:", err);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [currentFacultySubject]);

  const startEdit = (student) => {
    setEditingId(student.docId);
    setEditForm({
      fullName: student.fullName || "",
      phone: student.phone || "",
      guardianPhone: student.guardianPhone || "",
      grade: student.grade || "",
      medium: student.medium || "",
      gender: student.gender || "boy",
      subjects: student.subjects || [],
    });
  };

  const handleUpdateStudent = async (docId) => {
    try {
      await updateDoc(doc(db, "students", docId), editForm);
      setEditingId(null);
    } catch (err) {
      console.error("Update Student Error:", err);
    }
  };

  const handleDeleteStudent = async (docId, name) => {
    if (
      window.confirm(
        `Are you sure you want to permanently remove ${name} from the database?`,
      )
    ) {
      try {
        await deleteDoc(doc(db, "students", docId));
      } catch (err) {
        console.error("Delete Student Error:", err);
      }
    }
  };

  const toggleMasking = (docId) => {
    setRevealedIds((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };

  const maskString = (str) => {
    if (!str) return "**";
    return "**" + str.slice(-4);
  };

  // 👑 🗂️ ADVANCED MULTI-LEVEL FILTER MATRIX ENGINE [INDEX 4]
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone?.includes(searchTerm);

    const matchesGrade = student.grade === activeGrade;
    const matchesGender =
      activeGender === "ALL" ? true : student.gender === activeGender;

    return matchesSearch && matchesGrade && matchesGender;
  });

  //   return (
  //     <div className="all-students-wrapper">

  //       <div className="students-header">
  //         <div>
  //           <h1><FaUsers /> {currentFacultySubject} Faculty Registry</h1>
  //           <p>Secure subject-isolated student database core managing Grade 10 & 11 frameworks [INDEX 4].</p>
  //         </div>

  //         <div className="search-box-bar">
  //           <FaMagnifyingGlass />
  //           <input
  //             type="text"
  //             placeholder="Search student profile..."
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //           />
  //         </div>
  //       </div>

  //       {/* 👑 🎛️ MULTI-LEVEL MASTER TAB FILTERS */}
  //       <div className="master-filter-control-dock">
  //         <div className="filter-segment">
  //           <span className="segment-label">Select Academic Grade:</span>
  //           <button onClick={() => setActiveGrade("10")} className={filter-pill-btn ${activeGrade === "10" ? "active" : ""}}>Grade 10</button>
  //           <button onClick={() => setActiveGrade("11")} className={filter-pill-btn ${activeGrade === "11" ? "active" : ""}}>Grade 11</button>
  //         </div>

  //         <div className="filter-segment">
  //           <span className="segment-label">Gender Filter:</span>
  //           <button onClick={() => setActiveGender("ALL")} className={filter-pill-btn ${activeGender === "ALL" ? "active" : ""}}>All Students</button>
  //           <button onClick={() => setActiveGender("boy")} className={filter-pill-btn ${activeGender === "boy" ? "active" : ""}}>Boys Only</button>
  //           <button onClick={() => setActiveGender("girl")} className={filter-pill-btn ${activeGender === "girl" ? "active" : ""}}>Girls Only</button>
  //         </div>
  //       </div>

  //       {isLoading ? (
  //         <div className="registry-loading">🔄 Syncing Secure Student Cloud Ledger...</div>
  //       ) : filteredStudents.length === 0 ? (
  //         <div className="registry-empty">No matching records allocated inside this filtered cluster [INDEX 4].</div>
  //       ) : (
  //         <div className="students-table-scroll-shield">
  //           <table className="students-management-table">
  //             <thead>
  //               <tr>
  //                 <th>Student ID</th>
  //                 <th>Full Name</th>
  //                 <th>Student Phone</th>
  //                 <th>Guardian Phone</th>
  //                 <th>Medium</th>
  //                 <th>Enrolled Classes</th>
  //                 <th>Actions</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {filteredStudents.map((student) => {
  //                 const isEditing = editingId === student.docId;
  //                 const isRevealed = revealedIds[student.docId];

  //                 // 🎨 DYNAMIC BACKGROUND GENDER COLORS [INDEX 4]
  //                 const genderClass = student.gender === "girl" ? "gender-row-girl" : "gender-row-boy";

  //                 return (
  //                   <tr key={student.docId} className={${genderClass} ${isEditing ? "row-editing-active" : ""}}>

  //                     <td><strong>{student.studentId || "PENDING"}</strong></td>

  //                     {isEditing ? (
  //                       <>
  //                         <td><input type="text" value={editForm.fullName} onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })} /></td>
  //                         <td><input type="text" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} /></td>
  //                         <td><input type="text" value={editForm.guardianPhone} onChange={(e) => setEditForm({ ...editForm, guardianPhone: e.target.value })} /></td>
  //                         <td><input type="text" value={editForm.medium} onChange={(e) => setEditForm({ ...editForm, medium: e.target.value })} style={{ width: "90px" }} /></td>
  //                         <td>
  //                           <select value={editForm.gender} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })} className="table-dropdown-select">
  //                             <option value="boy">Boy</option>
  //                             <option value="girl">Girl</option>
  //                           </select>
  //                         </td>
  //                         <td>
  //                           <button onClick={() => handleUpdateStudent(student.docId)} className="action-btn save-btn"><FaCheck /></button>
  //                           <button onClick={() => setEditingId(null)} className="action-btn cancel-btn"><FaXmark /></button>
  //                         </td>
  //                       </>
  //                     ) : (
  //                       <>
  //                         <td>{student.fullName}</td>

  //                         {/* 🔒 DATA MASKING LAYERS APPLIED */}
  //                         <td>
  //                           <div className="masked-data-cell">
  //                             <span>{isRevealed ? student.phone : maskString(student.phone)}</span>
  //                             <button onClick={() => toggleMasking(student.docId)} className="mask-toggle-trigger">
  //                               {isRevealed ? <FaEyeSlash /> : <FaEye />}
  //                             </button>
  //                           </div>
  //                         </td>
  //                         <td>
  //                           <div className="masked-data-cell">
  //                             <span>{isRevealed ? student.guardianPhone : maskString(student.guardianPhone)}</span>
  //                           </div>
  //                         </td>

  //                         <td>{student.medium}</td>
  //                         <td>
  //                           <div className="subject-badge-container-cell">
  //                             {student.subjects?.map((sub) => (
  //                               <span key={sub} className={sub-badge-tag ${sub.toLowerCase()}}>{sub}</span>
  //                             ))}
  //                           </div>
  //                         </td>
  //                         <td>
  //                           <button onClick={() => startEdit(student)} className="action-btn edit-btn"><FaUserPen /></button>
  //                           <button onClick={() => handleDeleteStudent(student.docId, student.fullName)} className="action-btn delete-btn"><FaUserMinus /></button>
  //                         </td>
  //                       </>
  //                     )}

  //                   </tr>
  //                 );
  //                 })}

  // )}

  // );
  // };

  // export default AllStudents;

  return (
    <div className="all-students-wrapper">
      <div className="students-header">
        <div>
          <h1>
            <FaUsers /> {currentFacultySubject} Faculty Registry
          </h1>
          <p>
            Secure subject-isolated student database core managing Grade 10 & 11
            frameworks.
          </p>
        </div>

        <div className="search-box-bar">
          <FaMagnifyingGlass />
          <input
            type="text"
            placeholder="Search student profile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="master-filter-control-dock">
        <div className="filter-segment">
          <span className="segment-label">Select Academic Grade:</span>
          <button
            onClick={() => setActiveGrade("11")}
            className={`filter-pill-btn ${activeGrade === "11" ? "active" : ""}`}>
            Grade 11
          </button>
          <button
            onClick={() => setActiveGrade("10")}
            className={`filter-pill-btn ${activeGrade === "10" ? "active" : ""}`}>
            Grade 10
          </button>
        </div>

        <div className="filter-segment">
          <span className="segment-label">Gender Filter:</span>
          <button
            onClick={() => setActiveGender("ALL")}
            className={`filter-pill-btn ${activeGender === "ALL" ? "active" : ""}`}>
            All Students
          </button>
          <button
            onClick={() => setActiveGender("boy")}
            className={`filter-pill-btn ${activeGender === "boy" ? "active" : ""}`}>
            Boys Only
          </button>
          <button
            onClick={() => setActiveGender("girl")}
            className={`filter-pill-btn ${activeGender === "girl" ? "active" : ""}`}>
            Girls Only
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="registry-loading">
          {" "}
          Syncing Secure Student Cloud Ledger...
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="registry-empty">
          No matching records allocated inside this filtered cluster.
        </div>
      ) : (
        <div className="students-table-scroll-shield">
          <table className="students-management-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Student Phone</th>
                <th>Guardian Phone</th>
                <th>Medium</th>
                <th>Enrolled Classes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const isEditing = editingId === student.docId;
                const isRevealed = revealedIds[student.docId];
                const genderClass =
                  student.gender === "girl"
                    ? "gender-row-girl"
                    : "gender-row-boy";

                return (
                  <tr
                    key={student.docId}
                    className={`${genderClass} ${isEditing ? "row-editing-active" : ""}`}>
                    <td>
                      <strong>{student.studentId || "PENDING"}</strong>
                    </td>

                    {isEditing ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editForm.fullName}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                fullName: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm.phone}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                phone: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm.guardianPhone}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                guardianPhone: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm.medium}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                medium: e.target.value,
                              })
                            }
                            style={{ width: "90px" }}
                          />
                        </td>
                        {/* <td>
                          <select value={editForm.gender} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })} className="table-dropdown-select"></select>
                          <option value="boy">Boy</option>
                            <option value="girl">Girl</option>
                          </select>
                        </td> */}
                        <td>
                          <div className="subject-badge-container-cell">
                            {editForm.subjects?.map((sub) => (
                              <span
                                key={sub}
                                className={`sub-badge-tag ${sub.toLowerCase()}`}>
                                {sub}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() => handleUpdateStudent(student.docId)}
                            className="action-btn save-btn">
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="action-btn cancel-btn">
                            <FaXmark />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{student.fullName}</td>
                        <td>
                          <div className="masked-data-cell">
                            <span>
                              {isRevealed
                                ? student.phone
                                : maskString(student.phone)}
                            </span>
                            <button
                              onClick={() => toggleMasking(student.docId)}
                              className="mask-toggle-trigger">
                              {isRevealed ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="masked-data-cell">
                            <span>
                              {isRevealed
                                ? student.guardianPhone
                                : maskString(student.guardianPhone)}
                            </span>
                          </div>
                        </td>
                        <td>{student.medium}</td>
                        <td>
                          <div className="subject-badge-container-cell">
                            {student.subjects?.map((sub) => (
                              <span
                                key={sub}
                                className={`sub-badge-tag ${sub.toLowerCase()}`}>
                                {sub}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() => startEdit(student)}
                            className="action-btn edit-btn">
                            <FaUserPen />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteStudent(
                                student.docId,
                                student.fullName,
                              )
                            }
                            className="action-btn delete-btn">
                            <FaUserMinus />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllStudents;
