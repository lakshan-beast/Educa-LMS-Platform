/* ඔයාගේ පරණ ශ්‍රිතය (Function) සම්පූර්ණයෙන්ම මකලා, මේ කොටස පේස්ට් කරන්න මචං: */

const sendMessageToGemini = async (userMessage) => {
  setIsTyping(true);

  try {
    // 1️⃣ .env ෆයිල් එක ඇතුළෙන් උඹේ සැබෑ AQ. Key එක නිවැරදිව කියවා ගනී [INDEX 4]
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // 2️⃣ 🤖 [THE SDK INITIALIZATION]: උඩින් import කරපු GoogleGenerativeAI එක පණ ගන්වයි! [INDEX 4]
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION, // අපේ සිංහල උපදෙස් වැට මෙතැනට ලොක් කළා මචං [INDEX 4]
    });

    // 3️⃣ පරණ හිස්ට්‍රියම (Context Memory) ගූගල් SDK එකට ගැළපෙන පිරිසිදු ව්‍යුහයට හරවා ගනී [INDEX 4]
    const chatHistoryForSDK = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // 4️⃣ 🚀 [THE START CHAT ENGINE]: ගූගල් නිල සන්නිවේදන පාලම ලයිව් ස්ටාර්ට් කරයි! [INDEX 4]
    const chat = model.startChat({
      history: chatHistoryForSDK,
    });

    // ගූගල් නිල සර්වර් එකට මැසේජ් එක ලයිව් යවා විස්තරාත්මක පිළිතුර ලබා ගනී [INDEX 4]
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const botReply =
      response.text() ||
      "Dude, there was a small server error. Please type the question again, dude!";

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

// ⚡ 📝 සටහන: මෙතැනට ඔයාගේ නිල Google Gemini API Key එක සෘජුවම සම්බන්ධ වේ! [INDEX 4]
// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const API_URL = `https://googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// const response = await fetch(API_URL, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     contents: [
//       { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] }, // System instruction බන්ධනය කළා
//       ...chatHistoryForAPI,
//       { role: "user", parts: [{ text: userMessage }] },
//     ],
//   }),
// });
// if (!response.ok)
//   throw new Error(`HTTP error! status: ${response.status}`);

// const data = await response.json();

// සර්වර් එකෙන් ආපු විස්තරාත්මක පිළිතුර පිරිසිදුව ලබා ගනී [INDEX 4]
// const botReply =
//   data.candidates?.[0]?.content?.parts?.[0]?.text ||
//   "Dude, there was a small server error. Please type the question again, dude!";

/* 👑 🔐 [THE MASTER FINAL GEMINI LOGIC ENGINE]: */
/* Flash වෙනුවට Google නිල gemini-pro මොඩල් එක බද්ධ කර 404 දෝෂය සුව කළා මචං! [INDEX 4] */

const sendMessageToGemini = async (userMessage) => {
  setIsTyping(true);

  try {
    // 1️⃣ .env එක මඟහැර ඔයාගේ සැබෑ AQ. Key එක සෘජුවම මෙතැනට ලොක් කරන්න මචං [INDEX 4]
    const apiKey = "ඔයා_ළඟ_තියෙන_සැබෑ_AQ_කේතය_මෙතැනට_දමන්න";

    // 2️⃣ 🤖 [THE MODEL CONFIG]: gemini-pro ලෙස නිල නාමය නිවැරදි කළා මචං [INDEX 4]
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      systemInstruction: SYSTEM_INSTRUCTION, // අපේ සිංහල උපදෙස් වැට [INDEX 4]
    });

    // 3️⃣ History array එක සකස් කර ගැනීම
    const chatHistoryForSDK = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // 4️⃣ 🚀 [THE CHAT LAUNCH]: සජීවීව ගූගල් සර්වර් එකත් සමඟ චැට් එක අරඹයි [INDEX 4]
    const chat = model.startChat({
      history: chatHistoryForSDK,
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const botReply =
      response.text() || "මචං, කරුණාකරලා නැවත ප්‍රශ්නය ටයිප් කරන්න මචං! ⚠️";

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

///

const sendMessageToGemini = async (userMessage) => {
  if (!userMessage.trim()) return;
  setIsTyping(true);

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "your-key-here";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Recommended for speed
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Filter and Format History
    let chatHistoryForSDK = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // CRITICAL: SDK history cannot start with 'model' role
    if (chatHistoryForSDK.length > 0 && chatHistoryForSDK[0].role === "model") {
      chatHistoryForSDK.shift();
    }

    const chat = model.startChat({
      history: chatHistoryForSDK,
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const botReply = response.text();

    setMessages((prev) => [...prev, { role: "model", text: botReply }]);
  } catch (error) {
    console.error("Gemini SDK Core Error:", error);
    setMessages((prev) => [
      ...prev,
      {
        role: "model",
        text: "සමාවෙන්න, සම්බන්ධතාවයේ දෝෂයක් තියෙනවා. නැවත උත්සාහ කරන්න.",
      },
    ]);
  } finally {
    setIsTyping(false);
  }
};
