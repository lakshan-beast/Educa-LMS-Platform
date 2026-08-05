import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import { db } from "../../firebaseConfig";
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
  FaXmark,
} from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Loader from "../../components/ui/Loader";

const ResultsHub = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isUploading, setIsUploading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup Comment
  const [isModalOpen, setIsModalOpen] = useState(false); // Popup Controller

  // 📝 Form එකේ State
  const [form, setForm] = useState({
    fullName: "",
    indexNumber: "",
    schoolName: "",
    mathsGrade: "A",
    scienceGrade: "A",
    englishGrade: "A",
    overallResult: "",
    mathsTeacher: "Maths Sir",
    scienceTeacher: "Science Sir",
    englishTeacher: "English Sir",
  });

  // 🌧️ React Cascading Renders Warning එක මඟහැරවූ අකුරු වැස්සේ එන්ජිම
  const fallingLetters = useMemo(() => {
    const letters = ["A", "B", "A", "A", "B", "A", "B", "A", "A", "B"];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      text: letters[Math.floor(Math.random() * letters.length)],
      left: Math.random() * 100 + "%",
      delay: Math.random() * 2 + "s",
      duration: Math.random() * 4 + 3 + "s",
      fontSize: Math.random() * 2.5 + 1 + "rem",
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

  // 📈 LIVE ANALYTICS COUNTERS
  const analytics = useMemo(() => {
    const total = results.length;
    const passed = results.filter((item) =>
      ["A", "B", "C", "S"].includes(item.mathsGrade?.toUpperCase()),
    ).length;
    const rate = total > 0 ? ((passed / total) * 100).toFixed(1) : "0.0";

    // 📐 Maths Sir (Maths)
    const sirMathsA = results.filter(
      (item) => item.mathsTeacher === "Maths Sir" && item.mathsGrade === "A",
    ).length;
    const sirMathsB = results.filter(
      (item) => item.mathsTeacher === "Maths Sir" && item.mathsGrade === "B",
    ).length;
    const sirMathsC = results.filter(
      (item) => item.mathsTeacher === "Maths Sir" && item.mathsGrade === "C",
    ).length;

    // 🔬 Science Sir (Science)
    const sirScienceA = results.filter(
      (item) =>
        item.scienceTeacher === "Science Sir" && item.scienceGrade === "A",
    ).length;
    const sirScienceB = results.filter(
      (item) =>
        item.scienceTeacher === "Science Sir" && item.scienceGrade === "B",
    ).length;
    const sirScienceC = results.filter(
      (item) =>
        item.scienceTeacher === "Science Sir" && item.scienceGrade === "C",
    ).length;

    // 🔬 English Sir (English)
    const sirEnglishA = results.filter(
      (item) =>
        item.englishTeacher === "English Sir" && item.englishGrade === "A",
    ).length;
    const sirEnglishB = results.filter(
      (item) =>
        item.englishTeacher === "English Sir" && item.englishGrade === "B",
    ).length;
    const sirEnglishC = results.filter(
      (item) =>
        item.englishTeacher === "English Sir" && item.englishGrade === "C",
    ).length;

    return {
      total,
      passed,
      rate,
      sirMathsA,
      sirMathsB,
      sirMathsC,
      sirScienceA,
      sirScienceB,
      sirScienceC,
      sirEnglishA,
      sirEnglishB,
      sirEnglishC,
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

      await addDoc(collection(db, "ol_results_2025"), {
        ...form,
        status: "approved",
        likes: 0,
        createdAt: new Date().toISOString(),
      });
      setIsModalOpen(false);

      setForm({
        fullName: "",
        indexNumber: "",
        schoolName: "",
        mathsGrade: "A",
        scienceGrade: "A",
        englishGrade: "A",
        overallResult: "",
        mathsTeacher: "Maths Sir",
        scienceTeacher: "Science Sir",
        englishTeacher: "English Sir",
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

  const filteredResults = results.filter((item) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "9A")
      return item.overallResult?.toUpperCase().replace(/\s/g, "") === "9A";
    if (activeFilter === "MATHS_A") return item.mathsGrade === "A";
    if (activeFilter === "SCIENCE_A") return item.scienceGrade === "A";
    if (activeFilter === "ENGLISH_A") return item.englishGrade === "A";
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
        <div className="back-buttons">
          <Link className="back-btn" to="/">
            <IoIosArrowBack /> Back to Home
          </Link>
          <Link className="back-btn" to="/student-voices">
            Go to Comments
            <IoIosArrowForward />
          </Link>
        </div>

        <div className="results-containers parts">
          <h2>
            Verified O/L <span>Honors Portal</span>
          </h2>
          <p>
            Showcase the true reward of your hard work; a live-updating official
            directory of ordinary level achievers.
          </p>
        </div>
        {/* </div> */}

        <div className="results-header-zone">
          <div className="results-top-action-bar">
            <div className="total-results-badge">
              Total Results: <span>{results.length}</span>
            </div>

            {/* 📣 ADD NEW COMMENT BUTTON */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="share-results-btn">
              <FaPlus /> Share Your Results
            </button>
          </div>
        </div>

        {/* 📈 LIVE ANALYTICS DASHBOARD CARD LAYER */}
        <div className="analytics-summary-dashboard-grid">
          <div className="summary-top">
            <div className="analytic-mini-card card-row">
              <h3> Total Candidates</h3>
              <strong>{analytics.total}</strong>
            </div>
            <div className="analytic-mini-card card-row">
              <h3> Total Passed Students</h3>
              <strong>{analytics.passed}</strong>
            </div>
            <div className="analytic-mini-card percentage-card card-row">
              <h3> Overall Pass Rate</h3>
              <strong>{analytics.rate}%</strong>
            </div>
          </div>

          <div className="summary-footer">
            <div className="analytic-mini-card teacher-cards">
              <h3> Maths Sir (Maths)</h3>
              <span className="score"> A : {analytics.sirMathsA}</span>
              <span className="score"> B : {analytics.sirMathsB}</span>
              <span className="score"> C : {analytics.sirMathsC}</span>
            </div>
            <div className="analytic-mini-card teacher-cards">
              <h3> Science Sir (Science)</h3>
              <span className="score"> A : {analytics.sirScienceA} </span>
              <span className="score"> B : {analytics.sirScienceB}</span>
              <span className="score"> C : {analytics.sirScienceC}</span>
            </div>
            <div className="analytic-mini-card teacher-cards">
              <h3> English Sir (Science)</h3>
              <span className="score"> A : {analytics.sirEnglishA}</span>
              <span className="score"> B : {analytics.sirEnglishB}</span>
              <span className="score"> C : {analytics.sirEnglishC}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="secure-results-display-terminal">
            <div className="results-filters-row">
              <button
                onClick={() => setActiveFilter("ALL")}
                className={activeFilter === "ALL" ? "filter-active" : ""}>
                All Honors
              </button>
              <button
                onClick={() => setActiveFilter("9A")}
                className={activeFilter === "9A" ? "filter-active" : ""}>
                ⭐ 9A Elite
              </button>
              <button
                onClick={() => setActiveFilter("MATHS_A")}
                className={activeFilter === "MATHS_A" ? "filter-active" : ""}>
                Maths A
              </button>
              <button
                onClick={() => setActiveFilter("SCIENCE_A")}
                className={activeFilter === "SCIENCE_A" ? "filter-active" : ""}>
                Science A
              </button>
              <button
                onClick={() => setActiveFilter("ENGLISH_A")}
                className={activeFilter === "ENGLISH_A" ? "filter-active" : ""}>
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
                  <table className="secure-honors-ledger-table">
                    <caption>Full O/L Exam Results - 2025</caption>
                    <thead>
                      <tr>
                        <th>Appreciate</th>
                        <th>Full Name & Index</th>
                        <th>School</th>
                        <th>Overall</th>
                        <th>Maths</th>
                        <th>Science</th>
                        <th>English</th>
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
                              <button
                                onClick={() =>
                                  handleLikeAppreciation(student.docId)
                                }
                                className="table-like-trigger-btn">
                                <FaHeart /> <span>{student.likes || 0}</span>
                              </button>
                            </td>
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
                                  ? "9A ELITE"
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* results-core-split-layout END */}

        {isModalOpen && (
          <div className="results-bottom-sheet-overlay">
            <div className="results-sheet-card">
              {/* Close Cross Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="close-sheet-btn">
                <FaXmark />
              </button>

              <h3>Submit O/L Records</h3>
              <p className="sheet-subtext">
                Enter your examination details accurately to log your
                achievements into the live registry.
              </p>

              <form
                onSubmit={handleSubmitResult}
                className="sheet-main-form styled-form ">
                <div className="sheet-input-group">
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
                <div className="sheet-input-group">
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
                <div className="sheet-input-group">
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
                <div className="sheet-input-group">
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
                <div className="sheet-input-group">
                  <label>Maths Teacher Name</label>
                  <select
                    value={form.mathsTeacher}
                    onChange={(e) =>
                      setForm({ ...form, mathsTeacher: e.target.value })
                    }>
                    <option value="Maths Sir">Maths Sir</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sheet-input-group">
                  <label>Science Teacher Name</label>
                  <select
                    value={form.scienceTeacher}
                    onChange={(e) =>
                      setForm({ ...form, scienceTeacher: e.target.value })
                    }>
                    <option value="Science Sir">Science Sir</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sheet-input-group">
                  <label>English Teacher Name</label>
                  <select
                    value={form.englishTeacher}
                    onChange={(e) =>
                      setForm({ ...form, englishTeacher: e.target.value })
                    }>
                    <option value="English Sir">English Sir</option>
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
                  className="sheet-submit-btn "
                  disabled={isUploading}>
                  <FaPaperPlane />{" "}
                  {isUploading ? "Uploading..." : "Verify & Submit Records"}
                </button>
              </form>
            </div>
          </div>
        )}

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
                <Link className="popup-redirect-btn" to="students-reviews">
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
