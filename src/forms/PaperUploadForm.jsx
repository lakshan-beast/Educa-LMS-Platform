import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { GoRocket } from "react-icons/go";

const PaperPublishForm = ({
  isOpen,
  onClose,
  selectedGrade,
  subject,
  onUploadSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    category: "classTutes",
    materialTitle: "",
    driveUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    if (
      formData.materialTitle.trim() === "" ||
      formData.driveUrl.trim() === ""
    ) {
      setError("Please enter all details correctly! ⚠️");
      setIsSubmitting(false);
      return;
    }

    // 👑 FIXED SCOPE: ID Generation handleSubmit 
    const uniqueMaterialId = "Paper-" + Date.now().toString().slice(-8);

    const materialCloudData = {
      id: uniqueMaterialId,
      grade: String(selectedGrade),
      category: formData.category,
      title: formData.materialTitle.trim(),
      driveUrl: formData.driveUrl.trim(),
      subject: subject || "maths",
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "academic_materials"), materialCloudData);
      setSuccess(
        `"${formData.materialTitle}" uploaded to Cloud successfully! 🟢`,
      );

      setFormData({ category: "classTutes", materialTitle: "", driveUrl: "" });

      if (onUploadSuccess) onUploadSuccess(); 

      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1500);
    } catch (err) {
      console.error("Firebase Storage Error:", err);
      setError(
        "An error occurred while uploading data to the Cloud Database! ❌",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="admin-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}>
      <div
        className="admin-modal-card"
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "500px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          position: "relative",
        }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
            color: "#8b949e",
          }}>
          <FaXmark />
        </button>

        <h3
          style={{
            margin: "0 0 5px 0",
            color: "#001b42",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
          <GoRocket style={{ color: "#0056ff" }} /> Onboard Academic Material
        </h3>
        <p
          style={{
            margin: "0 0 20px 0",
            color: "#8b949e",
            fontSize: "0.85rem",
          }}>
          Publish papers, formula guides, and lesson tutes to Grade{" "}
          {selectedGrade} [INDEX 4].
        </p>

        {error && (
          <div
            style={{
              color: "#ff4b4b",
              fontSize: "0.85rem",
              marginBottom: "15px",
            }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: "#10b981",
              fontSize: "0.85rem",
              marginBottom: "15px",
            }}>
            ✓ {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Material Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d2d6dc",
                background: "white",
              }}>
              <option value="classTutes">Class Tutes</option>
              <option value="pastPapers">Past Papers</option>
              <option value="formulas">Formula Guides</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Material Title
            </label>
            <input
              type="text"
              name="materialTitle"
              placeholder="ex: Lesson Core Theory Tute"
              required
              value={formData.materialTitle}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d2d6dc",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Google Drive Link (URL)
            </label>
            <input
              type="url"
              name="driveUrl"
              placeholder="https://google.com..."
              required
              value={formData.driveUrl}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d2d6dc",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "#0056ff",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "10px",
            }}>
            <FaCheck /> {isSubmitting ? "Uploading..." : "Publish to Paper Hub"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaperPublishForm;
