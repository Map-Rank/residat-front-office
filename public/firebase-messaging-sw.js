  /* eslint-disable no-undef */
  // public/firebase-messaging-sw.js
  /* istanbul ignore file */

  importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

  // Initialize the Firebase app in the service worker by passing the generated conf

  // Fetch the Firebase config file
fetch('/firebase-keys.json')
.then((response) => response.json())
.then((firebaseConfig) => {
  // Initialize the Firebase app in the service worker by passing the generated config
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  // Handle background messages
  messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
})
.catch((error) => {
  console.error('Failed to fetch Firebase config: ', error);
});
