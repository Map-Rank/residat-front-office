import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutUserInfo from '@/features/SocialProfile/components/AboutUserInfo/index.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}));

describe('AboutUserInfo Component', () => {
  let wrapper;

  beforeEach(() => {
  });

  describe('With all props provided', () => {
    beforeEach(() => {
      wrapper = mount(AboutUserInfo, {
        props: {
          username: 'JohnDoe',
          description: 'A brief description about John Doe.',
          location: 'New York',
          phone: '123-456-7890',
          email: 'john@example.com',
          joinDate: '2023-01-01',
          showUpdateProfile: true
        },
        global: {
          mocks: {
            $t: (msg) => msg
          }
        }
      });
    });

    it('renders all provided information', () => {
      expect(wrapper.text()).toContain('JohnDoe');
    });

    it('renders the update profile button', () => {
      const button = wrapper.find('button');
      expect(button.text()).toBe('update_profile_button');
    });
  });


  describe('When showUpdateProfile is false', () => {
    beforeEach(() => {
      wrapper = mount(AboutUserInfo, {
        props: {
          username: 'JohnDoe',
          showUpdateProfile: false
        },
        global: {
          mocks: {
            $t: (msg) => msg
          }
        }
      });
    });

    it('renders the follow button', () => {
      const button = wrapper.find('button');
      expect(button.text()).toBe('follow JohnDoe');
    });
  });
});
