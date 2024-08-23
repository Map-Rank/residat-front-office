import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TopProfileInfo from '@/features/SocialProfile/components/TopProfileInfo/index.vue';
import AvatarPlaceholder from '@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue';

describe('TopProfileInfo Component', () => {
  let wrapper;

  describe('With profileImageUrl', () => {
    beforeEach(() => {
      wrapper = mount(TopProfileInfo, {
        props: {
          profileImageUrl: 'https://example.com/profile.jpg',
          profileName: 'John Doe',
          followersCount: 100,
          postsCount: 50,
          isCurrentUser: true
        },
        global: {
          mocks: {
            $t: (msg) => msg // Mock the translation function
          }
        }
      });
    });

    it('renders the profile image', () => {
      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('https://example.com/profile.jpg');
    });

    it('does not render avatar placeholder', () => {
      expect(wrapper.findComponent(AvatarPlaceholder).exists()).toBe(false);
    });

    it('displays profile information', () => {
      expect(wrapper.text()).toContain('John Doe');
      expect(wrapper.text()).toContain('100 followers');
      expect(wrapper.text()).toContain('50 posts');
    });
  });

  describe('Without profileImageUrl', () => {
    beforeEach(() => {
      wrapper = mount(TopProfileInfo, {
        props: {
          profileImageUrl: '',
          profileName: 'John Doe',
          followersCount: 100,
          postsCount: 50,
          isCurrentUser: false
        },
        global: {
          mocks: {
            $t: (msg) => msg // Mock the translation function
          }
        }
      });
    });

    it('renders the avatar placeholder', () => {
      expect(wrapper.findComponent(AvatarPlaceholder).exists()).toBe(true);
    });

    it('does not render the profile image', () => {
      expect(wrapper.find('img').exists()).toBe(false);
    });

    it('displays profile information', () => {
      expect(wrapper.text()).toContain('John Doe');
      expect(wrapper.text()).toContain('100 followers');
      expect(wrapper.text()).toContain('50 posts');
    });

    it('does not render action buttons for non-current user', () => {
      // Assuming action buttons are identified by a specific class or test id
      expect(wrapper.find('[data-test="edit-profile"]').exists()).toBe(false);
      expect(wrapper.find('[data-test="create-post"]').exists()).toBe(false);
    });
  });
});
