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
    <div className="student-utility-toolkit-workspace">
      {/* 🎛️ 1. CORE UTILITY LAUNCH DOCK BUTTONS */}
      <div className="utility-trigger-buttons-dock">
        {/* CALCULATOR LAUNCHER */}
        <button
          onClick={() => setActiveModal("calc")}
          className="guild-chat-portal-link tool-calc">
          <FaCalculator className="guild-chat-icon" />
          <span>Launch Calculator</span>
        </button>

        {/* UNIT CONVERTER LAUNCHER */}
        <button
          onClick={() => setActiveModal("converter")}
          className="guild-chat-portal-link tool-converter">
          <FaScaleBalanced className="guild-chat-icon" />
          <span>Unit Converter</span>
        </button>

        {/* STUDY NOTES LAUNCHER */}
        <button
          onClick={() => setActiveModal("notes")}
          className="guild-chat-portal-link tool-notes">
          <FaNoteSticky className="guild-chat-icon" />
          <span>Study Desk Notes</span>
        </button>
      </div>
      {/* </div> */}
      {/* <Link
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
        </Link> */}
      {/* // </div> */}

      {/* ==========================================
          🧮 MODAL A: SCIENTIFIC MINI CALCULATOR POPUP
          ========================================== */}
      {activeModal === "calc" && (
        <div
          className="toolkit-sheet-overlay"
          onClick={() => {
            setActiveModal(null);
            clearCalc();
          }}>
          {/* 👈 යට ඉඳන් පාවෙලා එන iOS Bottom Sheet Card එක */}
          <div
            className="toolkit-sheet-card calc-card"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Cross Button */}
            <button
              className="close-sheet-btn"
              onClick={() => {
                setActiveModal(null);
                clearCalc();
              }}>
              <FaXmark />
            </button>

            <h3>
              <FaCalculator /> Math Desk Calculator
            </h3>

            {/* Display Engine */}
            <div className="calc-display-screen">
              <div className="calc-input-stream">{calcInput || "0"}</div>
              {calcResult && (
                <div className="calc-result-stream">= {calcResult}</div>
              )}
            </div>

            {/* Buttons Grid Matrix */}
            <div className="calc-buttons-grid-matrix">
              <button
                onClick={() => handleScientificFunc("sqrt")}
                className="sci-op-btn">
                √
              </button>
              <button
                onClick={() => handleScientificFunc("sq")}
                className="sci-op-btn">
                x²
              </button>
              <button
                onClick={() => handleCalcClick("π")}
                className="sci-op-btn">
                π
              </button>
              <button onClick={clearCalc} className="calc-clear-btn">
                C
              </button>

              {["7", "8", "9", "/"].map((v) => (
                <button
                  key={v}
                  onClick={() => handleCalcClick(v)}
                  className={`num-btn ${v === "/" ? "math-op-btn" : ""}`}>
                  {v}
                </button>
              ))}
              {["4", "5", "6", "*"].map((v) => (
                <button
                  key={v}
                  onClick={() => handleCalcClick(v)}
                  className={`num-btn ${v === "*" ? "math-op-btn" : ""}`}>
                  {v}
                </button>
              ))}
              {["1", "2", "3", "-"].map((v) => (
                <button
                  key={v}
                  onClick={() => handleCalcClick(v)}
                  className={`num-btn ${v === "-" ? "math-op-btn" : ""}`}>
                  {v}
                </button>
              ))}

              <button
                onClick={backspaceCalc}
                className="math-op-btn backspace-btn">
                <TiBackspace />
              </button>
              <button onClick={() => handleCalcClick("0")} className="num-btn">
                0
              </button>
              <button onClick={() => handleCalcClick(".")} className="num-btn">
                .
              </button>
              <button
                onClick={() => handleCalcClick("+")}
                className="math-op-btn">
                +
              </button>
            </div>

            <button
              onClick={calculateResult}
              className="calc-evaluate-submit-btn">
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
          className="toolkit-sheet-overlay"
          onClick={() => setActiveModal(null)}>
          {/* 👈 යට ඉඳන් පාවෙලා උඩට එන iOS Bottom Sheet Card එක */}
          <div
            className="toolkit-sheet-card converter-card"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Cross Button */}
            <button
              className="close-sheet-btn"
              onClick={() => setActiveModal(null)}>
              <FaXmark />
            </button>

            <h3>
              <FaScaleBalanced /> Science Unit Converter
            </h3>

            {/* Category Select Tabs */}
            <div className="converter-category-tabs-grid">
              {["speed", "length", "mass"].map((type) => (
                <button
                  key={type}
                  onClick={() => setConverterType(type)}
                  className={`converter-tab-btn ${converterType === type ? "active-converter-tab" : ""}`}>
                  {type}
                </button>
              ))}
            </div>

            <div className="converter-input-output-container">
              <div className="converter-input-field-group">
                <label>
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
                />
              </div>

              {/* Conversion Result Block */}
              {convertResult && (
                <div className="converter-live-result-block">
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
          className="toolkit-sheet-overlay"
          onClick={() => setActiveModal(null)}>
          {/* 👈 යට ඉඳන් පාවෙලා උඩට එන iOS Bottom Sheet Card එක */}
          <div
            className="toolkit-sheet-card notes-card"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Cross Button */}
            <button
              className="close-sheet-btn"
              onClick={() => setActiveModal(null)}>
              <FaXmark />
            </button>

            <h3>
              <FaNoteSticky /> Study Desk Notes & Homework Tracker
            </h3>

            {/* Note Logging Form */}
            <form onSubmit={handleAddNote} className="notes-logging-form">
              <select
                value={noteForm.subject}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, subject: e.target.value })
                }>
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
              />

              <button type="submit" className="notes-add-submit-btn">
                <FaPlus /> Add
              </button>
            </form>

            {/* Dynamic Notes Grid */}
            <h4 className="notebook-ledger-title">
              Active Core Notebook Ledger
            </h4>

            {notes.length === 0 ? (
              <p className="empty-notebook-notice">
                Notebook empty. Log tasks above to keep track of operations
                [INDEX 4].
              </p>
            ) : (
              <div className="desk-notes-vertical-feed">
                {notes.map((item) => {
                  const subTheme = getSubjectColor(item.subject);
                  return (
                    <div
                      key={item.id}
                      className="notebook-note-tile"
                      style={{
                        // 👈 ඩේටාබේස් එකෙන් එන ඩයිනමික් කලර්ස් පිරිසිදුව ඇසට නොරිදෙන ලෙස ඉන්ජෙක්ට් වෙයි
                        background: subTheme.bg,
                        borderColor:
                          subTheme.border || "rgba(255, 255, 255, 0.05)",
                      }}>
                      <div className="note-tile-content-block">
                        <div className="note-tile-meta-header">
                          <span
                            className="note-subject-tag"
                            style={{ color: subTheme.txt }}>
                            ● {item.subject}
                          </span>
                          <small className="note-logged-date">
                            Logged: {item.date}
                          </small>
                        </div>

                        {/* 💻 FIXED: අකුරු වල පාට ඩාර්ක් තීම් එකට ගැළපෙන පරිදි SASS එකෙන් පාලනය වේ */}
                        <p className="note-actual-text-body">{item.text}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteNote(item.id)}
                        className="note-delete-trigger-btn"
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
