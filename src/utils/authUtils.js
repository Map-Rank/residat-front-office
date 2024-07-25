// utils/authUtils.js
import useAuthStore from '@/stores/auth.js';
import { useModalStore } from '@/stores/modalStore.js';

const isUserLoggedIn = ref(false);

export function checkAuthentication() {
  const authStore = useAuthStore();
  const modalStore = useModalStore();

  isUserLoggedIn.value = !!authStore.user;

  if (!isUserLoggedIn.value) {
    console.log('This user is not logged in');
    modalStore.openAuthModal(); // Open the modal using the store
    return false;
  }

  console.log('This user is logged in');
  return true;
}
