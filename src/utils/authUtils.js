// utils/authUtils.js
import useAuthStore from '@/stores/auth.js';
import useModalStore from '@/stores/modalStore.js'
import { ref } from 'vue';

const isUserLoggedIn = ref(false);

export function checkAuthentication() {
  const authStore = useAuthStore();
  const modalStore = useModalStore();

  isUserLoggedIn.value = !!authStore.user;

  if (!isUserLoggedIn.value) {
    // console.log('This user is not logged in');
    modalStore.openAuthModal(); // Open the modal using the store
    // console.log('This user is not logged in');
    return false;
  }

  return true;
}
