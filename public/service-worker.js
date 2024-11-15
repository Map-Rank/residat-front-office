// Service Worker: Listen for connectivity changes and send notifications
let lastStatus = true
let lastNotification = null // Store the last notification in memory
let authToken = null // Variable to store the token

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.')
  event.waitUntil(self.clients.claim())
  registerBackgroundSync() // Register background sync on activate
  setupNotificationInterval() // Set up fallback polling
})

// Register Background Sync
function registerBackgroundSync() {
  self.registration.sync.register('sync-fetch-notifications').catch((error) => {
    console.error('Sync registration failed:', error)
  })
}

// Set up periodic interval as a fallback
function setupNotificationInterval() {
  if (!self.notificationInterval) {
    self.notificationInterval = setInterval(
      () => {

        if (authToken){ 
          console.log('appel notif-interval ' + authToken)

          fetchNewNotifications(authToken)}
      },
      10 * 60 * 1000
    ) // 10 minutes
  }
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

  if (event.data.action === 'setLastNotification' && event.data.notification) {
    lastNotification = event.data.notification
  } else if (event.data.action === 'showLastNotification') {
    showLastNotification()
  } else if (event.data.action === 'checkConnectivity') {
    checkConnectivity().then((isOnline) => {
      if (isOnline !== lastStatus) {
        showConnectivityNotification(isOnline)
        lastStatus = isOnline
      }
    })
  }

  if (event.data.action === 'setAuthToken' && event.data.token) {
    authToken = event.data.token
    // console.log(event.data.token)
    console.log('AuthToken set in service worker:', authToken)
    // Fetch new notifications once token is set
    if (authToken) {
      console.log('appel notif-authtoken ' + authToken)

      fetchNewNotifications(authToken)
    } else {
      console.error('Auth token is missing during activation.')
    }
  }
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
  const controller = new AbortController() // For timeout handling
  const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 seconds timeout
  const apiUrl = 'https://backoffice-dev.residat.com/api/notifications'
  console.log('Starting fetchNewNotifications...  ' + authToken)

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken
      },
      signal: controller.signal // Attach the abort controller's signal
    })
    clearTimeout(timeoutId) // Clear timeout if request completed

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.status} ${response.statusText}`)
    }

    const notifications = await response.json()
    console.log('Fetched new notifications:', notifications)

    if (Array.isArray(notifications) && notifications.length > 0) {
      const mostRecentNotification = notifications.reduce(
        (max, notification) => (notification.id > max.id ? notification : max),
        notifications[0]
      )

      // Store the most recent notification in memory
      lastNotification = mostRecentNotification

      // Prepare notification options
      const options = {
        body: mostRecentNotification.content_en,
        icon: '/assets/images/filter.png',
        badge: '/assets/images/filter.png'
      }

      // Display the notification if permission is granted and registration exists
      if (Notification.permission === 'granted' && self.registration) {
        self.registration.showNotification(mostRecentNotification.title, options)
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Fetch request timed out.')
    } else {
      console.error('Error fetching notifications:', error)
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
