import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SocialProfile from '@/features/SocialProfile/SocialProfile.vue'
import AboutUserInfo from '@/features/SocialProfile/components/AboutUserInfo/index.vue'
import TopProfileInfo from '@/features/SocialProfile/components/TopProfileInfo/index.vue'
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

// Mock local storage to handle token
vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(() => ({
    user: { token: 'mockToken' },
  })),
}));

describe('SocialProfile Component', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, 'mockToken');

    wrapper = mount(SocialProfile, {
      global: {
        mocks: {
          $route: { params: { id: '1' } },
          $t: (msg) => msg, // Mock translation function
        }
      }
    });
  });



  it('renders TopProfileInfo and AboutUserInfo after loading', () => {
    expect(wrapper.findComponent(TopProfileInfo).exists()).toBe(true);
    expect(wrapper.findComponent(AboutUserInfo).exists()).toBe(true);
  });

  it('displays correct user info', () => {
    const userInfo = wrapper.findComponent(AboutUserInfo);
    expect(userInfo.props('email')).toBe('john@example.com');
    expect(userInfo.props('phone')).toBe('1234567890');
  });
});
