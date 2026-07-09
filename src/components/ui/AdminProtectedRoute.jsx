import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
  const adminToken = localStorage.getItem("admin_auth_token");

  // 🔐 FIXED: හොරෙන් URL ගහලා එන ඕනෑම කෙනෙක්ව කෙලින්ම අර හොලිවුඩ් Alert Screen එකට පන්නයි! [INDEX 4]
  if (!isAdmin || !adminToken) {
    return <Navigate to="/security-lockdown" replace />;
  }

  // ඇඩ්මින් නම් ඇතුළත තියෙන සියලුම පාලන පිටු පෙන්වයි [INDEX 4]
  return <Outlet />;
};

export default AdminProtectedRoute;
