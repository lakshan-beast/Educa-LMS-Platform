// // public/firebase-messaging-sw.js
// importScripts("https://gstatic.com");
// importScripts("https://gstatic.com");

// // 🛠️ ඔයාගේ සැබෑ Firebase Credentials ටික මෙතනට දාන්න
// firebase.initializeApp({
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// });

// const messaging = firebase.messaging();

// // 🔔 වෙබ් සයිට් එක වහලා තිබ්බත් Background එකේ මැසේජ් එක අල්ලන තැන
// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Background Message received: ",
//     payload,
//   );

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/logo192.png", // ඔයාගේ ඇප් එකේ ලෝගෝ එකේ path එක
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// import { initializeApp } from "firebase/app";
// import { initializeFirestore } from "firebase/firestore";
// import { getMessaging, getToken } from "firebase/messaging"; // 👈 මේක එකතු කළා

// const firebaseConfig = {
//   // ඔයාගේ credentials...
// };

// const app = initializeApp(firebaseConfig);
// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });

// // 🚀 Messaging Connection
// export const messaging = getMessaging(app);

// // 🔑 ළමයාගේ බ්‍රවුසර් එකෙන් Push Token එක ඉල්ලලා දෙන සුපිරි Function එක
// export const requestNotificationPermission = async () => {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       // ⚠️ වැදගත්: ඔයාගේ Firebase Console -> Project Settings -> Cloud Messaging එකේ තියෙන VAPID Key එක මෙතනට දාන්න
//       const token = await getToken(messaging, {
//         vapidKey: "YOUR_FIREBASE_VAPID_PUBLIC_KEY",
//       });
//       console.log("FCM Token Generated Successfully: ", token);
//       return token; // 👈 මේ ලැබෙන ටෝකන් එක තමයි ළමයාගේ ලිපිනය (Address)
//     } else {
//       console.log("Notification permission denied.");
//       return null;
//     }
//   } catch (error) {
//     console.error("An error occurred while fetching token:", error);
//     return null;
//   }
// };

// // vapid key
// // yFbZWAG8SelVaZH45PLWxqQHnP4Aw0ntCgKAUz_IgRw

// // server key
