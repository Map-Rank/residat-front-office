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
import VulnerabilitiesForms from '@/components/common/Pages/VulnerabilitiesForms.vue'
import SettingView from '@/features/Setting/SettingView.vue'

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
      path: '/vulnerabilities',
      name: 'vulnerabilities',
      component: VulnerabilitiesForms,
      meta: { requiresAuth: true }
    },
    {
      path: '/event',
      name: 'event',
      component: EventView,
      meta: { requiresAuth: true }
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashbaord/:zoneId?/:parentId?/:zoneName?/:mapSize?',
      name: 'dashbaord',
      component: DashBoardView,
      meta: { requiresAuth: true },
      props: (route) => ({
        zoneId: route.params.zoneId || 1,
        parentId: route.params.parentId,
        zoneName: route.params.zoneName,
        mapSize: route.params.mapSize
      })
    },
    {
      path: '/search/result/:zoneId/:query?',
      name: 'search-result',
      component: SearchResult,
      // props: true,
      meta: { requiresAuth: true },
      props: (route) => ({
        zoneId: route.params.zoneId ,
        query:route.params.query ,
      })
    },
    {
      path: '/create-event',
      name: 'create-event',
      component: CreateEvent,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-post/:postId',
      name: 'edit-post',
      component: CreatePost,
      meta: { requiresAuth: true },
      props: (route) => ({
        postId: route.params.postId || null,
      })
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
      path: '/community',
      name: 'community',
      component: CommunityView,
      meta: { requiresAuth: true }
    },
    {
      path: '/community/:zoneId?/:sectorId?',
      name: 'communitySearch',
      component: CommunityView,
      meta: { requiresAuth: true },
      props: (route) => ({
        zoneId: route.params.zoneId || null,
        sectorId: route.params.sectorId || null ,

      })
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
