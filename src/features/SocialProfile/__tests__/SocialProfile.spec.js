import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SocialProfile from '@/features/SocialProfile/SocialProfile.vue'
import AboutUserInfo from '@/features/SocialProfile/components/AboutUserInfo/index.vue'
import TopProfileInfo from '@/features/SocialProfile/components/TopProfileInfo/index.vue'

vi.mock('@/features/Post/services/postService.js', () => ({
  getUserPosts: vi.fn(() => 
    Promise.resolve({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      my_posts: [],
      created_at: new Date().toISOString()
    })
  )
}));

describe('SocialProfile Component', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(SocialProfile, {
      global: {
        mocks: {
          $route: {
            params: { id: '1' }
          }
        }
      }
    });

    await wrapper.vm.$nextTick();
  });

  it('fetches user profile on creation', () => {
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.userPost).toBeTruthy();
  });

  it('renders TopProfileInfo and AboutUserInfo after loading', () => {
    expect(wrapper.findComponent(TopProfileInfo).exists()).toBe(true);
    expect(wrapper.findComponent(AboutUserInfo).exists()).toBe(true);
  });

});