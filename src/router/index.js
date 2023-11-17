import { createRouter, createWebHistory } from 'vue-router'
import CommunityView from '../features/Community/CommunityView.vue'
import ChatRoomView from '../features/ChatRoom/ChatRommView.vue'
import DashBoardView from '../features/DashBaord/DashBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'community',
      component: CommunityView
    },
    {
      path: '/chat-room',
      name: 'chat-room',
      component: ChatRoomView
    },
    {
      path: '/dashbaord',
      name: 'dashbaord',
      component: DashBoardView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
