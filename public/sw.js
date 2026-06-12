// 👑 🔐 [THE MASTER BACKGROUND SERVICE WORKER GHOST]: 
// සයිට් එක වැසුවත් පසුබිමෙන් ලයිව් ක්‍රියාත්මක වන පුෂ් නෝටිෆිකේෂන් එන්ජිම මචං! [INDEX 4] 

 // 1️⃣ SERVICE WORKER INSTALLATION EVENT 
 self.addEventListener("install", (e) => { console.log("🟢 educa. Background Service Worker Installed Successfully!"); self.skipWaiting(); }); 

 // 2️⃣ SERVICE WORKER ACTIVATION EVENT 
 self.addEventListener("activate", (e) => { console.log("🚀 educa. Background Service Worker Activated & Ready!"); return self.clients.claim(); }); 

 // 3️⃣ 🔔 [THE LIVE PUSH INTERCEPTION EVENT]: // Firebase සර්වර් එකෙන් දමන සිග්නල් එක බ්‍රවුසර් එක ඇතුළෙන්ම අල්ලා ගන්නා රහස් වැට! [INDEX 4, 51] 
 self.addEventListener("push", (e) => { let data = { title: "📢 educa. Smart Notice", body: "අලුත්ම පන්ති නිවේදනයක් පද්ධතියට එකතු කර ඇත. ලොග් වී පරීක්ෂා කරන්න! 🚀" }; if (e.data) { try { data = e.data.json(); } catch (err) { data = { title: "📢 educa. Smart Notice", body: e.data.text() }; } } 
 // 🎨 උඹ ඉල්ලපු අපේ ප්‍රධාන තේමා වර්ණය වෙන #03204b එකෙන් නෝටිෆිකේෂන් එක හැඩ කරයි! [INDEX 4] 
 const options = { body: data.body, icon: "/favicon.ico", badge: "/favicon.ico", vibrate:, data: { url: "/" }, action: "open_url" }; 
    // ෆෝන් එක වයිබ්‍රේට් කරවන ස්මාර්ට් සිග්නල් එක [INDEX 4] 

// ෆෝන් එකේ ස්ක්‍රීන් එක උඩින් ලස්සනට පණිවිඩය පත්තු කරයි මචං! [INDEX 4] 
// 
e.waitUntil( self.registration.showNotification(data.title, options) ); }); 
// 4️⃣ 📱 [NOTIFICATION CLICK INTERACTION]: // ළමයා ඒ පණිවිඩය උඩ ටච් කරපු සැනින් කෙලින්ම සයිට් එකේ ඩෑෂ්බෝඩ් එක ඇතුළටම කැඳවාගෙන එයි! [INDEX 4] 
// 
self.addEventListener("notificationclick", (e) => { e.notification.close(); 
    // නෝටිෆිකේෂන් එක වසයි 

    e.waitUntil( clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => { 
        // සයිට් එක දැනටමත් ඕපන් නම් ඒ ටැබ් එක ෆෝකස් කරයි, නැත්නම් අලුතින්ම ඕපන් කරයි [INDEX 4] 
        
        for (const client of clientList) { if (client.url === "/" && "focus" in client) return client.focus(); } if (clients.openWindow) return clients.openWindow("/"); }) ); }); 
