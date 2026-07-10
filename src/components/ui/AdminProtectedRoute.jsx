import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
  const adminToken = localStorage.getItem("admin_auth_token");

  if (!isAdmin || !adminToken) {
    return <Navigate to="/security-lockdown" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
