// src/firebaseUtils.js
import { getToken, messaging } from '@/firebase/firebaseConfig';
import { useToast } from 'vue-toastification';

export const getFcmToken = async () => {
  const toast = useToast();
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const currentToken = await getToken(messaging, { vapidKey: 'BGQqaKwYEpAMrVNsiIequoOK2CoEwgkWrDO-PuC0Xk-8Nvp1gRwV7qT88sjk_AnZKcdvEPD9kS3caej3Rv8k9tw' });
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
