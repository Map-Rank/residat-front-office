


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTb9dECqZKjHDDP3nOgSWSW824xEVYWSc",
  authDomain: "residat-7f3e3.firebaseapp.com",
  projectId: "residat-7f3e3",
  storageBucket: "residat-7f3e3.appspot.com",
  messagingSenderId: "390075232477",
  appId: "1:390075232477:web:6ae22692796e85616b2b34",
  measurementId: "G-HE0MFB69XK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Show notification or update notification state
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  if (Notification.permission === 'granted') {
    new Notification(notificationTitle, notificationOptions);
  }
});

export { app, analytics,messaging, getToken, onMessage};