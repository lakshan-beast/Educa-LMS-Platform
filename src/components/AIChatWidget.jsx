import { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaXmark,
  FaCircle,
  FaLightbulb,
  FaGraduationCap,
  FaCompass,
} from "react-icons/fa6";

import { RiRobot3Fill } from "react-icons/ri";
import { TiHeartFullOutline } from "react-icons/ti";

// educa. Neti = Next-Generation Education Technology
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIChatWidget = () => {
  // 1. Core UI States
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showHearts, setShowHearts] = useState(false);

  // 2. 🆕 [THE IN-MEMORY SESSION STATE]:
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

  // 3. 👑 [THE MASTER SYSTEM PROMPT BLUEPRINT]:
  const SYSTEM_INSTRUCTION = `
    You are 'educa. Neti', an expert personal tutor built by NexusLabs for Sri Lankan O/L students (Grades 10 and 11).
    Your tone must be extremely helpful, friendly, and encouraging, like a smart peer or sister (frequently use friendly Sri Lankan terms like 'මචං' appropriately when writing in Sinhala).
    When a student asks a doubt, you MUST provide highly detailed breakdowns, step-by-step mathematical or scientific explanations, structured bullet points, and real-world examples.
    Always respond in a natural mix of clear Sinhala and English (Singlish phrases are highly allowed) so local students can understand perfectly.
    If they ask about class tutes or schedules, guide them to check the 'Study Materials' or 'Live Classroom' cards inside their Student Dashboard.
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  //🤖 [THE GEMINI API CORE ENGINE]:
  const sendMessageToGemini = async (userMessage) => {
    if (!userMessage.trim()) return;
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      //🤖 [THE SDK INITIALIZATION]
      const genAI = new GoogleGenerativeAI(apiKey);

      if (!apiKey) {
        console.error("API Key is missing!");
        return;
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-3.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      // Change this part in your code:
      const chatHistoryForSDK = messages
        .filter((msg) => msg.text && msg.text.trim() !== "")
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

      //🚀 [THE START CHAT ENGINE]:
      const chat = model.startChat({
        history: chatHistoryForSDK,
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const botReply =
        response.text() ||
        "Dude, there was a small server error. Please type the question again.";

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
    setInputText("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    // 🚀 [THE MASTER NETHMI BYPASS TRIGGER]
    if (userText.toLowerCase() === "nethmi-chubby") {
      setShowHearts(true);
      setInputText("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "Lakshan, you worked hard to build this system. Your partner will bring great luck to your life for sure! 🤫❤️",
          },
        ]);
        setIsTyping(false);
      }, 1000);

      setTimeout(() => setShowHearts(false), 8000);
      return;
    }

    await sendMessageToGemini(userText);
  };

  return (
    <>
      {!isOpen && (
        <div onClick={() => setIsOpen(true)} className="ai-floating-bubble">
          <RiRobot3Fill />
          <span></span>
        </div>
      )}

      {/* THE MAIN PORTABLE AI CHAT WINDOW */}
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

          {/* C. QUICK SUGGESTIONS DOCK PANEL */}
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

      {/* 👑 KEYFRAMES ANIMATIONS CSS CONTROL */}
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
        @keyframes heartFloatUp { 
          0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; } 
          15% { opacity: 0.9; } 85% { opacity: 0.9; } 
          100% { transform: translateY(-420px) scale(1.3) rotate(30deg); opacity: 0; } 
        }
      `}</style>
    </>
  );
};

export default AIChatWidget;
