// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useToast } from 'vue-toastification';

const firebaseConfig = {
  apiKey: "AIzaSyC_2oYB8rGVSgKVf9kTEiiUs27AacLhHbA",
  authDomain: "rankit-74583.firebaseapp.com",
  projectId: "rankit-74583",
  storageBucket: "rankit-74583.appspot.com",
  messagingSenderId: "273830249825",
  appId: "1:273830249825:web:e9d42f73070dc2617c3120",
  measurementId: "G-P7NLRFZEVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

navigator.serviceWorker.register('/public/firebase-messaging-sw.js')
  .then((registration) => {
    messaging.useServiceWorker(registration);
  });

export const getFcmToken = async () => {
  const toast = useToast();
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const currentToken = await getToken(messaging, { vapidKey: 'BOMH3teG4u__B5UBCP6h4iV07QqhrpNLx4eED99q6zpbFjK1mGCJ6f_Tx2wmNvnEhVC045Jbtpg8yf7G86VD49E' });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } else {
      toast.error('Unable to get permission to notify. Please enable notifications in your browser settings to receive updates.');
      console.log('Unable to get permission to notify.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
  return null;
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };
  if (Notification.permission === 'granted') {
    new Notification(notificationTitle, notificationOptions);
  }
});

export { app, analytics, messaging, getToken, onMessage };
