import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
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
  FaShieldHalved,
  //   FaSchool,
  //   FaAward,
  //   IoIosArrowBack ,
  //   FaArrowRight,
  FaPaperPlane,
  FaHeart,
  FaCircleCheck,
  FaCommentDots,
} from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
{
  /* <IoIosArrowBack />; */
}

const ResultsHub = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isUploading, setIsUploading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup එක පාලනය කිරීමට

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
          <Link className="back-btn" to="/dashboard">
            Back to Dashboard <IoIosArrowForward />
          </Link>
        </div>

        <div className="results-header-block">
          <h2>
            <FaShieldHalved /> Verified O/L <span>Honors Portal</span>
          </h2>
          <p>
            Showcase the true reward of your hard work; a live-updating official
            directory of ordinary level achievers.
          </p>
        </div>

        {/* 📈 LIVE ANALYTICS DASHBOARD CARD LAYER */}
        <div className="analytics-summary-dashboard-grid">
          <div className="analytic-mini-card">
            <span>👥 Total Candidates</span>
            <strong>{analytics.total}</strong>
          </div>
          <div className="analytic-mini-card">
            <span>✅ Total Passed Students</span>
            <strong>{analytics.passed}</strong>
          </div>
          <div className="analytic-mini-card percentage-card">
            <span>📊 Overall Pass Rate</span>
            <strong>{analytics.rate}%</strong>
          </div>
          <div className="analytic-mini-card teacher-card">
            <span>📐 Amila Sir (Maths)</span>
            <small>
              A: {analytics.amilaMathsA} | B: {analytics.amilaMathsB}
            </small>
          </div>
          <div className="analytic-mini-card teacher-card">
            <span>🔬 Nimal Sir (Science)</span>
            <small>
              A: {analytics.nimalScienceA} | B: {analytics.nimalScienceB}
            </small>
          </div>
        </div>

        <div className="results-core-split-layout">
          {/* FORM SIDE */}
          <form
            onSubmit={handleSubmitResult}
            className="secure-submission-form styled form ">
            <h3>Submit O/L Records</h3>

            <div className="form-field-row">
              <label>Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Imesh Lakshan"
                required
              />
            </div>

            <div className="form-field-row">
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
            <div className="form-field-row">
              <label>🏫 Attended School Name</label>
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

            <div className="form-field-row">
              <label>🏆 Overall Examination Result</label>
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
            <div className="form-field-row">
              <label>📐 Maths Teacher Name</label>
              <select
                value={form.mathsTeacher}
                onChange={(e) =>
                  setForm({ ...form, mathsTeacher: e.target.value })
                }>
                <option value="Amila Sir">Amila Sir</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-field-row">
              <label>🔬 Science Teacher Name</label>
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
                <label>📐 Maths</label>
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
                <label>🔬 Science</label>
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
                <label>🔤 English</label>
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
              className="submit-verify-btn"
              disabled={isUploading}>
              <FaPaperPlane />{" "}
              {isUploading ? "Uploading..." : "Verify & Submit Records"}
            </button>
          </form>

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
            </div>

            {/* 📋 RESPONSIVE TABLE SHIELD */}
            <div className="secure-table-isolation-shield">
              {isLoading ? (
                <div className="vault-loading-center">
                  Streaming Verified Cloud Records...
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="vault-empty-lock">
                  🔒 Secured Faculty Cluster Node Encrypted.
                </div>
              ) : (
                <div className="table-responsive-wrapper">
                  <table className="secure-honors-ledger-table">
                    <thead>
                      <tr>
                        <th>Full Name & Index</th>
                        <th>School</th>
                        <th>Overall</th>
                        <th>📐 Maths</th>
                        <th>🔬 Science</th>
                        <th>🔤 English</th>
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
                              {/* 1. මඟහැරුණු ආරම්භක div ටැග් එක මෙතනට දැම්මා */}
                              <div>
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
                              {/* 2. මෙතනට Backticks (  ) ලකුණු නිවැරදිව එකතු කළා */}
                              <span
                                className={`table-overall-badge ${is9A ? "gold-medal-text" : ""}`}>
                                {is9A
                                  ? "🏆 9A ELITE"
                                  : student.overallResult?.toUpperCase()}
                              </span>
                            </td>
                            {/* 3. මේ subject සේල් වලටත් Backticks (  ) ලකුණු නිවැරදිව දැම්මා */}
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
        </div>
        {/* results-core-split-layout END */}

        {/* 💬 🔗 MODAL POPUP MESSAGE LAYER */}
        {/* 💬 🔗 MODAL POPUP MESSAGE LAYER */}
        {showPopup && (
          <div className="custom-modal-blur-overlay">
            <div className="custom-secure-popup-box">
              <div className="popup-success-icon-shield">
                <FaCircleCheck />
              </div>

              {/* 🇬🇧 Popup එකේ විස්තර ඉංග්‍රීසි භාෂාවට හරවන ලදී */}
              <h4>Records Submitted Successfully!</h4>
              <p>
                Your results have been sent for verification and will be live on
                the ledger shortly. Please take a moment to share your valuable
                feedback and thoughts about our classes on our main commentary
                board.
              </p>

              <div className="popup-action-row-buttons">
                {/* <a href="/comments" className="popup-redirect-btn"><FaCommentDots /> Go to Comments Board</a> */}

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
