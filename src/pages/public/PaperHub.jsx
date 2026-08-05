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
