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
  FaArrowLeft,
  FaArrowRight,
  FaUserGraduate,
  FaUserSecret,
  FaRibbon,
  FaHatCowboy,
} from "react-icons/fa6";
import { PiSealCheckFill } from "react-icons/pi";
import { FaUserMd } from "react-icons/fa";

import Loader from "./Loader";

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
    <div
      className="student-voices-wrapper page-container"
      style={{
        padding: "40px 20px",
        width: "100%",
        fontFamily: "inherit",
        paddingTop: "6rem",
      }}>
      <div className="system-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link className="back-btn" to="/">
            <FaArrowLeft /> Back to Home
          </Link>
          <Link className="back-btn" to="/result-hub">
            Back to Results <FaArrowRight />
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            flexWrap: "wrap",
            gap: "30px",
          }}>
          <div>
            <h2
              style={{
                color: "#001b42",
                margin: "1rem 0",
                fontWeight: "800",
                gap: "10px",
                fontSize: "1.6rem",
                textAlign: "center",
              }}>
              Our Students'
              <span style={{ display: "block", color: "#a8abb1d0" }}>
                Verified Success
              </span>
            </h2>
            <p
              style={{
                color: "#a8abb1d0",
                fontSize: "0.85rem",
                margin: "5px 0 12px 0",
                textAlign: "center",
              }}>
              Read real experiences and genuine reviews shared directly by our
              students. Discover how our friendly digital lessons, interactive
              test tools, and Neti AI have helped them boost their exam grades..
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* 💬 ALL COMMENTS COUNT BADGE */}
            <div
              style={{
                background: "#eef2ff",
                color: "#001b42",
                padding: "10px 18px",
                borderRadius: "12px",
                fontWeight: "800",
                fontSize: "0.9rem",
                border: "1px solid #d9e8ff",
              }}>
              Total Stories Shared: {voices.length}
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
              border: "1px solid #001b42",
              fontWeight: "bold",
              fontSize: "0.85rem",
              cursor: "pointer",
              background: activeFilter === "ALL" ? "#001b42" : "transparent",
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
              border: "1px solid #001b42",

              fontWeight: "bold",
              fontSize: "0.85rem",
              cursor: "pointer",
              background: activeFilter === "maths" ? "#001b42" : "transparent",
              color: activeFilter === "maths" ? "white" : "#555",
            }}>
            Maths Sir
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("science")}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              border: "1px solid #001b42",

              fontWeight: "bold",
              fontSize: "0.85rem",
              cursor: "pointer",
              background:
                activeFilter === "science" ? "#001b42" : "transparent",
              color: activeFilter === "science" ? "white" : "#555",
            }}>
            Science Sir
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("english")}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              border: "1px solid #001b42",

              fontWeight: "bold",
              fontSize: "0.85rem",
              cursor: "pointer",
              background:
                activeFilter === "english" ? "#001b42" : "transparent",
              color: activeFilter === "english" ? "white" : "#555",
            }}>
            English Sir
          </button>
        </div>
        {/* ==================== 📄 CONTENT ZONE: COMMENTS CONTAINER GRID ==================== */}
        {isLoading ? (
          <Loader />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}>
            {filteredVoices.length > 0 ? (
              filteredVoices.map((item) => (
                <div
                  key={item.id}
                  className="comment-box-card"
                  style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "20px",
                    border: "1px solid #d4e4fa",
                    boxShadow: "0 4px 15px  rgb(0 40 79 / 13%)",
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
                            background: item.avatarColor || "#001b42",
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
                              color: "#001b42",
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
                              <PiSealCheckFill
                                style={{ fontSize: "0.85rem" }}
                              />
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
                        background: "#f1f6fd",
                        color: "#001b42",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#d1e5ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#e6f0ff")
                      }>
                      <GoHeartFill className="pulse-animation" />
                      <span
                        style={{
                          borderLeft: "2px solid #c2dbff",
                          paddingLeft: "12px",
                        }}>
                        {item.likesCount}
                      </span>
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
                No comments shared for this category yet.
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
                // maxHeight: "90vh",
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
                {/* 1. INPUT NAME */}
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

                {/* 2. CORE ROLE SELECTOR */}
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

                {/* ==================== 🧠 CONDITION 01: IF STUDENT SELECTED ==================== */}
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

                {/* ==================== 🧠 CONDITION 02: IF PARENT SELECTED ==================== */}
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

                {/* ==================== 🧠 CONDITION 03: IF ALUMNI SELECTED ==================== */}
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

                {/* 4. 👦 👧 CHARACTER AVATAR RADIO SELECTOR */}
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

                {/* 5. 🎨 PREMIUM COLOR DOTS PICKER SYSTEM (සිලෙක්ට් වුණු එක මැද හරි ලකුණ පත්තු වේ) */}
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

                {/* 6. TEXTAREA COMMENT */}
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
    </div>
  );
};

export default StudentVoices;
