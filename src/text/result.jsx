// {/* 📋 RESPONSIVE TABLE SHIELD */}
// <div className="secure-table-isolation-shield">
//   {isLoading ? (
//     <div className="vault-loading-center">Streaming Verified Cloud Records...</div>
//   ) : filteredResults.length === 0 ? (
//     <div className="vault-empty-lock">🔒 Secured Faculty Cluster Node Encrypted.</div>
//   ) : (
//     <div className="table-responsive-wrapper">
//       <table className="secure-honors-ledger-table">
//         <thead>
//           <tr>
//             <th>Full Name & Index</th>
//             <th>School</th>
//             <th>Overall</th>
//             <th>📐 Maths</th>
//             <th>🔬 Science</th>
//             <th>🔤 English</th>
//             <th>Appreciate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredResults.map((student) => {
//             const is9A = student.overallResult?.toUpperCase().replace(/\s/g, "") === "9A";

//             return (
//               <tr key={student.docId} className={is9A ? "elite-9a-gold-row-shimmer" : ""}>
//                 <td>
//                   {/* 1. මඟහැරුණු ආරම්භක div ටැග් එක මෙතනට දැම්මා */}
                  
//                     <span className="student-name-text">{student.fullName}</span>
//                     <small className="student-index-subtext">ID: {maskIndexNumber(student.indexNumber)}</small>
//                   </div>
//                 </td>
//                 <td><span className="table-school-tag">{student.schoolName}</span></td>
//                 <td>
//                   {/* 2. මෙතනට Backticks (  ) ලකුණු නිවැරදිව එකතු කළා */}
//                   <span className={table-overall-badge ${is9A ? "gold-medal-text" : ""}}>
//                     {is9A ? "🏆 9A ELITE" : student.overallResult?.toUpperCase()}
//                   </span>
//                 </td>
//                 {/* 3. මේ subject සේල් වලටත් Backticks (  ) ලකුණු නිවැරදිව දැම්මා */}
//                 <td className={table-grade-cell grade-${student.mathsGrade?.toLowerCase()}}><strong>{student.mathsGrade}</strong></td>
//                 <td className={table-grade-cell grade-${student.scienceGrade?.toLowerCase()}}><strong>{student.scienceGrade}</strong></td>
//                 <td className={table-grade-cell grade-${student.englishGrade?.toLowerCase()}}><strong>{student.englishGrade}</strong></td>
//                 <td>
//                   <button onClick={() => handleLikeAppreciation(student.docId)} className="table-like-trigger-btn">
//                     <FaHeart /> <span>{student.likes || 0}</span>
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   )}
// </div>
// </div>

// </div> {/* results-core-split-layout END */}






return (
    <div className="secure-results-wrapper-shell">
      
      {/* 🌧️ BACKGROUND ANIMATION */}
      <div className="falling-grades-matrix-backdrop">
        {fallingLetters.map((p) => (
          <div key={p.id} className={"falling-grade-token token-" + p.text.toLowerCase()} style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, fontSize: p.fontSize }}>
            {p.text}
          </div>
        ))}
      </div>

      <div className="results-header-block">
        <h2><FaShieldHalved /> Verified O/L <span>Honors Portal</span></h2>
        <p>සජීවීව යාවත්කාලීන වන, ආරක්ෂිත සහ නිල සාමාන්‍ය පෙළ විශිෂ්ටයන්ගේ නාමාවලිය.</p>
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
          <small>A: {analytics.amilaMathsA} | B: {analytics.amilaMathsB}</small>
        </div>
        <div className="analytic-mini-card teacher-card">
          <span>🔬 Nimal Sir (Science)</span>
          <small>A: {analytics.nimalScienceA} | B: {analytics.nimalScienceB}</small>
        </div>
      </div>

      <div className="results-core-split-layout">
        
        {/* FORM SIDE */}
        <form onSubmit={handleSubmitResult} className="secure-submission-form styled form ">
          <h3>Submit O/L Records</h3>
          
          <div className="form-field-row">
            <label>Full Name</label>
            <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="e.g. Imesh Lakshan" required />
          </div>

          <div className="form-field-row">
            <label>Index Number</label>
            <input type="text" value={form.indexNumber} onChange={(e) => setForm({ ...form, indexNumber: e.target.value })} placeholder="e.g. 6089412" required />
          </div>
          <div className="form-field-row">
            <label>🏫 Attended School Name</label>
            <input type="text" value={form.schoolName} onChange={(e) => setForm({ ...form, schoolName: e.target.value })} placeholder="e.g. Royal College" required />
          </div>

          <div className="form-field-row">
            <label>🏆 Overall Examination Result</label>
            <input type="text" value={form.overallResult} onChange={(e) => setForm({ ...form, overallResult: e.target.value })} placeholder="e.g. 9A or 8A, 1B" required />
          </div>

          {/* TEACHERS SELECTION DROPDOWNS */}
          <div className="form-field-row">
            <label>📐 Maths Teacher Name</label>
            <select value={form.mathsTeacher} onChange={(e) => setForm({ ...form, mathsTeacher: e.target.value })}>
              <option value="Amila Sir">Amila Sir</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-field-row">
            <label>🔬 Science Teacher Name</label>
            <select value={form.scienceTeacher} onChange={(e) => setForm({ ...form, scienceTeacher: e.target.value })}>
              <option value="Nimal Sir">Nimal Sir</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="grades-selector-triple-grid">
          <div className="grade-drop"><label>📐 Maths</label><select value={form.mathsGrade} onChange={(e) => setForm({ ...form, mathsGrade: e.target.value })}><option>A</option><option>B</option><option>C</option><option>S</option><option>F</option></select></div>
            <div className="grade-drop"><label>🔬 Science</label><select value={form.scienceGrade} onChange={(e) => setForm({ ...form, scienceGrade: e.target.value })}><option>A</option><option>B</option><option>C</option><option>S</option><option>F</option></select></div>
            <div className="grade-drop"><label>🔤 English</label><select value={form.englishGrade} onChange={(e) => setForm({ ...form, englishGrade: e.target.value })}><option>A</option><option>B</option><option>C</option><option>S</option><option>F</option></select></div>
          </div>

          <button type="submit" className="submit-verify-btn" disabled={isUploading}>
            <FaPaperPlane /> {isUploading ? "Uploading..." : "Verify & Submit Records"}
          </button>
        </form>

        {/* DISPLAY SIDE (TABLE LAYOUT) */}
        <div className="secure-results-display-terminal">
          <div className="subject-matrix-tabs">
            <button onClick={() => setActiveFilter("ALL")} className={activeFilter === "ALL" ? "active" : ""}>All Honors</button>
            <button onClick={() => setActiveFilter("9A")} className={activeFilter === "9A" ? "active" : ""}>⭐️ 9A Elite</button>
            <button onClick={() => setActiveFilter("MATHS_A")} className={activeFilter === "MATHS_A" ? "active" : ""}>Maths A</button>
            <button onClick={() => setActiveFilter("SCIENCE_A")} className={activeFilter === "SCIENCE_A" ? "active" : ""}>Science A</button>
          </div>

          {/* 📋 RESPONSIVE TABLE SHIELD */}
          <div className="secure-table-isolation-shield">
            {isLoading ? (
              <div className="vault-loading-center">Streaming Verified Cloud Records...</div>
            ) : filteredResults.length === 0 ? (
              <div className="vault-empty-lock">🔒 Secured Faculty Cluster Node Encrypted.</div>
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
                      const is9A = student.overallResult?.toUpperCase().replace(/\s/g, "") === "9A";

                      return (
                        <tr key={student.docId} className={is9A ? "elite-9a-gold-row-shimmer" : ""}>
                          <td>
                            {/* 🛠️ නිවැරදි කළ තැන: ආරම්භක div එක එකතු කළා */}
                            
                              <span className="student-name-text">{student.fullName}</span>
                              <small className="student-index-subtext">ID: {maskIndexNumber(student.indexNumber)}</small>
                            </div>
                          </td>
                          <td><span className="table-school-tag">{student.schoolName}</span></td>
                          <td>
                            {/* 🛠️ නිවැරදි කළ තැන: Backticks (  ) එකතු කළා */}
                            <span className={table-overall-badge ${is9A ? "gold-medal-text" : ""}`}>
                              {is9A ? "🏆 9A ELITE" : student.overallResult?.toUpperCase()}
                            </span>
                            </td>
                          {/* 🛠️ නිවැරදි කළ තැන: Backticks (  ) එකතු කළා */}
                          <td className={table-grade-cell grade-${student.mathsGrade?.toLowerCase()}}><strong>{student.mathsGrade}</strong></td>
                          <td className={table-grade-cell grade-${student.scienceGrade?.toLowerCase()}}><strong>{student.scienceGrade}</strong></td>
                          <td className={table-grade-cell grade-${student.englishGrade?.toLowerCase()}`}><strong>{student.englishGrade}</strong></td>
                          <td>
                            <button onClick={() => handleLikeAppreciation(student.docId)} className="table-like-trigger-btn">
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

      </div> {/* results-core-split-layout END */}

      {/* 💬 🔗 MODAL POPUP MESSAGE LAYER */}
      {showPopup && (
        <div className="custom-modal-blur-overlay">
          <div className="custom-secure-popup-box">
            <div className="popup-success-icon-shield"><FaCircleCheck /></div>
            <h4>ප්‍රතිඵල සාර්ථකව ඇතුළත් කළා!</h4>
            <p>ඔබේ ප්‍රතිඵල Verification එකෙන් පසුව සජීවී Ledger එකට එකතු වේවි. සර්ලාගේ පන්තිය ගැන ඔයාගේ වටිනා අදහස (Comment) අපේ ප්‍රධාන පුවරුවේ සටහන් කරන්න පහත බටන් එකෙන් යන්න.</p>
            
            <div className="popup-action-row-buttons">
              <a href="/comments" className="popup-redirect-btn"><FaCommentDots /> Go to Comments Board</a>
              <button onClick={() => setShowPopup(false)} className="popup-close-btn">Close Window</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ResultsHub;