// import { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";

// import AOS from "aos";
// import "aos/dist/aos.css";

// import PublicLayout from "./layouts/PublicLayout";
// import AdminLayout from "./layouts/AdminLayout";

// import Home from "./pages/public/Home";
// import Dashboard from "./pages/public/Dashboard";
// import PaperHub from "./pages/public/PaperHub";
// import StudentGuildChat from "./pages/student/StudentGuildChat";
// import ResultHub from "./pages/public/ResultHub";
// import FullTimetable from "./pages/public/Timetables";
// import ClassesDetails from "./pages/public/ClassesDetails";
// import ParentPortal from "./pages/Future/ParentPortal";
// import Terms from "./pages/public/Terms";
// import Privacy from "./pages/public/Privacy";
// import NotFound from "./pages/public/NotFound";
// import StudentVoices from "./sections/StudentVoices";

// import TabController from "./pages/public/TabController";

// import AllStudents from "./pages/admin/AllStudents";
// import AdminDashboard from "./pages/admin/AdminDashboard";

// import StaffRegistryManager from "./pages/admin/StaffRegisterManager";

// import NoticeManager from "./pages/admin/NoticeManager";
// import ClassScheduleVault from "./pages/admin/ClassScheduleVault";
// import PaperManager from "./pages/admin/PaperHubUploadVault";

// import AdminProtectedRoute from "./components/ui/AdminProtectedRoute";
// import SecurityLockdownGate from "./components/ui/SecurityLockdownGate";

// const App = () => {
//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   return (
//     <>
//       <div className="overlay"></div>

//       <Routes>
//         <Route path="/security-lockdown" element={<SecurityLockdownGate />} />
//         {/* ==========================================================================
//            🌐 GROUP A: PUBLIC FACING ECOSYSTEM (හෙඩර් සහ ෆුටර් සහිත පොදු පිටු)
//            ========================================================================== */}
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />{" "}
//           {/* 👈 ළමයාගේ dashboard එකටත් දැන් හෙඩර්/ෆුටර් ලස්සනට වදී */}
//           <Route path="/parent-portal" element={<ParentPortal />} />
//           <Route path="/result-hub" element={<ResultHub />} />
//           <Route path="/paper-hub/:id" element={<PaperHub />} />
//           <Route path="/full-timetable" element={<FullTimetable />} />
//           <Route path="/classes-details" element={<ClassesDetails />} />
//           // <Route path="tab-controller" element={<TabController />} />
//           <Route path="/terms" element={<Terms />} />
//           <Route path="/privacy" element={<Privacy />} />
//           <Route path="/student-voices" element={<StudentVoices />} />
//           <Route path="/student-guild" element={<StudentGuildChat />} />
//         </Route>

//         {/* ==========================================================================
//            👑 GROUP B: ISOLATED ADMINISTRATIVE VAULTS (හෝම් පේජ් කෑලි සහමුලින්ම නැති ඇඩ්මින් කොටස)
//            ========================================================================== */}
//         <Route path="/admin/:subject" element={<AdminLayout />}>
//           {/* /admin/maths/dashboard වැනි ලින්ක් එකකින් Analytics Hub එකට කෙලින්ම යයි */}
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="all-students" element={<AllStudents />} />
//           <Route path="notices" element={<NoticeManager />} />
//           <Route path="schedules" element={<ClassScheduleVault />} />
//           <Route path="student-guild" element={<StudentGuildChat />} />
//           <Route path="staff-registry" element={<StaffRegistryManager />} />

//           {/* 🛠️ ඊළඟ පියවරවල් වලදී අපි හදන අලුත් පිරිසිදු ඇඩ්මින් පිටු ලින්ක් වෙන්නේ මෙතනටයි: */}
//           {/* <Route path="students" element={<StudentManager />} /> */}
//           {/* <Route path="notices" element={<NoticeManager />} /> */}
//           <Route path="papers" element={<PaperManager />} />
//         </Route>

//         {/* ==========================================================================
//            🚨 GROUP C: GLOBAL EXCEPTION HANDLER (වැරදි URL සඳහා)
//            ========================================================================== */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

// // 👑 1. App.jsx එකේ ඉහළින්ම ආරක්ෂක වැටවල් දෙකම import කරගන්න:
// // import AdminProtectedRoute from "./components/ui/AdminProtectedRoute";
// // import SecurityLockdownGate from "./components/ui/SecurityLockdownGate";

// // // 👑 2. Routes ලියලා තියෙන තැන මේ විදිහට ආරක්ෂිතව Nest කරගන්න මචං:
// // <Routes>
// //   {/* සාමාන්‍ය ළමා සහ පොදු රූට්ස් මෙතන තියෙන්න දරන්න... */}
// //   <Route path="/login" element={<Login />} />

// //   {/* 🔴 හොලිවුඩ් ස්ටයිල් සජීවී ඇලර්ට් ස්ක්‍රීන් එකේ රූට් එක */}
// //   <Route path="/security-lockdown" element={<SecurityLockdownGate />} />

// //   {/* 🔐 ENTERPRISE SECURITY OUTLET CLUSTER: ඇඩ්මින් පැනලය සහමුලින්ම ලොක් කළා! [INDEX 4] */}
// //   <Route element={<AdminProtectedRoute />}>
// //     <Route path="admin/:subject" element={<AdminLayout />}>
// //       <Route path="dashboard" element={<AdminDashboard />} />
// //       <Route path="notice-manager" element={<NoticeManager />} />
// //       <Route path="schedule-manager" element={<ScheduleManager />} />
// //       <Route path="papers" element={<PaperManager />} />
// //       <Route path="staff-registry" element={<StaffRegistryManager />} />
// //       <Route path="guild-chat" element={<StudentGuildChat />} />
// //     </Route>
// //   </Route>
// // </Routes>

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import Dashboard from "./pages/public/Dashboard";
import PaperHub from "./pages/public/PaperHub";
import StudentGuildChat from "./pages/student/StudentGuildChat";
import ResultHub from "./pages/public/ResultHub";
import FullTimetable from "./pages/public/Timetables";
import ClassesDetails from "./pages/public/ClassesDetails";
import ParentPortal from "./pages/Future/ParentPortal";
import Terms from "./pages/public/Terms";
import Privacy from "./pages/public/Privacy";
import NotFound from "./pages/public/NotFound";
import StudentVoices from "./sections/StudentVoices";

// import TabController from "./pages/public/TabController";

import AllStudents from "./pages/admin/AllStudents";
import AdminDashboard from "./pages/admin/AdminDashboard";

import StaffRegistryManager from "./pages/admin/StaffRegisterManager"; // Filename fallback check

import NoticeManager from "./pages/admin/NoticeManager";
import ClassScheduleVault from "./pages/admin/ClassScheduleVault";
import PaperManager from "./pages/admin/PaperHubUploadVault";

import AdminProtectedRoute from "./components/ui/AdminProtectedRoute";
// import SecurityLockdownGate from "./components/ui/SecurityLockDownGate";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    // 👑 AUTO TIME-BASED THEME ENGINE LOGIC [INDEX 4]
    const checkSystemTimeAndSetTheme = () => {
      const currentHour = new Date().getHours();

      // සවස 7 (19:00) සිට උදේ 5:59 වෙනකම් ඔටෝම Dark Mode සක්‍රීය වේ [INDEX 4]
      if (currentHour >= 19 || currentHour < 6) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    };

    checkSystemTimeAndSetTheme(); // පිටුව ලෝඩ් වෙද්දීම රන් වේ [INDEX 4]

    // හැම විනාඩියකටම වරක්ම සිස්ටම් වෙලාව පරික්ශා කර බලයි (Auto-sync) [INDEX 4]
    const themeSyncInterval = setInterval(checkSystemTimeAndSetTheme, 60000);
    return () => clearInterval(themeSyncInterval);
  }, []);

  return (
    <>
      <div className="overlay"></div>

      <Routes>
        {/* 🔴 හොලිවුඩ් ස්ටයිල් සජීවී ඇලර්ට් ස්ක්‍රීන් එකේ රූට් එක */}
        {/* <Route path="/security-lockdown" element={<SecurityLockdownGate />} /> */}

        {/* ==========================================================================
           🌐 GROUP A: PUBLIC FACING ECOSYSTEM (හෙඩර් සහ ෆුටර් සහිත පොදු පිටු)
           ========================================================================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/result-hub" element={<ResultHub />} />
          <Route path="/paper-hub/:id" element={<PaperHub />} />
          <Route path="/full-timetable" element={<FullTimetable />} />
          <Route path="/classes-details" element={<ClassesDetails />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/student-voices" element={<StudentVoices />} />
          <Route path="/student-guild" element={<StudentGuildChat />} />
        </Route>

        {/* ==========================================================================
           🔐 GROUP B: PROTECTED ADMINISTRATIVE VAULTS (ආරක්ෂක වැටෙන් සහමුලින්ම ලොක් කළා) [INDEX 4]
           ========================================================================== */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/:subject" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="all-students" element={<AllStudents />} />
            <Route path="notices" element={<NoticeManager />} />
            <Route path="schedules" element={<ClassScheduleVault />} />
            <Route path="student-guild" element={<StudentGuildChat />} />
            <Route path="guild-chat" element={<StudentGuildChat />} />{" "}
            {/* Redirect route fallback alias */}
            <Route path="staff-registry" element={<StaffRegistryManager />} />
            <Route path="papers" element={<PaperManager />} />
          </Route>
        </Route>
        {/* ==========================================================================
           🚨 GROUP C: GLOBAL EXCEPTION HANDLER (වැරදි URL සඳහා)
           ========================================================================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
