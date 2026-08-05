

import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  FaFilePdf,
  FaArrowDown,
  FaTrashCan,
  FaFileLines,
  FaGraduationCap,
  FaCircleExclamation,
  FaFolderOpen,
  FaFolderPlus,
} from "react-icons/fa6";
import { ImSpinner } from "react-icons/im";
import PaperPublishForm from "../../forms/PaperUploadForm"; 
import ConfirmationModal from "../../components/ui/ConfirmationModal";

const PaperManager = () => {
  const { subject } = useParams();
  const currentSubject = subject ? subject.toLowerCase() : "maths";

  const [selectedGrade, setSelectedGrade] = useState("11");
  const [activeCategory, setActiveCategory] = useState("ALL"); // 📂 Folder Filter Configuration
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 🗑️ Delete States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [selectedMaterialTitle, setSelectedMaterialTitle] = useState("");

  // 👑 PERFORMANCE OPTIMIZED REAL-TIME FETCH MATRIX [INDEX 4]
  const fetchCloudMaterials = useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "academic_materials"),
        where("grade", "==", String(selectedGrade)),
        where("subject", "==", currentSubject),
      );
      const querySnapshot = await getDocs(q);
      const materialsList = [];
      querySnapshot.forEach((doc) => {
        materialsList.push({ docId: doc.id, ...doc.data() });
      });
      setUploadedMaterials(materialsList);
    } catch (err) {
      console.error("Fetch Cloud Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedGrade, currentSubject]);
  
  useEffect(() => {
    fetchCloudMaterials();
  }, [fetchCloudMaterials]);

  const handleDeleteClick = (id, title) => {
    setSelectedMaterialId(id);
    setSelectedMaterialTitle(title);
    setIsModalOpen(true);
  };

  const confirmDeleteMaterial = async () => {
    setIsModalOpen(false);
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "academic_materials"),
        where("id", "==", selectedMaterialId),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "academic_materials", document.id));
      });
      fetchCloudMaterials();
    } catch (err) {
      console.error("Delete Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔍 DYNAMIC MULTI-TENANT FILTER MATRIX 
  const filteredMaterials = uploadedMaterials.filter((row) => {
    if (activeCategory === "ALL") return true;
    return row.category === activeCategory;
  });

  return (
    <div className="paper-manager-root-container">
      {/* HEADER CONTROLLER zone */}
      <div className="manager-top-header-zone">
        <div>
          <h1>{subject?.toUpperCase()} Inventory Matrix</h1>
          <p>
            Deploy examination assets, organize master folders, or restrict
            student material access loops.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="upload-trigger-btn">
          <FaFolderPlus /> Upload New Resource
        </button>
      </div>

      {/* GRADE PILLS CONTROLLER */}
      <div className="grade-selector-dock-row">
        <span className="dock-meta-label">Selected Grade Layer:</span>
        {["6", "7", "8", "9", "10", "11"].map((g) => (
          <button
            key={g}
            onClick={() => {
              setSelectedGrade(g);
              setActiveCategory("ALL");
            }}
            className={`grade-pill-trigger ${selectedGrade === g ? "active" : ""}`}>
            Grade {g}
          </button>
        ))}
      </div>
      {/* 🏛️ SPLIT WORKSPACE: LEFT FOLDERS ENGINE | RIGHT MATERIALS GRID */}
      <div className="manager-split-workspace-grid">
        {/* 📁 LEFT SIDEBAR: FOLDER NAVIGATION ENGINE */}
        <aside className="folder-navigation-panel-aside">
          <h3>
            <FaFolderOpen /> Asset Folders
          </h3>
          <div className="folders-vertical-stack">
            {[
              {
                id: "ALL",
                label: "View All Resources",
                icon: <FaFolderOpen />,
                color: "#0056ff",
              },
              {
                id: "classTutes",
                label: "Class Lesson Tutes",
                icon: <FaFileLines />,
                color: "#3498db",
              },
              {
                id: "pastPapers",
                label: "National Past Papers",
                icon: <FaFilePdf />,
                color: "#e74c3c",
              },
              {
                id: "formulas",
                label: "Formula Guide Books",
                icon: <FaGraduationCap />,
                color: "#2ecc71",
              },
            ].map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveCategory(folder.id)}
                className={`folder-block-btn-trigger ${activeCategory === folder.id ? "active-folder" : ""}`}>
                <span className="f-icon" style={{ color: folder.color }}>
                  {folder.icon}
                </span>
                <span className="f-label">{folder.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* 💻 RIGHT SIDEBAR: HIGH-DENSITY RESOURCE CARDS GRID */}
        <main className="resource-matrix-display-main">
          {isLoading ? (
            <div className="live-ledger-loading-state">
              <ImSpinner className="loading-spin" /> Fetching Isolated Cloud
              Asset Records...
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="live-ledger-empty-state">
              <FaCircleExclamation /> No corporate resources allocated within
              this specific{" "}
              {activeCategory === "ALL" ? "grade tier" : "folder partition"}{" "}
              yet.
            </div>
          ) : (
            <div className="resource-cards-high-density-grid">
              {filteredMaterials.map((row) => (
                <div key={row.id} className="resource-asset-card">
                  <div className="card-top-icon-zone">
                    <span className="file-type-avatar-icon">
                      {row.category === "classTutes" ? (
                        <FaFileLines style={{ color: "#3498db" }} />
                      ) : row.category === "pastPapers" ? (
                        <FaFilePdf style={{ color: "#e74c3c" }} />
                      ) : (
                        <FaGraduationCap style={{ color: "#2ecc71" }} />
                      )}
                    </span>
                    <span className="category-meta-badge-tag">
                      {row.category
                        ?.replace("classTutes", "Tute")
                        .replace("pastPapers", "Past Paper")
                        .replace("formulas", "Formula")}
                    </span>
                  </div>
                  <h4 className="asset-main-title">{row.title}</h4>
                  <div className="card-action-footer-hub">
                    <a
                      href={row.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-resource-btn">
                      <FaArrowDown /> View PDF
                    </a>
                    <button
                      onClick={() => handleDeleteClick(row.id, row.title)}
                      className="delete-resource-btn"
                      title="Evict Asset">
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* POPUP MODAL ARCHITECTURE */}
      <PaperPublishForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedGrade={selectedGrade}
        subject={currentSubject}
        onUploadSuccess={fetchCloudMaterials}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Evict Asset Frame?"
        message={`Do you want to completely remove "${selectedMaterialTitle}" from student view terminal bounds permanently?`}
        type="danger"
        onConfirm={confirmDeleteMaterial}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PaperManager;
