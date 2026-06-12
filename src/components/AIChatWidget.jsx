import { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaXmark,
  // FaMinus,
  FaCircle,
  FaLightbulb,
  FaGraduationCap,
  FaCompass,
} from "react-icons/fa6"; // 👑 🆕 අපේ ස්මාර්ට් Bot Icons ටික ගත්තා [INDEX 55]

import { RiRobot3Fill } from "react-icons/ri";
import { TiHeartFullOutline } from "react-icons/ti";

// educa. Neti = Next-Generation Education Technology

import { GoogleGenerativeAI } from "@google/generative-ai";

const AIChatWidget = () => {
  // 1. Core UI States
  const [isOpen, setIsOpen] = useState(false); // චැට් බොක්ස් එක ඇරලාද හැංගිලාද (Toggle)
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Bot ටයිප් කරන Indicator එක පාලනයට
  const messagesEndRef = useRef(null); // අලුත් මැසේජ් එකක් ආපු ගමන් ඔටෝම පල්ලෙහාට ස්ක්‍රෝල් කිරීමට

  const [showHearts, setShowHearts] = useState(false);

  // 2. 👑 🆕 [THE IN-MEMORY SESSION STATE]: උඹ ඉල්ලපු, ටැබ් එක වහද්දී මැකී යන සජීවී මතක ලැයිස්තුව!
  const [messages, setMessages] = useState([
    {
      role: "user",
      text: "Hey! Can you help me?",
    },
    {
      role: "model",
      text: "Hello! I'm Neti . How can help your?",
    },
  ]);

  // 3. 👑 🔐 [THE MASTER SYSTEM PROMPT BLUEPRINT]:
  // බොට් හැසිරෙන්න ඕනේ කොහොමද කියලා Google Gemini එකට දෙන රහස් උපදෙස් වැට [INDEX 4]
  const SYSTEM_INSTRUCTION = `
    You are 'educa. Neti', an expert personal tutor built by NexusLabs for Sri Lankan O/L students (Grades 10 and 11) [INDEX 4].
    Your tone must be extremely helpful, friendly, and encouraging, like a smart peer or sister (frequently use friendly Sri Lankan terms like 'මචං' appropriately when writing in Sinhala) [INDEX 4].
    When a student asks a doubt, you MUST provide highly detailed breakdowns, step-by-step mathematical or scientific explanations, structured bullet points, and real-world examples [INDEX 4].
    Always respond in a natural mix of clear Sinhala and English (Singlish phrases are highly allowed) so local students can understand perfectly [INDEX 4].
    If they ask about class tutes or schedules, guide them to check the 'Study Materials' or 'Live Classroom' cards inside their Student Dashboard [INDEX 4].
  `;

  // අලුත් මැසේජ් එකක් ආ සැනින් චැට් එක ලස්සනට පල්ලෙහාට ස්ක්‍රෝල් කරවයි
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 🧠 🤖 [THE GEMINI API CORE ENGINE]: ගූගල් සර්වර් එකත් එක්ක සන්නිවේදනය කර මතකය රකින ප්‍රධාන ලොජික් එක
  const sendMessageToGemini = async (userMessage) => {
    if (!userMessage.trim()) return; // Don't send empty messages
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      // const apiKey = "AQ.Ab8RN6IYDIPYsioLS8VVqAn0jFID4FoS-c5nKAu7-NMxYBWZZQ";

      // 2️⃣ 🤖 [THE SDK INITIALIZATION]: උඩින් import කරපු GoogleGenerativeAI එක පණ ගන්වයි! [INDEX 4]
      const genAI = new GoogleGenerativeAI(apiKey);

      // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.error("API Key is missing!");
        return;
      }
      // const genAI = new GoogleGenAI(); // Missing the API key argument
      // const model = genAI.getGenerativeModel({
      //   model: "gemini-1.5-pro",
      //   systemInstruction: SYSTEM_INSTRUCTION, // අපේ සිංහල උපදෙස් වැට මෙතැනට ලොක් කළා මචං [INDEX 4]
      // });

      const model = genAI.getGenerativeModel({
        model: "gemini-3.5-flash", // Faster and more reliable for web widgets
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      // 3️⃣ පරණ හිස්ට්‍රියම (Context Memory) ගූගල් SDK එකට ගැළපෙන පිරිසිදු ව්‍යුහයට හරවා ගනී [INDEX 4]
      // const chatHistoryForSDK = messages.map((msg) => ({
      //   role: msg.role === "user" ? "user" : "model",
      //   parts: [{ text: msg.text }],
      // }));

      // Change this part in your code:
      const chatHistoryForSDK = messages
        .filter((msg) => msg.text && msg.text.trim() !== "") // Ensure no empty messages
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

      // Add a check: if the first message is from the model, remove it for the SDK
      if (
        chatHistoryForSDK.length > 0 &&
        chatHistoryForSDK[0].role === "model"
      ) {
        chatHistoryForSDK.shift();
      }

      // 4️⃣ 🚀 [THE START CHAT ENGINE]: ගූගල් නිල සන්නිවේදන පාලම ලයිව් ස්ටාර්ට් කරයි! [INDEX 4]
      const chat = model.startChat({
        history: chatHistoryForSDK,
      });

      // ගූගල් නිල සර්වර් එකට මැසේජ් එක ලයිව් යවා විස්තරාත්මක පිළිතුර ලබා ගනී [INDEX 4]
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const botReply =
        response.text() ||
        "Dude, there was a small server error. Please type the question again.";

      // AI පිළිතුර සජීවීව මතක ලිස්තුවට එකතු කරයි (Append) [INDEX 4]
      setMessages((prev) => [...prev, { role: "model", text: botReply }]);
    } catch (error) {
      console.error("Gemini SDK Core Error:", error);

      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Technical connection error occurred!" },
      ]);
    }

    setIsTyping(false);
  };

  // 📣 SEND BUTTON TRIGGER HANDLER
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const userText = inputText.trim();
    setInputText(""); // Input Field එක ක්ලියර් කරයි

    // ළමයා ගැසූ මැසේජ් එක ක්ෂණිකව චැට් එකට දමයි [INDEX 4]
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    // ============================================================
    // 🚀 🔐 [THE MASTER NETHMI BYPASS TRIGGER]: උඹ රහස් වචනය ගැසූ සැනින් හාට්ස් පත්තු කරයි!
    if (userText.toLowerCase() === "nethmi-chubby") {
      setShowHearts(true); // 🔴 හාට්ස් ඇනිමේෂන් එක පත්තු කරයි
      setInputText("");

      setTimeout(() => {
        // තත්පර 2ක් ඇතුළත බොට් විසින් උඹට විතරක් තේරෙන රහස් පණිවිඩය ලියයි මචං [INDEX 4]
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "Lakshan, you worked hard to build this system. Your partner will bring great luck to your life for sure! 🤫❤️",
          },
        ]);
        setIsTyping(false);
      }, 1000);

      // තත්පර 3කින් හාට්ස් වැස්ස ඔටෝම නිවා දමයි
      setTimeout(() => setShowHearts(false), 8000);
      return; // 🚀 Gemini API එකට මැසේජ් එක යැවීම වළක්0වයි (Bypass)
    }

    // ගූගල් සර්වර් එකට ලයිව් යවයි [INDEX 4]
    await sendMessageToGemini(userText);
  };

  return (
    <>
      {/* ==================== 📱 👑 🆕 1. THE FLOATING GLOWING BOT BUTTON ==================== */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="ai-floating-bubble"
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #03204b 0%, #0265f8 100%)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "1.8rem",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(75,107,251,0.35)",
            zIndex: 999999,
            transition: "0.3s ease",
          }}>
          <RiRobot3Fill className="bot-icon-bounce" />
          {/* සජීවීව බ්ලින්ක් වෙන කොළ පාට Online Signal එක */}
          <span
            style={{
              position: "absolute",
              bottom: "2px",
              right: "2px",
              width: "16px",
              height: "16px",
              //   background: "#2ecc71",
              background: "#fd473a",
              borderRadius: "50%",
              border: "2px solid white",
            }}></span>
        </div>
      )}

      {/* ==================== 🖥️ 👑 🆕 2. THE MAIN PORTABLE AI CHAT WINDOW ==================== */}
      {isOpen && (
        <div
          className="ai-chat-window-card"
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            width: "380px",
            maxWidth: "100%",
            height: "600px",
            background: "white",
            borderRadius: "24px",
            boxShadow: "0 12px 40px rgba(26,10,84,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999999,
            border: "1px solid #eef2ff",
            animation: "popupFade 0.3s ease",
          }}>
          {/* ============================================================ */}
          {/* 🔴 👑 🆕 [THE SECRET NETHMI HEARTS RAIN INTERFACE]: 
              showHearts එක true වුණු සැනින් වෙන වෙනම පැතිවලින් හාට්ස් 8ක් පාවේ! */}
          {showHearts && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 99999,
                overflow: "hidden",
              }}>
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "15%",
                  fontSize: "1.5rem",
                  animation: "heartFloatUp 2.2s ease-in-out infinite",
                  color: "#fc2212",
                }}>
                {/* ❤️ */}
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "30%",
                  fontSize: "1.8rem",
                  animation: "heartFloatUp 2.8s ease-in-out infinite",
                  animationDelay: "0.2s",
                  color: "#fc2212",
                }}>
                {/* ❤️ */}
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "45%",
                  fontSize: "1.4rem",
                  animation: "heartFloatUp 2.0s ease-in-out infinite",
                  animationDelay: "0.5s",
                  color: "#fc2212",
                }}>
                {/* ❤️ */}
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "60%",
                  fontSize: "2.0rem",
                  animation: "heartFloatUp 2.5s ease-in-out infinite",
                  animationDelay: "0.1s",
                  color: "#fc2212",
                }}>
                {/* ❤️ */}
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "75%",
                  fontSize: "1.6rem",
                  animation: "heartFloatUp 2.3s ease-in-out infinite",
                  animationDelay: "0.4s",
                  color: "#fc2212",
                }}>
                {/* ❤️ */}
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "85%",
                  fontSize: "1.3rem",
                  animation: "heartFloatUp 2.7s ease-in-out infinite",
                  animationDelay: "0.3s",
                  color: "#fc2212",
                }}>
                {/* ❤️ */}
                <TiHeartFullOutline />
              </span>
            </div>
          )}
          {/* ============================================================ */}

          {/* A. CHAT WINDOW HEADER CONTAINER */}
          <div
            style={{
              background: "linear-gradient(135deg, #03204b 0%, #001431 100%)",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.3rem",
                }}>
                <RiRobot3Fill style={{ color: "#e9ecf0" }} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    fontWeight: "800",
                    letterSpacing: "0.3px",
                  }}>
                  educa. • Neti
                </h4>
                <small
                  style={{
                    color: "#2ecc71",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontWeight: "700",
                    fontSize: "0.72rem",
                    marginTop: "2px",
                  }}>
                  <FaCircle
                    style={{
                      fontSize: "0.5rem",
                      animation: "heartBeat 1s infinite",
                    }}
                  />{" "}
                  Active Now
                </small>
              </div>
            </div>

            {/* Header Control Window Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "1.3rem",
                opacity: 0.8,
              }}>
              {/* <FaMinus
                title="Minimize"
                onClick={() => setIsOpen(false)}
                style={{ cursor: "pointer" }}
              /> */}
              <FaXmark
                title="Close Chat"
                onClick={() => setIsOpen(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          {/* B. CHAT MESSAGES LOG STREAM */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "#f8faff",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  width: "100%",
                }}>
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "12px 16px",
                    borderRadius:
                      msg.role === "user"
                        ? "18px 18px 0 18px"
                        : "18px 18px 18px 0",
                    background: msg.role === "user" ? "#4b6bfb" : "white",
                    color: msg.role === "user" ? "white" : "#03204b",
                    fontSize: "0.86rem",
                    lineHeight: "1.5",
                    fontWeight: "500",
                    boxShadow:
                      msg.role === "user"
                        ? "0 4px 10px rgba(75,107,251,0.15)"
                        : "0 3px 10px rgba(0,0,0,0.02)",
                    textAlign: "left",
                    whiteSpace: "pre-line", // AI එකෙන් දෙන නිව් ලයින් ලස්සනට පෙන්වයි [INDEX 4]
                  }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* ⏳ BOT IS TYPING LIVE INDICATOR ANIMATION */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}>
                <div
                  style={{
                    background: "white",
                    padding: "12px 18px",
                    borderRadius: "18px 18px 18px 0",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}>
                  <span
                    style={{
                      color: "#777",
                      fontSize: "0.78rem",
                      fontWeight: "bold",
                      marginRight: "4px",
                    }}>
                    Neti is thinking
                  </span>
                  <div
                    className="typing-dot"
                    style={{
                      width: "5px",
                      height: "5px",
                      background: "#4b6bfb",
                      borderRadius: "50%",
                      animation: "dotBounce 1.4s infinite",
                      animationDelay: "0s",
                    }}></div>
                  <div
                    className="typing-dot"
                    style={{
                      width: "5px",
                      height: "5px",
                      background: "#4b6bfb",
                      borderRadius: "50%",
                      animation: "dotBounce 1.4s infinite",
                      animationDelay: "0.2s",
                    }}></div>
                  <div
                    className="typing-dot"
                    style={{
                      width: "5px",
                      height: "5px",
                      background: "#4b6bfb",
                      borderRadius: "50%",
                      animation: "dotBounce 1.4s infinite",
                      animationDelay: "0.4s",
                    }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* C. QUICK SUGGESTIONS DOCK PANEL: ළමයාට ලේසියෙන් ක්ලික් කර ප්‍රශ්න ඇසීමට */}
          <div
            style={{
              background: "white",
              padding: "10px 15px 5px",
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              borderTop: "1px solid #f1f5f9",
              whiteSpace: "nowrap",
            }}>
            <button
              type="button"
              onClick={() => {
                setInputText(
                  "O/L විභාගයට මාස 3ක පට්ටම ප්‍රැක්ටිකල් පාඩම් Time Table එකක් හදලා දියන් මචං.",
                );
              }}
              style={{
                background: "#f1f5f9",
                color: "#1a0a54",
                border: "none",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}>
              <FaGraduationCap style={{ color: "#4b6bfb", fontSize: "1rem" }} />{" "}
              Study Plan
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText(
                  "Maths වල ත්‍රිකෝණමිතිය සයින් නීතිය (Sine Rule) සරලව කියලා දෙන්න.",
                );
              }}
              style={{
                background: "#f1f5f9",
                color: "#1a0a54",
                border: "none",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}>
              <FaLightbulb style={{ color: "#f1c40f", fontSize: "1rem" }} />{" "}
              Sine Rule
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText(
                  "සර්ගේ 10 වසරේ පළමු පාඩමේ Science Tute එක බාගන්න ඕනේ කොහොමද කරන්නේ?",
                );
              }}
              style={{
                background: "#f1f5f9",
                color: "#1a0a54",
                border: "none",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}>
              <FaCompass style={{ color: "#2ecc71", fontSize: "1rem" }} /> Tute
              Finder
            </button>
          </div>

          {/* D. BOTTOM INPUT CONTROL DOCK FORM */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              background: "white",
              padding: "12px 15px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderTop: "1px solid #edf2f9",
            }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything from Neti..."
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "0.85rem",
                outline: "none",
                background: "#f8faff",
              }}
            />
            <button
              type="submit"
              disabled={inputText.trim() === "" || isTyping}
              style={{
                background: "#4b6bfb",
                color: "white",
                border: "none",
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(75,107,251,0.2)",
                transition: "0.2s",
                opacity: inputText.trim() === "" || isTyping ? 0.6 : 1,
              }}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {/* ==================== 👑 KEYFRAMES ANIMATIONS CSS CONTROL ==================== */}
      <style>{`
        @keyframes popupFade {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .bot-icon-bounce {
          animation: botBounce 2.5s infinite ease-in-out;
        }
        @keyframes botBounce {
          0%, 100% { transform: translateY(0) ; }
          50% { transform: translateY(-4px) ; }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px) opacity: 1; }
        }
@keyframes heartFloatUp { 0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; } 15% { opacity: 0.9; } 85% { opacity: 0.9; } 100% { transform: translateY(-420px) scale(1.3) rotate(30deg); opacity: 0; } }
      `}</style>
    </>
  );
};

export default AIChatWidget;
