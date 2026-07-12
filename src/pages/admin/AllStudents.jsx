

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
  FaMagnifyingGlass,
  FaEye,
  FaEyeSlash,
  FaUsers,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

import AddStudentForm from "../../forms/AddStudentVault";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [activeGrade, setActiveGrade] = useState("11");
  const [activeGender, setActiveGender] = useState("ALL");

  // 👦 MASTER-DETAIL STATES
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 📝 EDIT MODE STATES (දැන් මේක වෙනම panel එකක් ලෙස ක්‍රියා කරයි)
  const [isEditing, setIsEditing] = useState(false);
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

        // Live data update වෙද්දී selected student ගේ දත්තද refresh කිරීම
        if (selectedStudent) {
          const updated = studentList.find(
            (s) => s.docId === selectedStudent.docId,
          );
          if (updated) setSelectedStudent(updated);
        }
      },
      (err) => {
        console.error("Cloud Secure Sync Error:", err);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [facultyFieldLock, selectedStudent]);

  // Edit Mode එක පටන් ගැන්ම
  const startEdit = (student) => {
    setIsEditing(true);
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
      setIsEditing(false);
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
        setSelectedStudent(null); // මකපු ළමයාව කාඩ් එකෙන් අයින් කිරීම
      } catch (err) {
        console.error("Delete Student Error:", err);
      }
    }
  };

  // Search and Filtering
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
    <div
      className="vault-container"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 👑 TOP METADATA HEADER */}
      <div
        className="students-header"
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
            {/* {currentFacultySubject}  */}
            Faculty Registry
          </h1>
          <p
            style={{
              margin: "5px 0 0 0",
              color: "#8b949e",
              fontSize: "0.9rem",
            }}>
            Secure subject-isolated student database core.
          </p>
        </div>
        <div
          className="search-box-bar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#f4f6fa",
            padding: "10px 15px",
            borderRadius: "8px",
            maxWidth: "500px",
            width: "100%",
          }}>
          <FaMagnifyingGlass style={{ color: "#8b949e" }} />
          <input
            type="text"
            placeholder="Search student profile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "none",
              background: "none",
              outline: "none",
              width: "100%",
              fontSize: "0.9rem",
            }}
          />
        </div>
        {/* <div className="addbtn"> */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            background: "#0056ff",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
          + Add New Student
        </button>
        <AddStudentForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          selectedGrade={activeGrade}
        />
        Use code with caution.
        {/* </div> */}
      </div>
      {/* 🎛️ FILTER CONTROLS DOCK */}
      <div
        className="master-filter-control-dock"
        style={{
          display: "flex",
          gap: "30px",
          background: "white",
          padding: "15px 20px",
          borderRadius: "12px",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#8b949e",
            }}>
            Grade:
          </span>
          {["10", "11"].map((g) => (
            <button
              key={g}
              onClick={() => {
                setActiveGrade(g);
                setSelectedStudent(null);
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                background: activeGrade === g ? "#0056ff" : "#f4f6fa",
                color: activeGrade === g ? "white" : "#001b42",
                fontWeight: "600",
                cursor: "pointer",
              }}>
              Grade {g}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#8b949e",
            }}>
            Gender:
          </span>
          {[
            { id: "ALL", label: "All Students" },
            { id: "boy", label: "Boys" },
            { id: "girl", label: "Girls" },
          ].map((gen) => (
            <button
              key={gen.id}
              onClick={() => {
                setActiveGender(gen.id);
                setSelectedStudent(null);
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                background: activeGender === gen.id ? "#0056ff" : "#f4f6fa",
                color: activeGender === gen.id ? "white" : "#001b42",
                fontWeight: "600",
                cursor: "pointer",
              }}>
              {gen.label}
            </button>
          ))}
        </div>
      </div>
      {/* 🎚️ SPLIT WORKSPACE GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "25px",
          alignItems: "start",
        }}>
        {/* 💻 LEFT SIDE: SLIM MASTER TABLE */}
        <div
          className="left-table-shield"
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "20px",
          }}>
          {isLoading ? (
            <div style={{ padding: "20px", color: "#8b949e" }}>
              Syncing Cloud Ledger...
            </div>
          ) : filteredStudents.length === 0 ? (
            <div style={{ padding: "20px", color: "#8b949e" }}>
              No matching records allocated.
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f4f6fa" }}>
                  <th
                    style={{
                      padding: "12px 10px",
                      color: "#8b949e",
                      fontSize: "0.85rem",
                    }}>
                    Student ID
                  </th>
                  <th
                    style={{
                      padding: "12px 10px",
                      color: "#8b949e",
                      fontSize: "0.85rem",
                    }}>
                    Full Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.docId}
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsEditing(false);
                    }}
                    style={{
                      borderBottom: "1px solid #f4f6fa",
                      cursor: "pointer",
                      background:
                        selectedStudent?.docId === student.docId
                          ? "#eef2ff"
                          : "transparent",
                    }}>
                    <td style={{ padding: "14px 10px" }}>
                      <strong>{student.id || "PENDING"}</strong>
                    </td>
                    <td
                      style={{
                        padding: "14px 10px",
                        color: "#001b42",
                        fontWeight: "500",
                      }}>
                      {student.fullName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* 📋 RIGHT SIDE: DYNAMIC DETAILS VAULT CARD */}
        <div className="right-details-card-vault">
          {!selectedStudent ? (
            <div
              style={{
                background: "#f8faff",
                border: "2px dashed #eef2ff",
                borderRadius: "12px",
                padding: "40px",
                textAlign: "center",
                color: "#8b949e",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}>
              <FaUsers style={{ fontSize: "2rem", color: "#d2d6dc" }} />
              <span style={{ fontSize: "0.95rem" }}>
                Select a student row to view details [INDEX 4].
              </span>
            </div>
          ) : isEditing ? (
            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#001b42" }}>
                Edit Faculty Profile
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "#8b949e",
                  }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, fullName: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "#8b949e",
                  }}>
                  Login Password
                </label>
                <input
                  type="text"
                  value={editForm.password}
                  onChange={(e) =>
                    setEditForm({ ...editForm, password: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      color: "#8b949e",
                    }}>
                    Student Mobile
                  </label>
                  <input
                    type="text"
                    value={editForm.studentMobile}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        studentMobile: e.target.value,
                      })
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d2d6dc",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      color: "#8b949e",
                    }}>
                    Parent Mobile
                  </label>
                  <input
                    type="text"
                    value={editForm.parentMobile}
                    onChange={(e) =>
                      setEditForm({ ...editForm, parentMobile: e.target.value })
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d2d6dc",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  marginTop: "10px",
                }}>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: "#8b949e",
                  }}>
                  Gated Tutors:
                </span>
                <label>
                  <input
                    type="checkbox"
                    checked={editForm.maths}
                    onChange={(e) =>
                      setEditForm({ ...editForm, maths: e.target.checked })
                    }
                  />
                  M
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={editForm.science}
                    onChange={(e) =>
                      setEditForm({ ...editForm, science: e.target.checked })
                    }
                  />
                  S
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={editForm.english}
                    onChange={(e) =>
                      setEditForm({ ...editForm, english: e.target.checked })
                    }
                  />
                  E
                </label>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  onClick={() => handleUpdateStudent(selectedStudent.docId)}
                  style={{
                    flexGrow: 1,
                    padding: "10px",
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}>
                  <FaCheck /> Save Profile
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: "10px",
                    background: "#f4f6fa",
                    color: "#001b42",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  <FaXmark /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 25px rgba(0,0,0,0.02)",
                borderTop: "4px solid #0056ff",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#8b949e",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}>
                  Selected Registry Profile
                </span>
                <h2
                  style={{
                    margin: "5px 0 0 0",
                    color: "#001b42",
                    fontSize: "1.4rem",
                  }}>
                  {selectedStudent.fullName}
                </h2>
                <small
                  style={{
                    color: "#0056ff",
                    fontWeight: "bold",
                    marginTop: "3px",
                  }}>
                  System Token: {selectedStudent.id}
                </small>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  background: "#f8faff",
                  padding: "15px",
                  borderRadius: "8px",
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                  }}>
                  <span style={{ color: "#8b949e" }}>Grade Tier:</span>
                  <strong style={{ color: "#001b42" }}>
                    Grade {selectedStudent.grade}
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                  }}>
                  <span style={{ color: "#8b949e" }}>Gender Matrix:</span>
                  <strong
                    style={{ color: "#001b42", textTransform: "capitalize" }}>
                    {selectedStudent.gender}
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                  }}>
                  <span style={{ color: "#8b949e" }}>Student Mobile:</span>
                  <strong style={{ color: "#001b42" }}>
                    {selectedStudent.studentMobile || "N/A"}
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                  }}>
                  <span style={{ color: "#8b949e" }}>Guardian Mobile:</span>
                  <strong style={{ color: "#001b42" }}>
                    {selectedStudent.parentMobile || "N/A"}
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    borderTop: "1px dashed #eef2ff",
                    paddingTop: "10px",
                  }}>
                  <span style={{ color: "#8b949e" }}>Access Password:</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                    <strong
                      style={{
                        color: "#001b42",
                        letterSpacing: isPasswordRevealed ? "normal" : "2px",
                      }}>
                      {isPasswordRevealed
                        ? selectedStudent.password
                        : "••••••••"}
                    </strong>
                    <button
                      onClick={() => setIsPasswordRevealed(!isPasswordRevealed)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#8b949e",
                        display: "flex",
                      }}>
                      {isPasswordRevealed ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#8b949e",
                    fontWeight: "bold",
                  }}>
                  Enrolled Faculties
                </span>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    { id: "maths", label: "Mathematics (M)" },
                    { id: "science", label: "Science (S)" },
                    { id: "english", label: "English (E)" },
                  ].map((sub) => {
                    const isEnrolled = selectedStudent[sub.id];
                    return (
                      <span
                        key={sub.id}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          background: isEnrolled ? "#eef2ff" : "#f4f6fa",
                          color: isEnrolled ? "#0056ff" : "#d2d6dc",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}>
                        {isEnrolled && <IoCheckmarkCircle />} {sub.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  borderTop: "1px solid #f4f6fa",
                  paddingTop: "15px",
                  marginTop: "5px",
                }}>
                <button
                  onClick={() => startEdit(selectedStudent)}
                  style={{
                    flexGrow: 1,
                    padding: "10px",
                    background: "#ffc107",
                    color: "#001b42",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}>
                  <FaUserPen /> Modify Registry
                </button>
                <button
                  onClick={() =>
                    handleDeleteStudent(
                      selectedStudent.docId,
                      selectedStudent.fullName,
                    )
                  }
                  style={{
                    padding: "10px",
                    background: "#fff5f5",
                    color: "#ff4b4b",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                  <FaUserMinus /> Evict
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AllStudents;
