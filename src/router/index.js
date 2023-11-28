import { createRouter, createWebHistory } from 'vue-router'
import CommunityView from '../features/Community/CommunityView.vue'
import ChatRoomView from '../features/ChatRoom/ChatRommView.vue'
import DashBoardView from '../features/DashBaord/DashBoardView.vue'
import AuthView from '../features/Auth/AuthView.vue'
import SocialProfile from '../features/SocialProfile/SocialProfile.vue'
import CreatePost from '../features/CreatePost/CreatePost.vue'
import PostDetails from '../components/common/Post/components/PostDetails.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'post-details',
      component: PostDetails
    },
    {
      path: '/social-profile',
      name: 'social-profile',
      component: SocialProfile
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePost
    },
    {
      path: '/',
      name: 'community',
      component: CommunityView
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: AuthView
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
  ]
})

export default router
