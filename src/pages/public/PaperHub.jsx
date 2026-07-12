import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

import Loader from "../../components/ui/Loader";

import {
  FaFilePdf,
  FaArrowDown,
  FaFileLines,
  FaGraduationCap,
} from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

const PaperHub = ({ subject }) => {
  // 👑 🆕 [LIVE CLOUD MATERIALS STATE]:
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loggedInUser = JSON.parse(localStorage.getItem("studentUser")) || {};
  const studentGrade = loggedInUser.grade || "11";

  const [activeTab, setActiveTab] = useState("tutes");

  const { id } = useParams();
  const currentSubject = (id || "maths").toLowerCase();

  // [THE EXCLUSIVE STUDENT FETCH ENGINE]
  useEffect(() => {
    const fetchStudentMaterials = async () => {
      setTimeout(() => setIsLoading(true), 0);
      try {
        const q = query(
          collection(db, "academic_materials"),
          where("grade", "==", studentGrade),
          where("subject", "==", currentSubject),
        );

        const querySnapshot = await getDocs(q);
        const materialsList = [];

        querySnapshot.forEach((doc) => {
          materialsList.push({ id: doc.id, ...doc.data() });
        });

        setMaterials(materialsList);
      } catch (err) {
        console.error("Student Fetch Cloud Error:", err);
      }
      setTimeout(() => setIsLoading(false), 0);
    };

    fetchStudentMaterials();
  }, [studentGrade, currentSubject]);
  const getCloudCategoryName = () => {
    if (activeTab === "tutes") return "class-tutes";
    if (activeTab === "pastPapers") return "past-papers";
    return "formulas";
  };

  const cloudCategory = getCloudCategoryName();

  const filteredMaterials = materials.filter(
    (item) => item.category === cloudCategory,
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="paper-hub-container page-container">
      <div className="system-container">
        <div className="back-buttons">
          <Link className="back-btn" to="/dashboard">
            <IoIosArrowBack /> Back to Dashboard
          </Link>
        </div>

        {/* <div className="subject-vault-header parts">
          <h2>
            {subject
              ? subject.toUpperCase() + " PAPER HUB"
              : "ACADEMIC PAPER HUB"}
          </h2>
          <p>
            Grade {studentGrade} • All structural tutes, past papers and
            materials are dynamically fetched from Live Cloud.
          </p>
        </div>

        {/* 🎛 TABS MENU 
        <div
          className="paper-tabs-container"
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
            marginTop: "20px",
          }}>
          <button
            className={`tab-btn ${activeTab === "tutes" ? "active-paper-tab" : ""}`}
            onClick={() => setActiveTab("tutes")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              background: activeTab === "tutes" ? "#03204b" : "white",
              color: activeTab === "tutes" ? "white" : "#555",
              border: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <FaFileLines /> Class Tutes
          </button>

          <button
            className={`tab-btn ${activeTab === "pastPapers" ? "active-paper-tab" : ""}`}
            onClick={() => setActiveTab("pastPapers")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              background: activeTab === "pastPapers" ? "#03204b" : "white",
              color: activeTab === "pastPapers" ? "white" : "#555",
              border: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <FaFilePdf /> Past Papers
          </button>

          {subject !== "english" && (
            <button
              className={`tab-btn ${activeTab === "formulas" ? "active-paper-tab" : ""}`}
              onClick={() => setActiveTab("formulas")}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
                background: activeTab === "formulas" ? "#03204b" : "white",
                color: activeTab === "formulas" ? "white" : "#555",
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <FaGraduationCap /> Formula Guides
            </button>
          )}
        </div>

        <div className="papers-list-grid">
          {isLoading ? (
            <Loader />
          ) : filteredMaterials.length > 0 ? (
            filteredMaterials.map((paper) => (
              <div
                key={paper.id}
                className="card-container paper-download-row"
                style={{
                  background: "white",
                  padding: "18px 25px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  border: "1px solid #edf2f9",
                }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#fff0f0",
                      color: "#e74c3c",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.2rem",
                    }}>
                    <FaFilePdf />
                  </div>
                  <h4
                    style={{
                      color: "#03204b",
                      margin: 0,
                      fontSize: "0.98rem",
                      fontWeight: "700",
                    }}>
                    {paper.title}
                  </h4>
                </div>

                {/* 🚀 🔐 Google Drive Link Download Button 
                <a
                  href={paper.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="browse-btn"
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#03204b",
                    color: "white",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "0.88rem",
                    marginTop: "10px",
                  }}>
                  Download PDF
                  <FaArrowDown className="download-icon" />
                </a>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#aaa",
                padding: "40px 0",
                background: "#f8faff",
                borderRadius: "15px",
                border: "1px solid #eef2ff",
              }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "0.9rem" }}>
                No documents uploaded in this category yet.
              </p>
              <small>
                The admin panel has not added any tutorials to this section yet.
              </small>
            </div>
          )}
        </div> */}

        <div className="paper-hub-wrapper">
          {/* 👑 PREMIUM VAULT HEADER */}
          <div className="subject-vault-header">
            <h2>
              {subject
                ? subject.toUpperCase() + " PAPER HUB"
                : "ACADEMIC PAPER HUB"}
            </h2>
            <p>
              Grade {studentGrade} • All structural tutes, past papers and
              materials are dynamically fetched from Live Cloud.
            </p>
          </div>

          {/* 🎛️ CYBER INTERACTIVE TABS MENU */}
          <div className="paper-tabs-container">
            <button
              className={`tab-btn ${activeTab === "tutes" ? "active-paper-tab" : ""}`}
              onClick={() => setActiveTab("tutes")}>
              <FaFileLines /> Class Tutes
            </button>

            <button
              className={`tab-btn ${activeTab === "pastPapers" ? "active-paper-tab" : ""}`}
              onClick={() => setActiveTab("pastPapers")}>
              <FaFilePdf /> Past Papers
            </button>

            {subject !== "english" && (
              <button
                className={`tab-btn ${activeTab === "formulas" ? "active-paper-tab" : ""}`}
                onClick={() => setActiveTab("formulas")}>
                <FaGraduationCap /> Formula Guides
              </button>
            )}
          </div>

          {/* 📄 PAPERS CONTAINER GRID */}
          <div className="papers-list-grid">
            {isLoading ? (
              <Loader />
            ) : filteredMaterials.length > 0 ? (
              filteredMaterials.map((paper) => (
                <div key={paper.id} className="paper-download-row">
                  <div className="paper-details-meta-block">
                    <div className="pdf-icon-box">
                      <FaFilePdf />
                    </div>
                    <h4 className="paper-core-title">{paper.title}</h4>
                  </div>

                  {/* 🚀 🔐 Google Drive Link Download Button */}
                  <a
                    href={paper.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="browse-btn-download">
                    Download PDF
                    <FaArrowDown className="download-icon" />
                  </a>
                </div>
              ))
            ) : (
              <div className="empty-papers-notice-card">
                <p>No documents uploaded in this category yet.</p>
                <small>
                  The admin panel has not added any tutorials to this section
                  yet.
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperHub;
