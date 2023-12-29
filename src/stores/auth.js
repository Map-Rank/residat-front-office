// src/stores/auth.js
import { defineStore } from 'pinia';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

export default defineStore('auth', {
  state: () => ({
    user: null,
    isloggedIn: null
  }),

  getters: {
    hiddenClass(state) {
      return state.user ==null ? 'hidden' : ''
    },
    getCurrentUser(state) {
      return state.user;
    },
  
  }
  ,
  actions: {

    initializeAuthState() {
      try {
        const userInfo = localStorage.getItem(LOCAL_STORAGE_KEYS.userInfo);
        if (userInfo) {
          this.user = JSON.parse(userInfo);
          this.isLoggedIn = this.user? true : false;
        }
        
      } catch (error) {
        console.error('Failed to parse user info:', error);
        // Handle error, possibly resetting auth state
        this.resetAuthState();
      }
    },


    setUser(userData) {
      console.log(userData)
      this.user = userData;
      this.isloggedIn = true;
    },
    
    logOut() {
      // Logic for logging out
      this.user = null;
      this.isloggedIn = false;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.userInfo)
      localStorage.removeItem(LOCAL_STORAGE_KEYS.authToken); 
      console.log('Logout Successful!!!!')
    },
  },
});
