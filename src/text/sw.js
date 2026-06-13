// // self.addEventListener("install", (e) => {
// //   console.log("🟢 educa. Background Service Worker Installed Successfully!");
// //   self.skipWaiting();
// // });

// // self.addEventListener("activate", (e) => {
// //   console.log("🚀 educa. Background Service Worker Activated & Ready!");
// //   return self.clients.claim();
// // });

// // self.addEventListener("push", (e) => {
// //   let data = {
// //     title: "📢 educa. Smart Notice",
// //     body: "අලුත්ම පන්ති නිවේදනයක් පද්ධතියට එකතු කර ඇත නංගි/මල්ලි. ලොග් වී පරීක්ෂා කරන්න! 🚀",
// //   };

// //   if (e.data) {
// //     try {
// //       data = e.data.json();
// //     } catch (error) {
// //       data = { title: "📢 educa. Smart Notice", body: e.data.text() };
// //     }
// //   }

// //   const options = {
// //     body: data.body,
// //     icon: "/favicon.ico",
// //     badge: "/favicon.ico",
// //     vibrate: [200, 100, 200],
// //     data: { url: "/" },
// //     actions: [{ action: "open_url", title: "Open Platform" }],
// //   };

// //   e.waitUntil(self.registration.showNotification(data.title, options));
// // });

// // self.addEventListener("notificationclick", (e) => {
// //   e.notification.close();

// //   e.waitUntil(
// //     clients
// //       .matchAll({ type: "window", includeUncontrolled: true })
// //       .then((clientList) => {
// //         for (const client of clientList) {
// //           if (client.url === "/" && "focus" in client) return client.focus();
// //         }
// //         if (clients.openWindow) return clients.openWindow("/");
// //       }),
// //   );
// // });

// self.addEventListener("install", () => {
//   console.log("🟢 educa. Background Service Worker Installed Successfully!");
//   self.skipWaiting();
// });

// self.addEventListener("activate", (e) => {
//   console.log("🚀 educa. Background Service Worker Activated & Ready!");
//   e.waitUntil(self.clients.claim());
// });

// self.addEventListener("push", (e) => {
//   let data = {
//     title: "📢 New Platform Update",
//     body: "A new academic announcement has been published. Please log in to your dashboard to review.",
//   };

//   if (e.data) {
//     try {
//       data = e.data.json();
//     } catch {
//       data = { title: "📢 New Platform Update", body: e.data.text() };
//     }
//   }

//   const options = {
//     body: data.body,
//     icon: "/favicon.ico",
//     badge: "/favicon.ico",
//     vibrate: [200, 100, 200],
//     data: { url: "/" },
//     actions: [{ action: "open_url", title: "Open Platform" }],
//   };

//   e.waitUntil(self.registration.showNotification(data.title, options));
// });

// self.addEventListener("notificationclick", (e) => {
//   e.notification.close();

//   e.waitUntil(
//     self.clients
//       .matchAll({ type: "window", includeUncontrolled: true })
//       .then((clientList) => {
//         for (const client of clientList) {
//           if (client.url === "/" && "focus" in client) return client.focus();
//         }
//         if (self.clients.openWindow) return self.clients.openWindow("/");
//       }),
//   );
// });
