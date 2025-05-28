import { defineStore } from 'pinia';
import { createNotification, getNotifications, getFilterNotifications, deleteNotification, getSpecificNotification, UpdateNotification } from '@/services/notificationService'; // Import your notification service
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js';


export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    isLoading: false,
    error: null,
    lastFetched: null,
  }),
  actions: {
    // Fetch notifications
    async fetchNotifications(page = 0, size = 10) {
      this.isLoading = true;
      try {
        const response = await getNotifications(page, size);
        this.notifications = response;
        this.lastFetched = new Date();
      } catch (error) {
        this.error = error;
        console.error('Error fetching notifications:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Fetch filtered notifications
    async fetchFilteredNotifications(zoneId, sectorId, page = 0, size = 10) {
      this.isLoading = true;
      try {
        const response = await getFilterNotifications(zoneId, sectorId, size, page);
        this.notifications = response;
        this.lastFetched = new Date();
      } catch (error) {
        this.error = error;
        console.error('Error fetching filtered notifications:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Create a new notification
    async createNotification(notificationData) {
      this.isLoading = true;
      try {
        await createNotification(notificationData, this.authStore, () => {
          this.fetchNotifications();  // Re-fetch notifications after creating a new one
        });
      } catch (error) {
        this.error = error;
        console.error('Error creating notification:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Update an existing notification
    async updateNotification(notificationId, notificationData) {
      this.isLoading = true;
      try {
        await UpdateNotification(notificationId, notificationData, this.authStore, () => {
          this.fetchNotifications(); // Re-fetch notifications after update
        });
      } catch (error) {
        this.error = error;
        console.error('Error updating notification:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Delete a notification
    async deleteNotification(notificationId) {
      this.isLoading = true;
      try {
        await deleteNotification(notificationId);
        this.notifications = this.notifications.filter(
          (notification) => notification.id !== notificationId
        );
      } catch (error) {
        this.error = error;
        console.error('Error deleting notification:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Fetch a specific notification by ID
    async fetchSpecificNotification(id) {
      try {
        const notification = await getSpecificNotification(id);
        return notification;
      } catch (error) {
        this.error = error;
        console.error('Error fetching specific notification:', error);
      }
    },

    // Reset error state
    resetError() {
      this.error = null;
    },
  },
  getters: {
    // Get formatted error message
    errorMessage(state) {
      return state.error ? state.error.message : '';
    },
  },
});
