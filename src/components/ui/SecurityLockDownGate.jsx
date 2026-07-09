// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";
// import { FaCircleXmark, FaTerminal } from "react-icons/fa6";

// const SecurityLockdownGate = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ☁️ 1. SAFE DEFENSIVE AUDIT: අනවසරයෙන් පැමිණි විස්තර Cloud එකට ලියා තැබීම [INDEX 51]
//     const logIntrusionAttempt = async () => {
//       try {
//         await addDoc(collection(db, "security_audits"), {
//           event: "UNAUTHORIZED_URL_ACCESS_ATTEMPT",
//           capturedAt: new Date().toISOString(),
//           userAgent: navigator.userAgent, // බ්‍රවුසර් වර්ගය සහ පරිගණක විස්තරය ගනී
//           status: "BLOCKED",
//         });
//       } catch (err) {
//         console.error("Audit System Truncated:", err);
//       }
//     };
//     logIntrusionAttempt();
//   }, []);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "#050505",
//         color: "#ff3333",
//         fontFamily: "'Courier New', Courier, monospace",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 999999,
//         overflow: "hidden",
//         padding: "20px",
//       }}>
//       {/* 🔴 HOLLYWOOD STYLE SECURITY LOCK BOX [INDEX 4] */}
//       <div
//         style={{
//           border: "2px solid #ff3333",
//           padding: "40px",
//           borderRadius: "8px",
//           background: "rgba(255, 0, 0, 0.03)",
//           textAlign: "center",
//           maxWidth: "600px",
//           boxShadow: "0 0 30px rgba(255,51,51,0.2)",
//         }}>
//         <FaCircleXmark
//           style={{
//             fontSize: "3.5rem",
//             marginBottom: "15px",
//             animation: "pulseAlert 1s infinite alternate",
//           }}
//         />
//         <h1
//           style={{
//             fontSize: "1.8rem",
//             margin: "0 0 10px 0",
//             letterSpacing: "1px",
//             fontStyle: "italic",
//           }}>
//           [ SECURITY INTRUSION BLOCK ]
//         </h1>
//         <p
//           style={{
//             color: "#8b949e",
//             fontSize: "0.85rem",
//             marginBottom: "20px",
//           }}>
//           CRITICAL EXPLOIT PREVENTION PROTOCOL ENGAGED SUB-TERMINAL CLOSED.
//         </p>

//         {/* RUNNING ERROR CODES EFFECT LOGS [INDEX 4] */}
//         <div
//           style={{
//             background: "#000000",
//             padding: "15px",
//             border: "1px solid #331111",
//             borderRadius: "4px",
//             textAlign: "left",
//             fontSize: "0.8rem",
//             color: "#00ff66",
//             maxHeight: "150px",
//             overflow: "hidden",
//           }}>
//           <code style={{ display: "block", color: "#ff3333" }}>
//             <FaTerminal /> CoreShield v2.0: Access Gated...
//           </code>
//           <code>&gt; Evaluating system memory stack bounds... [OK]</code>
//           <code>&gt; Session validation integrity failed... [403]</code>
//           <code style={{ color: "#ffaa00" }}>
//             &gt; Target structural node localized and encrypted.
//           </code>
//           <code>&gt; Forensic audit log packet dispatched to main ledger.</code>
//         </div>

//         <button
//           onClick={() => navigate("/login")}
//           style={{
//             marginTop: "25px",
//             background: "#ff3333",
//             color: "white",
//             border: "none",
//             padding: "10px 25px",
//             borderRadius: "4px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             fontFamily: "sans-serif",
//           }}>
//           Return to Terminal Gate
//         </button>
//       </div>

//       <style>{`@keyframes pulseAlert {
//           0% { transform: scale(0.96); opacity: 0.6; }
//           100% { transform: scale(1.04); opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SecurityLockdownGate;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

// const SecurityLockdownGate = () => {
//   const navigate = useNavigate();
//   const [terminalText, setTerminalText] = useState("");

//   // 📝 උඹ එවපු පට්ටම Hacker Scripts ටික [INDEX 4]
//   const cyberScripts = [
//     "sudo apt update -y && sudo apt upgrade -y",
//     "nmap -sV -sC -A -T4 ://netilearn.com",
//     "ping -c 1000 -f 8.8.8.8",
//     "hydra -l admin -P rockyou.txt ssh://gated.node",
//     "sqlmap -u http://target.com?id=1 --dbs --batch",
//     "CRITICAL_ERROR: Unauthorized token handshake detected.",
//     "FIREWALL_ALERT: Security breach blocked on port 443.",
//     "PACKET_CAPTURE: Administrative ledger bounds verified... [LOCKED]",
//     "SYSTEM_LOG: Intruding device telemetry captured successfully.",
//   ];

//   useEffect(() => {
//     // A. SAFE DEFENSIVE AUDIT LOG SYSTEM [INDEX 4, 51]
//     const logIntrusionAttempt = async () => {
//       try {
//         await addDoc(collection(db, "security_audits"), {
//           event: "MALICIOUS_URL_INTRUSION_BLOCKED",
//           capturedAt: new Date().toISOString(),
//           status: "CONTAINED",
//         });
//       } catch (err) {
//         console.error("Audit Failure:", err);
//       }
//     };
//     logIntrusionAttempt();

//     // 🖥️ B. THE TEXTAREA SCROLL MATRIX (උඹ එවපු ලස්සන auto-typing මැජික් එක!) [INDEX 4]
//     const scriptTimer = setInterval(() => {
//       setTerminalText((prev) => {
//         const randomLine =
//           cyberScripts[Math.floor(Math.random() * cyberScripts.length)];
//         return prev + randomLine + "\n";
//       });
//     }, 100);

//     return () => clearInterval(scriptTimer);
//   }, []);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "black",
//         color: "#00ff00",
//         fontFamily: "monospace",
//         zIndex: 9999999,
//         overflow: "hidden",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}>
//       {/* BACKGROUND MATRIX: උඹ එවපු සජීවීව දුවන කොළ පාට කේත පුවරුව */}
//       <textarea
//         value={terminalText}
//         readOnly
//         style={{
//           width: "100%",
//           height: "100vh",
//           background: "black",
//           color: "#00ff00",
//           border: "none",
//           fontSize: "11px",
//           fontFamily: "monospace",
//           padding: "15px",
//           resize: "none",
//           pointerEvents: "none",
//           opacity: 0.15,
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       />

//       {/* 🔴 FOREGROUND: HORIZONTAL CENTER HOLLYWOOD ALERT CARD */}
//       <div
//         className="hollywood-lock-frame"
//         style={{
//           border: "3px solid #ff3333",
//           padding: "40px",
//           width: "520px",
//           background: "rgba(0, 0, 0, 0.9)",
//           textAlign: "center",
//           borderRadius: "10px",
//           boxShadow: "0 0 50px rgba(255, 51, 51, 0.3)",
//           zIndex: 10,
//           position: "relative",
//         }}>
//         {/* FLASHING RED NEON ALERT LIGHT */}
//         <div
//           style={{
//             width: "24px",
//             height: "24px",
//             background: "#ff3333",
//             borderRadius: "50%",
//             margin: "0 auto 15px auto",
//             boxShadow: "0 0 20px #ff3333",
//             animation: "neonFlash 0.6s infinite alternate",
//           }}></div>

//         <h1
//           style={{
//             color: "#ff3333",
//             fontSize: "1.7rem",
//             fontWeight: "bold",
//             margin: "0 0 10px 0",
//             letterSpacing: "2px",
//           }}>
//           ⛔ ACCESS DENIED
//         </h1>
//         <h3
//           style={{
//             color: "#ffffff",
//             fontSize: "1rem",
//             margin: "0 0 20px 0",
//             opacity: 0.9,
//           }}>
//           [ SECURITY BREACH DETECTED ]
//         </h3>

//         <p
//           style={{
//             color: "#8b949e",
//             fontSize: "0.82rem",
//             lineHeight: "1.5",
//             margin: "0 0 25px 0",
//           }}>
//           Your cryptographic handshake token is invalid. This terminal junction
//           is restricted to authorized faculty members only. Forensic payload
//           dispatched to main cluster [INDEX 4].
//         </p>

//         {/* RETURN BUTTON */}
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             background: "#ff3333",
//             color: "white",
//             border: "none",
//             padding: "12px 30px",
//             fontSize: "0.85rem",
//             fontWeight: "bold",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontFamily: "sans-serif",
//             letterSpacing: "1px",
//             boxShadow: "0 4px 15px rgba(255,51,51,0.3)",
//           }}>
//           RETURN TO PORTAL TERMINAL
//         </button>
//       </div>
//       <style>{`@keyframes neonFlash {
//           0% { opacity: 0.2; transform: scale(0.9); }
//           100% { opacity: 1; transform: scale(1.1); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SecurityLockdownGate;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

// const SecurityLockdownGate = () => {
//   const navigate = useNavigate();
//   const [terminalText, setTerminalText] = useState("");

//   // 📝 උඹ එවපු පට්ටම Hacker Scripts ටික [INDEX 4]
//   const cyberScripts = [
//     "sudo apt update -y && sudo apt upgrade -y",
//     "nmap -sV -sC -A -T4 ://netilearn.com",
//     "ping -c 1000 -f 8.8.8.8",
//     "hydra -l admin -P rockyou.txt ssh://gated.node",
//     "sqlmap -u http://target.com --dbs --batch",
//     "CRITICAL_ERROR: Unauthorized token handshake detected.",
//     "FIREWALL_ALERT: Security breach blocked on port 443.",
//     "PACKET_CAPTURE: Administrative ledger bounds verified... [LOCKED]",
//     "SYSTEM_LOG: Intruding device telemetry captured successfully.",
//   ];

//   useEffect(() => {
//     // ☁️ A. SAFE DEFENSIVE AUDIT LOG SYSTEM [INDEX 4, 51]
//     const logIntrusionAttempt = async () => {
//       try {
//         await addDoc(collection(db, "security_audits"), {
//           event: "MALICIOUS_URL_INTRUSION_BLOCKED",
//           capturedAt: new Date().toISOString(),
//           status: "CONTAINED",
//         });
//       } catch (err) {
//         console.error("Audit Failure:", err);
//       }
//     };
//     logIntrusionAttempt();

//     // 🖥️ B. THE TEXTAREA SCROLL MATRIX (උඹ එවපු සජීවී auto-typing මැජික් එක!) [INDEX 4]
//     const scriptTimer = setInterval(() => {
//       setTerminalText((prev) => {
//         const randomLine =
//           cyberScripts[Math.floor(Math.random() * cyberScripts.length)];
//         return prev + randomLine + "\n";
//       });
//     }, 800); // 👈 කේත පේළි කියවන්න ලෙහෙසි වෙන්න වේගය පොඩ්ඩක් හැදුවා මචං

//     return () => clearInterval(scriptTimer);
//   }, []);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "black",
//         color: "#00ff00",
//         fontFamily: "monospace",
//         zIndex: 9999999,
//         overflow: "hidden",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}>
//       {/* 👑 FIXED BACKGROUND MATRIX: උඹ එවපු 100% Bright තද කොළ පාටින් දුවන කේත පුවරුව [INDEX 4] */}
//       <textarea
//         value={terminalText}
//         readOnly
//         style={{
//           width: "100%",
//           height: "100vh",
//           background: "black",
//           color: "#00ff00",
//           border: "none",
//           fontSize: "13px", // අකුරු ටිකක් ලොකු කළා පෙනෙන්න [INDEX 4]
//           fontFamily: "monospace",
//           padding: "20px",
//           resize: "none",
//           pointerEvents: "none",
//           opacity: 0.8, // 👈 FIXED: ලාවට පෙනුණු එක සහමුලින්ම තද කොළ පාටට හැදුවා!
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       />

//       {/* 🔴 FOREGROUND: HORIZONTAL CENTER HOLLYWOOD ALERT CARD */}
//       <div
//         className="hollywood-lock-frame"
//         style={{
//           border: "3px solid #ff3333",
//           padding: "40px",
//           width: "520px",
//           background: "rgba(0, 0, 0, 0.95)",
//           textAlign: "center",
//           borderRadius: "10px",
//           boxShadow: "0 0 50px rgba(255, 51, 51, 0.4)",
//           zIndex: 10,
//           position: "relative",
//         }}>
//         {/* FLASHING RED NEON ALERT LIGHT */}
//         <div
//           style={{
//             width: "24px",
//             height: "24px",
//             background: "#ff3333",
//             borderRadius: "50%",
//             margin: "0 auto 15px auto",
//             boxShadow: "0 0 20px #ff3333",
//             animation: "neonFlash 0.6s infinite alternate",
//           }}></div>

//         <h1
//           style={{
//             color: "#ff3333",
//             fontSize: "1.7rem",
//             fontWeight: "bold",
//             margin: "0 0 10px 0",
//             letterSpacing: "2px",
//           }}>
//           ⛔ ACCESS DENIED
//         </h1>
//         <h3
//           style={{
//             color: "#ffffff",
//             fontSize: "1rem",
//             margin: "0 0 20px 0",
//             opacity: 0.9,
//           }}>
//           [ SECURITY BREACH DETECTED ]
//         </h3>

//         <p
//           style={{
//             color: "#8b949e",
//             fontSize: "0.82rem",
//             lineHeight: "1.5",
//             margin: "0 0 25px 0",
//           }}>
//           Your cryptographic handshake token is invalid. This terminal junction
//           is restricted to authorized faculty members only. Forensic payload
//           dispatched to main cluster [INDEX 4].
//         </p>
//         {/* RETURN BUTTON */}
//         <button
//           onClick={() => navigate("/login")}
//           style={{
//             background: "#ff3333",
//             color: "white",
//             border: "none",
//             padding: "12px 30px",
//             fontSize: "0.85rem",
//             fontWeight: "bold",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontFamily: "sans-serif",
//             letterSpacing: "1px",
//             boxShadow: "0 4px 15px rgba(255,51,51,0.3)",
//           }}>
//           RETURN TO PORTAL TERMINAL
//         </button>
//       </div>

//       <style>{`@keyframes neonFlash {
//           0% { opacity: 0.2; transform: scale(0.9); }
//           100% { opacity: 1; transform: scale(1.1); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SecurityLockdownGate;

// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

// // 👑 FIXED: cyberScripts ලැයිස්තුව Component එකෙන් පිටතට ගැනීමෙන් Dependency Warning එක සදහටම නැති කළා! [INDEX 4]
// const cyberScripts = [
//   "sudo apt update -y && sudo apt upgrade -y",
//   "nmap -sV -sC -A -T4 ://netilearn.com",
//   "ping -c 1000 -f 8.8.8.8",
//   "hydra -l admin -P rockyou.txt ssh://gated.node",
//   "sqlmap -u http://target.com --dbs --batch",
//   "CRITICAL_ERROR: Unauthorized token handshake detected.",
//   "FIREWALL_ALERT: Security breach blocked on port 443.",
//   "PACKET_CAPTURE: Administrative ledger bounds verified... [LOCKED]",
//   "SYSTEM_LOG: Intruding device telemetry captured successfully.",
// ];

// const SecurityLockdownGate = () => {
//   const navigate = useNavigate();
//   const [terminalText, setTerminalText] = useState("");
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     // A. SAFE DEFENSIVE AUDIT LOG SYSTEM [INDEX 4, 51]
//     const logIntrusionAttempt = async () => {
//       try {
//         await addDoc(collection(db, "security_audits"), {
//           event: "MALICIOUS_URL_INTRUSION_BLOCKED",
//           capturedAt: new Date().toISOString(),
//           status: "CONTAINED",
//         });
//       } catch (err) {
//         console.error("Audit Failure:", err);
//       }
//     };
//     logIntrusionAttempt();

//     // 🖥️ B. THE TEXTAREA SCROLL MATRIX (සජීවීව කේත පේළි පල්ලෙහාට දුවන කෑල්ල!) [INDEX 4]
//     const scriptTimer = setInterval(() => {
//       setTerminalText((prev) => {
//         const randomLine =
//           cyberScripts[Math.floor(Math.random() * cyberScripts.length)];
//         const nextText = prev + randomLine + "\n";

//         // AUTO SCROLL TO BOTTOM [INDEX 4]
//         if (textareaRef.current) {
//           setTimeout(() => {
//             textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
//           }, 0);
//         }
//         return nextText;
//       });
//     }, 150);

//     return () => clearInterval(scriptTimer);
//   }, []); // 👈 දැන් මේ හිස් Array එක 100%ක්ම නීත්‍යානුකූලයි, කිසිම Warning එකක් එන්නේ නැහැ! [INDEX 4]

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "black",
//         color: "#00ff00",
//         fontFamily: "monospace",
//         zIndex: 9999999,
//         overflow: "hidden",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}>
//       {/* BACKGROUND MATRIX */}
//       <textarea
//         ref={textareaRef}
//         value={terminalText}
//         readOnly
//         autoFocus
//         style={{
//           width: "100%",
//           height: "100vh",
//           background: "black",
//           color: "#00ff00",
//           border: "none",
//           fontSize: "13px",
//           fontFamily: "monospace",
//           padding: "20px",
//           resize: "none",
//           pointerEvents: "none",
//         //   opacity: 0.25,
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       />

//       {/* 🔴 FOREGROUND: HORIZONTAL CENTER HOLLYWOOD ALERT CARD */}
//       <div
//         className="hollywood-lock-frame"
//         style={{
//           border: "3px solid #ff3333",
//           padding: "40px",
//           width: "520px",
//           background: "rgba(0, 0, 0, 0.95)",
//           textAlign: "center",
//           borderRadius: "10px",
//           boxShadow: "0 0 50px rgba(255, 51, 51, 0.4)",
//           zIndex: 10,
//           position: "relative",
//         }}>
//         <div
//           style={{
//             width: "24px",
//             height: "24px",
//             background: "#ff3333",
//             borderRadius: "50%",
//             margin: "0 auto 15px auto",
//             boxShadow: "0 0 20px #ff3333",
//             animation: "neonFlash 0.6s infinite alternate",
//           }}></div>

//         <h1
//           style={{
//             color: "#ff3333",
//             fontSize: "1.7rem",
//             fontWeight: "bold",
//             margin: "0 0 10px 0",
//             letterSpacing: "2px",
//           }}>
//           ⛔ ACCESS DENIED
//         </h1>
//         <h3
//           style={{
//             color: "#ffffff",
//             fontSize: "1rem",
//             margin: "0 0 20px 0",
//             opacity: 0.9,
//           }}>
//           [ SECURITY BREACH DETECTED ]
//         </h3>
//         <p
//           style={{
//             color: "#8b949e",
//             fontSize: "0.82rem",
//             lineHeight: "1.5",
//             margin: "0 0 25px 0",
//           }}>
//           Your cryptographic handshake token is invalid. This terminal junction
//           is restricted to authorized faculty members only. Forensic payload
//           dispatched to main cluster [INDEX 4].
//         </p>

//         <button
//           onClick={() => navigate("/login")}
//           style={{
//             background: "#ff3333",
//             color: "white",
//             border: "none",
//             padding: "12px 30px",
//             fontSize: "0.85rem",
//             fontWeight: "bold",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontFamily: "sans-serif",
//             letterSpacing: "1px",
//             boxShadow: "0 4px 15px rgba(255,51,51,0.3)",
//           }}>
//           RETURN TO PORTAL TERMINAL
//         </button>
//       </div>

//       <style>{`@keyframes neonFlash {
//           0% { opacity: 0.2; transform: scale(0.9); }
//           100% { opacity: 1; transform: scale(1.1); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SecurityLockdownGate;

// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

// const cyberScripts = [
//   "sudo apt update -y && sudo apt upgrade -y",
//   "nmap -sV -sC -A -T4 ://netilearn.com",
//   "ping -c 1000 -f 8.8.8.8",
//   "hydra -l admin -P rockyou.txt ssh://gated.node",
//   "sqlmap -u http://target.com --dbs --batch",
//   "CRITICAL_ERROR: Unauthorized token handshake detected.",
//   "FIREWALL_ALERT: Security breach blocked on port 443.",
//   "PACKET_CAPTURE: Administrative ledger bounds verified... [LOCKED]",
//   "SYSTEM_LOG: Intruding device telemetry captured successfully.",
// ];

// const SecurityLockdownGate = () => {
//   const navigate = useNavigate();
//   const [terminalText, setTerminalText] = useState("");
//   const [activeAlerts, setActiveAlerts] = useState([]); // 🚨 DYNAMIC RANDOM ALERTS STATE [INDEX 4]
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     // A. SAFE DEFENSIVE AUDIT LOG SYSTEM [INDEX 51]
//     const logIntrusionAttempt = async () => {
//       try {
//         await addDoc(collection(db, "security_audits"), {
//           event: "HOLLYWOOD_DIF_LOCKDOWN_ENGAGED",
//           capturedAt: new Date().toISOString(),
//           status: "CONTAINED",
//         });
//       } catch (err) {
//         console.error("Audit Failure:", err);
//       }
//     };
//     logIntrusionAttempt();

//     // 🖥️ B. THE TEXTAREA SCROLL MATRIX (තද කොළ පාටින් පල්ලෙහාට දුවන කෑල්ල)
//     const scriptTimer = setInterval(() => {
//       setTerminalText((prev) => {
//         const randomLine =
//           cyberScripts[Math.floor(Math.random() * cyberScripts.length)];
//         const nextText = prev + randomLine + "\n";
//         if (textareaRef.current) {
//           setTimeout(() => {
//             textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
//           }, 0);
//         }
//         return nextText;
//       });
//     }, 120);

//     // 🚨 C. DYNAMIC HOLLYWOOD MULTI-WINDOW GENERATOR ENGINE (උඹ ඉල්ලපු පට්ටම ස්ටයිල් එක!) [INDEX 4]
//     const alertTimer = setInterval(() => {
//       const alertId = Date.now() + Math.random();

//       // තිරයේ ඕනෑම තැනක අහඹු ලෙස කොටු මැවීමට Coordinates සාදා ගනී (Random X, Y)
//       const randomTop = Math.floor(Math.random() * 65) + 5; // 5% සිට 70% දක්වා
//       const randomLeft = Math.floor(Math.random() * 65) + 5; // 5% සිට 70% දක්වා

//       const newAlert = {
//         id: alertId,
//         top: `${randomTop}%`,
//         left: `${randomLeft}%`,
//         errorCode:
//           "SEC_ERR_0x" +
//           Math.floor(Math.random() * 9999)
//             .toString(16)
//             .toUpperCase(),
//       };

//       // අලුත් ඇලර්ට් එක තිරයට එකතු කරයි
//       setActiveAlerts((prev) => [...prev, newAlert]);

//       // ⏳ TIMEOUT DETACHMENT: තත්පර 3කින් ඒ ඇලර්ට් එක ස්වයංක්‍රීයවම අයින් කර දමයි! [INDEX 4]
//       setTimeout(() => {
//         setActiveAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
//       }, 3000);
//     }, 900); // ⚡ සෑම මිලි තත්පර 900කටම වරක් අලුත් රතු කොටුවක් මතු වේ

//     return () => {
//       clearInterval(scriptTimer);
//       clearInterval(alertTimer);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "black",
//         color: "#00ff00",
//         fontFamily: "monospace",
//         zIndex: 9999999,
//         overflow: "hidden",
//       }}>
//       {/* BACKGROUND MATRIX: 100% Bright තද කොළ පාටින් පල්ලෙහාට දුවන කේත පුවරුව */}
//       <textarea
//         ref={textareaRef}
//         value={terminalText}
//         readOnly
//         autoFocus
//         style={{
//           width: "100%",
//           height: "100vh",
//           background: "black",
//           color: "#00ff00",
//           border: "none",
//           fontSize: "14px",
//           fontFamily: "monospace",
//           padding: "20px",
//           resize: "none",
//           pointerEvents: "none",
//           opacity: 1, // 👈 உඹ දැම්මා වගේ 100% Brightness ලොක් කළා මචං [INDEX 4]
//           position: "absolute",
//           top: 0,
//           left: 0,
//           zIndex: 1,
//         }}
//       />
//       {/* 🚨 DYNAMIC MULTI-WINDOW OVERLAY GRID LOOP (තිරය පුරා මතු වී මැකී යන රතු කොටු සමූහය) [INDEX 4] */}
//       {activeAlerts.map((alert) => (
//         <div
//           key={alert.id}
//           className="dynamic-glitch-frame"
//           style={{
//             position: "absolute",
//             top: alert.top,
//             left: alert.left,
//             border: "2px solid #ff3333",
//             padding: "15px 25px",
//             width: "280px",
//             background: "rgba(0, 0, 0, 0.95)",
//             color: "#ff3333",
//             borderRadius: "6px",
//             boxShadow: "0 0 25px rgba(255, 51, 51, 0.5)",
//             zIndex: 10,
//             animation: "alertPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
//           }}>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               borderBottom: "1px solid rgba(255,51,51,0.3)",
//               paddingBottom: "5px",
//               marginBottom: "8px",
//             }}>
//             <span
//               style={{
//                 width: "8px",
//                 height: "8px",
//                 background: "#ff3333",
//                 borderRadius: "50%",
//                 display: "inline-block",
//                 animation: "neonFlash 0.4s infinite alternate",
//               }}></span>
//             <strong style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
//               SYSTEM THREAT
//             </strong>
//           </div>
//           <h2
//             style={{
//               fontSize: "1.1rem",
//               margin: "0 0 5px 0",
//               fontWeight: "bold",
//             }}>
//             ACCESS DENIED
//           </h2>
//           <small
//             style={{
//               color: "#ffffff",
//               fontFamily: "monospace",
//               fontSize: "0.75rem",
//               block: "inline-block",
//               opacity: 0.7,
//             }}>
//             Your cryptographic handshake token is invalid. This terminal
//             junction // is restricted to authorized faculty members only.
//             Forensic payload // dispatched to main cluster.
//           </small>
//           <div
//             style={{
//               marginTop: "8px",
//               fontSize: "0.7rem",
//               color: "#ffaa00",
//               background: "rgba(255,165,0,0.05)",
//               padding: "4px",
//               borderRadius: "3px",
//               textAlign: "center",
//             }}>
//             <code>{alert.errorCode}</code>
//           </div>
//         </div>
//       ))}

//       {/* 👑 PERSISTENT MAIN ESCAPE CONTROLLER CENTER (මැද තියෙන ස්ථාවර Escape Panel එක) [INDEX 4] */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: "40px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           background: "rgba(0,0,0,0.9)",
//           border: "2px solid #ffffff",
//           padding: "15px 30px",
//           borderRadius: "8px",
//           zIndex: 100,
//           boxShadow: "0 0 30px rgba(49, 49, 49, 0.2)",
//           display: "flex",
//           alignItems: "center",
//           gap: "20px",
//         }}>
//         <span
//           style={{
//             color: "#ffffff",
//             fontSize: "0.85rem",
//             fontWeight: "bold",
//             fontFamily: "sans-serif",
//           }}>
//           TERMINAL SAFELY CONTAINERIZED
//         </span>
//         <button
//           onClick={() => navigate("/login")}
//           style={{
//             background: "#000000",
//             color: "black",
//             border: "none",
//             padding: "8px 20px",
//             fontSize: "0.8rem",
//             fontWeight: "bold",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontFamily: "sans-serif",
//             letterSpacing: "0.5px",
//           }}>
//           RETURN TO MAIN GATEWAY
//         </button>
//       </div>

//       <style>{`@keyframes alertPop {
//           0% { transform: scale(0.85); opacity: 0; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes neonFlash {
//           0% { opacity: 0.3; }
//           100% { opacity: 1; }
//         }
//      `}</style>
//     </div>
//   );
// };

// export default SecurityLockdownGate;

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const cyberScripts = [
  "sudo apt update -y && sudo apt upgrade -y",
  "nmap -sV -sC -A -T4 ://netilearn.com",
  "ping -c 1000 -f 8.8.8.8",
  "hydra -l admin -P rockyou.txt ssh://gated.node",
  "sqlmap -u http://target.com --dbs --batch",
  "CRITICAL_ERROR: Unauthorized token handshake detected.",
  "FIREWALL_ALERT: Security breach blocked on port 443.",
  "PACKET_CAPTURE: Administrative ledger bounds verified... [LOCKED]",
  "SYSTEM_LOG: Intruding device telemetry captured successfully.",
];

const SecurityLockdownGate = () => {
  const navigate = useNavigate();
  const [terminalText, setTerminalText] = useState(
    "⚡ NETILEARN BLOCK INTEGRITY MODULES READY...\n[💡 TIP: CLICK SCREEN AND TYPE ANY KEYS ON YOUR KEYBOARD TO DISPATCH VIRAL INFILTRATION SCRIPTS]\n\n",
  );
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [systemIntel, setSystemIntel] = useState({});
  const textareaRef = useRef(null);

  // 🔊 AUDIO FREQUENCY BEEP INJECTOR LOGIC (ජාවාස්ක්‍රිප්ට් එකෙන්ම සයිබර් සවුන්ඩ් හදයි) [INDEX 4]
  const injectCyberBeep = (freq = 840, duration = 0.1) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = freq; // Sound frequency pitch
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // Safe Master Volume Lock

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Browser audio context safety policy catch block
      console.log("Audio error :", e);
    }
  };

  useEffect(() => {
    // A. SAFE DEFENSIVE AUDIT LOG SYSTEM [INDEX 4, 51]
    const logIntrusionAttempt = async () => {
      try {
        await addDoc(collection(db, "security_audits"), {
          event: "INTERACTIVE_HOLLYWOOD_LOCKDOWN_ENGAGED",
          capturedAt: new Date().toISOString(),
          status: "CONTAINED",
        });
      } catch (err) {
        console.error("Audit Failure:", err);
      }
    };
    logIntrusionAttempt();

    // B. DYNAMIC LOCAL SYSTEM INTEL EXTRACTOR LOGIC (ළමයාගේ සැබෑ පරිගණක දත්ත කියවයි!) [INDEX 4]
    setSystemIntel({
      os: navigator.userAgent.includes("Windows")
        ? "Windows NT Ledger Core"
        : navigator.userAgent.includes("Mac")
          ? "macOS Terminal Junction"
          : "Linux / Android Stack",

      // මෙතන Backticks (``) සහ නිවැරදිව String එකක් භාවිතා කර ඇත
      resolution: `${window.screen.width}x${window.screen.height} Matrix`,

      browser:
        navigator.userAgent.includes("Chrome") &&
        !navigator.userAgent.includes("Edg")
          ? "Google Chrome Architecture"
          : navigator.userAgent.includes("Firefox")
            ? "Mozilla Firefox Engine"
            : "Standard Web Architecture",

      localTime: new Date().toLocaleTimeString(),
    });

    // C. DYNAMIC RANDOM ALERT POPUPS & BEEP SYNCHRONIZER LAYER [INDEX 4]
    const alertTimer = setInterval(() => {
      const alertId = Date.now() + Math.random();
      const randomTop = Math.floor(Math.random() * 60) + 5;
      const randomLeft = Math.floor(Math.random() * 65) + 5;

      const newAlert = {
        id: alertId,
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        errorCode:
          "SEC_ERR_0x" +
          Math.floor(Math.random() * 9999)
            .toString(16)
            .toUpperCase(),
      };

      setActiveAlerts((prev) => [...prev, newAlert]);
      injectCyberBeep(580, 0.08); // 🔊 කොටුවක් මතු වෙද්දී සර්ප්‍රයිස් සයිබර් බීප් සද්දයක් පිටවේ! [INDEX 4]

      setTimeout(() => {
        setActiveAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
      }, 3000);
    }, 1100);

    // Auto Scroll Focus Engine to bottom
    if (textareaRef.current) textareaRef.current.focus();

    return () => clearInterval(alertTimer);
  }, []);
  
  // ⌨️ D. CUSTOM REAL-TIME TYPING INFILTRATOR LOGIC (Hacker Typer Effect!) [INDEX 4]
  const handleTerminalKeyDown = () => {
    // ළමයා කීබෝඩ් එකේ මොන අකුර එබුවත්, සැබෑ හැකර් කේත පේළියක් ඔටෝම තිරයට එකතු වේ! [INDEX 4]
    const randomLine =
      cyberScripts[Math.floor(Math.random() * cyberScripts.length)];
    setTerminalText((prev) => prev + randomLine + "\n");
    injectCyberBeep(900, 0.03); // ⌨️ කීබෝඩ් එක ඔබද්දී සජීවී ටයිපින් සවුන්ඩ් එකක් එයි! [INDEX 4]

    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  return (
    <div
      onKeyDown={handleTerminalKeyDown}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "black",
        color: "#00ff00",
        fontFamily: "monospace",
        zIndex: 9999999,
        overflow: "hidden",
      }}>
      {/* BACKGROUND INTERACTIVE MATRIX TEXTAREA FRAME */}
      <textarea
        ref={textareaRef}
        value={terminalText}
        readOnly
        autoFocus
        style={{
          width: "100%",
          height: "100vh",
          background: "black",
          color: "#00ff00",
          border: "none",
          fontSize: "14px",
          fontFamily: "monospace",
          padding: "20px",
          resize: "none",
          outline: "none",
          opacity: 1,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* 🚨 DYNAMIC MULTI-WINDOW OVERLAY LOOP LAYER */}
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          style={{
            position: "absolute",
            top: alert.top,
            left: alert.left,
            border: "2px solid #ff3333",
            padding: "15px 25px",
            width: "290px",
            background: "rgba(0, 0, 0, 0.96)",
            color: "#ff3333",
            borderRadius: "6px",
            boxShadow: "0 0 25px rgba(255, 51, 51, 0.5)",
            zIndex: 10,
            animation: "alertPop 0.2s ease-out",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid rgba(255,51,51,0.3)",
              paddingBottom: "5px",
              marginBottom: "8px",
            }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                background: "#ff3333",
                borderRadius: "50%",
              }}></span>
            <strong style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
              SECURITY LOCK ENGAGED
            </strong>
          </div>
          <h2
            style={{
              fontSize: "1.1rem",
              margin: "0 0 5px 0",
              fontWeight: "bold",
            }}>
            ACCESS DENIED
          </h2>
          <small
            style={{ color: "#ffffff", fontSize: "0.72rem", opacity: 0.7 }}>
            CORE INTEGRITY PROTECTED
          </small>
          <div
            style={{
              marginTop: "8px",
              fontSize: "0.7rem",
              color: "#ffaa00",
              background: "rgba(255,165,0,0.05)",
              padding: "4px",
              borderRadius: "3px",
              textAlign: "center",
            }}>
            <code>{alert.errorCode}</code>
          </div>
        </div>
      ))}

      {/* 🖥️ REAL-TIME LOCAL SYSTEM INTEL EXTRACTOR CARD (ළමයාගේ දත්ත සජීවීව පෙන්වයි!) [INDEX 4] */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "30px",
          background: "rgba(0,0,0,0.9)",
          border: "1px solid #00ff00",
          padding: "15px 20px",
          borderRadius: "6px",
          zIndex: 100,
          fontSize: "0.8rem",
          width: "280px",
          boxShadow: "0 0 15px rgba(0,255,0,0.1)",
        }}>
        <strong
          style={{
            display: "block",
            color: "#ffffff",
            borderBottom: "1px solid #00ff00",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}>
          📡 TARGET TELEMETRY EXTRACTED
        </strong>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div>
            &gt; HOST SYSTEM:{" "}
            <span style={{ color: "#ffffff" }}>{systemIntel.os}</span>
          </div>
          <div>
            &gt; RESOLUTION:{" "}
            <span style={{ color: "#ffffff" }}>{systemIntel.resolution}</span>
          </div>
          <div>
            &gt; CLIENT BROWSER:{" "}
            <span style={{ color: "#ffffff" }}>{systemIntel.browser}</span>
          </div>
          <div>
            &gt; INTRUSION TIME:{" "}
            <span style={{ color: "#ffffff" }}>{systemIntel.localTime}</span>
          </div>
        </div>
      </div>
      {/* 👑 PERSISTENT MAIN ESCAPE CONTROLLER CENTER */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.95)",
          border: "2px solid #ff9900",
          padding: "15px 30px",
          borderRadius: "8px",
          zIndex: 100,
          boxShadow: "0 0 30px rgba(255,153,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}>
        <span
          style={{
            color: "#ff9900",
            fontSize: "0.85rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}>
          🔒 UNAUTHORIZED SESSION TERMINATED
        </span>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#ff9900",
            color: "black",
            border: "none",
            padding: "8px 20px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "sans-serif",
          }}>
          RETURN TO PORTAL GATEWAY
        </button>
      </div>

      <style>{`@keyframes alertPop {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SecurityLockdownGate;
