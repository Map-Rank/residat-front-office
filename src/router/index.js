import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '../stores/auth.js' 

import CommunityView from '../features/Community/CommunityView.vue'
import ChatRoomView from '../features/ChatRoom/ChatRoomView.vue'
import DashBoardView from '@/features/DashBaord/DashBoardView.vue'
import AuthView from '../features/Auth/AuthView.vue'
import SocialProfile from '../features/SocialProfile/SocialProfile.vue'
import CreatePost from '../features/CreatePost/CreatePost.vue'
import ShowPost from '@/components/common/ShowPost/index.vue'
import OTP from '@/features/Auth/components/OTP.vue'
import ViewProfileUser from '../features/SocialProfile/ViewProfileUser.vue'
import EmailVerification from '../features/Auth/components/EmailVerification.vue'
import SearchResult from '../features/Search/SearchResult.vue'
import EventView from '@/features/Event/EventView.vue'
import UserEventView from '@/features/Event/UserEventView.vue'
import ReportView from '@/features/Report/ReportView.vue'
import CreateEvent from '@/features/Event/Components/CreateEvent.vue'
import EditEvent from '@/features/Event/Components/EditEvent.vue'
import VulnerabilitiesForms from '@/components/common/Pages/VulnerabilitiesForms.vue'
import SettingView from '@/features/Setting/SettingView.vue'
import AccountPreferences from '@/features/Setting/Pages/AccountPreferences/AccountPreferences.vue'
import UpdateProfile from '@/features/Setting/Pages/AccountPreferences/UpdateProfile.vue'
import SecuritySetting from '@/features/Setting/Pages/SecuritySetting/SecuritySetting.vue'
import UpdatePassword from '@/features/Setting/Pages/SecuritySetting/UpdatePassword.vue'
import LangaugeModal from '@/components/common/Modal/LangaugeModal.vue'
import NotificationView from '@/features/Notification/NotificationView.vue'
import BroadcastNotification from '@/features/ChatRoom/Pages/BraodcastNotification.vue'
import EventDetails from '@/features/Event/Pages/EventDetails.vue'
import ForgotPassword from '../features/Auth/ForgotPassword.vue'
import ResetPassword from '../features/Auth/ResetPassword.vue'
import LandingPage from '@/features/LandingPage/LandingPage.vue'
import SuccessPage from '@/features/Auth/Pages/SuccessPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/social-profile',
      name: 'social-profile',
      component: SocialProfile,
      // meta: { requiresAuth: true }
      
    },
    {
      path: '/notification',
      name: 'notification',
      component: NotificationView,
      meta: { requiresAuth: true },
      redirect: (to) => {
        return '/community';
      }
    },

    {
      path: '/broadcast-notification',
      name: 'broadcast-notification',
      component: BroadcastNotification,
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
      // meta: { requiresAuth: true }
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
      redirect: '/account-preferences', 
      children: [
        {
          path: '/account-preferences', 
          name: 'account-preferences',
          component: AccountPreferences,
        },
        {
          path: '/account-preferences/update-profile', 
          name: 'update-profile',
          component: UpdateProfile,
        },
        {
          path: '/account-preferences/change-langauge', 
          name: 'change-langauge',
          component: LangaugeModal,
        },
        {
          path: '/security-setting', 
          name: 'security-setting',
          component: SecuritySetting,
        },
        {
          path: '/security-setting/update-password', 
          name: 'update-password',
          component: UpdatePassword,
        },
        
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/:zoneId?/:parentId?/:zoneName?/:mapSize?',
      name: 'dashboard',
      component: DashBoardView,
      // meta: { requiresAuth: true },
      props: (route) => ({
        zoneId: route.params.zoneId || 1,
        parentId: route.params.parentId,
        zoneName: route.params.zoneName,
        mapSize: route.params.mapSize
      }),
      // redirect: (to) => {
        //   return '/community';
        // }
      },
      
      {
        path: '/community',
        name: 'community',
        component: CommunityView,
        // meta: { requiresAuth: true }
      },
      
      {
        path: '/user-events',
        name: 'user-events',
        component: UserEventView,
        meta: { requiresAuth: true }
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: { requiresAuth: false }
      },

      {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPassword,
        meta: { requiresAuth: false }
      },
      
      {
        path: '/create-post/:prePostContent?',
        name: 'create-post',
        component: CreatePost,
      meta: { requiresAuth: true },
      props: (route) => ({
        prePostContent: route.params.prePostContent || '',
      })
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
      path: '/search/result/:zoneId/:query?',
      name: 'search-result',
      component: SearchResult,
      // props: true,
      // meta: { requiresAuth: true },
      props: (route) => ({
        zoneId: route.params.zoneId ,
        query:route.params.query ,
      })
    },
    {
      path: '/create-event/:preEventTitle?',
      name: 'create-event',
      component: CreateEvent,
      meta: { requiresAuth: true },
      props: (route) => ({
        preEventTitle: route.params.preEventTitle || '',
      })
    },
    
    {
      path: '/report',
      name: 'report',
      component: ReportView,
      // meta: { requiresAuth: true }
    },
   

    {
      path: '/community',
      name: 'community',
      component: CommunityView,
      // meta: { requiresAuth: true }
    },
    {
      path: '/community/:zoneId?/:sectorId?',
      name: 'communitySearch',
      component: CommunityView,
      // meta: { requiresAuth: true },
      props: (route) => ({
        zoneId: route.params.zoneId || null,
        sectorId: route.params.sectorId || null ,

      })
    },
    {
      path: '/authentication/:tab?',
      name: 'authentication',
      component: AuthView,
      meta: { requiresAuth: false },
      props: (route) => ({
        tab: route.params.tab ,

      })
    },
    {
      path: '/authentication/success-submition',
      name: 'success-submition',
      component: SuccessPage,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,
      meta: { requiresAuth: false },
      // meta: { requiresAuth: true },
      // redirect: (to) => {
      //   return '/community';
      // }
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
      meta: { requiresAuth: true },
      redirect: (to) => {
        return '/community';
      }
    },


    {
      path: '/show-post/:id',
      name: 'show-post',
      component: ShowPost,
      // meta: { requiresAuth: true }
    },
    {
      path: '/event-detail/:eventId',
      name: 'event-detail',
      component: EventDetails,
      meta: { requiresAuth: true },
      props: (route) => ({
        eventId: route.params.eventId ,
      })
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
      // meta: { requiresAuth: true }
    }
  ]
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth) && authStore.user == null) {
    next({ name: 'landing-page' })
    next({ name: 'landing-page' })
  }
   else if (to.name === 'landing-page' && authStore.user != null) {
    next({ name: 'community' }) 
  }
   else if (to.name === 'authentication' && authStore.user != null) {
    next({ name: 'community' }) 
  }
   else if (to.name === 'reset-password' && authStore.user != null) {
    next({ name: 'community' }) 
  }
   else if (to.name === 'forgot-password' && authStore.user != null) {
    next({ name: 'community' }) 
  }
  
  else {
    next()
  }
})


export default router
