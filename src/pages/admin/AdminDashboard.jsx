import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
  //   getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import {
  FaUsers,
  FaBullhorn,
  FaFilePdf,
  //   FaChartLine,
  FaVideo,
  FaXmark,
  FaClock,
  FaCalendarDays,
  FaGraduationCap,
  FaPenToSquare,
  FaHourglassHalf,
  //   FaCircleExclamation,
  FaBolt,
} from "react-icons/fa6";

const AdminDashboard = () => {
  const { subject } = useParams();
  const currentFacultySubject = subject ? subject.toLowerCase() : "maths";

  // 📊 CLOUD LEDGER METRICS STATES
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalNotices, setTotalNotices] = useState(0);
  const [totalPapers, setTotalPapers] = useState(0);
  const [genderData, setGenderData] = useState([
    { name: "Boys", value: 0 },
    { name: "Girls", value: 0 },
  ]);
  const [resourceData, setResourceData] = useState([]);
  const [todayClasses, setTodayClasses] = useState([]);
  const [smartReminder, setSmartReminder] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 🎯 TRIPLE EXAM TRACKER STATES
  const [exams, setExams] = useState([]);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examForm, setEditExamForm] = useState({
    title: "",
    category: "class-exam", // class-exam | school-term | national-ol
    targetDate: "",
    targetTime: "",
  });

  // ⏱️ REAL-TIME CLOCK ENGINE (For Live Countdowns)
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔄 LIVE CLOUD HYDRATION MATRIX (Subject-Isolated Content Gating) [INDEX 4, 51]
  useEffect(() => {
    if (!currentFacultySubject) return;
    setIsLoading(true);
    
    // A. Students Stream & Gender Demographics Calculator [INDEX 51]
    const studentQuery = query(
      collection(db, "students"),
      where(currentFacultySubject, "==", true),
    );
    const unsubStudents = onSnapshot(studentQuery, (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      setTotalStudents(list.length);

      let boys = 0,
        girls = 0;
      list.forEach((s) => {
        if (
          s.gender?.toLowerCase() === "male" ||
          s.gender?.toLowerCase() === "boy"
        )
          boys++;
        else girls++;
      });
      setGenderData([
        { name: "Boys", value: boys },
        { name: "Girls", value: girls },
      ]);
    });

    // B. Notices Stream [INDEX 51]
    const noticeQuery = query(
      collection(db, "class_notices"),
      where("subject", "==", currentFacultySubject),
    );
    const unsubNotices = onSnapshot(noticeQuery, (snapshot) =>
      setTotalNotices(snapshot.size),
    );

    // C. Resource Distribution Tracker (Bar Chart Architecture) [INDEX 4, 51]
    const paperQuery = query(
      collection(db, "academic_materials"),
      where("subject", "==", currentFacultySubject),
    );
    const unsubPapers = onSnapshot(paperQuery, (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      setTotalPapers(list.length);

      let tutes = 0,
        papers = 0,
        formulas = 0;
      //   list.forEach((r) => {
      //     if ((row) => r.category === "classTutes") tutes++;
      //     else if (r.category === "pastPapers") papers++;
      //     else formulas++;
      //   });

      list.forEach((r) => {
        if (r.category === "classTutes") tutes++;
        else if (r.category === "pastPapers") papers++;
        else formulas++;
      });
      setResourceData([
        { name: "Tutes", count: tutes },
        { name: "Past Papers", count: papers },
        { name: "Formulas", count: formulas },
      ]);
    });

    // D. Today's Schedule Operational Pipeline [INDEX 4, 51]
    const scheduleQuery = query(
      collection(db, "schedules"),
      where("subject", "==", currentFacultySubject),
    );
    const unsubSchedules = onSnapshot(scheduleQuery, (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      const todayStr = new Date().toISOString().split("T")[0];

      // Filter classes mapped for today
      const mappedToday = list.filter(
        (c) => c.targetDateTime && c.targetDateTime.startsWith(todayStr),
      );
      setTodayClasses(mappedToday);

      // Smart Administrative Notification Module [INDEX 4]
      if (mappedToday.length > 0) {
        const nextClass = mappedToday[0];
        setSmartReminder(
          `⚠️ Operation Link: Grade ${nextClass.grade} is slotted for today. Verify terminal links!`,
        );
      } else {
        setSmartReminder(
          "🔔 System Clear: No core pipeline classes scheduled for the current terminal cycle.",
        );
      }
    });

    // E. Triple Exam Live Ledger Stream [INDEX 51]
    const examQuery = query(
      collection(db, "dashboard_exams"),
      where("subject", "==", currentFacultySubject),
    );
    const unsubExams = onSnapshot(examQuery, (snapshot) => {
      setExams(snapshot.docs.map((doc) => doc.data()));
    });

    // return () => {
    //   unsubStudents();
    //   unsubNotices();
    //   unsubPapers();
    //   unsubSchedules();
    //   unsubExams();
    // };

    // 👑 FIXED: සියලුම Cloud Listeners සක්‍රීය වුණු සැනින් Loading එක නවතා දමයි! [INDEX 4]
    const delayFlag = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(delayFlag); // 👈 මේක අර පැරණි return () => { ... } එක ඇතුළට දාන්න මචං
      unsubStudents();
      unsubNotices();
      unsubPapers();
      unsubSchedules();
      unsubExams();
    };
  }, [currentFacultySubject]);
  // ⏱️ 2. HIGH-PERFORMANCE LIVE COUNTDOWN CALCULATOR ENGINE
  const calculateLiveClock = (targetDateStr, targetTimeStr) => {
    if (!targetDateStr) return "Pending Framework";

    // Combine Date and Time components safely
    const timeCombo = targetTimeStr ? `T${targetTimeStr}:00` : "T00:00:00";
    const targetTimestamp = new Date(`${targetDateStr}${timeCombo}`);
    const operationalDifference = targetTimestamp - currentTime;

    if (operationalDifference <= 0) return "Term Session Commenced";

    const days = Math.floor(operationalDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (operationalDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (operationalDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((operationalDifference % (1000 * 60)) / 1000);

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  // 📝 3. TRIPLE EXAM MUTATION CONTROLLER
  const handleExamInputChange = (e) => {
    const { name, value } = e.target;
    setEditExamForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExamSubmit = async (e) => {
    e.preventDefault();
    if (!examForm.title.trim() || !examForm.targetDate) return;

    const examCloudPayload = {
      id: "EXM-" + Date.now().toString().slice(-6),
      title: examForm.title.trim(),
      category: examForm.category,
      targetDate: examForm.targetDate,
      targetTime: examForm.targetTime || "00:00",
      subject: currentFacultySubject,
      createdAt: new Date().toISOString(),
    };

    try {
      // 🚀 Write directly to dashboard_exams collection
      await addDoc(collection(db, "dashboard_exams"), examCloudPayload);
      setIsExamModalOpen(false);
      setEditExamForm({
        title: "",
        category: "class-exam",
        targetDate: "",
        targetTime: "",
      });
    } catch (err) {
      console.error("Cloud Exam Sync Mutation Failure:", err);
    }
  };

  const COLORS = ["#0056ff", "#ff4bb4"];

  // 📅 MINI EVENT CALENDAR ENGINE LOGICS
  const [calendarDate, setCalendarDate] = useState(new Date());

  // වත්මන් මාසයේ දින ගණන සහ ආරම්භක දිනය සෙවීමේ ශ්‍රිතයන් [4]
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(calendarDate);
  const firstDayIndex = getFirstDayOfMonth(calendarDate);
  const calendarCells = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - firstDayIndex + 1;
    return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
  });

  // 🚀 QUICK LINKS & UPCOMING ACTIVITIES VAULT STATES
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ title: "", date: "" });
  const [isActivityFormOpen, setIsActivityFormOpen] = useState(false);

  // සජීවීව Activities Cloud Listener එක ක්‍රියාත්මක කිරීම [51]
  useEffect(() => {
    if (!currentFacultySubject) return;
    const actQuery = query(
      collection(db, "dashboard_activities"),
      where("subject", "==", currentFacultySubject),
    );
    const unsubscribe = onSnapshot(actQuery, (snapshot) => {
      setActivities(
        snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() })),
      );
    });
    return () => unsubscribe();
  }, [currentFacultySubject]);

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    if (!newActivity.title.trim() || !newActivity.date) return;

    try {
      await addDoc(collection(db, "dashboard_activities"), {
        id: "ACT-" + Date.now().toString().slice(-5),
        title: newActivity.title.trim(),
        date: newActivity.date,
        subject: currentFacultySubject,
        createdAt: new Date().toISOString(),
      });
      setNewActivity({ title: "", date: "" });
      setIsActivityFormOpen(false);
    } catch (err) {
      console.error("Cloud Activity Sync Error:", err);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          color: "#001b42",
          fontWeight: "bold",
        }}>
        Streaming Unified Faculty Data Cubes from Cloud Ledger...
      </div>
    );
  }

  return (
    <div
      className="admin-analytics-core-dashboard"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        animation: "fadeIn 0.4s ease",
        width: "100%",
        marginTop: "350px",
      }}>
      {/* 👑 1. TOP DYNAMIC WELCOME BANNER & REMINDER DOCK */}
      <div
        className="dashboard-top-alert-matrix"
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #001b42 0%, #002b66 100%)",
            color: "white",
            padding: "25px 30px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}>
          <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: "bold" }}>
            Welcome to {subject?.toUpperCase()} Operational Center
          </h1>
          <p style={{ margin: "5px 0 0 0", opacity: 0.8, fontSize: "0.9rem" }}>
            Monitor live operations, schedule configurations, and broadcast
            cluster indexes.
          </p>
        </div>

        {/* 🔔 SMART ADMINISTRATIVE REMINDER BANNER */}
        <div
          style={{
            background: todayClasses.length > 0 ? "#fff5f5" : "#f4f7ff",
            borderLeft:
              todayClasses.length > 0
                ? "4px solid #ff4b4b"
                : "4px solid #0056ff",
            padding: "12px 20px",
            borderRadius: "0 8px 8px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.85rem",
            fontWeight: "600",
            color: todayClasses.length > 0 ? "#991b1b" : "#1e1b4b",
          }}>
          <FaBolt
            className={todayClasses.length > 0 ? "pulse-icon-live" : ""}
          />
          <span>{smartReminder}</span>
        </div>
      </div>

      {/* 🎛️ 2. QUICK MANAGEMENT SHORTCUT HUB & ACTIONS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "15px",
        }}>
        <button
          onClick={() => setIsExamModalOpen(true)}
          style={{
            background: "white",
            border: "1px solid #eef2ff",
            padding: "15px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            color: "#001b42",
            transition: "0.2s",
          }}
          className="shortcut-btn-hover">
          <span
            style={{
              background: "#fff7ed",
              color: "#ff9900",
              padding: "10px",
              borderRadius: "8px",
              display: "flex",
            }}>
            <FaPenToSquare />
          </span>
          <span>+ Schedule Exam</span>
        </button>
        <div
          style={{
            background: "white",
            border: "1px solid #eef2ff",
            padding: "15px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
          <span
            style={{
              background: "#f0fdf4",
              color: "#10b981",
              padding: "10px",
              borderRadius: "8px",
              display: "flex",
            }}>
            <FaClock />
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <small
              style={{
                color: "#8b949e",
                fontSize: "0.75rem",
                fontWeight: "600",
              }}>
              TERMINAL CLOCK
            </small>
            <strong style={{ fontSize: "0.9rem", color: "#001b42" }}>
              {currentTime.toLocaleTimeString()}
            </strong>
          </div>
        </div>
      </div>

      {/* 📊 3. DYNAMIC METRICS COUNTER CARDS LAYER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}>
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            borderLeft: "5px solid #0056ff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div>
            <span
              style={{
                color: "#8b949e",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}>
              ENROLLED STUDENTS
            </span>
            <h2
              style={{
                margin: "5px 0 0 0",
                fontSize: "2rem",
                color: "#001b42",
              }}>
              {totalStudents}
            </h2>
          </div>
          <div
            style={{
              background: "#eef2ff",
              color: "#0056ff",
              padding: "15px",
              borderRadius: "50%",
              fontSize: "1.2rem",
              display: "flex",
            }}>
            <FaUsers />
          </div>
        </div>
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            borderLeft: "5px solid #ff9900",
            boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div>
            <span
              style={{
                color: "#8b949e",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}>
              BROADCAST NOTICES
            </span>
            <h2
              style={{
                margin: "5px 0 0 0",
                fontSize: "2rem",
                color: "#001b42",
              }}>
              {totalNotices}
            </h2>
          </div>
          <div
            style={{
              background: "#fff7ed",
              color: "#ff9900",
              padding: "15px",
              borderRadius: "50%",
              fontSize: "1.2rem",
              display: "flex",
            }}>
            <FaBullhorn />
          </div>
        </div>
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            borderLeft: "5px solid #10b981",
            boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div>
            <span
              style={{
                color: "#8b949e",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}>
              MATERIAL ASSETS
            </span>
            <h2
              style={{
                margin: "5px 0 0 0",
                fontSize: "2rem",
                color: "#001b42",
              }}>
              {totalPapers}
            </h2>
          </div>
          <div
            style={{
              background: "#ecfdf5",
              color: "#10b981",
              padding: "15px",
              borderRadius: "50%",
              fontSize: "1.2rem",
              display: "flex",
            }}>
            <FaFilePdf />
          </div>
        </div>
      </div>

      {/* 📱 4. TODAY'S CLASSES TIMELINE PANEL */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
        }}>
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#001b42",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
          <FaCalendarDays style={{ color: "#0056ff" }} /> Today's Active Classes
          Pipeline
        </h3>
        {todayClasses.length === 0 ? (
          <p
            style={{
              margin: 0,
              color: "#8b949e",
              fontStyle: "italic",
              fontSize: "0.85rem",
            }}>
            No active terminal grids configured for today's operational slot.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "15px",
            }}>
            {todayClasses.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#f8faff",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #eef2ff",
                }}>
                <strong style={{ color: "#001b42", display: "block" }}>
                  {c.className}
                </strong>
                <small style={{ color: "#8b949e" }}>
                  📚 Lesson: {c.currentLesson || "N/A"}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📊 5. GRAPHICS DATA LAYER (GENDER + RESOURCE ANALYSIS CHARTS) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "25px",
        }}>
        {/* Gender Shares Donut Panel */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
          }}>
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#001b42",
              fontSize: "0.95rem",
            }}>
            Demographics (Gender Shares)
          </h3>
          <div style={{ width: "100%", height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value">
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resources Bars Panel */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
          }}>
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#001b42",
              fontSize: "0.95rem",
            }}>
            Paper Hub Asset Allocations
          </h3>
          <div style={{ width: "100%", height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData}>
                <XAxis dataKey="name" stroke="#8b949e" fontSize={12} />
                <YAxis stroke="#8b949e" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#0056ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🏁 6. TRIPLE EXAM DEADLINE COUNTDOWN GRID */}
      {/* <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.01)" }}>
        <h3 style={{ margin: "0 0 20px 0", color: "#001b42", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px" }}><FaHourglassHalf style={{ color: "#ff4b4b" }} /> Core Milestone Countdown Monitors</h3>
        
        {exams.length === 0 ? (
          <p style={{ margin: 0, color: "#8b949e", fontStyle: "italic", fontSize: "0.85rem" }}>No milestone exams or O/L targets logged inside this hub cluster.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {exams.map((ex) => (
              <div key={ex.id} style={{ background: "#0d1117", border: "1px solid #30363d", padding: "20px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #21262d", paddingBottom: "10px", marginBottom: "12px" }}>
                  <strong style={{ color: "#ffd700", fontSize: "0.95rem" }}>{ex.title}</strong>
                  <span style={{ fontSize: "0.7rem", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", background: ex.category === "national-ol" ? "#fff5f5" : "#f4f6fa", color: ex.category === "national-ol" ? "#ff4b4b" : "#001b42" }}>
                    {ex.category?.replace("-", " ").toUpperCase()}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <small style={{ color: "#8b949e" }}>⏰ Deadline Slot: {ex.targetDate} | {ex.targetTime}</small> */}

      {/* 🏁 6. TRIPLE EXAM DEADLINE COUNTDOWN GRID */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
        }}>
        <h3
          style={{
            margin: "0 0 20px 0",
            color: "#001b42",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
          <FaHourglassHalf style={{ color: "#ff4b4b" }} /> Core Milestone
          Countdown Monitors
        </h3>

        {exams.length === 0 ? (
          <p
            style={{
              margin: 0,
              color: "#8b949e",
              fontStyle: "italic",
              fontSize: "0.85rem",
            }}>
            No milestone exams or O/L targets logged inside this hub cluster.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}>
            {exams.map((ex) => (
              <div
                key={ex.id}
                style={{
                  background: "#0d1117",
                  border: "1px solid #30363d",
                  padding: "20px",
                  borderRadius: "10px",
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #21262d",
                    paddingBottom: "10px",
                    marginBottom: "12px",
                  }}>
                  <strong style={{ color: "#ffd700", fontSize: "0.95rem" }}>
                    {ex.title}
                  </strong>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      background:
                        ex.category === "national-ol" ? "#fff5f5" : "#f4f6fa",
                      color:
                        ex.category === "national-ol" ? "#ff4b4b" : "#001b42",
                    }}>
                    {ex.category?.replace("-", " ").toUpperCase()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}>
                  <small style={{ color: "#8b949e" }}>
                    ⏰ Deadline Slot: {ex.targetDate} | {ex.targetTime}
                  </small>
                  <div
                    style={{
                      marginTop: "8px",
                      background: "rgba(0, 247, 255, 0.03)",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #002b66",
                      textAlign: "center",
                    }}>
                    <code
                      style={{
                        color: "#00f7ff",
                        fontWeight: "bold",
                        fontSize: "1.05rem",
                      }}>
                      {calculateLiveClock(ex.targetDate, ex.targetTime)}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🏛️ 4.5 NEW COMPONENT LAYER: EVENT CALENDAR & QUICK LINKS INTERSECTION GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "25px",
        }}>
        {/* 📅 MINI EVENT CALENDAR WIDGET */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
          }}>
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#001b42",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <FaCalendarDays style={{ color: "#ff9900" }} /> Faculty Master Event
            Calendar
          </h3>
          <div className="mini-calendar-widget-core">
            <div
              className="calendar-header-month"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontWeight: "bold",
                color: "#001b42",
              }}>
              <span>
                {calendarDate.toLocaleString("default", { month: "long" })}{" "}
                {calendarDate.getFullYear()}
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() =>
                    setCalendarDate(
                      new Date(
                        calendarDate.setMonth(calendarDate.getMonth() - 1),
                      ),
                    )
                  }
                  style={{
                    cursor: "pointer",
                    border: "1px solid #eee",
                    background: "none",
                    borderRadius: "4px",
                    padding: "2px 8px",
                  }}>
                  &lt;
                </button>
                <button
                  onClick={() =>
                    setCalendarDate(
                      new Date(
                        calendarDate.setMonth(calendarDate.getMonth() + 1),
                      ),
                    )
                  }
                  style={{
                    cursor: "pointer",
                    border: "1px solid #eee",
                    background: "none",
                    borderRadius: "4px",
                    padding: "2px 8px",
                  }}>
                  &gt;
                </button>
              </div>
            </div>
            <div
              className="calendar-days-grid-matrix"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "8px",
                textAlign: "center",
              }}>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <strong
                  key={d}
                  style={{ fontSize: "0.8rem", color: "#8b949e" }}>
                  {d}
                </strong>
              ))}
              {calendarCells.map((day, idx) => (
                <div
                  key={idx}
                  className={`calendar-day-cell-node ${day ? "active-day" : "empty-day"}`}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    background: day ? "#f8faff" : "transparent",
                    fontSize: "0.85rem",
                    position: "relative",
                    fontWeight: day ? "600" : "normal",
                  }}>
                  {day}
                  {/* Real-time Indicator loop values can bind dynamically here */}
                  {day && idx % 5 === 0 && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "3px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "4px",
                        height: "4px",
                        background: "#0056ff",
                        borderRadius: "50%",
                      }}></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🚀 QUICK LINKS & UPCOMING ACTIVITIES HUB */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* QUICK LINKS PANEL */}
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
            }}>
            <h3
              style={{
                margin: "0 0 15px 0",
                color: "#001b42",
                fontSize: "1rem",
              }}>
              <FaBolt style={{ color: "#0056ff" }} /> Quick Operational Links
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}>
              <a
                href="https://zoom.us"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px",
                  background: "#f0f6ff",
                  color: "#0056ff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                }}
                className="shortcut-btn-hover">
                <FaVideo /> Zoom Web Portal
              </a>
              <a
                href="https://google.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px",
                  background: "#ecfdf5",
                  color: "#10b981",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                }}
                className="shortcut-btn-hover">
                <FaFilePdf /> Drive Repository
              </a>
            </div>
          </div>
          {/* UPCOMING ACTIVITIES TIMELINE FEED */}
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
              flexGrow: 1,
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}>
              <h3 style={{ margin: 0, color: "#001b42", fontSize: "1rem" }}>
                <FaGraduationCap style={{ color: "#ff9900" }} /> Upcoming
                Logistics Activities
              </h3>
              <button
                onClick={() => setIsActivityFormOpen(!isActivityFormOpen)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0056ff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}>
                + Log Event
              </button>
            </div>

            {isActivityFormOpen && (
              <form
                onSubmit={handleActivitySubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  background: "#f8faff",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}>
                <input
                  type="text"
                  placeholder="Activity Title (ex: Tute Book Release)"
                  required
                  value={newActivity.title}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, title: e.target.value })
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    outline: "none",
                    fontSize: "0.85rem",
                  }}
                />
                <input
                  type="date"
                  required
                  value={newActivity.date}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, date: e.target.value })
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    fontSize: "0.85rem",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#0056ff",
                    color: "white",
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}>
                  Commit Event
                </button>
              </form>
            )}

            {activities.length === 0 ? (
              <p
                style={{
                  margin: 0,
                  color: "#8b949e",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                }}>
                No upcoming logistics entries cataloged.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}>
                {activities.map((act) => (
                  <div
                    key={act.id}
                    style={{
                      borderLeft: "3px solid #ff9900",
                      paddingLeft: "12px",
                    }}>
                    <strong
                      style={{
                        display: "block",
                        color: "#001b42",
                        fontSize: "0.9rem",
                      }}>
                      {act.title}
                    </strong>
                    <small style={{ color: "#8b949e" }}>
                      📅 target: {act.date}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📝 7. TRIPLE EXAM SCHEDULER POPUP MODAL */}
      {isExamModalOpen && (
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
              width: "460px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              position: "relative",
            }}>
            <button
              onClick={() => setIsExamModalOpen(false)}
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
            <h3 style={{ margin: "0 0 15px 0", color: "#001b42" }}>
              <FaGraduationCap /> Log Milestone Assessment
            </h3>

            <form
              onSubmit={handleExamSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}>
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: "#001b42",
                  }}>
                  Assessment / Exam Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="ex: O/L National Master Exam"
                  required
                  value={examForm.title}
                  onChange={handleExamInputChange}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}>
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: "#001b42",
                  }}>
                  Milestone Classification
                </label>
                <select
                  name="category"
                  value={examForm.category}
                  onChange={handleExamInputChange}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #d2d6dc",
                    background: "white",
                  }}>
                  <option value="class-exam">Class Monthly Test</option>
                  <option value="school-term">School Term Test</option>
                  <option value="national-ol">Government National O/L</option>
                </select>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      color: "#001b42",
                    }}>
                    Date
                  </label>
                  <input
                    type="date"
                    name="targetDate"
                    required
                    value={examForm.targetDate}
                    onChange={handleExamInputChange}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d2d6dc",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      color: "#001b42",
                    }}>
                    Time
                  </label>
                  <input
                    type="time"
                    name="targetTime"
                    value={examForm.targetTime}
                    onChange={handleExamInputChange}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d2d6dc",
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  background: "#ff4b4b",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "10px",
                }}>
                Deploy Milestone Clock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
