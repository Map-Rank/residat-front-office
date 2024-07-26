import { defineStore } from 'pinia';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

export default defineStore('auth', {
  state: () => ({
    user: null,
    token:null,
    isloggedIn: null,
    showGuessHeader: false,
    isEmailVerified:null,
  }),

  getters: {
    hiddenClass(state) {
      return state.user ==null ? 'hidden' : ''
    },
    showClass(state) {
      return state.user == null ? '' : 'hidden'
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
        const userEmailVerification = localStorage.getItem(LOCAL_STORAGE_KEYS.userEmailVerification)
          if (userInfo) {
          this.user = JSON.parse(userInfo);
          this.isLoggedIn = !!this.user;
          this.showGuessHeader = false
        }
        else if (userEmailVerification){
          this.isEmailVerified = false
        }else{
          this.showGuessHeader = true
        }
        
      } catch (error) {
        console.error('Failed to parse user info:', error);
        this.resetAuthState();
      }
    },

    hideGuessHeader() {
      this.showGuessHeader = false;
    },
    showGuessHeader() {
      this.showGuessHeader = true;
    },


    setUser(userData) {
      this.user = userData;
      this.isloggedIn = true;
    },
    settoken(token) {
      this.token = token;
    },
    
    logOut() {
      // Logic for logging out
      this.user = null;
      this.isloggedIn = false;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.userInfo)
      localStorage.removeItem(LOCAL_STORAGE_KEYS.authToken); 
      localStorage.removeItem(LOCAL_STORAGE_KEYS.sector); 
      console.log('Logout Successful!!!!')
    },
  },
});
