/* eslint-disable no-undef */
// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBTb9dECqZKjHDDP3nOgSWSW824xEVYWSc",
  authDomain: "residat-7f3e3.firebaseapp.com",
  projectId: "residat-7f3e3",
  storageBucket: "residat-7f3e3.appspot.com",
  messagingSenderId: "390075232477",
  appId: "1:390075232477:web:6ae22692796e85616b2b34",
  measurementId: "G-HE0MFB69XK"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
