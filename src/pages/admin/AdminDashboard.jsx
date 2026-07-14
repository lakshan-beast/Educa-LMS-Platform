import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
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
  FaVideo,
  FaXmark,
  FaClock,
  FaCalendarDays,
  FaGraduationCap,
  FaPenToSquare,
  FaHourglassHalf,
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
    // setIsLoading(true);
    if (!currentFacultySubject) return;

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
    <div className="admin-analytics-core-dashboard">
      {/* 👑 1. TOP DYNAMIC WELCOME BANNER & REMINDER DOCK */}
      <div className="dashboard-top-alert-matrix">
        <div className="admin-welcome-hero-banner">
          <h1>Welcome to {subject?.toUpperCase()} Operational Center</h1>
          <p>
            Monitor live operations, schedule configurations, and broadcast
            cluster indexes.
          </p>
        </div>

        {/* 🔔 SMART ADMINISTRATIVE REMINDER BANNER */}
        <div
          className="smart-admin-reminder-strip"
          style={{
            background: todayClasses.length > 0 ? "#fff5f5" : "#f4f7ff",
            borderLeft:
              todayClasses.length > 0
                ? "4px solid #ff4b4b"
                : "4px solid #0056ff",
            color: todayClasses.length > 0 ? "#991b1b" : "#1e1b4b",
          }}>
          <FaBolt
            className={todayClasses.length > 0 ? "pulse-icon-live" : ""}
          />
          <span>{smartReminder}</span>
        </div>
      </div>

      {/* 🎛️ 2. QUICK MANAGEMENT SHORTCUT HUB & ACTIONS */}
      <div className="admin-shortcut-hub-grid">
        {/* SCHEDULE EXAM MODAL TRIGGER */}
        <button
          type="button"
          onClick={() => setIsExamModalOpen(true)}
          className="admin-shortcut-tile-btn">
          <span className="shortcut-icon-wrapper icon-exam">
            <FaPenToSquare />
          </span>
          <span className="shortcut-label-text">+ Schedule Exam</span>
        </button>

        {/* HIGH-TECH LIVE TERMINAL CLOCK */}
        <div className="admin-shortcut-tile-display">
          <span className="shortcut-icon-wrapper icon-clock">
            <FaClock />
          </span>
          <div className="terminal-clock-meta-block">
            <small className="clock-hud-label">TERMINAL CLOCK</small>
            <strong className="clock-digital-digits">
              {currentTime.toLocaleTimeString()}
            </strong>
          </div>
        </div>
      </div>

      {/* 📊 3. DYNAMIC METRICS COUNTER CARDS LAYER */}
      <div className="admin-metrics-counter-bento-grid">
        {/* 👥 CARD 1: ENROLLED STUDENTS */}
        <div className="metric-bento-tile tile-students">
          <div className="metric-data-stream">
            <span className="metric-hud-title">ENROLLED STUDENTS</span>
            <h2 className="metric-digital-digits">{totalStudents}</h2>
          </div>
          <div className="metric-avatar-icon-glow">
            <FaUsers />
          </div>
        </div>

        {/* 📢 CARD 2: BROADCAST NOTICES */}
        <div className="metric-bento-tile tile-notices">
          <div className="metric-data-stream">
            <span className="metric-hud-title">BROADCAST NOTICES</span>
            <h2 className="metric-digital-digits">{totalNotices}</h2>
          </div>
          <div className="metric-avatar-icon-glow">
            <FaBullhorn />
          </div>
        </div>

        {/* 📄 CARD 3: MATERIAL ASSETS */}
        <div className="metric-bento-tile tile-assets">
          <div className="metric-data-stream">
            <span className="metric-hud-title">MATERIAL ASSETS</span>
            <h2 className="metric-digital-digits">{totalPapers}</h2>
          </div>
          <div className="metric-avatar-icon-glow">
            <FaFilePdf />
          </div>
        </div>
      </div>

      {/* 📱 4. TODAY'S CLASSES TIMELINE PANEL */}
      <div className="admin-today-classes-pipeline-panel">
        <h3 className="pipeline-core-heading">
          <FaCalendarDays /> Today's Active Classes Pipeline
        </h3>

        {todayClasses.length === 0 ? (
          <p className="pipeline-empty-state-text">
            No active terminal grids configured for today's operational slot.
          </p>
        ) : (
          <div className="pipeline-active-cards-grid">
            {todayClasses.map((c, i) => (
              <div key={i} className="pipeline-class-node-tile">
                <strong className="class-node-title">{c.className}</strong>
                <small className="class-node-lesson-subtext">
                  📚 Lesson: {c.currentLesson || "N/A"}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-graphics-charts-bento-grid">
        {/* 🟢 PANEL 1: GENDER SHARES DONUT PANEL */}
        <div className="chart-bento-tile-card donut-chart-tile">
          <h3 className="chart-core-title">Demographics (Gender Shares)</h3>
          <div className="recharts-canvas-container">
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
                      // 👈 COLORS ලිස්ට් එකට ඔයාගේ component එක ඇතුළෙන් දෙන පාටවල් වදී (උදා: #00f1d1, #ff2c73 වගේ ඒවා පට්ට)
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

        {/* 🔵 PANEL 2: RESOURCES BARS PANEL */}
        <div className="chart-bento-tile-card bar-chart-tile">
          <h3 className="chart-core-title">Paper Hub Asset Allocations</h3>
          <div className="recharts-canvas-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData}>
                {/* 💻 FIXED: ඩාර්ක් පසුබිම උඩින් අකුරු ලස්සනට පේන්න stroke එක Slate Gray කළා */}
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip />
                {/* 🚀 FIXED: බාර් තීරු පරණ මඩ නිල් වෙනුවට, සයිබර් Executive Blue පාටින් පත්තු කළා */}
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🏁 6. TRIPLE EXAM DEADLINE COUNTDOWN GRID */}
      <div className="admin-exam-countdown-pipeline-panel">
        <h3 className="pipeline-core-heading">
          <FaHourglassHalf /> Core Milestone Countdown Monitors
        </h3>

        {exams.length === 0 ? (
          <p className="pipeline-empty-state-text">
            No milestone exams or O/L targets logged inside this hub cluster.
          </p>
        ) : (
          <div className="pipeline-active-cards-grid">
            {exams.map((ex) => (
              <div key={ex.id} className="pipeline-exam-node-tile">
                <div className="node-top-meta-bar">
                  <strong className="exam-node-title">{ex.title}</strong>
                  <span
                    className={`category-meta-badge ${ex.category === "national-ol" ? "national-badge" : "term-badge"}`}>
                    {ex.category?.replace("-", " ").toUpperCase()}
                  </span>
                </div>

                <div className="node-body-parameters">
                  <small className="exam-node-deadline-text">
                    ⏰ Deadline Slot: {ex.targetDate} | {ex.targetTime}
                  </small>

                  {/* REAL-TIME DYNAMIC TIME COUNTDOWN DOCK */}
                  <div className="countdown-live-clock-dock">
                    <code className="countdown-digital-digits">
                      {calculateLiveClock(ex.targetDate, ex.targetTime)}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📊 5. GRAPHICS DATA LAYER (GENDER + RESOURCE ANALYSIS CHARTS) */}
      <div className="admin-calendar-activities-split-grid">
        {/* 📅 MINI EVENT CALENDAR WIDGET */}
        <div className="chart-bento-tile-card calendar-widget-tile">
          <h3 className="chart-core-title">
            <FaCalendarDays /> Faculty Master Event Calendar
          </h3>

          <div className="mini-calendar-widget-core">
            <div className="calendar-header-month">
              <span>
                {calendarDate.toLocaleString("default", { month: "long" })}{" "}
                {calendarDate.getFullYear()}
              </span>
              <div className="calendar-month-nav-btns">
                <button
                  onClick={() =>
                    setCalendarDate(
                      new Date(
                        calendarDate.setMonth(calendarDate.getMonth() - 1),
                      ),
                    )
                  }
                  className="cal-nav-btn">
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
                  className="cal-nav-btn">
                  &gt;
                </button>
              </div>
            </div>

            <div className="calendar-days-grid-matrix">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <strong key={d} className="calendar-day-name-label">
                  {d}
                </strong>
              ))}
              {calendarCells.map((day, idx) => (
                <div
                  key={idx}
                  className={`calendar-day-cell-node ${day ? "active-day" : "empty-day"}`}>
                  {day}
                  {/* Real-time Indicator loop values can bind dynamically here */}
                  {day && idx % 5 === 0 && (
                    <span className="live-event-dot-indicator"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🚀 QUICK LINKS & UPCOMING ACTIVITIES HUB */}
        <div className="admin-activities-vertical-deck">
          {/* QUICK LINKS PANEL */}
          <div className="chart-bento-tile-card quick-links-panel">
            <h3 className="chart-core-title">
              <FaBolt /> Quick Operational Links
            </h3>
            <div className="quick-links-action-row">
              <a
                href="https://us05web.zoom.us/myhome"
                target="_blank"
                rel="noreferrer"
                className="shortcut-btn-link zoom-link">
                <FaVideo /> Zoom Web Portal
              </a>
              <a
                href="https://drive.google.com/drive"
                target="_blank"
                rel="noreferrer"
                className="shortcut-btn-link drive-link">
                <FaFilePdf /> Drive Repository
              </a>
            </div>
          </div>

          {/* UPCOMING ACTIVITIES TIMELINE FEED */}
          <div className="chart-bento-tile-card activities-feed-panel">
            <div className="feed-upper-header-bar">
              <h3 className="chart-core-title">
                <FaGraduationCap /> Upcoming Logistics Activities
              </h3>
              <button
                onClick={() => setIsActivityFormOpen(!isActivityFormOpen)}
                className="log-event-toggle-btn">
                + Log Event
              </button>
            </div>

            {/* IS ACTIVTY FORM OPEN CONDITIONAL OVERLAY */}
            {isActivityFormOpen && (
              <form
                onSubmit={handleActivitySubmit}
                className="activity-logging-form">
                <input
                  type="text"
                  placeholder="Activity Title (ex: Tute Book Release)"
                  required
                  value={newActivity.title}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, title: e.target.value })
                  }
                />
                <input
                  type="date"
                  required
                  value={newActivity.date}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, date: e.target.value })
                  }
                />
                <button type="submit" className="activity-commit-submit-btn">
                  Commit Event
                </button>
              </form>
            )}
            {/* ACTIVITIES RECEPTACLE ITERATION */}
            {activities.length === 0 ? (
              <p className="empty-activities-notice-text">
                No upcoming logistics entries cataloged.
              </p>
            ) : (
              <div className="activities-vertical-stack-feed">
                {activities.map((act) => (
                  <div key={act.id} className="activity-bulletin-strip-node">
                    <strong className="activity-node-title-label">
                      {act.title}
                    </strong>
                    <small className="activity-node-target-date">
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
          className="toolkit-sheet-overlay"
          onClick={() => setIsExamModalOpen(false)}>
          {/* 👈 යට ඉඳන් පාවෙලා උඩට එන iOS Bottom Sheet Card එක */}
          <div
            className="toolkit-sheet-card exam-setup-card"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Cross Button */}
            <button
              className="close-sheet-btn"
              onClick={() => setIsExamModalOpen(false)}>
              <FaXmark />
            </button>

            <h3>
              <FaGraduationCap /> Log Milestone Assessment
            </h3>

            <form
              onSubmit={handleExamSubmit}
              className="exam-logging-form-body">
              {/* TITLE INPUT */}
              <div className="exam-input-field-group">
                <label>Assessment / Exam Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="ex: O/L National Master Exam"
                  required
                  value={examForm.title}
                  onChange={handleExamInputChange}
                />
              </div>

              {/* CLASSIFICATION SELECT */}
              <div className="exam-input-field-group">
                <label>Milestone Classification</label>
                <select
                  name="category"
                  value={examForm.category}
                  onChange={handleExamInputChange}>
                  <option value="class-exam">Class Monthly Test</option>
                  <option value="school-term">School Term Test</option>
                  <option value="national-ol">Government National O/L</option>
                </select>
              </div>

              {/* DATE & TIME SPLIT ROW */}
              <div className="exam-date-time-split-grid">
                <div className="exam-input-field-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="targetDate"
                    required
                    value={examForm.targetDate}
                    onChange={handleExamInputChange}
                  />
                </div>

                <div className="exam-input-field-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="targetTime"
                    value={examForm.targetTime}
                    onChange={handleExamInputChange}
                  />
                </div>
              </div>

              {/* DEPLOY SUBMIT BUTTON */}
              <button type="submit" className="exam-deploy-clock-btn">
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
