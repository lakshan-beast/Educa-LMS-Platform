// import { Navigate, Outlet } from "react-router-dom";

// const AdminProtectedRoute = () => {
//   const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
//   const adminToken = localStorage.getItem("admin_auth_token");

//   if (!isAdmin || !adminToken) {
//     return <Navigate to="/security-lockdown" replace />;
//   }

//   return <Outlet />;
// };

// export default AdminProtectedRoute;

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

  // 1️⃣ 🔐 SECURITY STEP A: ඇඩ්මින් කෙනෙක් නෙවෙයි නම් කෙලින්ම හොලිවුඩ් Alert Screen එකට පන්නයි! [INDEX 4]
  if (!isAdmin || !adminToken) {
    return <Navigate to="/security-lockdown" replace />;
  }

  // 2️⃣ 🚫 SECURITY STEP B: උඹ ඉල්ලපු මොබයිල් බ්ලොක් එක (1024px ට වඩා අඩු නම් ලැප් එකකින් එන්න කියයි!) [INDEX 4]
  if (windowWidth < 1024) {
    return <Navigate to="/admin-desktop-only" replace />;
  }

  // සියලුම ආරක්ෂක වැටවල් පිරිසිදු නම් පමණක් ඇඩ්මින් පැනලයට ඇතුල් වීමට අවසර දේ [INDEX 4]
  return <Outlet />;
};

export default AdminProtectedRoute;
