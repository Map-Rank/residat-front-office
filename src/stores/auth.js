// src/stores/auth.js
import { defineStore } from 'pinia';

export default defineStore('auth', {
  state: () => ({
    user: null,
    isloggedIn: false
  }),

  getters: {
    hiddenClass(state) {
      return !state.isloggedIn ? 'hidden' : ''
    },
    getCurrentUser(state) {
      return state.user;
    },
  
  }
  ,
  actions: {
    setUser(userData) {
      this.user = userData;
      this.isloggedIn = true;
      console.log('loginState: '+this.isloggedIn)
    },
    
    logOut() {
      // Logic for logging out
      this.user = null;
      this.isloggedIn = false;
      localStorage.removeItem('authToken'); 
      console.log('Logout Successful!!!!')
    },
  },
});
