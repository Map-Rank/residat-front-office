import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import useAuthStore from '../../stores/auth.js'


// Mock all components (replace with actual components if needed)
const MockComponent = { template: '<div>Mock Component</div>' }

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/social-profile',
      name: 'social-profile',
      component: MockComponent
    },
    {
      path: '/notification',
      name: 'notification',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/broadcast-notification',
      name: 'broadcast-notification',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/vulnerabilities',
      name: 'vulnerabilities',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/event',
      name: 'event',
      component: MockComponent
    },
    {
      path: '/setting',
      name: 'setting',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: MockComponent
    },
    {
      path: '/search-map/:searchId?',
      name: 'search-map',
      component: MockComponent
    },
    {
      path: '/community',
      name: 'community',
      component: MockComponent
    },
    {
      path: '/user-events',
      name: 'user-events',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: MockComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: MockComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/create-post/:prePostContent?',
      name: 'create-post',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-post/:postId',
      name: 'edit-post',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/search/result/:zoneId/:query?',
      name: 'search-result',
      component: MockComponent
    },
    {
      path: '/create-event/:preEventTitle?',
      name: 'create-event',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/report',
      name: 'report',
      component: MockComponent
    },
    {
      path: '/community/:propZoneId?/:propSectorId?',
      name: 'community',
      component: MockComponent
    },
    {
      path: '/verification-account/:heading?/:message?',
      name: 'verification-account',
      component: MockComponent
    },
    {
      path: '/community/:zoneId?/:sectorId?',
      name: 'communitySearch',
      component: MockComponent
    },
    {
      path: '/authentication/:tab?',
      name: 'authentication',
      component: MockComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/authentication/success-submition',
      name: 'success-submition',
      component: MockComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'landing-page',
      component: MockComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/otp',
      name: 'opt',
      component: MockComponent
    },
    {
      path: '/email-verification',
      name: 'email-verification',
      component: MockComponent
    },
    {
      path: '/chat-room',
      name: 'chat-room',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/show-post/:id',
      name: 'show-post',
      component: MockComponent
    },
    {
      path: '/event-detail/:eventId',
      name: 'event-detail',
      component: MockComponent
    },
    {
      path: '/edit-event/:id',
      name: 'edit-event',
      component: MockComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/view-profile-user/:id',
      name: 'view-profile-user',
      component: MockComponent
    }
  ]
})

describe('Router Configuration', () => {
  let authStore

  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    const pinia = createTestingPinia({
      createSpy: vi.fn
    })
    authStore = useAuthStore(pinia)
  })

  // it('should define the correct routes', () => {
  //   const routes = router.getRoutes()
  //   expect(routes).toContainEqual(
  //     expect.objectContaining({
  //       path: '/',
  //       name: 'landing-page'
  //     })
  //   )
  //   expect(routes).toContainEqual(
  //     expect.objectContaining({
  //       path: '/community',
  //       name: 'community'
  //     })
  //   )
  //   expect(routes).toContainEqual(
  //     expect.objectContaining({
  //       path: '/authentication',
  //       name: 'authentication'
  //     })
  //   )
  //   // Add more assertions for other routes as needed
  // })

  // it('should redirect to landing-page if user is not authenticated and route requires auth', async () => {
  //   authStore.user = null // Simulate unauthenticated user
  //   await router.push('/notification') // Try to access a protected route
  //   expect(router.currentRoute.value.name).toBe('landing-page')
  // })

  it('should allow access to notification route if user is authenticated', async () => {
    authStore.user = { id: 1 } // Simulate authenticated user
    await router.push('/notification') // Try to access a protected route
    expect(router.currentRoute.value.name).toBe('notification')
  })

  // it('should redirect to community if user is authenticated and tries to access landing-page', async () => {
  //   authStore.user = { id: 1 } // Simulate authenticated user
  //   await router.push('/') // Try to access landing-page
  //   expect(router.currentRoute.value.name).toBe('community')
  // })

  // it('should redirect to community if user is authenticated and tries to access authentication', async () => {
  //   authStore.user = { id: 1 } // Simulate authenticated user
  //   await router.push('/authentication') // Try to access authentication
  //   expect(router.currentRoute.value.name).toBe('community')
  // })

  it('should allow access to landing-page if user is not authenticated', async () => {
    authStore.user = null // Simulate unauthenticated user
    await router.push('/') // Try to access landing-page
    expect(router.currentRoute.value.name).toBe('landing-page')
  })

  it('should allow access to forgot-password if user is not authenticated', async () => {
    authStore.user = null // Simulate unauthenticated user
    await router.push('/forgot-password') // Try to access forgot-password
    expect(router.currentRoute.value.name).toBe('forgot-password')
  })

  // it('should redirect to community if user is authenticated and tries to access forgot-password', async () => {
  //   authStore.user = { id: 1 } // Simulate authenticated user
  //   await router.push('/forgot-password') // Try to access forgot-password
  //   expect(router.currentRoute.value.name).toBe('community')
  // })

  it('should allow access to reset-password if user is not authenticated', async () => {
    authStore.user = null // Simulate unauthenticated user
    await router.push('/reset-password') // Try to access reset-password
    expect(router.currentRoute.value.name).toBe('reset-password')
  })

  // it('should redirect to community if user is authenticated and tries to access reset-password', async () => {
  //   authStore.user = { id: 1 } // Simulate authenticated user
  //   await router.push('/reset-password') // Try to access reset-password
  //   expect(router.currentRoute.value.name).toBe('community')
  // })
})