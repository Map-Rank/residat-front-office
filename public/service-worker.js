// Service Worker: Listen for connectivity changes and send notifications

let lastStatus = true
let lastNotification = null // Store the last notification in memory
var authToken = null // Variable to store the token

// Fonction pour récupérer le token depuis IndexedDB (exemple)
// function getAuthToken() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open('authDB', 1);

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const transaction = db.transaction(['auth'], 'readonly');
//       const store = transaction.objectStore('auth');
//       const getTokenRequest = store.get('token'); // La clé est "token" comme dans votre capture d'écran


//       getTokenRequest.onsuccess = () => {
//         const authToken = getTokenRequest.result ? getTokenRequest.result.value : null;
//         // Affiche le token dans la console
//         console.log("Token récupéré depuis IndexedDB:", authToken);

//         resolve(authToken);
//       };

//       getTokenRequest.onerror = () => {
//         reject('Erreur lors de la récupération du token');
//       };
//     };

//     request.onerror = () => {
//       reject('Erreur lors de l\'ouverture de la base de données');
//     };
//   });
// }

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.')
  event.waitUntil(self.clients.claim())
  registerBackgroundSync() // Register background sync on activate
  setupNotificationInterval() // Set up fallback polling
  // getAuthToken()
})

self.addEventListener('message', event => {
  if (event.data.type === 'SET_TOKEN') {
    authToken = event.data.token;
  }
});

// Register Background Sync
function registerBackgroundSync() {
  self.registration.sync.register('sync-fetch-notifications').catch((error) => {
    console.error('Sync registration failed:', error)
  })
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus()
      } else {
        return self.clients.openWindow('https://residat.com') // or a dynamic URL
      }
    })
  )
})
// Listen for messages from the main app (to set token, last notification, etc.)
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data)

  if (event.data.type === 'START_NOTIFICATION_FETCH') {
     authToken = event.data.token
     fetchNewNotifications(authToken)
  }

  // self.addEventListener('message', (event) => {
  //   if (event.data.action === 'setAuthToken') {
  //     authToken = event.data.token;
  //     console.log('authToken  ' + authToken)
  //     // console.log('AuthToken set in service worker:', authToken);
  //   }
  // });
})

// Function to show the last notification stored in memory
function showLastNotification() {
  if (lastNotification) {
    const options = {
      body: lastNotification.content_en,
      icon: '/assets/images/smile.png',
      badge: '/assets/images/smile.png'
    }
    if (Notification.permission === 'granted') {
      self.registration.showNotification(lastNotification.title, options)
    }
  }
}

// Fetch new notifications and show them
async function fetchNewNotifications(authToken) {
  try {
    // Récupérer le token avant de faire la requête
    // const authToken = await getAuthToken();
    console.log('Token récupéré:', authToken);

    if (!authToken) {
      console.error('Aucun token trouvé');
      return;
    }

    const controller = new AbortController(); // Pour gérer le timeout
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 secondes
    const apiUrl = 'http://backoffice-dev.residat.com/api/notifications?page=0';

    try {
      const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + authToken
          },
          signal: controller.signal
      });
  
      clearTimeout(timeoutId); // Annuler le timeout
  
      console.log('Réponse complète:', response); // Ajout de log complet
  
      if (!response.ok) {
          const responseBody = await response.text();
          console.log('Réponse échouée:', responseBody);
          throw new Error(`Échec: ${response.status} ${response.statusText}`);
      }
  
      const notifications = await response.json();
      console.log('Notifications:', notifications); // Log des notifications
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('La requête a expiré.');
        } else {
            console.error('Erreur:', error.message, error);
        }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('La requête a expiré.');
    } else {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  }
}

// Use push notifications when new notifications are available
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event.data.text())
  const pushData = event.data.json()
  const options = {
    body: pushData.notification.body,
    icon: '/assets/images/filter.png',
    badge: '/assets/images/filter.png'
  }

  if (Notification.permission === 'granted') {
    self.registration.showNotification(pushData.notification.title, options)
  }
})

// Check connectivity status
function checkConnectivity() {
  return fetch('https://www.google.com', { method: 'HEAD', cache: 'no-store' })
    .then(() => true)
    .catch(() => false)
}

self.addEventListener('sync', (event) => {

  if (event.tag === 'sync-fetch-notifications') {
    console.log('appel notif-sinc ' + authToken)
    event.waitUntil(fetchNewNotifications(authToken))
  }
})

// Show notification for connectivity status
function showConnectivityNotification(isOnline) {
  const title = isOnline ? 'Back Online' : 'You Are Offline'
  const options = {
    body: isOnline ? 'You are connected to the internet.' : 'You have lost internet connection.',
    icon: '/assets/images/smile.png',
    badge: '/assets/images/smile.png'
  }
  if (Notification.permission === 'granted') {
    self.registration.showNotification(title, options)
  }
}

// Notify the client(s) about connectivity status
function notifyClients(isOnline) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ isOnline })
    })
  })
}


// Set up periodic interval as a fallback
function setupNotificationInterval() {
  if (!self.notificationInterval) {
    self.notificationInterval = setInterval(
      () => {

        if (authToken) {
          console.log('appel notif-interval ' + authToken)

          fetchNewNotifications(authToken)
        }
      },
      10 * 60 * 1000
    ) // 10 minutes
  }
}
