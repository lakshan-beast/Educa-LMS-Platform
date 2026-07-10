import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCalculator,
  FaScaleBalanced,
  FaNoteSticky,
  FaXmark,
  FaTrashCan,
  FaPlus,
  FaComments,
} from "react-icons/fa6";
import { TiBackspace } from "react-icons/ti";

const StudentToolkit = () => {
  // 🎛️ MODAL DISPLAY STATES
  const [activeModal, setActiveModal] = useState(null); // 'calc' | 'converter' | 'notes' | null

  // ==========================================
  // 🧮 1. SCIENTIFIC MINI CALCULATOR LOGICS
  // ==========================================
  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState("");

  const handleCalcClick = (val) => {
    setCalcInput((prev) => prev + val);
  };

  const clearCalc = () => {
    setCalcInput("");
    setCalcResult("");
  };

  const backspaceCalc = () => {
    setCalcInput((prev) => prev.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      // Safe dynamic valuation via Function constructor (Alternative to unsafe eval)
      const sanitizedInput = calcInput.replace(/π/g, "Math.PI");
      const res = new Function(`return ${sanitizedInput}`)();
      setCalcResult(
        Number(res)
          .toFixed(4)
          .replace(/\.?0+$/, ""),
      ); // Safe decimals
    } catch (error) {
      setCalcResult("Error", error);
    }
  };

  const handleScientificFunc = (type) => {
    try {
      let currentVal = calcInput
        ? new Function(`return ${calcInput.replace(/π/g, "Math.PI")}`)()
        : 0;
      if (type === "sqrt") setCalcResult(Math.sqrt(currentVal).toString());
      if (type === "sq") setCalcResult(Math.pow(currentVal, 2).toString());
    } catch (error) {
      setCalcResult("Error", error);
    }
  };

  // ==========================================
  // ⚖️ 2. SCIENCE UNIT CONVERTER LOGICS
  // ==========================================
  const [converterType, setConverterType] = useState("speed"); // speed | length | mass
  const [convertValue, setConvertValue] = useState("");
  const [convertResult, setConvertResult] = useState("");

  const handleConversion = (val) => {
    setConvertValue(val);
    if (!val || isNaN(val)) {
      setConvertResult("");
      return;
    }

    const num = parseFloat(val);
    if (converterType === "speed") {
      // km/h to m/s conversion (Divide by 3.6)
      setConvertResult(`${num} km/h = ${(num / 3.6).toFixed(2)} m/s`);
    } else if (converterType === "length") {
      // Meters to cm and mm conversion matrix
      setConvertResult(`${num} m = ${num * 100} cm | ${num * 1000} mm`);
    } else if (converterType === "mass") {
      // kg to g conversion
      setConvertResult(`${num} kg = ${num * 1000} g`);
    }
  };

  // Whenever category swaps, reset input constraints safely
  useEffect(() => {
    setConvertValue("");
    setConvertResult("");
  }, [converterType]);

  // ==========================================
  // 📝 3. SUBJECT-WISE NOTES & HOMEWORK LOGICS
  // ==========================================
  const [notes, setNotes] = useState([]);
  const [noteForm, setNoteForm] = useState({ subject: "Maths", text: "" });

  // 🔄 LocalStorage එකෙන් පරණ සටහන් කියවා ගැනීම (Hydration) [INDEX 4]
  useEffect(() => {
    const savedNotes = localStorage.getItem("student_desk_notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Notes Hydration Loop Failure:", e);
      }
    }
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteForm.text.trim()) return;

    const newNotePayload = {
      id: "NOTE-" + Date.now().toString().slice(-5),
      subject: noteForm.subject,
      text: noteForm.text.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }), // 📅 දාපු දවස [INDEX 4]
    };

    const updatedNotes = [newNotePayload, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("student_desk_notes", JSON.stringify(updatedNotes)); // 💾 Local Storage Lock [INDEX 4]
    setNoteForm((prev) => ({ ...prev, text: "" })); // Text Field එක හිස් කිරීම
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("student_desk_notes", JSON.stringify(updatedNotes)); // 🗑️ Delete Refresh [INDEX 4]
  };

  // විෂය අනුව කාඩ් එකේ පාට වෙනස් වීමේ Matrix එක 🎨 [INDEX 4]
  const getSubjectColor = (sub) => {
    if (sub === "Maths")
      return { bg: "#eef2ff", border: "1px solid #c7d2fe", txt: "#0056ff" };
    if (sub === "Science")
      return { bg: "#f0fdf4", border: "1px solid #bbf7d0", txt: "#10b981" };
    return { bg: "#fff7ed", border: "1px solid #fed7aa", txt: "#ff9900" }; // English
  };

  return (
    <div
      className="student-utility-toolkit-workspace"
      style={{
        padding: "8px 0",
        display: "flex",
        flexDirection: "row",
        gap: "25px",
      }}>
      {/* 🎛️ 1. CORE UTILITY LAUNCH DOCK BUTTONS */}
      <div className="utility-trigger-buttons-dock" style={{display: "flex", flexDirection: "column"}}>
        <button
          onClick={() => setActiveModal("calc")}
          className="guild-chat-portal-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "#eef2ff",
            color: "#0056ff",
            border: "1px solid #c7d2fe",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}>
          <FaCalculator className="guild-chat-icon" /> Launch Calculator
        </button>
        <button
          onClick={() => setActiveModal("converter")}
          className="guild-chat-portal-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "#ecfdf5",
            color: "#10b981",
            border: "1px solid #bbf7d0",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}>
          <FaScaleBalanced className="guild-chat-icon" /> Unit Converter
        </button>
        <button
          onClick={() => setActiveModal("notes")}
          className="guild-chat-portal-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "#fff7ed",
            color: "#ff9900",
            border: "1px solid #fed7aa",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}>
          <FaNoteSticky className="guild-chat-icon" /> Study Desk Notes
        </button>
        <Link
          to="/student-guild"
          className="guild-chat-portal-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "#ffecec",
            color: "#ff0000",
            border: "1px solid #ff6868",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
            margin: "0",
            width: "100%"
          }}>
          <FaComments className="guild-chat-icon" />
          <span>11 Study Guild</span>
        </Link>
      </div>

      {/* ==========================================
          🧮 MODAL A: SCIENTIFIC MINI CALCULATOR POPUP
          ========================================== */}
      {activeModal === "calc" && (
        <div
          className="admin-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}>
          <div
            className="admin-modal-card"
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "16px",
              width: "320px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              position: "relative",
            }}>
            <button
              onClick={() => {
                setActiveModal(null);
                clearCalc();
              }}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
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
                margin: "0 0 15px 0",
                color: "#001b42",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <FaCalculator style={{ color: "#0056ff" }} /> Math Desk Calculator
            </h3>

            {/* Display Engine */}
            <div
              style={{
                background: "#f4f6fa",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "right",
                marginBottom: "15px",
                minHeight: "70px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "5px",
              }}>
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#001b42",
                  wordBreak: "break-all",
                }}>
                {calcInput || "0"}
              </div>
              {calcResult && (
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#10b981",
                    fontWeight: "bold",
                  }}>
                  = {calcResult}
                </div>
              )}
            </div>

            {/* Buttons Grid Matrix */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
              }}>
              <button
                onClick={() => handleScientificFunc("sqrt")}
                style={{
                  padding: "12px",
                  background: "#eef2ff",
                  color: "#0056ff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                √
              </button>
              <button
                onClick={() => handleScientificFunc("sq")}
                style={{
                  padding: "12px",
                  background: "#eef2ff",
                  color: "#0056ff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                x²
              </button>
              <button
                onClick={() => handleCalcClick("π")}
                style={{
                  padding: "12px",
                  background: "#eef2ff",
                  color: "#0056ff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                π
              </button>
              <button
                onClick={clearCalc}
                style={{
                  padding: "12px",
                  background: "#fff5f5",
                  color: "#ff4b4b",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                C
              </button>

              {["7", "8", "9", "/"].map((v) => (
                <button
                  key={v}
                  onClick={() => handleCalcClick(v)}
                  style={{
                    padding: "12px",
                    background: v === "/" ? "#f4f6fa" : "#ffffff",
                    border: "1px solid #f4f6fa",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  {v}
                </button>
              ))}
              {["4", "5", "6", "*"].map((v) => (
                <button
                  key={v}
                  onClick={() => handleCalcClick(v)}
                  style={{
                    padding: "12px",
                    background: v === "*" ? "#f4f6fa" : "#ffffff",
                    border: "1px solid #f4f6fa",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  {v}
                </button>
              ))}
              {["1", "2", "3", "-"].map((v) => (
                <button
                  key={v}
                  onClick={() => handleCalcClick(v)}
                  style={{
                    padding: "12px",
                    background: v === "-" ? "#f4f6fa" : "#ffffff",
                    border: "1px solid #f4f6fa",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  {v}
                </button>
              ))}

              <button
                onClick={backspaceCalc}
                style={{
                  padding: "12px",
                  background: "#f4f6fa",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                <TiBackspace />
              </button>
              <button
                onClick={() => handleCalcClick("0")}
                style={{
                  padding: "12px",
                  background: "#ffffff",
                  border: "1px solid #f4f6fa",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                0
              </button>
              <button
                onClick={() => handleCalcClick(".")}
                style={{
                  padding: "12px",
                  background: "#ffffff",
                  border: "1px solid #f4f6fa",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                .
              </button>
              <button
                onClick={() => handleCalcClick("+")}
                style={{
                  padding: "12px",
                  background: "#f4f6fa",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                +
              </button>
            </div>
            <button
              onClick={calculateResult}
              style={{
                width: "100%",
                padding: "12px",
                background: "#0056ff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "10px",
              }}>
              =
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          ⚖️ MODAL B: SCIENCE UNIT CONVERTER POPUP
          ========================================== */}
      {activeModal === "converter" && (
        <div
          className="admin-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}>
          <div
            className="admin-modal-card"
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "16px",
              width: "400px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              position: "relative",
            }}>
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
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
                margin: "0 0 15px 0",
                color: "#001b42",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <FaScaleBalanced style={{ color: "#10b981" }} /> Science Unit
              Converter
            </h3>

            {/* Category Select Tabs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "5px",
                marginBottom: "15px",
              }}>
              {["speed", "length", "mass"].map((type) => (
                <button
                  key={type}
                  onClick={() => setConverterType(type)}
                  style={{
                    padding: "8px 5px",
                    border: "none",
                    borderRadius: "6px",
                    background: converterType === type ? "#10b981" : "#f4f6fa",
                    color: converterType === type ? "white" : "#001b42",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}>
                  {type}
                </button>
              ))}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                  {converterType === "speed"
                    ? "Enter Speed value (km/h)"
                    : converterType === "length"
                      ? "Enter Length value (Meters)"
                      : "Enter Mass value (kg)"}
                </label>
                <input
                  type="number"
                  placeholder="Enter number value..."
                  value={convertValue}
                  onChange={(e) => handleConversion(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    outline: "none",
                  }}
                />
              </div>

              {/* Conversion Result Block */}
              {convertResult && (
                <div
                  style={{
                    background: "#ecfdf5",
                    border: "1px solid #bbf7d0",
                    padding: "12px",
                    borderRadius: "6px",
                    color: "#065f46",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    textAlign: "center",
                  }}>
                  {convertResult}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          📝 MODAL C: SUBJECT-WISE NOTES WORKSPACE
          ========================================== 
      {activeModal === "notes" && (
        <div className="admin-modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000 }}>
          <div className="admin-modal-card" style={{ background: "#ffffff", padding: "25px", borderRadius: "16px", width: "550px", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", position: "relative" }}>
            <button onClick={() => setActiveModal(null)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#8b949e" }}><FaXmark /></button>*/}

      {/* ==========================================
          📝 MODAL C: SUBJECT-WISE NOTES WORKSPACE
          ========================================== */}
      {activeModal === "notes" && (
        <div
          className="admin-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}>
          <div
            className="admin-modal-card"
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "16px",
              maxWidth: "330px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              position: "relative",
            }}>
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
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
                margin: "12px 0 15px 0",
                color: "#001b42",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <FaNoteSticky style={{ color: "#ff9900" }} /> Study Desk Notes &
              Homework Tracker
            </h3>

            {/* Note Logging Form */}
            <form
              onSubmit={handleAddNote}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#f8faff",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}>
              <select
                value={noteForm.subject}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, subject: e.target.value })
                }
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #d2d6dc",
                  background: "white",
                  fontWeight: "bold",
                  color: "#001b42",
                  outline: "none",
                }}>
                <option value="Maths">Maths Class</option>
                <option value="Science">Science Class</option>
                <option value="English">English Class</option>
              </select>
              <input
                type="text"
                placeholder="Type homework task or specific note description..."
                required
                value={noteForm.text}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, text: e.target.value })
                }
                style={{
                  flexGrow: 1,
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d2d6dc",
                  outline: "none",
                  fontSize: "0.85rem",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#ff9900",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  justifyContent: "center",
                }}>
                <FaPlus /> Add
              </button>
            </form>

            {/* Dynamic Notes Grid (Subject-wise Color Accents Mapping) */}
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "#001b42",
                fontSize: "0.9rem",
              }}>
              Active Core Notebook Ledger
            </h4>
            {notes.length === 0 ? (
              <p
                style={{
                  margin: 0,
                  color: "#8b949e",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  textAlign: "center",
                  padding: "20px 0",
                }}>
                Notebook empty. Log tasks above to keep track of operations
                [INDEX 4].
              </p>
            ) : (
              <div
                className="desk-notes-vertical-feed"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}>
                {notes.map((item) => {
                  const subTheme = getSubjectColor(item.subject);
                  return (
                    <div
                      key={item.id}
                      style={{
                        background: subTheme.bg,
                        border: subTheme.border,
                        padding: "15px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "15px",
                      }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          textAlign: "left",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: "800",
                              color: subTheme.txt,
                              textTransform: "uppercase",
                            }}>
                            ● {item.subject}
                          </span>
                          <small
                            style={{ color: "#8b949e", fontSize: "0.75rem" }}>
                            Logged: {item.date}
                          </small>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.9rem",
                            color: "#001b42",
                            fontWeight: "500",
                            lineHeight: "1.4",
                          }}>
                          {item.text}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteNote(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff4b4b",
                          cursor: "pointer",
                          fontSize: "0.95rem",
                          padding: "5px",
                          transition: "0.2s",
                        }}
                        title="Remove Note From Desk">
                        <FaTrashCan />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentToolkit;
