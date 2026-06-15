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
        <div onClick={() => setIsOpen(true)} className="ai-floating-bubble">
          <RiRobot3Fill />
          <span></span>
        </div>
      )}

      {/* ==================== 🖥️ 👑 🆕 2. THE MAIN PORTABLE AI CHAT WINDOW ==================== */}
      {isOpen && (
        <div className="ai-chat-window-card">
          {showHearts && (
            <div className="heart-container">
              <span>
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
          <div className="chat-window-container">
            <div className="chat-header">
              <div className="chat-logo">
                <RiRobot3Fill className="icon bot-icon-bounce" />
              </div>
              <div className="chat-top">
                <h4>educa. • Neti</h4>
                <small>
                  <FaCircle className="active-vall" />
                  Active Now
                </small>
              </div>
            </div>

            {/* Header Control Window Buttons */}
            <div className="window-control">
              <FaXmark
                title="Close Chat"
                onClick={() => setIsOpen(false)}
                className="close-mark"
              />
            </div>
          </div>

          {/* B. CHAT MESSAGES LOG STREAM */}
          <div className="chat-message">
            {messages.map((msg, index) => (
              <div
                className="message-container"
                key={index}
                style={{
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                <div
                  className="message-text"
                  style={{
                    borderRadius:
                      msg.role === "user"
                        ? "18px 18px 0 18px"
                        : "18px 18px 18px 0",
                    background: msg.role === "user" ? "#4b6bfb" : "white",
                    color: msg.role === "user" ? "white" : "#03204b",
                    boxShadow:
                      msg.role === "user"
                        ? "0 4px 10px rgba(75,107,251,0.15)"
                        : "0 3px 10px rgba(0,0,0,0.02)",
                  }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* ⏳ BOT IS TYPING LIVE INDICATOR ANIMATION */}
            {isTyping && (
              <div className="typing-container">
                <div className="typing-content">
                  <span>Neti is searching</span>
                  <div
                    className="typing-dot"
                    style={{
                      animationDelay: "0s",
                    }}></div>
                  <div
                    className="typing-dot"
                    style={{
                      animationDelay: "0.2s",
                    }}></div>
                  <div
                    className="typing-dot"
                    style={{
                      animationDelay: "0.4s",
                    }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* C. QUICK SUGGESTIONS DOCK PANEL: ළමයාට ලේසියෙන් ක්ලික් කර ප්‍රශ්න ඇසීමට */}
          <div className="suggest-conatiner">
            <button
              type="button"
              onClick={() => {
                setInputText(
                  "O/L විභාගයට මාස 3ක පට්ටම ප්‍රැක්ටිකල් පාඩම් Time Table එකක් හදලා දියන් මචං.",
                );
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
              }}>
              <FaCompass style={{ color: "#2ecc71", fontSize: "1rem" }} /> Tute
              Finder
            </button>
          </div>

          {/* D. BOTTOM INPUT CONTROL DOCK FORM */}
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything from Neti..."
              style={{}}
            />
            <button
              type="submit"
              disabled={inputText.trim() === "" || isTyping}
              style={{
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
