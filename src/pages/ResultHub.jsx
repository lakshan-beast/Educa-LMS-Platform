import { useState, useEffect } from "react";
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
  FaSchool,
  FaAward,
  FaPaperPlane,
  FaHeart,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa6";

const ResultsHub = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  // const [fallingLetters, setFallingLetters] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    indexNumber: "",
    schoolName: "",
    mathsGrade: "A",
    scienceGrade: "A",
    englishGrade: "A",
    overallResult: "",
    studentComment: "",
    avatarSeed: "1",
  });

  useEffect(() => {
    // 📡 2025 O/L සජීවී සර්වර් ස්ට්‍රීම් එක මචං [INDEX 51]
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

    // 🌧️ A සහ B අකුරු වැස්සේ එන්ජිම මචං [INDEX 4]
    // const letters = ["A", "B", "A", "A", "B"];
    // const generatedParticles = Array.from({ length: 25 }).map((_, i) => ({
    //   id: i,
    //   text: letters[Math.floor(Math.random() * letters.length)],
    //   left: Math.random() * 100 + "%",
    //   delay: Math.random() * 5 + "s",
    //   duration: Math.random() * 4 + 3 + "s",
    //   fontSize: Math.random() * 1.5 + 1 + "rem",
    // }));
    // setFallingLetters(generatedParticles);

    // 🌧️ වඩාත් ආරක්ෂිත A සහ B අකුරු වැස්සේ එන්ජිම
    // const letters = ["A", "B"];
    // const generatedParticles = Array.from({ length: 25 }).map((_, i) => {
    //   const randomLetter = letters[Math.floor(Math.random() * letters.length)] || "A"; // Default එකක් එකතු කළා
    //   return {
    //     id: i,
    //     text: randomLetter,
    //     left: `${ Math.random() * 100}%`,
    //     delay: `${Math.random() * 5}s`,
    //     duration: `${Math.random() * 4 + 3}s`,
    //     fontSize: `${Math.random() * 1.5 + 1}rem`
    //   };
    // });
    // setFallingLetters(generatedParticles);

    // 🔏 RIGHT-CLICK & DEVTOOLS (F12) සහමුලින්ම ලොක් කිරීම [INDEX 4]
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key ===
          "F12"(e.ctrlKey && e.shiftKey && e.key === "I" && e.key === "J") ||
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

  // ❤️ REAL-TIME CLOUD LIKE ENGINE [INDEX 51]
  const handleLikeAppreciation = async (docId) => {
    try {
      const docRef = doc(db, "ol_results_2025", docId);
      await updateDoc(docRef, { likes: increment(1) });
    } catch (err) {
      console.error("Like Increment Error:", err);
    }
  };

  const handleSubmitResult = async (e) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.indexNumber ||
      !form.schoolName ||
      !form.studentComment ||
      !form.overallResult
    ) {
      return alert(
        "Please populate all cryptographic validation layers first!",
      );
    }

    try {
      await addDoc(collection(db, "ol_results_2025"), {
        ...form,
        status: "approved",
        likes: 0,
        createdAt: new Date().toISOString(),
      });
      alert(
        "Verification successful! Your results will be live after the faculty audit.",
      );
      setForm({
        fullName: "",
        indexNumber: "",
        schoolName: "",
        mathsGrade: "A",
        scienceGrade: "A",
        englishGrade: "A",
        overallResult: "",
        studentComment: "",
        avatarSeed: "1",
      });
    } catch (err) {
      console.error("Cloud Save Error:", err);
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
    if (activeFilter === "ENGLISH_A") return item.scienceGrade === "A";
    return true;
  });

  return (
    <div className="secure-results-wrapper-shell page-container">
      {/* 🌧️ BACKGROUND RAIN CONTAINER */}
      {/* <div className="falling-grades-matrix-backdrop">
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
      </div> */}

      <div className="system-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link className="back-btn" to="/">
            <FaArrowLeft /> Back to Home
          </Link>
          <Link className="back-btn" to="/dashboard">
            Back to Dashboard <FaArrowRight />
          </Link>
        </div>

        <div className="results-header-block">
          <h2>
            <FaShieldHalved /> Verified O/L <span>Honors Registry</span>
          </h2>
          <p>
            Cryptographically protected institutional ledger monitoring
            structural subject competencies.
          </p>
        </div>

        <div className="results-core-split-layout">
          {/* FORM SIDE */}
          <form
            onSubmit={handleSubmitResult}
            className="secure-submission-form">
            <h3>Submit O/L Records</h3>

            <div className="form-field-row">
              <label>Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Imesh Lakshan"
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
              />
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
                </select>
              </div>
            </div>

            <div className="form-field-row">
              <label>Select Profile Avatar</label>
              <select
                value={form.avatarSeed}
                onChange={(e) =>
                  setForm({ ...form, avatarSeed: e.target.value })
                }>
                <option value="1">👦 Boy Avatar</option>
                <option value="2">👧 Girl Avatar</option>
              </select>
            </div>

            <div className="form-field-row">
              <label>Testimonial Comment</label>
              <textarea
                value={form.studentComment}
                onChange={(e) =>
                  setForm({ ...form, studentComment: e.target.value })
                }
                placeholder="Write your genuine review..."
                rows="4"></textarea>
            </div>

            <button type="submit" className="submit-verify-btn">
              <FaPaperPlane /> Verify & Submit Records
            </button>
          </form>

          {/* DISPLAY SIDE */}
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

            <div className="secure-cards-grid-isolation-shield">
              {isLoading ? (
                <div className="vault-loading-center">
                  Streaming Verified Cloud Records...
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="vault-empty-lock">
                  🔒 Secured Faculty Cluster Node Encrypted.
                </div>
              ) : (
                filteredResults.map((student) => {
                  const is9A =
                    student.overallResult?.toUpperCase().replace(/\s/g, "") ===
                    "9A";

                  return (
                    <div
                      key={student.docId}
                      className={
                        "secure-student-honors-card " +
                        (is9A ? "elite-9a-shimmer" : "")
                      }>
                      <div className="anti-screenshot-watermark">
                        PROPRIETARY PROPERTY - COPYING PROHIBITED
                      </div>

                      <div className="card-top-profile-row">
                        <img
                          src={"https://dicebear.com" + student.avatarSeed}
                          alt="Student"
                          className="secure-avatar-img"
                        />
                        <div className="profile-meta">
                          <h4>{student.fullName}</h4>
                          <small>
                            <FaSchool /> {student.schoolName}
                          </small>
                          <p>ID: {maskIndexNumber(student.indexNumber)}</p>
                        </div>
                        {is9A && (
                          <div className="gold-medal-tag">
                            <FaAward /> 9A ELITE
                          </div>
                        )}
                      </div>

                      <div className="triple-subject-cards-row">
                        <div
                          className={
                            "subject-mini-card grade-" +
                            student.mathsGrade?.toLowerCase()
                          }>
                          <span className="sub-label">Maths</span>
                          <strong className="sub-grade">
                            {student.mathsGrade}
                          </strong>
                        </div>
                        <div
                          className={
                            "subject-mini-card grade-" +
                            student.scienceGrade?.toLowerCase()
                          }>
                          <span className="sub-label">Science</span>
                          <strong className="sub-grade">
                            {student.scienceGrade}
                          </strong>
                        </div>
                        <div
                          className={
                            "subject-mini-card grade-" +
                            student.englishGrade?.toLowerCase()
                          }>
                          <span className="sub-label">English</span>
                          <strong className="sub-grade">
                            {student.englishGrade}
                          </strong>
                        </div>
                      </div>

                      <p className="student-testimonial-quote">
                        "{student.studentComment}"
                      </p>

                      <div className="faculty-badge-footer">
                        <span>
                          Summary Ledger:{" "}
                          <strong>
                            {student.overallResult?.toUpperCase()}
                          </strong>
                        </span>

                        <button
                          onClick={() => handleLikeAppreciation(student.docId)}
                          className="card-live-like-trigger-btn">
                          <FaHeart /> <span>{student.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHub;
