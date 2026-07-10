import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollTop from "../components/layout/ScrollTop";

const PublicLayout = () => {
  return (
    <div
      className="public-app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      <ScrollTop />
      <Footer />
    </div>
  );
};

export default PublicLayout;
