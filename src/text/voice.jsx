return (
    <div className="student-voices-wrapper" style={{ padding: "40px 0", width: "100%", fontFamily: "inherit" }}>
      
      {/* ==================== 📊 TOP CONTAINER: LIVE COUNTER BAR ==================== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h2 style={{ color: "#1a0a54", margin: 0, fontWeight: "800", display: "flex", alignItems: "center", gap: "10px", fontSize: "1.6rem" }}>
            <FaBullhorn style={{ color: "#ff4b2b" }} /> Student Voices
          </h2>
          <p style={{ color: "#666", fontSize: "0.85rem", margin: "5px 0 0" }}>
            What our verified students say about their academic journey with us [INDEX 4, 51].
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* 💬 ALL COMMENTS COUNT BADGE */}
          <div style={{ background: "#eef2ff", color: "#4b6bfb", padding: "10px 18px", borderRadius: "12px", fontWeight: "800", fontSize: "0.9rem", border: "1px solid #d9e8ff" }}>
            💬 Total Stories Shared: {notices.length}
          </div>

          {/* 📣 ADD NEW COMMENT BUTTON */}
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            style={{ background: "#ff4b2b", color: "white", border: "none", padding: "10px 20px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 12px rgba(255,75,43,0.2)" }}
          >
            <FaPlus /> Share Your Voice
          </button>
        </div>
      </div>

      {/* ==================== 🎛️ CENTER CONTAINER: DYNAMIC TEACHER FILTERS ==================== */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "25px", flexWrap: "wrap", background: "#f4f7ff", padding: "8px", borderRadius: "14px", border: "1px solid #e2e8f0", width: "fit-content" }}>
        <button type="button" onClick={() => setActiveFilter("ALL")} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer", background: activeFilter === "ALL" ? "#1a0a54" : "transparent", color: activeFilter === "ALL" ? "white" : "#555" }}>All Voices</button>
        <button type="button" onClick={() => setActiveFilter("maths")} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer", background: activeFilter === "maths" ? "#1a0a54" : "transparent", color: activeFilter === "maths" ? "white" : "#555" }}>Janaka Sir (Maths)</button>
        <button type="button" onClick={() => setActiveFilter("science")} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer", background: activeFilter === "science" ? "#1a0a54" : "transparent", color: activeFilter === "science" ? "white" : "#555" }}>Amila Sir (Science)</button>
        <button type="button" onClick={() => setActiveFilter("english")} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer", background: activeFilter === "english" ? "#1a0a54" : "transparent", color: activeFilter === "english" ? "white" : "#555" }}>English Class</button>
      </div>
      {/* ==================== 📄 CONTENT ZONE: COMMENTS CONTAINER GRID ==================== */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#1a0a54", fontWeight: "bold" }}>🔄 Loading Live Student Voices...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {filteredNotices.length > 0 ? (
            filteredNotices.map((item) => (
              <div 
                key={item.id} 
                className="comment-box-card"
                style={{ background: "white", padding: "25px", borderRadius: "20px", border: "1px solid #edf2f9", boxShadow: "0 4px 15px rgba(0,0,0,0.01)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "15px", position: "relative", textAlign: "left" }}
              >
                <div>
                  {/* Card Header Info */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ fontSize: "2.2rem", color: "#cbd5e1" }}><FaUserCircle /></div>
                      <div>
                        <h4 style={{ margin: 0, color: "#1a0a54", fontWeight: "800", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
                          {item.studentName} 
                          <span style={{ color: "#2ecc71", display: "flex", alignItems: "center" }}><FaCheckCircle style={{ fontSize: "0.85rem" }} /></span>
                        </h4>
                        <small style={{ color: "#777", display: "block", marginTop: "3px", fontWeight: "bold" }}>O/L Batch: {item.olBatch}</small>
                      </div>
                    </div>
                  </div>

                  {/* Main Voice Comment Text */}
                  <p style={{ margin: 0, color: "#444", fontSize: "0.88rem", lineHeight: "1.6", fontWeight: "500", fontStyle: "italic" }}>
                    "{item.voiceText}"
                  </p>
                </div>

                {/* Card Footer: Teacher Tags & Premium Like Button */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px", marginTop: "5px" }}>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {item.selectedTeachers && item.selectedTeachers.map((t, i) => (
                      <span key={i} style={{ background: t === "maths" ? "#eef2ff" : t === "science" ? "#fff0f0" : "#e8f8f5", color: t === "maths" ? "#4b6bfb" : t === "science" ? "#ff4b2b" : "#2ecc71", padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: "bold" }}>
                        {t === "maths" ? "Maths" : t === "science" ? "Science" : "English"}
                      </span>
                    ))}
                  </div>

                  {/* ❤️ HIGH-TECH PULSE LIKE BUTTON */}
                  <button
                    type="button"
                    onClick={() => handleLikeIncrement(item.id)}
                    style={{ background: "#fff0f2", color: "#ff4b2b", border: "none", padding: "6px 12px", borderRadius: "10px", fontWeight: "bold", fontSize: "0.8rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#ffdce2")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#fff0f2")}
                  >
                    <FaHeartPulse className="pulse-animation" /> 
                    <span>{item.likesCount}</span>
                  </button>
                  </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#aaa", background: "#f8faff", borderRadius: "15px", border: "1px dashed #ccc" }}>
              No comments shared for this category yet. [INDEX 51]
            </div>
          )}
        </div>
      )}
      {/* ==================== 🚨 THE POPUP FORM DYNAMIC OVERLAY (MODAL POPUP) ==================== */}
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(26, 10, 84, 0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99999 }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "24px", maxWidth: "450px", width: "90%", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", position: "relative", textAlign: "left" }}>
            
            {/* Close Cross Button */}
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: "20px", right: "20px", background: "#f1f5f9", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", color: "#555" }}>
              <FaXmark />
            </button>

            <h3 style={{ color: "#1a0a54", margin: "0 0 5px", fontWeight: "800", fontSize: "1.3rem" }}>📣 Share Your Experience</h3>
            <p style={{ color: "#666", fontSize: "0.8rem", margin: "0 0 20px" }}>ඔබේ පන්ති අත්දැකීම අනෙකුත් සිසුන් සහ දෙමාපියන් සමඟ ලයිව් බෙදා ගන්න [INDEX 51].</p>

            {formError && <div style={{ background: "#fdedec", borderLeft: "4px solid #e74c3c", color: "#c0392b", padding: "10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "15px" }}>⚠️ {formError}</div>}

            <form onSubmit={handleVoiceSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {/* Input Name */}
              <div className="input-group">
                <label style={{ fontWeight: "600", fontSize: "0.8rem", color: "#1a0a54", display: "block", marginBottom: "5px" }}>Your Full Name</label>
                <input type="text" name="studentName" placeholder="ex: Lakshan Sandaruwan" required value={formData.studentName} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "0.85rem" }} />
              </div>

              {/* Dropdown Batch */}
              <div className="input-group">
                <label style={{ fontWeight: "600", fontSize: "0.8rem", color: "#1a0a54", display: "block", marginBottom: "5px" }}>O/L Exam Batch</label>
                <select name="olBatch" value={formData.olBatch} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontWeight: "bold", background: "white", fontSize: "0.85rem" }}>
                  <option value="2024">2024 O/L</option>
                  <option value="2025">2025 O/L</option>
                  <option value="2026">2026 O/L</option>
                  <option value="2027">2027 O/L</option>
                </select>
              </div>

              {/* Multiple Checkboxes Block */}
              <div className="input-group">
                <label style={{ fontWeight: "600", fontSize: "0.8rem", color: "#1a0a54", display: "block", marginBottom: "5px" }}>Select Attending Classes (Multiple)</label>
                <div style={{ display: "flex", gap: "15px", background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.82rem", fontWeight: "bold", color: "#4b6bfb", cursor: "pointer" }}>
                    <input type="checkbox" name="maths" checked={formData.maths} onChange={handleInputChange} /> Maths
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.82rem", fontWeight: "bold", color: "#ff4b2b", cursor: "pointer" }}>
                    <input type="checkbox" name="science" checked={formData.science} onChange={handleInputChange} /> Science
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.82rem", fontWeight: "bold", color: "#2ecc71", cursor: "pointer" }}>
                    <input type="checkbox" name="english" checked={formData.english} onChange={handleInputChange} /> English
                  </label>
                </div>
              </div>

              {/* Textarea Comment */}
              <div className="input-group">
                <label style={{ fontWeight: "600", fontSize: "0.8rem", color: "#1a0a54", display: "block", marginBottom: "5px" }}>Your Message / Review</label>
                <textarea name="voiceText" rows="4" placeholder="පන්තිය ගැන ඔයාගේ අවංක අදහස මෙතන ලියන්න මචං..." required value={formData.voiceText} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "0.85rem", resize: "none", lineHeight: "1.4", fontFamily: "inherit" }} />
              </div>

              <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "12px", background: "#ff4b2b", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 12px rgba(255,75,43,0.2)", marginTop: "5px" }}>
                {isSubmitting ? "⏳ Publishing Live..." : "📣 Broadcast My Voice"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 👑 KEYFRAMES ANIMATIONS CSS CONTROL */}
      <style>{`
        @keyframes popupFade {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .pulse-animation {
          animation: heartBeat 1.2s infinite ease-in-out;
        }
        @keyframes heartBeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>

    </div>
  );
};

export default StudentVoicesComponent;