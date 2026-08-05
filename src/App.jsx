import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import Dashboard from "./pages/public/Dashboard";
import PaperHub from "./pages/public/PaperHub";
import ResultHub from "./pages/public/ResultHub";
import FullTimetable from "./pages/Future/Timetables";
import ClassesDetails from "./pages/public/ClassesDetails";
import ParentPortal from "./pages/Future/ParentPortal";
import Terms from "./pages/public/Terms";
import Privacy from "./pages/public/Privacy";
import NotFound from "./pages/public/NotFound";
import StudentVoices from "./sections/StudentVoices";

import AllStudents from "./pages/admin/AllStudents";
import AdminDashboard from "./pages/admin/AdminDashboard";

import StaffRegistryManager from "./pages/admin/StaffRegisterManager";

import NoticeManager from "./pages/admin/NoticeManager";
import ClassScheduleVault from "./pages/admin/ClassScheduleVault";
import PaperManager from "./pages/admin/PaperHubUploadVault";

import TabController from "./pages/public/TabController";
import AdminProtectedRoute from "./components/ui/AdminProtectedRoute";
import AdminMobileBlock from "./pages/admin/AdminMobileBlock";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <div className="overlay"></div>

      <Routes>
        {/* <Route path="/security-lockdown" element={<SecurityLockdownGate />} /> */}

        <Route path="/admin-desktop-only" element={<AdminMobileBlock />} />

        {/* 🌐 GROUP A: PUBLIC FACING ECOSYSTEM */}
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
          {/* <Route path="/student-guild" element={<StudentGuildChat />} /> */}
          <Route path="/tab-controller" element={<TabController />} />
        </Route>

        {/* 🔐 GROUP B: PROTECTED ADMINISTRATIVE VAULTS  */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/:subject" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="all-students" element={<AllStudents />} />
            <Route path="notices" element={<NoticeManager />} />
            <Route path="schedules" element={<ClassScheduleVault />} />

            {/* <Route path="student-guild" element={<StudentGuildChat />} /> */}
            {/* <Route path="guild-chat" element={<StudentGuildChat />} />{" "} */}

            <Route path="staff-registry" element={<StaffRegistryManager />} />
            <Route path="papers" element={<PaperManager />} />
          </Route>
        </Route>

        {/* 🚨 GROUP C: GLOBAL EXCEPTION HANDLER */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
