// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useToast } from 'vue-toastification';

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
      const currentToken = await getToken(messaging, { vapidKey: 'BGQqaKwYEpAMrVNsiIequoOK2CoEwgkWrDO-PuC0Xk-8Nvp1gRwV7qT88sjk_AnZKcdvEPD9kS3caej3Rv8k9tw' });
      if (currentToken) {
        // console.log('FCM Token:', currentToken);
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
