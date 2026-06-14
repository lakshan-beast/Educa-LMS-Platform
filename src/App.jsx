import { useEffect } from "react";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import ScrollToTop from "./sections/ScrollTop";

import Header from "./components/Header";
import Footer from "./components/Footer";

import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Home from "./pages/Home";
import PaperHub from "./pages/PaperHub";
import StudentVoices from "./components/StudentVoices";

import FullTimetable from "./pages/Timetables";
import ClassesDetails from "./pages/ClassesDetails";
import ParentPortal from "./pages/ParentPortal";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <Header />
      <div className="overlay"></div>

      <main>
        <Routes>
          <Route path="/admin/:subject" element={<AdminDashboard />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/paper-hub/:id" element={<PaperHub />} />

          <Route path="/full-timetable" element={<FullTimetable />} />
          <Route path="/classes-details" element={<ClassesDetails />} />
          <Route path="/parent-portal" element={<ParentPortal />} />

          <Route path="/student-voices" element={<StudentVoices />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!location.pathname.startsWith("/dashboard") && <Footer />}
    </>
  );
};

export default App;
