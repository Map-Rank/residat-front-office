import { createRouter, createWebHistory } from 'vue-router';
import  useAuthStore  from '../stores/auth.js'; // Adjust this import path as necessary

import CommunityView from '../features/Community/CommunityView.vue';
import ChatRoomView from '../features/ChatRoom/ChatRommView.vue';
import DashBoardView from '../features/DashBaord/DashBoardView.vue';
import AuthView from '../features/Auth/AuthView.vue';
import SocialProfile from '../features/SocialProfile/SocialProfile.vue';
import CreatePost from '../features/CreatePost/CreatePost.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/social-profile',
      name: 'social-profile',
      component: SocialProfile,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePost,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/',
      name: 'authentication',
      component: AuthView
    },
    {
      path: '/chat-room',
      name: 'chat-room',
      component: ChatRoomView,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/dashbaord', // Corrected the spelling of 'dashboard'
      name: 'dashbaord',
      component: DashBoardView,
      meta: { requiresAuth: true } // Protected route
    },
  ]
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth) && authStore.user == null) {
    next({ name: 'authentication' });
  } else if (to.name === 'authentication' && authStore.user !=null) {
    next({ name: 'community' }); // Redirect to community or another appropriate route
  } else {
    next();
  }
});

export default router;
