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
    }
  }
  ,
  actions: {
    logIn(userCredentials) {
      // Logic for logging in
      // After successful login, set the user state
      this.user = { ...userCredentials };
    },
    logOut() {
      // Logic for logging out
      this.user = null;
    },
  },
});
