/* eslint-disable no-undef */
// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC_2oYB8rGVSgKVf9kTEiiUs27AacLhHbA",
  authDomain: "rankit-74583.firebaseapp.com",
  projectId: "rankit-74583",
  storageBucket: "rankit-74583.appspot.com",
  messagingSenderId: "273830249825",
  appId: "1:273830249825:web:e9d42f73070dc2617c3120",
  measurementId: "G-P7NLRFZEVB"
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
