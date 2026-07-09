//  
// return (
// <div className="vault-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
// <div className="students-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "20px", borderRadius: "12px" }}>

// <h1 style={{ margin: 0, color: "#001b42", fontSize: "1.5rem" }}>{currentFacultySubject} Faculty Registry
// <p style={{ margin: "5px 0 0 0", color: "#8b949e", fontSize: "0.9rem" }}>Secure subject-isolated student database core [INDEX 4].

// <div className="search-box-bar" style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f4f6fa", padding: "10px 15px", borderRadius: "8px", width: "300px" }}>
// <FaMagnifyingGlass style={{ color: "#8b949e" }} />
// <input type="text" placeholder="Search profile..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: "none", background: "none", outline: "none", width: "100%" }} />

// <div className="master-filter-control-dock" style={{ display: "flex", gap: "30px", background: "white", padding: "15px 20px", borderRadius: "12px" }}>
// <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// Grade:
// {["10", "11"].map(g => (
// <button key={g} onClick={() => { setActiveGrade(g); setSelectedStudent(null); }} style={{ padding: "6px 14px", borderRadius: "20px", border: "none", background: activeGrade === g ? "#0056ff" : "#f4f6fa", color: activeGrade === g ? "white" : "#001b42", cursor: "pointer" }}>Grade {g}
// ))}

// <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "25px", alignItems: "start" }}>
// <div className="left-table-shield" style={{ background: "white", borderRadius: "12px", padding: "20px" }}>
// {isLoading ? (
// Syncing Cloud Ledger...
// ) : filteredStudents.length === 0 ? (
// No matching records allocated.
// ) : (
// )}