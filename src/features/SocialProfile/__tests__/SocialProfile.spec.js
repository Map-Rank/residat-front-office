import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SocialProfile from '@/features/SocialProfile/SocialProfile.vue'
import AboutUserInfo from '@/features/SocialProfile/components/AboutUserInfo/index.vue'
import TopProfileInfo from '@/features/SocialProfile/components/TopProfileInfo/index.vue'
import { makeApiGetCall } from '@/api/api'
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'

// Mock the API call
vi.mock('@/api/api', () => ({
  makeApiGetCall: vi.fn(() =>
    Promise.resolve({
      data: {
        data: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
          my_posts: [],
          created_at: new Date().toISOString(),
          events: [],
          avatar: 'https://example.com/avatar.jpg'
        }
      }
    })
  )
}));

describe('SocialProfile Component', () => {
  let wrapper;

  beforeEach(async () => {
    // Set up local storage mock
    localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, 'mockToken');

    wrapper = mount(SocialProfile, {
      global: {
        mocks: {
          $route: {
            params: { id: '1' }
          },
          $t: (msg) => msg // Mock translation function
        }
      }
    });

    await wrapper.vm.$nextTick();
  });

  it('fetches user profile on creation', async () => {
    // Wait for the fetchUserPost method to complete
    await wrapper.vm.fetchUserPost();

    expect(makeApiGetCall).toHaveBeenCalledWith(API_ENDPOINTS.getUserPosts, 'mockToken');
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.userPost).toBeTruthy();
  });

  it('renders TopProfileInfo and AboutUserInfo after loading', async () => {
    // Wait for the fetchUserPost method to complete
    await wrapper.vm.fetchUserPost();

    expect(wrapper.findComponent(TopProfileInfo).exists()).toBe(true);
    expect(wrapper.findComponent(AboutUserInfo).exists()).toBe(true);
  });
});
