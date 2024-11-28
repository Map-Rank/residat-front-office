import { getNotifications } from "./notificationService";
import { LOCAL_STORAGE_KEYS } from "../constants/localStorageKeys";


const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEYS.isloggedIn) === 'true';
const connectionTime = isLoggedIn ? new Date(localStorage.getItem(LOCAL_STORAGE_KEYS.isloggedIn)) : new Date().toISOString();
const token = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
async function fetchRecentNotifications() {
    const notifications = await getNotifications(null, null, token);
    console.log(notifications)
    
    // Filter notifications based on last connection time
    const recentNotifications = notifications.filter(notification => 
      new Date(notification.created_at) > new Date(connectionTime)
    );
  // Update last connection time
  localStorage.setItem(LOCAL_STORAGE_KEYS.lastConnectionTime, new Date().toISOString());
// Update `isloggedIn` in localStorage to mark this as a connection
    localStorage.setItem(LOCAL_STORAGE_KEYS.isloggedIn, 'true');

  return recentNotifications;
}
export { fetchRecentNotifications };
