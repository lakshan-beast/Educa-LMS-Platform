// import { useEffect } from "react";

// import { Routes, Route, useLocation } from "react-router-dom";

// import AOS from "aos";
// import "aos/dist/aos.css";

// import ScrollToTop from "./sections/ScrollTop";
// import TabController from "./pages/TabController";

// import NotFound from "./pages/NotFound";

// import Header from "./components/Header";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import AdminDashboard from "./pages/AdminDashboard";

// import Dashboard from "./pages/Dashboard";
// import PaperHub from "./pages/PaperHub";
// import ResultHub from "./pages/ResultHub";

// import StudentVoices from "./components/StudentVoices";
// import FullTimetable from "./pages/Timetables";
// import ClassesDetails from "./pages/ClassesDetails";
// import ParentPortal from "./pages/ParentPortal";

// import Terms from "./pages/Terms";
// import Privacy from "./pages/Privacy";

// const App = () => {
//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   const location = useLocation();

//   return (
//     <>
//       <ScrollToTop />

//       <Header />
//       <div className="overlay"></div>

//       <main>
//         <Routes>
//           <Route path="/admin/:subject" element={<AdminDashboard />} />

//           <Route path="/terms" element={<Terms />} />
//           <Route path="/privacy" element={<Privacy />} />

//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />

//           <Route path="/paper-hub/:id" element={<PaperHub />} />

//           <Route path="/full-timetable" element={<FullTimetable />} />
//           <Route path="/classes-details" element={<ClassesDetails />} />
//           <Route path="/parent-portal" element={<ParentPortal />} />
//           <Route path="/result-hub" element={<ResultHub />} />

//           <Route path="/student-voices" element={<StudentVoices />} />

//           <Route path="tab-controller" element={<TabController />} />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>

//       {!location.pathname.startsWith("/dashboard") && <Footer />}
//     </>
//   );
// };

// export default App;

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

/* 🏛️ CORE LAYOUT WRAPPERS (අලුතින් නිර්මාණය කළ ආරක්ෂිත රාමු) */
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

/* 📄 CORE ROUTED SCREENS (පිටු සහ කම්පෝනන්ට්ස්) */
import Home from "./pages/public/Home";
import Dashboard from "./pages/public/Dashboard";
import PaperHub from "./pages/public/PaperHub";
import ResultHub from "./pages/public/ResultHub";
import FullTimetable from "./pages/public/Timetables";
import ClassesDetails from "./pages/public/ClassesDetails";
import ParentPortal from "./pages/Future/ParentPortal";
import Terms from "./pages/public/Terms";
import Privacy from "./pages/public/Privacy";
import NotFound from "./pages/public/NotFound";
import StudentVoices from "./sections/StudentVoices";

import TabController from "./pages/public/TabController";

/* 👑 ADMIN SHIELDED COMPONENTS (ඇඩ්මින් පිටු) */
import AdminDashboard from "./pages/admin/AdminDashboard";
// සටහන: ඉදිරියේදී අපි හදන අලුත් Admin පිටු (StudentManager, NoticeManager) මෙතනට Import වේ.

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <div className="overlay"></div>

      <Routes>
        {/* ==========================================================================
           🌐 GROUP A: PUBLIC FACING ECOSYSTEM (හෙඩර් සහ ෆුටර් සහිත පොදු පිටු)
           ========================================================================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          {/* 👈 ළමයාගේ dashboard එකටත් දැන් හෙඩර්/ෆුටර් ලස්සනට වදී */}
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/result-hub" element={<ResultHub />} />
          <Route path="/paper-hub/:id" element={<PaperHub />} />
          <Route path="/full-timetable" element={<FullTimetable />} />
          <Route path="/classes-details" element={<ClassesDetails />} />
          // <Route path="tab-controller" element={<TabController />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/student-voices" element={<StudentVoices />} />
        </Route>

        {/* ==========================================================================
           👑 GROUP B: ISOLATED ADMINISTRATIVE VAULTS (හෝම් පේජ් කෑලි සහමුලින්ම නැති ඇඩ්මින් කොටස)
           ========================================================================== */}
        <Route path="/admin/:subject" element={<AdminLayout />}>
          {/* /admin/maths/dashboard වැනි ලින්ක් එකකින් Analytics Hub එකට කෙලින්ම යයි */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* 🛠️ ඊළඟ පියවරවල් වලදී අපි හදන අලුත් පිරිසිදු ඇඩ්මින් පිටු ලින්ක් වෙන්නේ මෙතනටයි: */}
          {/* <Route path="students" element={<StudentManager />} /> */}
          {/* <Route path="schedules" element={<ScheduleManager />} /> */}
          {/* <Route path="notices" element={<NoticeManager />} /> */}
          {/* <Route path="papers" element={<PaperManager />} /> */}
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
