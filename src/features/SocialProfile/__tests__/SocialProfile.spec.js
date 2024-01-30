import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SocialProfile from '@/features/SocialProfile/SocialProfile.vue'
import AboutUserInfo from '@/features/SocialProfile/components/AboutUserInfo/index.vue'
import TopProfileInfo from '@/features/SocialProfile/components/TopProfileInfo/index.vue'
import PostComponent from '@/features/Post/index.vue'
import { getUserProfile } from '@/features/Post/services/postService.js'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'

// Mocking the getUserProfile function
vi.mock('@/features/Post/services/postService.js', () => ({
  getUserProfile: vi.fn(() => Promise.resolve({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    my_posts: [],
    created_at: new Date().toISOString()
  }))
}))

describe('SocialProfile Component', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(SocialProfile, {
      global: {
        mocks: {
          $route: {
            params: { id: '1' }
          }
        }
      }
    })
  })

  it('fetches user profile on creation', async () => {
    expect(getUserProfile).toHaveBeenCalledWith('1')
    expect(wrapper.vm.userProfile).toBeTruthy()
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('renders TopProfileInfo and AboutUserInfo after loading', async () => {
    expect(wrapper.findComponent(TopProfileInfo).exists()).toBe(true)
    expect(wrapper.findComponent(AboutUserInfo).exists()).toBe(true)
  })

  it('renders PostComponent for each post in userProfile.my_posts', async () => {
    wrapper.vm.userProfile = { my_posts: [{ id: 1 }, { id: 2 }] }
    expect(wrapper.findAllComponents(PostComponent).length).toBe(2)
  })
})
