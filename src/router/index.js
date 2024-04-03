import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '../stores/auth.js' // Adjust this import path as necessary

import CommunityView from '../features/Community/CommunityView.vue'
import ChatRoomView from '../features/ChatRoom/ChatRoomView.vue'
import DashBoardView from '../features/DashBaord/DashBoardView.vue'
import AuthView from '../features/Auth/AuthView.vue'
import SocialProfile from '../features/SocialProfile/SocialProfile.vue'
import CreatePost from '../features/CreatePost/CreatePost.vue'
import ShowPost from '@/components/common/ShowPost/index.vue'
import OTP from '@/features/Auth/components/OTP.vue'
import ViewProfileUser from '../features/SocialProfile/ViewProfileUser.vue'
import EmailVerification from '../features/Auth/components/EmailVerification.vue'
import SearchResult from '../features/Search/SearchResult.vue'
import EventView from '@/features/Event/EventView.vue'
import ReportView from '@/features/Report/ReportView.vue'
import CreateEvent from '@/features/Event/Components/CreateEvent.vue'
import EditEvent from '@/features/Event/Components/EditEvent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/social-profile',
      name: 'social-profile',
      component: SocialProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/event',
      name: 'event',
      component: EventView,
      meta: { requiresAuth: true }
    },
    {
      path: '/create-event',
      name: 'create-event',
      component: CreateEvent,
      meta: { requiresAuth: true }
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView,
      meta: { requiresAuth: true }
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePost,
      meta: { requiresAuth: true }
    },
    {
      path: '/search/result/:idType/:id',
      name: 'search-result',
      component: SearchResult,
      props: true,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        const validTypes = ['zone', 'user', 'post']
        if (validTypes.includes(to.params.idType)) {
          next()
        } else {
          // Redirect to a default page or show an error if the idType is not valid
          next({ name: 'default-route' })
        }
      }
    },

    {
      path: '/community',
      name: 'community',
      component: CommunityView,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'authentication',
      component: AuthView
    },
    {
      path: '/otp',
      name: 'opt',
      component: OTP
    },
    {
      path: '/email-verification',
      name: 'email-verification',
      component: EmailVerification
    },
    {
      path: '/chat-room',
      name: 'chat-room',
      component: ChatRoomView,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashbaord',
      name: 'dashbaord',
      component: DashBoardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/show-post/:id',
      name: 'show-post',
      component: ShowPost,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-event/:id',
      name: 'edit-event',
      component: EditEvent,
      meta: { requiresAuth: true }
    },
    {
      path: '/view-profile-user/:id',
      name: 'view-profile-user',
      component: ViewProfileUser,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth) && authStore.user == null) {
    next({ name: 'authentication' })
  } else if (to.name === 'authentication' && authStore.user != null) {
    next({ name: 'dashbaord' }) 
  } else {
    next()
  }
})

export default router
