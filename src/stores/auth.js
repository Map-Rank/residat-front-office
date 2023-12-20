// src/stores/auth.js
import { defineStore } from 'pinia';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

export default defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.userInfo)),
    isloggedIn: false
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
