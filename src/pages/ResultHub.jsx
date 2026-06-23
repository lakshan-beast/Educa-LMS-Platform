import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

import {
  FaPaperPlane,
  FaHeart,
  FaCircleCheck,
  FaCommentDots,
  FaPlus,
} from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Loader from "../components/Loader";

const ResultsHub = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isUploading, setIsUploading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup එක පාලනය කිරීමට
  const [isModalOpen, setIsModalOpen] = useState(false); // Popup Controller

  // 📝 Form එකේ State එක (පින්තූර/කමෙන්ට් අයින් කර සර්ලාගේ Dropdowns දමා ඇත)
  const [form, setForm] = useState({
    fullName: "",
    indexNumber: "",
    schoolName: "",
    mathsGrade: "A",
    scienceGrade: "A",
    englishGrade: "A",
    overallResult: "",
    mathsTeacher: "Amila Sir", // Default ගුරුවරුන්
    scienceTeacher: "Nimal Sir",
  });

  // 🌧️ React Cascading Renders Warning එක මඟහැරවූ අකුරු වැස්සේ එන්ජිම
  const fallingLetters = useMemo(() => {
    const letters = ["A", "B", "A", "A", "B"];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      text: letters[Math.floor(Math.random() * letters.length)],
      left: Math.random() * 100 + "%",
      delay: Math.random() * 5 + "s",
      duration: Math.random() * 4 + 3 + "s",
      fontSize: Math.random() * 1.5 + 1 + "rem",
    }));
  }, []);

  useEffect(() => {
    // 📡 සජීවී සර්වර් ස්ට්‍රීම් එක (Live Sync)
    const q = query(
      collection(db, "ol_results_2025"),
      where("status", "==", "approved"),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setResults(docs);
        setIsLoading(false);
      },
      (err) => {
        console.error("Cloud Stream Error:", err);
        setIsLoading(false);
      },
    );

    // 🔏 RIGHT-CLICK & DEVTOOLS LOCK
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        window.location.reload();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      unsubscribe();
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ❤️ REAL-TIME CLOUD LIKE ENGINE
  const handleLikeAppreciation = async (docId) => {
    try {
      const docRef = doc(db, "ol_results_2025", docId);
      await updateDoc(docRef, { likes: increment(1) });
    } catch (err) {
      console.error("Like Increment Error:", err);
    }
  };

  // 📈 LIVE ANALYTICS COUNTERS (සර්ලා මට්ටමේ A/B සාමාර්ථ ගණනය කිරීම්)
  const analytics = useMemo(() => {
    const total = results.length;
    // ගණිතය සාමාර්ථය F නොවන අය සමත් ලෙස ගණන් ගනී
    const passed = results.filter((item) =>
      ["A", "B", "C", "S"].includes(item.mathsGrade?.toUpperCase()),
    ).length;
    const rate = total > 0 ? ((passed / total) * 100).toFixed(1) : "0.0";

    // 📐 Amila Sir (Maths) ගේ පන්තියේ A සහ B ප්‍රමාණය
    const amilaMathsA = results.filter(
      (item) => item.mathsTeacher === "Amila Sir" && item.mathsGrade === "A",
    ).length;
    const amilaMathsB = results.filter(
      (item) => item.mathsTeacher === "Amila Sir" && item.mathsGrade === "B",
    ).length;

    // 🔬 Nimal Sir (Science) ගේ පන්තියේ A සහ B ප්‍රමාණය
    const nimalScienceA = results.filter(
      (item) =>
        item.scienceTeacher === "Nimal Sir" && item.scienceGrade === "A",
    ).length;
    const nimalScienceB = results.filter(
      (item) =>
        item.scienceTeacher === "Nimal Sir" && item.scienceGrade === "B",
    ).length;

    return {
      total,
      passed,
      rate,
      amilaMathsA,
      amilaMathsB,
      nimalScienceA,
      nimalScienceB,
    };
  }, [results]);

  // 🚀 SUBMIT DATA ENGINE
  const handleSubmitResult = async (e) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.indexNumber ||
      !form.schoolName ||
      !form.overallResult
    ) {
      return alert("Please populate all validation layers first!");
    }

    try {
      setIsUploading(true);

      // Firestore Cloud එකට දත්ත යැවීම
      await addDoc(collection(db, "ol_results_2025"), {
        ...form,
        status: "approved",
        likes: 0,
        createdAt: new Date().toISOString(),
      });

      // Form එක සාර්ථකව Reset කර Popup එක Open කිරීම
      setForm({
        fullName: "",
        indexNumber: "",
        schoolName: "",
        mathsGrade: "A",
        scienceGrade: "A",
        englishGrade: "A",
        overallResult: "",
        mathsTeacher: "Amila Sir",
        scienceTeacher: "Nimal Sir",
      });
      setShowPopup(true);
    } catch (err) {
      console.error("Cloud Save Error:", err);
      alert("Something went wrong during submission.");
    } finally {
      setIsUploading(false);
    }
  };

  const maskIndexNumber = (num) => {
    if (!num) return "**";
    return num.slice(0, 3) + "****";
  };

  // Filter Tabs වලට අනුව වගුවේ දත්ත පෙන්නන්න කලින් වෙන් කරගන්නා තැන
  const filteredResults = results.filter((item) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "9A")
      return item.overallResult?.toUpperCase().replace(/\s/g, "") === "9A";
    if (activeFilter === "MATHS_A") return item.mathsGrade === "A";
    if (activeFilter === "SCIENCE_A") return item.scienceGrade === "A";
    return true;
  });

  return (
    <div className="secure-results-wrapper-shell page-container">
      {/* 🌧️ BACKGROUND ANIMATION */}
      <div className="falling-grades-matrix-backdrop">
        {fallingLetters.map((p) => (
          <div
            key={p.id}
            className={"falling-grade-token token-" + p.text.toLowerCase()}
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              fontSize: p.fontSize,
            }}>
            {p.text}
          </div>
        ))}
      </div>

      <div className="system-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link className="back-btn" to="/">
            <IoIosArrowBack /> Back to Home
          </Link>
          <Link className="back-btn" to="/student-voices">
            Go to Comments <span className="bell-alert-dot"></span>
            <IoIosArrowForward />
          </Link>
        </div>
        <div className="results-container parts">
          <h2>
            Verified O/L <span>Honors Portal</span>
          </h2>
          <p>
            Showcase the true reward of your hard work; a live-updating official
            directory of ordinary level achievers.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "0.5rem",
          }}>
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
            Total Results: {results.length}
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
            <FaPlus /> Share Your Results
          </button>
        </div>
        {/* 📈 LIVE ANALYTICS DASHBOARD CARD LAYER */}
        <div className="analytics-summary-dashboard-grid">
          {/* <div className="parts-grid"> */}
          <div className="analytic-mini-card card-row">
            <span> Total Candidates</span>
            <strong>{analytics.total}</strong>
          </div>
          <div className="analytic-mini-card card-row">
            <span> Total Passed Students</span>
            <strong>{analytics.passed}</strong>
          </div>
          <div className="analytic-mini-card percentage-card card-row">
            <span> Overall Pass Rate</span>
            <strong>{analytics.rate}%</strong>
          </div>
          {/* </div> */}
          {/* <div className="parts-grid"> */}
          <div className="analytic-mini-card teacher-cards">
            <span> Maths Sir (Maths)</span>
            <small>
              A: {analytics.amilaMathsA} | B: {analytics.amilaMathsB} | c:{" "}
              {analytics.amilaMathsc}
            </small>
          </div>
          <div className="analytic-mini-card teacher-cards">
            <span> Science Sir (Science)</span>
            <small>
              A: {analytics.nimalScienceA} | B: {analytics.nimalScienceB} | c:{" "}
              {analytics.amilaMathsc}
            </small>
          </div>
          <div className="analytic-mini-card teacher-cards">
            <span> English Sir (Science)</span>
            <small>
              A: {analytics.nimalScienceA} | B: {analytics.nimalScienceB} | c:{" "}
              {analytics.amilaMathsc}
            </small>
          </div>
          {/* </div> */}
        </div>
        {isModalOpen && (
          <div className="results-core-split-layouts">
            {/* FORM SIDE */}
            <form
              onSubmit={handleSubmitResult}
              className="secure-submission-form styled-form ">
              <h3>Submit O/L Records</h3>

              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  placeholder="e.g. Imesh Lakshan"
                  required
                />
              </div>

              <div className="input-group">
                <label>Index Number</label>
                <input
                  type="text"
                  value={form.indexNumber}
                  onChange={(e) =>
                    setForm({ ...form, indexNumber: e.target.value })
                  }
                  placeholder="e.g. 6089412"
                  required
                />
              </div>
              <div className="input-group">
                <label>Attended School Name</label>
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={(e) =>
                    setForm({ ...form, schoolName: e.target.value })
                  }
                  placeholder="e.g. Royal College"
                  required
                />
              </div>

              <div className="input-group">
                <label>Overall Examination Result</label>
                <input
                  type="text"
                  value={form.overallResult}
                  onChange={(e) =>
                    setForm({ ...form, overallResult: e.target.value })
                  }
                  placeholder="e.g. 9A or 8A, 1B"
                  required
                />
              </div>

              {/* TEACHERS SELECTION DROPDOWNS */}
              <div className="input-group">
                <label>Maths Teacher Name</label>
                <select
                  value={form.mathsTeacher}
                  onChange={(e) =>
                    setForm({ ...form, mathsTeacher: e.target.value })
                  }>
                  <option value="Amila Sir">Amila Sir</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label>Science Teacher Name</label>
                <select
                  value={form.scienceTeacher}
                  onChange={(e) =>
                    setForm({ ...form, scienceTeacher: e.target.value })
                  }>
                  <option value="Nimal Sir">Nimal Sir</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grades-selector-triple-grid">
                <div className="grade-drop">
                  <label>Maths</label>
                  <select
                    value={form.mathsGrade}
                    onChange={(e) =>
                      setForm({ ...form, mathsGrade: e.target.value })
                    }>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>S</option>
                    <option>F</option>
                  </select>
                </div>
                <div className="grade-drop">
                  <label>Science</label>
                  <select
                    value={form.scienceGrade}
                    onChange={(e) =>
                      setForm({ ...form, scienceGrade: e.target.value })
                    }>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>S</option>
                    <option>F</option>
                  </select>
                </div>
                <div className="grade-drop">
                  <label>English</label>
                  <select
                    value={form.englishGrade}
                    onChange={(e) =>
                      setForm({ ...form, englishGrade: e.target.value })
                    }>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>S</option>
                    <option>F</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="submit-verify-btn "
                disabled={isUploading}>
                <FaPaperPlane />{" "}
                {isUploading ? "Uploading..." : "Verify & Submit Records"}
              </button>
            </form>
          </div>
        )}
        <div>
          {/* DISPLAY SIDE (TABLE LAYOUT) */}
          <div className="secure-results-display-terminal">
            <div className="subject-matrix-tabs">
              <button
                onClick={() => setActiveFilter("ALL")}
                className={activeFilter === "ALL" ? "active" : ""}>
                All Honors
              </button>
              <button
                onClick={() => setActiveFilter("9A")}
                className={activeFilter === "9A" ? "active" : ""}>
                ⭐ 9A Elite
              </button>
              <button
                onClick={() => setActiveFilter("MATHS_A")}
                className={activeFilter === "MATHS_A" ? "active" : ""}>
                Maths A
              </button>
              <button
                onClick={() => setActiveFilter("SCIENCE_A")}
                className={activeFilter === "SCIENCE_A" ? "active" : ""}>
                Science A
              </button>
              <button
                onClick={() => setActiveFilter("ENGLISH_A")}
                className={activeFilter === "ENGLISH_A" ? "active" : ""}>
                English A
              </button>
            </div>

            {/* 📋 RESPONSIVE TABLE SHIELD */}
            <div className="secure-table-isolation-shield">
              {isLoading ? (
                <Loader />
              ) : filteredResults.length === 0 ? (
                <div className="vault-empty-lock">
                  Secured Faculty Cluster Node Encrypted.
                </div>
              ) : (
                <div className="table-responsive-wrapper">
                  <h2>Full O/L Exam Results - 2025 </h2>
                  <table className="secure-honors-ledger-table">
                    <thead>
                      <tr>
                        <th>Full Name & Index</th>
                        <th>School</th>
                        <th>Overall</th>
                        <th>Maths</th>
                        <th>Science</th>
                        <th>English</th>
                        <th>Appreciate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((student) => {
                        const is9A =
                          student.overallResult
                            ?.toUpperCase()
                            .replace(/\s/g, "") === "9A";

                        return (
                          <tr
                            key={student.docId}
                            className={is9A ? "elite-9a-gold-row-shimmer" : ""}>
                            <td>
                              <div className="details-content">
                                <span className="student-name-text">
                                  {student.fullName}
                                </span>
                                <small className="student-index-subtext">
                                  ID: {maskIndexNumber(student.indexNumber)}
                                </small>
                              </div>
                            </td>

                            <td>
                              <span className="table-school-tag">
                                {student.schoolName}
                              </span>
                            </td>

                            <td>
                              <span
                                className={`table-overall-badge ${is9A ? "gold-medal-tag" : ""}`}>
                                {is9A
                                  ? "⭐ 9A ELITE"
                                  : student.overallResult?.toUpperCase()}
                              </span>
                            </td>

                            <td
                              className={`table-grade-cell grade-${student.mathsGrade?.toLowerCase()}`}>
                              <strong>{student.mathsGrade}</strong>
                            </td>

                            <td
                              className={`table-grade-cell grade-${student.scienceGrade?.toLowerCase()}`}>
                              <strong>{student.scienceGrade}</strong>
                            </td>

                            <td
                              className={`table-grade-cell grade-${student.englishGrade?.toLowerCase()}`}>
                              <strong>{student.englishGrade}</strong>
                            </td>

                            <td>
                              <button
                                onClick={() =>
                                  handleLikeAppreciation(student.docId)
                                }
                                className="table-like-trigger-btn">
                                <FaHeart /> <span>{student.likes || 0}</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>{" "}
        {/* results-core-split-layout END */}
        {/* 💬 🔗 MODAL POPUP MESSAGE LAYER */}
        {showPopup && (
          <div className="custom-modal-blur-overlay">
            <div className="custom-secure-popup-box">
              <div className="popup-success-icon-shield">
                <FaCircleCheck />
              </div>

              <h4>Records Submitted Successfully!</h4>
              <p>
                Your results have been sent for verification and will be live on
                the ledger shortly. Please take a moment to share your valuable
                feedback and thoughts about our classes on our main commentary
                board.
              </p>

              <div className="popup-action-row-buttons">
                <Link className="popup-redirect-btn" to="/students-reviews">
                  <FaCommentDots /> Go to Comments Board
                </Link>
                <button
                  onClick={() => setShowPopup(false)}
                  className="popup-close-btn">
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsHub;
