// import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/header"; // 👈 ඔයාගේ ෆෝල්ඩර් path එක
import Footer from "../components/layout/footer"; // 👈 ඔයාගේ ෆෝල්ඩර් path එක
import ScrollTop from "../components/layout/scrolltop";

const PublicLayout = () => {
  return (
    <div
      className="public-app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 👑 පොදු Header එක මෙතන විතරක් රන් වේ */}
      <Header />

      {/* 📄 මීට යටින් ඇති සියලුම සාමාන්‍ය පිටු (Home, About, Student Dashboard) Outlet එක ඇතුළෙන් ලෝඩ් වේ */}
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      {/* 👟 පොදු Footer එක සහ Scroll Top බටන් එක */}
      <ScrollTop />
      <Footer />
    </div>
  );
};

export default PublicLayout;
