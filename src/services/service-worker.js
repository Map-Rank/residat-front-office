let lastStatus = true; // Track last known connectivity status

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  return self.clients.claim();
});

// Handle connectivity check requests from the main page
self.addEventListener('message', (event) => {
  if (event.data.action === 'checkConnectivity') {
    checkConnectivity()
      .then((isOnline) => {
        if (isOnline !== lastStatus) {
          // Show notification if connectivity status changed
          showConnectivityNotification(isOnline);
          lastStatus = isOnline; // Update last known status
        }
      });
  }
});

// Check connectivity by attempting a fetch request
function checkConnectivity() {
  return fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store' })
    .then(() => true) // Online if fetch succeeds
    .catch(() => false); // Offline if fetch fails
}

// Function to show connectivity notification
function showConnectivityNotification(isOnline) {
  const title = isOnline ? 'Back Online' : 'You Are Offline';
  const options = {
    body: isOnline ? 'You are connected to the internet.' : 'You have lost internet connection.',
    icon: '/icon.png', // Path to your notification icon
    badge: '/badge.png' // Path to a smaller icon for the badge
  };
  
  self.registration.showNotification(title, options);
}
// Show a notification for new messages

function showNewNotification(message) {
    const options = {
      body: message,
      icon: '/icon.png',
      badge: '/badge.png'
    };
    
    self.registration.showNotification('New Message', options);
  }
  
  self.addEventListener('message', (event) => {
    if (event.data.action === 'newNotificationsAlert') {
      // Show a simple notification indicating new notifications
      self.registration.showNotification('You have new notifications', {
        body: 'Check your inbox for new updates!',
        icon: '/icon.png', // Your custom icon
        badge: '/badge.png', // Optional: Small icon for the badge
      });
    }
  });


// Notify the client(s) about connectivity status
function notifyClients(isOnline) {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ isOnline });
      });
    });
  }