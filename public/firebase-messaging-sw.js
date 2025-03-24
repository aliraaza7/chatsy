// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyAnK0-MoVoQG6poOjoD99uwp7iv1f7rvsI",
//     authDomain: "chatsyreact.firebaseapp.com",
//     projectId: "chatsyreact",
//     storageBucket: "chatsyreact.firebasestorage.app",
//     messagingSenderId: "369608816156",
//     appId: "1:369608816156:web:3ef6d943366254d01b91d9"
//   };
  

// // Initialize Firebase in Service Worker
// const app = initializeApp(firebaseConfig);

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message:", payload);
//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: "/favicon.ico",
//   });
// });

// Use importScripts to load Firebase libraries inside service workers
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// Firebase configuration
 const firebaseConfig = {
        apiKey: "AIzaSyAnK0-MoVoQG6poOjoD99uwp7iv1f7rvsI",
        authDomain: "chatsyreact.firebaseapp.com",
        projectId: "chatsyreact",
        storageBucket: "chatsyreact.firebasestorage.app",
        messagingSenderId: "369608816156",
        appId: "1:369608816156:web:3ef6d943366254d01b91d9"
      };

// Initialize Firebase inside the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

// Background notification event listener
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const { title, body } = payload.notification;
  
  self.registration.showNotification(title, {
    body: body,
    icon: "/firebase-logo.png", // Change to your app icon
  });
});
