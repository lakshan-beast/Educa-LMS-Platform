import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import { db } from "../firebaseConfig";
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

import { GoHeartFill } from "react-icons/go";
import {
  FaPlus,
  FaXmark,
  FaUser,
  FaChalkboardUser,
  FaUserTie,
  FaUserGraduate,
  FaUserSecret,
  FaRibbon,
  FaHatCowboy,
} from "react-icons/fa6";
import { PiSealCheckFill } from "react-icons/pi";
import { FaUserMd } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Loader from "../components/ui/Loader";

const StudentVoices = () => {
  // 1. Core State Management
  const [voices, setVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");

  //  [THE ULTIMATE DYNAMIC FORM STATE]:
  const [formData, setFormData] = useState({
    studentName: "",
    userRole: "Student", // Default Role: Student, Parent, Alumni
    olBatch: "2026 O/L", // For Students
    parentGrade: "Grade 11", // For Parents
    alumniJob: "Software Engineer", // For Alumni
    customJob: "", // For Custom Text Input
    avatarType: "boy", // boy, girl, neuter
    avatarColor: "#001b42", // Default educa. Blue Theme
    voiceText: "",
    maths: false,
    science: false,
    english: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  //  [LIVE CLOUD FETCH ENGINE]
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
      setVoices(voiceList);
    } catch (err) {
      console.error("Fetch Voices Error:", err);
    }
    setTimeout(() => setIsLoading(false), 0);
  }, []);

  // 🚀 FIXED: activeFilter
  useEffect(() => {
    fetchCloudVoices();
  }, [fetchCloudVoices]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🧠 ☁️ [THE DYNAMIC SUBMIT ENGINE]
  const handleVoiceSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    if (
      formData.studentName.trim() === "" ||
      formData.voiceText.trim() === ""
    ) {
      setFormError("Please enter your name and message correctly!");
      setIsSubmitting(false);
      return;
    }

    const selectedTeachers = [];
    if (formData.maths) selectedTeachers.push("maths");
    if (formData.science) selectedTeachers.push("science");
    if (formData.english) selectedTeachers.push("english");

    if (selectedTeachers.length === 0) {
      setFormError("Please select at least one class!");
      setIsSubmitting(false);
      return;
    }

    // 👑 🔐 [THE IDENTITY CLAIM COMPOSER]
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
      identityClaim: finalIdentity || "Alumni",
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
      setFormError("Technical error occurred while publishing!");
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
        setVoices((prev) =>
          prev.map((v) =>
            v.id === voiceId ? { ...v, likesCount: v.likesCount + 1 } : v,
          ),
        );
      } else {
        await updateDoc(voiceDocRef, { likesCount: increment(-1) });
        const updatedLikes = likedVoices.filter((id) => id !== voiceId);
        localStorage.setItem("liked_voices", JSON.stringify(updatedLikes));
        setVoices((prev) =>
          prev.map((v) =>
            v.id === voiceId ? { ...v, likesCount: v.likesCount - 1 } : v,
          ),
        );
      }
    } catch (err) {
      console.error("Like Error:", err);
    }
  };

  // 👑 🆕 [THE ROLE ICON MAPPER]
  const renderRoleIcon = (type) => {
    if (type === "boy") return <FaHatCowboy />;
    if (type === "girl") return <FaRibbon />;
    if (type === "neuter") return <FaUser />;
    if (type === "Attorney-at-Law") return <FaChalkboardUser />;
    if (type === "Medical Doctor") return <FaUserMd />;
    if (type === "Other") return <FaUserGraduate />;
    if (type === "Software Engineer") return <FaUserSecret />;
    return <FaUserTie />;
  };

  const filteredVoices = voices.filter((item) => {
    if (activeFilter === "ALL") return true;
    return (
      item.selectedTeachers && item.selectedTeachers.includes(activeFilter)
    );
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="student-voices-wrapper page-container">
      <div className="system-container">
        <div className="back-buttons">
          <Link className="back-btn" to="/">
            <IoIosArrowBack /> Back to Home
          </Link>
          <Link className="back-btn" to="/result-hub">
            Go to Results <IoIosArrowForward />
          </Link>
        </div>

        <div className="voices-container parts">
          <div>
            <h2>
              Our Students'
              <span>Verified Success</span>
            </h2>
            <p>
              Read real experiences and genuine reviews shared directly by our
              students. Discover how our friendly digital lessons, interactive
              test tools, and Neti AI have helped them boost their exam grades..
            </p>
          </div>
        </div>

        <div className="reviews-header-zone">
          {/* 🎛️ TOP ROW: BADGE & ACTIONS */}
          <div className="reviews-top-action-bar">
            {/* 💬 ALL COMMENTS COUNT BADGE */}
            <div className="total-stories-badge">
              Total Stories Shared: <span>{voices.length}</span>
            </div>

            {/* 📣 ADD NEW COMMENT BUTTON */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="share-voice-btn">
              <FaPlus /> Share Your Voice
            </button>
          </div>
        </div>

        {/* ==================== 🎛️ CENTER CONTAINER: DYNAMIC TEACHER FILTERS ==================== */}
        <div className="teacher-filters-row">
          <button
            type="button"
            onClick={() => setActiveFilter("ALL")}
            className={`filter-tab-btn ${activeFilter === "ALL" ? "filter-active" : ""}`}>
            All Voices
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("maths")}
            className={`filter-tab-btn ${activeFilter === "maths" ? "filter-active" : ""}`}>
            Maths Sir
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("science")}
            className={`filter-tab-btn ${activeFilter === "science" ? "filter-active" : ""}`}>
            Science Sir
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("english")}
            className={`filter-tab-btn ${activeFilter === "english" ? "filter-active" : ""}`}>
            English Sir
          </button>
        </div>
        {/* ==================== 📄 CONTENT ZONE: COMMENTS CONTAINER GRID ==================== */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="voices-grid-wrapper">
            {filteredVoices.length > 0 ? (
              filteredVoices.map((item) => (
                <div key={item.id} className="comment-box-card">
                  <div className="card-top-content">
                    <div className="card-profile-header">
                      <div
                        className="dynamic-avatar-circle"
                        style={{ color: item.avatarColor || "#78adf7" }}>
                        {renderRoleIcon(item.avatarType)}
                      </div>

                      <div className="profile-text-labels">
                        <h4 className="student-name-title">
                          {item.studentName}
                          <span className="verified-seal-badge">
                            <PiSealCheckFill />
                          </span>
                        </h4>
                        <small className="identity-claim-text">
                          Status:
                          <span>{item.identityClaim || "Verified Member"}</span>
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="voice-message-body">
                    <p>"{item.voiceText}"</p>
                  </div>

                  {/* Card Footer: Teacher Tags & Premium Like Button */}
                  <div className="card-bottom-actions">
                    {/* <div> */}
                    <div className="teacher-badge">
                      {item.selectedTeachers &&
                        item.selectedTeachers.map((t, i) => (
                          <span
                            key={i}
                            style={{
                              color:
                                t === "maths"
                                  ? "#01c4ff"
                                  : t === "science"
                                    ? "#f03c05"
                                    : "#0df06c",
                            }}>
                            {t === "maths"
                              ? "Maths"
                              : t === "science"
                                ? "Science"
                                : "English"}
                          </span>
                        ))}
                    </div>

                    {/* ❤️ HIGH-TECH PULSE LIKE BUTTON */}
                    <button
                      type="button"
                      onClick={() => handleLikeIncrement(item.id)}
                      className="pulse-like-trigger-btn">
                      <GoHeartFill className="pulse-heart-icon" />
                      <span className="like-count-value">
                        {item.likesCount}
                      </span>
                    </button>
                  </div>
                </div>
                // </div>
              ))
            ) : (
              <div className="empty-category-notice-box">
                No comments shared for this category yet.
              </div>
            )}
          </div>
        )}
        {/* ==================== 🚨 THE POPUP FORM DYNAMIC OVERLAY (MODAL POPUP) ==================== */}
        {/* {isModalOpen && (
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
                // maxHeight: "90vh",
                overflowY: "auto",
              }}>
              {/* Close Cross Button *
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
                  color: "#001b42",
                  margin: "0 0 5px",
                  fontWeight: "800",
                  fontSize: "1.3rem",
                }}>
                Share Your Experience
              </h3>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.8rem",
                  margin: "0 0 20px 0",
                }}>
                Share your class experience live with other students and
                parents.
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginTop: "50px",
                }}>
                {/* 1. INPUT NAME *
                <div className="input-group">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "0.82rem",
                      color: "#001b42",
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

                {/* 2. CORE ROLE SELECTOR *
                <div className="input-group">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "0.82rem",
                      color: "#001b42",
                      display: "block",
                      marginBottom: "5px",
                    }}>
                    Select Your Role
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
                    <option value="Student">Student</option>
                    <option value="Parent"> Guardian / Proud Parent</option>
                    <option value="Alumni">Distinguished Alumni</option>
                  </select>
                </div>

                {/* ==================== 🧠 CONDITION 01: IF STUDENT SELECTED ==================== 
                {formData.userRole === "Student" && (
                  <div
                    className="input-group"
                    style={{ animation: "popupFade 0.2s ease" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        fontSize: "0.82rem",
                        color: "#001b42",
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
                      <option value="2017 O/L">2017 O/L Batch</option>
                      <option value="2018 O/L">2018 O/L Batch</option>
                      <option value="2019 O/L">2019 O/L Batch</option>
                      <option value="2020 O/L">2020 O/L Batch</option>
                      <option value="2021 O/L">2021 O/L Batch</option>
                      <option value="2022 O/L">2022 O/L Batch</option>
                      <option value="2023 O/L">2023 O/L Batch</option>
                      <option value="2024 O/L">2024 O/L Batch</option>
                      <option value="2025 O/L">2025 O/L Batch</option>
                      <option value="2026 O/L">2026 O/L Batch</option>
                      <option value="2027 O/L">2027 O/L Batch</option>
                    </select>
                  </div>
                )}

                {/* ==================== 🧠 CONDITION 02: IF PARENT SELECTED ==================== 
                {formData.userRole === "Parent" && (
                  <div
                    className="input-group"
                    style={{ animation: "popupFade 0.2s ease" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        fontSize: "0.82rem",
                        color: "#001b42",
                        display: "block",
                        marginBottom: "5px",
                      }}>
                      Your Child's Grade
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

                {/* ==================== 🧠 CONDITION 03: IF ALUMNI SELECTED ==================== 
                {formData.userRole === "Alumni" && (
                  <div
                    className="stylde-form"
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
                          color: "#001b42",
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
                          Software Engineer
                        </option>
                        <option value="Medical Doctor">Medical Doctor</option>
                        <option value="Attorney-at-Law">Attorney-at-Law</option>
                        <option value="Civil Engineer">Civil Engineer</option>
                        <option value="Other">Other Profession</option>
                      </select>
                    </div>

                    {/* Custom Job Input Box 
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

                {/* 3. MULTIPLE CHECKBOXES 
                <div className="input-group">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "0.82rem",
                      color: "#001b42",
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

                {/* 4. 👦 👧 CHARACTER AVATAR RADIO SELECTOR 
                <div className="input-group">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "0.82rem",
                      color: "#001b42",
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
                      Boy
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
                      Girl
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
                      Neutral
                    </label>
                  </div>
                </div>

                {/* 5. 🎨 PREMIUM COLOR DOTS PICKER SYSTEM (සිලෙක්ට් වුණු එක මැද හරි ලකුණ පත්තු වේ) 
                <div className="input-group">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "0.82rem",
                      color: "#001b42",
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
                    {[
                      "#00115a7e",
                      "#00eeff8c",
                      "#00ff6a85",
                      "#df21009a",
                      "#9c59b68a",
                      "#b700ff88",
                      "#ff510083",
                      "#ffc4008c",
                      // "#ff004c",
                    ].map((color) => (
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
                    ))}
                  </div>
                </div>

                {/* 6. TEXTAREA COMMENT 
                <div className="input-group">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "0.82rem",
                      color: "#001b42",
                      display: "block",
                      marginBottom: "5px",
                    }}>
                    Your Message / Review
                  </label>
                  <textarea
                    name="voiceText"
                    rows="3"
                    placeholder="Type here..."
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
                    background: "#001b42",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(255,75,43,0.2)",
                    marginTop: "5px",
                  }}>
                  {isSubmitting ? " Publishing Live..." : " Broadcast My Voice"}
                </button>
              </form>
            </div>
          </div>
        )} */}

        {isModalOpen && (
          <div
            className="review-bottom-sheet-overlay"
            onClick={() => setIsModalOpen(false)}>
            {/* 👈 1. පරණ ලොගින් ඕවර්ලේ එකෙන් වෙන් කිරීමට නම මාරු කර iOS Bottom Sheet ලුක් එක දුන්නා */}
            <div
              className="review-sheet-card"
              onClick={(e) => e.stopPropagation()}>
              {/* Close Cross Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="close-sheet-btn">
                <FaXmark />
              </button>

              <h3>Share Your Experience</h3>
              <p className="sheet-subtext">
                Share your class experience live with other students and
                parents.
              </p>

              {formError && (
                <div className="sheet-error-card">⚠️ {formError}</div>
              )}

              <form onSubmit={handleVoiceSubmit} className="sheet-main-form">
                {/* 1. INPUT NAME */}
                <div className="sheet-input-group">
                  <label>Your Full Name</label>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="ex: Lakshan Sandaruwan"
                    required
                    value={formData.studentName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* 2. CORE ROLE SELECTOR */}
                <div className="sheet-input-group">
                  <label>Select Your Role</label>
                  <select
                    name="userRole"
                    value={formData.userRole}
                    onChange={handleInputChange}>
                    <option value="Student">Student</option>
                    <option value="Parent">Guardian / Proud Parent</option>
                    <option value="Alumni">Distinguished Alumni</option>
                  </select>
                </div>

                {/* ==================== 🧠 CONDITION 01: IF STUDENT SELECTED ==================== */}
                {formData.userRole === "Student" && (
                  <div className="sheet-input-group condition-popup-fade">
                    <label>O/L Exam Batch</label>
                    <select
                      name="olBatch"
                      value={formData.olBatch}
                      onChange={handleInputChange}>
                      <option value="2017 O/L">2017 O/L Batch</option>
                      <option value="2018 O/L">2018 O/L Batch</option>
                      <option value="2019 O/L">2019 O/L Batch</option>
                      <option value="2020 O/L">2020 O/L Batch</option>
                      <option value="2021 O/L">2021 O/L Batch</option>
                      <option value="2022 O/L">2022 O/L Batch</option>
                      <option value="2023 O/L">2023 O/L Batch</option>
                      <option value="2024 O/L">2024 O/L Batch</option>
                      <option value="2025 O/L">2025 O/L Batch</option>
                      <option value="2026 O/L">2026 O/L Batch</option>
                      <option value="2027 O/L">2027 O/L Batch</option>
                    </select>
                  </div>
                )}
                {/* ==================== 🧠 CONDITION 02: IF PARENT SELECTED ==================== */}
                {formData.userRole === "Parent" && (
                  <div className="sheet-input-group condition-popup-fade">
                    <label>Your Child's Grade</label>
                    <select
                      name="parentGrade"
                      value={formData.parentGrade}
                      onChange={handleInputChange}>
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
                  <div className="sheet-conditional-form-block condition-popup-fade">
                    <div className="sheet-input-group">
                      <label>Distinguished Profession</label>
                      <select
                        name="alumniJob"
                        value={formData.alumniJob}
                        onChange={handleInputChange}>
                        <option value="Software Engineer">
                          Software Engineer
                        </option>
                        <option value="Medical Doctor">Medical Doctor</option>
                        <option value="Attorney-at-Law">Attorney-at-Law</option>
                        <option value="Civil Engineer">Civil Engineer</option>
                        <option value="Other">Other Profession</option>
                      </select>
                    </div>

                    {/* Custom Job Input Box */}
                    {formData.alumniJob === "Other" && (
                      <div className="sheet-input-group condition-popup-fade accent-group">
                        <label className="accent-label">
                          Type Your Profession
                        </label>
                        <input
                          type="text"
                          name="customJob"
                          placeholder="ex: Graphic Designer / Architect"
                          required
                          value={formData.customJob}
                          onChange={handleInputChange}
                          className="accent-input"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* 3. MULTIPLE CHECKBOXES */}
                <div className="sheet-input-group">
                  <label>Select Attending Classes (Multiple)</label>
                  <div className="sheet-checkbox-container-row">
                    <label className="checkbox-label-maths">
                      <input
                        type="checkbox"
                        name="maths"
                        checked={formData.maths}
                        onChange={handleInputChange}
                      />
                      Maths
                    </label>
                    <label className="checkbox-label-science">
                      <input
                        type="checkbox"
                        name="science"
                        checked={formData.science}
                        onChange={handleInputChange}
                      />
                      Science
                    </label>
                    <label className="checkbox-label-english">
                      <input
                        type="checkbox"
                        name="english"
                        checked={formData.english}
                        onChange={handleInputChange}
                      />
                      English
                    </label>
                  </div>
                </div>

                {/* 4. 👦 👧 CHARACTER AVATAR RADIO SELECTOR */}
                <div className="sheet-input-group">
                  <label>Choose Avatar Type</label>
                  <div className="sheet-radio-container-row">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="avatarType"
                        value="boy"
                        checked={formData.avatarType === "boy"}
                        onChange={handleInputChange}
                      />
                      Boy
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="avatarType"
                        value="girl"
                        checked={formData.avatarType === "girl"}
                        onChange={handleInputChange}
                      />
                      Girl
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="avatarType"
                        value="neuter"
                        checked={formData.avatarType === "neuter"}
                        onChange={handleInputChange}
                      />
                      Neutral
                    </label>
                  </div>
                </div>

                {/* 5. 🎨 PREMIUM COLOR DOTS PICKER SYSTEM */}
                <div className="sheet-input-group">
                  <label>Select Profile Theme Color</label>
                  <div className="sheet-color-picker-row">
                    {[
                      "#008cff7e",
                      "#3cff00",
                      "#00ff6a",
                      "#ffae00",
                      "#ff00008a",
                      "#ff004c",
                      "#ff5100",
                      "#ffc400ef",
                    ].map((color) => (
                      <div
                        key={color}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            avatarColor: color,
                          }))
                        }
                        className={`color-dot-node ${formData.avatarColor === color ? "dot-selected" : ""}`}
                        style={{
                          background: color,
                          // 👈 [THE DYNAMIC SHADOW]: සිලෙක්ට් වුණු පාට අනුව වටේට Ring එකක් වදින ලොජික් එක CSS එකෙන් නූලටම කළා මචං!
                          boxShadow:
                            formData.avatarColor === color
                              ? `0 0 0 3px #0f172a, 0 0 0 5px ${color}`
                              : "none",
                        }}>
                        {formData.avatarColor === color && (
                          <PiSealCheckFill className="check-icon-seal" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. TEXTAREA COMMENT */}
                <div className="sheet-input-group">
                  <label>Your Message / Review</label>
                  <textarea
                    name="voiceText"
                    rows="3"
                    placeholder="Type here..."
                    required
                    value={formData.voiceText}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sheet-submit-btn">
                  {" "}
                  {isSubmitting
                    ? " Publishing Live..."
                    : " Broadcast My Voice"}{" "}
                </button>
              </form>

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
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentVoices;
