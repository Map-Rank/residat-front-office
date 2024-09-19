// src/firebaseConfig.js
/* istanbul ignore file */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getToken, onMessage } from 'firebase/messaging';
import { getMessaging} from 'firebase/messaging/sw'
import { useToast } from 'vue-toastification';

const vapidKey = import.meta.env.FIREBASE_VAPIDKEY

// const firebaseConfig = {
//   apiKey: 'AIzaSyC_2oYB8rGVSgKVf9kTEiiUs27AacLhHbA',
//   authDomain: 'rankit-74583.firebaseapp.com',
//   projectId: 'rankit-74583',
//   storageBucket: 'rankit-74583.appspot.com',
//   messagingSenderId: '273830249825',
//   appId: '1:273830249825:web:e9d42f73070dc2617c3120',
//   measurementId: 'G-P7NLRFZEVB',
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

navigator.serviceWorker.register('/public/firebase-messaging-sw.js')
  .then((registration) => {
    // Use the service workers directly on the messaging instance
    messaging.swRegistration = registration;
  });

export const getFcmToken = async () => {
  const toast = useToast();
  
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const currentToken = await getToken(messaging, { vapidKey: vapidKey });
      if (currentToken) {
        // console.log('FCM Token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } else {
      toast.warning('Please enable notification on your browser, in for your to recieve important notificatios');
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
