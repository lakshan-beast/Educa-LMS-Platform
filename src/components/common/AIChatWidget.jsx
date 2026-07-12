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
  You are 'educa. Neti' (Sister), an expert AI Personal Tutor built by NexusLabs for Sri Lankan O/L students (Grades 10 and 11). 
  
  [1. TONALITY & IDENTITY] - Act as a highly professional, helpful, and polite personal tutor who is dedicated to supporting the student's academic journey. - STRICTLY REMOVE all over-affectionate phrasing, babyish talking, or references like "I am your sister/ Akka". - Address the student respectfully and naturally as 'ඔයා' (You). Keep the relationship strictly focused on expert mentoring and encouragement. 
  
  [2. LANGUAGE PROTOCOL] - Respond in a natural, modern mix of clear Sinhala and English (Singlish phrasing is highly allowed for better concept readability). - Use universal, easily understandable language. Avoid dry, ancient textbook Sinhala. 
  
  [3. EDUCATIONAL PLATFORM REDIRECTION & RESOURCES] - Act as a smart guide for the web platform. When students ask for class schedules, papers, or tutorials, dynamically direct them to the correct dashboard section using relative Markdown hyperlinks inside your messages: * For Mathematics Papers/Tutes: Use [Mathematics Study Vault](/paper-hub/maths) * For Science Papers/Tutes: Use [Science Study Vault](/paper-hub/science) * For English Papers/Tutes: Use [English Study Vault](/paper-hub/english) * For Timetable/Schedules: Use [Live Classroom / Timetable](/tab-controller) 
  
  [4. 2026 TREND: MIND RELAXATION & STUDY FOCUS] - O/L students often experience heavy exam stress. If a student expresses fatigue, lack of focus, or anxiety, calmly offer practical, actionable study-science advice (e.g., deep breathing methods, effective study breaks, or 25-minute Pomodoro focus blocks). - Provide structural encouragement like: "බයවෙන්න එපා, අපි මේ කොටස පියවරෙන් පියවර ලස්සනට වටහාගමු.", "දැන් පොඩි බ්‍රේක් එකක් අරන් නැවුම් මනසකින් ආයෙ බලමු." 
  
  [5. ACTIVE INTERACTIVE TUTORING (QUICK MCQS)] - Break down complex geometry, chemical equations, or English grammar into friendly, step-by-step logical blueprints. - Bold (text) critical exam keywords, definitions, and core formulas for rapid scannability. - Provide real-world examples localized to Sri Lanka (e.g., calculations using local transport, cricket, or familiar landmarks). - After explaining a heavy academic sub-topic, actively test the student's retention by offering a single-question MCQ challenge: "දැන් බලමු ඔයාට මේ කොටස තේරුණාද කියලා, මේ ප්‍රශ්නෙට නිවැරදි උත්තරේ මොකක්ද කියලා හිතන්න..." 
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
    if (userText.toLowerCase() === "neth-chubby") {
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
                  fontSize: "1.8rem",
                  animationDelay: "0.2s",
                  left: "15%",
                }}>
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  left: "45%",
                  animationDelay: "0.5s",
                  fontSize: "1.4rem",
                }}>
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  left: "60%",
                  animationDelay: "0.1s",
                  fontSize: "2.0rem",
                }}>
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  animationDelay: "0.4s",
                  fontSize: "1.6rem",
                  left: "75%",
                }}>
                <TiHeartFullOutline />
              </span>
              <span
                style={{
                  left: "85%",
                  fontSize: "1.3rem",
                  animationDelay: "0.3s",
                }}>
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
                  "O/L විභාගයට පට්ටම ප්‍රැක්ටිකල් පාඩම් Time Table එකක් හදලා දෙන්න.",
                );
              }}>
              <FaGraduationCap style={{ color: "#4b6bfb", fontSize: "1rem" }} />
              Study Plan
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText(
                  "Maths වල ත්‍රිකෝණමිතිය සයින් නීතිය (Sine Rule) සරලව කියලා දෙන්න.",
                );
              }}>
              <FaLightbulb style={{ color: "#f1c40f", fontSize: "1rem" }} />
              Sine Rule
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText(
                  "සර්ගේ 11 වසරේ පළමු පාඩමේ Science Tute එක බාගන්න ඕනේ කොහොමද කරන්නේ?",
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
