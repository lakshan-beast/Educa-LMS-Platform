import { useState, useEffect } from "react";

import { db } from "../../firebaseConfig";
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
  FaUserPen,
  FaUserMinus,
  FaCheck,
  FaXmark,
  FaMagnifyingGlass,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [activeGrade, setActiveGrade] = useState("11");
  const [activeGender, setActiveGender] = useState("ALL");
  const [revealedIds, setRevealedIds] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    password: "",
    studentMobile: "",
    parentMobile: "",
    grade: "",
    maths: false,
    science: false,
    english: false,
    gender: "",
  });

  const currentFacultySubject =
    localStorage.getItem("admin_faculty_subject") || "MATHS";
  const facultyFieldLock = currentFacultySubject.toLowerCase();

  useEffect(() => {
    const q = query(
      collection(db, "students"),
      where(facultyFieldLock, "==", true),
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
  }, [facultyFieldLock]);

  const startEdit = (student) => {
    setEditingId(student.docId);
    setEditForm({
      fullName: student.fullName || "",
      password: student.password || "",
      studentMobile: student.studentMobile || "",
      parentMobile: student.parentMobile || "",
      grade: student.grade || "",
      maths: student.maths || false,
      science: student.science || false,
      english: student.english || false,
      gender: student.gender || "boy",
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
      window.confirm(`Are you sure you want to permanently remove ${name}?`)
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
    return "**" + str.slice(8);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentMobile?.includes(searchTerm);

    const matchesGrade = student.grade === activeGrade;
    const matchesGender =
      activeGender === "ALL" ? true : student.gender === activeGender;

    return matchesSearch && matchesGrade && matchesGender;
  });

  return (
    // <div className="all-students-wrapper">
    <div className="vault-container">
      <div className="students-header">
        <div>
          <h1>{currentFacultySubject} Faculty Registry</h1>
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
            onClick={() => setActiveGrade("10")}
            className={`filter-pill-btn ${activeGrade === "10" ? "active" : ""}`}>
            Grade 10
          </button>
          <button
            onClick={() => setActiveGrade("11")}
            className={`filter-pill-btn ${activeGrade === "11" ? "active" : ""}`}>
            Grade 11
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
                <th>Student Password</th>
                <th>Enrolled Classes</th>
                <th>Full Name</th>
                <th>Student Phone</th>
                <th>Guardian Phone</th>
                <th>Grade</th>
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
                      <strong>{student.id || "PENDING"}</strong>
                    </td>

                    {isEditing ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editForm.password}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                password: e.target.value,
                              })
                            }
                          />
                        </td>
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
                            value={editForm.studentMobile}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                studentMobile: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            value={editForm.parentMobile}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                parentMobile: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm.grade}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                grade: e.target.value,
                              })
                            }
                            style={{ width: "60px" }}
                          />
                        </td>
                        <td>
                          <div className="subject-badge-container-cell">
                            <label>
                              <input
                                type="checkbox"
                                checked={editForm.maths}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    maths: e.target.checked,
                                  })
                                }
                              />{" "}
                              M
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                checked={editForm.science}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    science: e.target.checked,
                                  })
                                }
                              />{" "}
                              S
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                checked={editForm.english}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    english: e.target.checked,
                                  })
                                }
                              />{" "}
                              E
                            </label>
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
                        <td>
                          <div className="masked-data-cell">
                            <span>
                              {isRevealed
                                ? student.password
                                : maskString(student.password)}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="subject-badge-container-cell">
                            {student.maths && (
                              <span className="sub-badge-tag maths">
                                <IoCheckmarkCircle />
                              </span>
                            )}
                            {student.science && (
                              <span className="sub-badge-tag science">
                                <IoCheckmarkCircle />
                              </span>
                            )}
                            {student.english && (
                              <span className="sub-badge-tag english">
                                <IoCheckmarkCircle />
                              </span>
                            )}
                          </div>
                        </td>
                        <td>{student.fullName}</td>
                        <td>
                          <div className="masked-data-cell">
                            <span>
                              {isRevealed
                                ? student.studentMobile
                                : maskString(student.studentMobile)}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="masked-data-cell">
                            <span>
                              {isRevealed
                                ? student.parentMobile
                                : maskString(student.parentMobile)}
                            </span>
                          </div>
                        </td>
                        <td>{student.grade}</td>

                        <td>
                          <div className="rows-btn">
                            <button
                              onClick={() => toggleMasking(student.docId)}
                              className="mask-toggle-trigger action-btn check-btn">
                              {isRevealed ? <FaEyeSlash /> : <FaEye />}
                            </button>
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
                          </div>
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
