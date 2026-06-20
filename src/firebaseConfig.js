import { initializeApp } from "firebase/app";
// 👑 for Fixed Network Errors
import { initializeFirestore } from "firebase/firestore";

// firebase config code
const firebaseConfig = {
  apiKey: "AIzaSyCgPqfSwT9haDFJRrzJPC0nrp-T2AEabC0",
  authDomain: "educa-lms-abee5.firebaseapp.com",
  projectId: "educa-lms-abee5",
  storageBucket: "educa-lms-abee5.firebasestorage.app",
  messagingSenderId: "242875493480",
  appId: "1:242875493480:web:98e78bb1d178d69d6f1fdd",
  measurementId: "G-2C5P5XNST9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🚀 Cloud Connection
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
