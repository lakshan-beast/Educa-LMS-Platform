import { initializeApp } from "firebase/app";
// 👑 for Fixed Network Errors
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

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

//  Cloud Storage Connection
export const storage = getStorage(app);

// 🚀 Messaging Connection
export const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "yFbZWAG8SelVaZH45PLWxqQHnP4Aw0ntCgKAUz_IgRw",
      });
      console.log("FCM Token Generated Successfully: ", token);
      return token;
    } else {
      console.log("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching token:", error);
    return null;
  }
};
