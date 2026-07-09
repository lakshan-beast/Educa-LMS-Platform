import { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { FaCalendarDays, FaXmark, FaCheck } from "react-icons/fa6";

const ScheduleSubmitForm = ({ isOpen, onClose, selectedGrade, subject }) => {
  const [formData, setFormData] = useState({
    targetDateTime: "",
    weekPicker: "",
    currentLesson: "",
    specialNotes: "",
    zoomLink: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const newRecord = {
      grade: selectedGrade,
      subject: subject,
      className: `Grade ${selectedGrade} ${subject?.toUpperCase()}`,
      teacherName:
        subject === "maths"
          ? "Janaka Sir"
          : subject === "science"
            ? "Science Sir"
            : "English Teacher",
      targetDateTime: formData.targetDateTime,
      currentLesson: formData.currentLesson,
      specialNotes: formData.specialNotes,
      zoomLink: formData.zoomLink,
      weekPicker: formData.weekPicker,
      overrideStatus: "AUTO COUNTDOWN", // Default State එක AUTO COUNTDOWN ලෙස සකසයි
    };

    try {
      const docRef = doc(
        db,
        "schedules",
        `${selectedGrade.replace(/\s+/g, "-")}_${subject}`,
      );

      await setDoc(docRef, newRecord);
      setSuccess(`Grade ${selectedGrade} Schedule successfully updated! 🟢`);

      setFormData({
        targetDateTime: "",
        weekPicker: "",
        currentLesson: "",
        specialNotes: "",
        zoomLink: "",
      });

      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1500);
    } catch (err) {
      console.error("Cloud Save Schedule Error:", err);
      setError("Failed to save data to Cloud Repository! 🔴");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isZoomRequired = ["10", "11", "11 Paper Class"].includes(selectedGrade);

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
          width: "520px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          position: "relative",
        }}>
        {/* ❌ CLOSE BUTTON */}
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

        <div className="vault-header" style={{ marginBottom: "20px" }}>
          <h3
            style={{
              margin: 0,
              color: "#001b42",
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            <FaCalendarDays style={{ color: "#0056ff" }} /> Update Class
            Schedule
          </h3>
          <p
            style={{
              margin: "5px 0 0 0",
              color: "#8b949e",
              fontSize: "0.85rem",
            }}>
            Configure timelines, active lessons and sync live student feeds
            [INDEX 4].
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fff5f5",
              color: "#ff4b4b",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              marginBottom: "15px",
            }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "#ecfdf5",
              color: "#10b981",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              marginBottom: "15px",
            }}>
            ✓ {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                Class Date & Start Time
              </label>
              <input
                type="datetime-local"
                name="targetDateTime"
                required
                value={formData.targetDateTime}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #d2d6dc",
                }}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                Class Week
              </label>
              <input
                type="week"
                name="weekPicker"
                required
                value={formData.weekPicker}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #d2d6dc",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Current Active Lesson
            </label>
            <input
              type="text"
              name="currentLesson"
              placeholder="ex: Lesson 01 - Core Concept"
              required
              value={formData.currentLesson}
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
              Special Instructions Note
            </label>
            <input
              type="text"
              name="specialNotes"
              placeholder="ex: Bring previous week tutes..."
              value={formData.specialNotes}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d2d6dc",
                outline: "none",
              }}
            />
          </div>

          {/* 🔗 DYNAMIC ZOOM FIELD LOCK */}
          {isZoomRequired ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#58a6ff",
                }}>
                Virtual Zoom Link
              </label>
              <input
                type="url"
                name="zoomLink"
                placeholder="https://zoom.us..."
                required
                value={formData.zoomLink}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #58a6ff",
                  outline: "none",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                background: "#f4f7ff",
                padding: "10px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                color: "#1e1b4b",
                border: "1px solid #c7d2fe",
              }}>
              💡 Virtual meeting rooms are restricted for Grades 6 - 9
              templates. Only timeline parameters will render on terminals.
            </div>
          )}

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
            <FaCheck />{" "}
            {isSubmitting ? "Syncing..." : "Commit Timeline To Cloud"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleSubmitForm;
