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

  // 📝 EDIT MODE STATES 
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
        setSelectedStudent(null); 
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
    <div className="admin-student-vault-root-container">
      {/* 👑 TOP METADATA HEADER */}
      <div className="students-registry-top-header-zone">
        <div className="header-meta-details">
          <h1>Faculty Registry</h1>
          <p className="registry-subtext">
            Secure subject-isolated student database core.
          </p>
        </div>

        {/* 🔍 CYBER LASER SEARCH BAR TERMINAL */}
        <div className="registry-search-box-bar">
          <FaMagnifyingGlass className="search-icon-hud" />
          <input
            type="text"
            placeholder="Search student profile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* + ADD NEW STUDENT TRIGGER BUTTON */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="add-new-student-trigger-btn">
          + Add New Student
        </button>

        {/* ADD STUDENT MODAL BACKBONE */}
        <AddStudentForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          selectedGrade={activeGrade}
        />
      </div>

      {/* 🎛️ FILTER CONTROLS DOCK */}
      <div className="master-filter-control-dock">
        {/* GRADE FILTER SEGMENT */}
        <div className="filter-segment-group">
          <span className="filter-hud-meta-label">Grade:</span>
          {["10", "11"].map((g) => (
            <button
              key={g}
              onClick={() => {
                setActiveGrade(g);
                setSelectedStudent(null);
              }}
              className={`filter-dock-pill-btn ${activeGrade === g ? "pill-active" : ""}`}>
              Grade {g}
            </button>
          ))}
        </div>

        {/* GENDER FILTER SEGMENT */}
        <div className="filter-segment-group">
          <span className="filter-hud-meta-label">Gender:</span>
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
              className={`filter-dock-pill-btn ${activeGender === gen.id ? "pill-active" : ""}`}>
              {gen.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🎛️ SPLIT WORKSPACE GRID */}
      <div className="admin-vault-split-workspace-grid">
        {/* 💻 LEFT SIDE: SLIM MASTER TABLE */}
        <div className="left-table-shield">
          {isLoading ? (
            <div className="ledger-sync-loading-text">
              Syncing Cloud Ledger...
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="ledger-sync-empty-text">
              No matching records allocated.
            </div>
          ) : (
            <table className="vault-slim-master-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const isSelected = selectedStudent?.docId === student.docId;
                  return (
                    <tr
                      key={student.docId}
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsEditing(false);
                      }}
                      className={isSelected ? "selected-row-active" : ""}>
                      <td>
                        <strong>{student.id || "PENDING"}</strong>
                      </td>
                      <td className="student-full-name-cell">
                        {student.fullName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* 📋 RIGHT SIDE: DYNAMIC DETAILS VAULT CARD */}
        <div className="right-details-card-vault">
          {/* CONDITION 01: NO STUDENT SELECTED  */}
          {!selectedStudent ? (
            <div className="vault-empty-selection-placeholder">
              <FaUsers className="placeholder-users-icon" />
              <span className="placeholder-label-text">
                Select a student row to view details.
              </span>
            </div>
          ) : isEditing ? (
            <div className="vault-profile-edit-glass-form">
              <h3 className="form-main-heading">Edit Faculty Profile</h3>

              {/* FULL NAME FIELD */}
              <div className="form-input-field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, fullName: e.target.value })
                  }
                />
              </div>

              {/* LOGIN PASSWORD FIELD */}
              <div className="form-input-field-group">
                <label>Login Password</label>
                <input
                  type="text"
                  value={editForm.password}
                  onChange={(e) =>
                    setEditForm({ ...editForm, password: e.target.value })
                  }
                />
              </div>

              {/* SPLIT ROW: MOBILE NUMBERS */}
              <div className="form-double-split-grid-row">
                <div className="form-input-field-group">
                  <label>Student Mobile</label>
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
                </div>

                <div className="form-input-field-group">
                  <label>Parent Mobile</label>
                  <input
                    type="text"
                    value={editForm.parentMobile}
                    onChange={(e) =>
                      setEditForm({ ...editForm, parentMobile: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* GATED TUTORS MULTIPLE CHECKBOXES */}
              <div className="form-checkbox-gating-row-wrapper">
                <span className="checkbox-hud-section-label">
                  Gated Tutors:
                </span>
                <div className="checkbox-nodes-flex-stack">
                  <label className="checkbox-node-label check-maths">
                    <input
                      type="checkbox"
                      checked={editForm.maths}
                      onChange={(e) =>
                        setEditForm({ ...editForm, maths: e.target.checked })
                      }
                    />
                    <span>M</span>
                  </label>

                  <label className="checkbox-node-label check-science">
                    <input
                      type="checkbox"
                      checked={editForm.science}
                      onChange={(e) =>
                        setEditForm({ ...editForm, science: e.target.checked })
                      }
                    />
                    <span>S</span>
                  </label>

                  <label className="checkbox-node-label check-english">
                    <input
                      type="checkbox"
                      checked={editForm.english}
                      onChange={(e) =>
                        setEditForm({ ...editForm, english: e.target.checked })
                      }
                    />
                    <span>E</span>
                  </label>
                </div>
              </div>

              {/* ACTION FOOTER BUTTONS */}
              <div className="form-action-footer-buttons-row">
                <button
                  onClick={() => handleUpdateStudent(selectedStudent.docId)}
                  className="form-submit-save-profile-btn">
                  <FaCheck /> Save Profile
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="form-cancel-abort-btn">
                  <FaXmark /> Cancel
                </button>
              </div>
            </div>
          ) : (
            /* CONDITION 03: VIEWING REJECT/REGISTRY PROFILE DETAILS  */
            <div className="vault-profile-view-glass-card">
              {/* PROFILE HEADER DATA IDENTIFIER */}
              <div className="view-card-header-meta">
                <span className="view-card-hud-small-label">
                  Selected Registry Profile
                </span>
                <h2 className="view-card-student-name">
                  {selectedStudent.fullName}
                </h2>
                <small className="view-card-system-token">
                  System Token: {selectedStudent.id}
                </small>
              </div>

              {/* CORE BIO PARAMETERS LEDGER PANEL */}
              <div className="view-card-parameters-ledger-box">
                <div className="ledger-data-row">
                  <span className="ledger-label">Grade Tier:</span>
                  <strong className="ledger-value">
                    Grade {selectedStudent.grade}
                  </strong>
                </div>

                <div className="ledger-data-row">
                  <span className="ledger-label">Gender Matrix:</span>
                  <strong className="ledger-value value-capitalize">
                    {selectedStudent.gender}
                  </strong>
                </div>

                <div className="ledger-data-row">
                  <span className="ledger-label">Student Mobile:</span>
                  <strong className="ledger-value">
                    {selectedStudent.studentMobile || "N/A"}
                  </strong>
                </div>

                <div className="ledger-data-row">
                  <span className="ledger-label">Guardian Mobile:</span>
                  <strong className="ledger-value">
                    {selectedStudent.parentMobile || "N/A"}
                  </strong>
                </div>

                {/* GATED ACCESS PASSWORD CONTROLLER */}
                <div className="ledger-data-row password-split-row">
                  <span className="ledger-label">Access Password:</span>
                  <div className="password-display-interactive-node">
                    <strong
                      className={`ledger-value ${!isPasswordRevealed ? "password-masked-dots" : ""}`}>
                      {isPasswordRevealed
                        ? selectedStudent.password
                        : "••••••••"}
                    </strong>
                    <button
                      type="button"
                      onClick={() => setIsPasswordRevealed(!isPasswordRevealed)}
                      className="password-toggle-visibility-btn">
                      {isPasswordRevealed ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* ENROLLED FACULTIES BADGES SPACE */}
              <div className="view-card-enrolled-subjects-zone">
                <span className="checkbox-hud-section-label">
                  Enrolled Faculties
                </span>
                <div className="faculties-pills-flex-stack">
                  {[
                    { id: "maths", label: "Mathematics (M)" },
                    { id: "science", label: "Science (S)" },
                    { id: "english", label: "English (E)" },
                  ].map((sub) => {
                    const isEnrolled = selectedStudent[sub.id];
                    return (
                      <span
                        key={sub.id}
                        className={`faculty-enrollment-status-pill ${isEnrolled ? "enrolled-active" : "enrolled-disabled"}`}>
                        {isEnrolled && <IoCheckmarkCircle />} {sub.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* FOOTER MANAGEMENT ACTIONS BUTTONS (MODIFY / EVICT) */}
              <div className="view-card-action-footer-hub-row">
                <button
                  onClick={() => startEdit(selectedStudent)}
                  className="form-modify-registry-btn">
                  <FaUserPen /> Modify Registry
                </button>

                <button
                  onClick={() =>
                    handleDeleteStudent(
                      selectedStudent.docId,
                      selectedStudent.fullName,
                    )
                  }
                  className="form-evict-delete-btn">
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
