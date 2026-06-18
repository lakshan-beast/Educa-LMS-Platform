// import React from "react";
import {
  FaBell,
  FaXmark,
  FaWhatsapp,
  FaCalendarDays,
  FaImage,
} from "react-icons/fa6";
// import EventImage from "../assets/hero-image.webp";
import EventImage from "../assets/hero-image.webp";

const EventDrawer = ({ isOpen, onClose }) => {
  // 👑 🔐 [THE EXCLUSIVE STATIC EVENT ADS DOCK]:
  // ඩිසයින් එක චෙක් කරලා බලන්න පන්තියේ නිල ඇඩ්ස් 2ක් මෙතන ලොක් කර ඇත මචං! [INDEX 4]
  const staticEventsDemo = [
    {
      id: "EVT-001",
      title: "Educa. Live Musical Fest 2026 🎶🎸",
      description:
        "A grand musical evening organized exclusively for our Grade 10 & 11 student community. Featuring popular guest artists and school fitness bands!",
      date: "2026-08-25",
      imageUrl: { EventImage },
    },
    {
      id: "EVT-002",
      title: "O/L Mathematics Master Seminar 📐🔥",
      description:
        "The ultimate final countdown seminar blueprint conducted by Janaka Sir. Covering critical local syllabus modules for absolute A-grade mastery.",
      date: "2026-07-12",
      imageUrl: { EventImage },
    },
  ];

  //   const handleShareEvent = (item) => {
  //     const siteUrl = window.location.origin;
  //     const shareMessage = `⚡ *SPECIAL INSTITUTIONAL EVENT BROADCAST* ⚡\n\n🏛️ *Educa Campus - ${item.title}*\n\n📢 ${item.description}\n\n🔗 View full event posters live on our official platform here:\n👉 ${siteUrl}`;

  //     const whatsappUrl = `https://wa.me + ${encodeURIComponent(shareMessage)}`;
  //     window.open(whatsappUrl, "_blank");
  //   };

  const handleShareEvent = (item) => {
    // 👑 🔐 [THE NATIVE CONCATENATION METHOD]:
    // ඔයාගේ AddStudent එකේ වැඩ කරන ක්‍රමයටම String එක පිරිසිදුව ගැට ගැසුවා මචං! [INDEX 4]
    const siteUrl = window.location.origin;

    const shareMessage =
      "⚡️ *SPECIAL INSTITUTIONAL EVENT BROADCAST* ⚡️\n\n" +
      "🏛️ *Educa Campus - " +
      item.title +
      "*\n\n" +
      "📢 " +
      item.description +
      "\n\n" +
      "🔗 *View full event posters live on our official platform here:*\n" +
      "👉 " +
      siteUrl +
      "\n\n" +
      "*NexusLabs Software Studios* 🦾";

    // 🚀 උඹේ කෝඩ් එකේ තියෙන පිරිසිදුම ක්‍රමයටම ලින්ක් එක එකතු කර බ්‍රවුසර් එකට දුන්නා මචං! [INDEX 4]
    const finalWhatsappUrl = "https://wa.me" + encodeURIComponent(shareMessage);
    window.open(finalWhatsappUrl, "_blank");
  };

  return (
    <div
      className={`campus-event-drawer-overlay ${isOpen ? "drawer-visible" : ""}`}>
      {/* BACKGROUND BLUR SHIELD DISMISS DOCK */}
      <div className="drawer-blur-dismiss-shield" onClick={onClose}></div>

      {/* MAIN SIDE PANEL PANEL */}
      <div className="drawer-main-panel">
        <div className="drawer-header-row">
          <h3>
            <FaBell className="bell-icon" /> Campus Events Feed
          </h3>
          <button onClick={onClose} className="drawer-close-trigger">
            <FaXmark />
          </button>
        </div>

        {/* SCROLLABLE INTERACTIVE CONTENT */}
        <div className="drawer-scroll-feed-content">
          {staticEventsDemo.map((item) => (
            <div key={item.id} className="drawer-social-post-card">
              <div className="post-image-container">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="image-placeholder-box">
                    <FaImage />
                    <span>Poster Image Unassigned (Placeholder View)</span>
                  </div>
                )}
              </div>

              <div className="drawer-card-meta">
                <span>
                  <FaCalendarDays /> {item.date}
                </span>
                <span className="faculty-badge">Admin</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <button
                onClick={() => handleShareEvent(item)}
                className="drawer-whatsapp-share-btn">
                <FaWhatsapp /> Share to Status
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDrawer;
