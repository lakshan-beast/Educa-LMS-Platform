
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
  const adminToken = localStorage.getItem("admin_auth_token");

  // 📱 SCREEN WIDTH DETECTOR STATE
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1️⃣ 🔐 SECURITY STEP A
  if (!isAdmin || !adminToken) {
    return <Navigate to="/security-lockdown" replace />;
  }

  // 2️⃣ 🚫 SECURITY STEP B
  if (windowWidth < 1024) {
    return <Navigate to="/admin-desktop-only" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
