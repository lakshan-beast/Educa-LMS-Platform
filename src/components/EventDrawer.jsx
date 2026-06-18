import { useState } from "react";
import {
  FaBell,
  FaXmark,
  FaWhatsapp,
  FaCalendarDays,
  FaImage,
} from "react-icons/fa6";
// import EventImage from "../assets/hero-image.webp";
// import EventImage from "../assets/musical.jpg";

const EventDrawer = ({ isOpen, onClose }) => {
  const [phoneInputs, setPhoneInputs] = useState({});

  // 👑 🔐 [THE EXCLUSIVE STATIC EVENT ADS DOCK]:
  // ඩිසයින් එක චෙක් කරලා බලන්න පන්තියේ නිල ඇඩ්ස් 2ක් මෙතන ලොක් කර ඇත මචං! [INDEX 4]
  const staticEventsDemo = [
    {
      id: "EVT-001",
      title: "Educa. Live Musical Fest 2026 🎶🎸",
      description:
        "A grand musical evening organized exclusively for our Grade 10 & 11 student community. Featuring popular guest artists and school fitness bands!",
      date: "2026-08-25",
      imageUrl: "/musical.jpg",
    },
    {
      id: "EVT-002",
      title: "O/L Mathematics Master Seminar 📐🔥",
      description:
        "The ultimate final countdown seminar blueprint conducted by Janaka Sir. Covering critical local syllabus modules for absolute A-grade mastery.",
      date: "2026-07-12",
      //   imageUrl: { EventImage },
      imageUrl: "/musical.jpg",
    },
  ];

  //   const handleDirectSend = (item) => {
  //     const siteUrl = window.location.origin;
  //     const shareMessage = `⚡ *SPECIAL INSTITUTIONAL EVENT BROADCAST* ⚡\n\n🏛️ *Educa Campus - ${item.title}*\n\n📢 ${item.description}\n\n🔗 View full event posters live on our official platform here:\n👉 ${siteUrl}`;

  //     const whatsappUrl = `https://wa.me + ${encodeURIComponent(shareMessage)}`;
  //     window.open(whatsappUrl, "_blank");
  //   };

  const handleInputChange = (id, value) => {
    setPhoneInputs((prev) => ({ ...prev, [id]: value }));
  };

  //   const handleDirectSend = (item) => {
  //     // 👑 🔐 [THE NATIVE CONCATENATION METHOD]:
  //     // ඔයාගේ AddStudent එකේ වැඩ කරන ක්‍රමයටම String එක පිරිසිදුව ගැට ගැසුවා මචං! [INDEX 4]
  //     // const siteUrl = window.location.origin;
  //     const siteUrl = "https://educa-lms-platform.vercel.app/";

  //     const shareMessage =
  //       "⚡️ *SPECIAL INSTITUTIONAL EVENT BROADCAST* ⚡️\n\n" +
  //       "🏛️ *Educa Campus - " +
  //       item.title +
  //       "*\n\n" +
  //       "📢 " +
  //       item.description +
  //       "\n\n" +
  //       "🔗 *View full event posters live on our official platform here:*\n" +
  //       "👉 " +
  //       siteUrl +
  //       "\n\n" +
  //       "*NexusLabs Software Studios* 🦾";

  //     // 🚀 උඹේ කෝඩ් එකේ තියෙන පිරිසිදුම ක්‍රමයටම ලින්ක් එක එකතු කර බ්‍රවුසර් එකට දුන්නා මචං! [INDEX 4]
  //     const finalWhatsappUrl = "https://wa.me" + encodeURIComponent(shareMessage);
  //     window.open(finalWhatsappUrl, "_blank");

  const handleDirectSend = (item) => {
    const userPhone = phoneInputs[item.id] || "";
    if (!userPhone.trim())
      return alert("Please enter a valid mobile number first [INDEX 4]!");

    // 👑 🔐 [THE GUARANTEED DIRECT CONTACT REDIRECT ENGINE]:
    // ඔයාගේ AddStudent එකේ වැඩ කරන පිරිසිදුම රටාවට ලින්ක් එක හැදුවා මචං! [INDEX 4]
    const sendRegistrationDetails = userPhone.trim().replace(/^0/, "94");
    const siteUrl = "https://educa-lms-platform.vercel.app/";

    const shareMessage =
      //   "⚡ *SPECIAL INSTITUTIONAL EVENT BROADCAST* ⚡\n\n" +
      //   "🏛️ *Educa Campus - " +
      //   item.title +
      //   "*\n\n" +
      //   "📢 " +
      //   item.description +
      //   "\n\n" +
      //   "🔗 *View full event posters live on our official platform here:*\n" +
      //   "👉 " +
      //   siteUrl +
      //   "\n\n" +
      //   "*NexusLabs Software Studios* 🦾";

      "🏛️ *E D U C A | C A M P U S E V E N T S* 🏛️\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      "🔥 *NEW OFFICIAL BROADCAST LIVE!* 🔥\n\n" +
      "📌 *Event:* " +
      item.title +
      "\n" +
      "📅 *Date:* " +
      item.date +
      "\n" +
      "👤 *Authorized By:* Faculty Administration Board\n\n" +
      "📝 *Inquiry Details:*\n" +
      "_" +
      item.description +
      "_\n\n" +
      "━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
      "🚀 *ACCESS ONLINE PORTAL & CARDS:*\n" +
      "👉 " +
      siteUrl +
      "\n\n" +
      "Thank You,\n" +
      "⚡ *NexusLabs Software Studios*";

    // 🚀 උඹේ කෝඩ් එකේ තියෙන පිරිසිදුම + ලකුණු ක්‍රමයටම ලින්ක් එක එකතු කර බ්‍රවුසර් එකට දුන්නා මචං! [INDEX 4]
    const finalWhatsappUrl =
      "https://wa.me/" +
      sendRegistrationDetails +
      "?text=" +
      encodeURIComponent(shareMessage);
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
              <div className="drawer-image-container">
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

              {/* <button
                onClick={() => handleDirectSend(item)}
                className="drawer-whatsapp-share-btn">
                <FaWhatsapp /> Share to Status
              </button> */}

              <div className="drawer-phone-input-group">
                <input
                  type="text"
                  placeholder="Enter phone number (e.g. 0771234567)..."
                  value={phoneInputs[item.id] || ""}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  className="drawer-inline-input"
                />
                <button
                  onClick={() => handleDirectSend(item)}
                  className="drawer-whatsapp-share-btn"
                  title="Send to WhatsApp">
                  <FaWhatsapp />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDrawer;
