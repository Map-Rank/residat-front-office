import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TopProfileInfo from '@/features/SocialProfile/components/TopProfileInfo/index.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';
import AvatarPlaceholder from '@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue';
import { formatHostImageUrl } from '@/utils/formating';


describe('TopProfileInfo Component', () => {
  let wrapper;

  describe('With profileImageUrl', () => {
    beforeEach(() => {
      wrapper = mount(TopProfileInfo, {
        props: {
          profileImageUrl: 'profile.jpg',
          profileName: 'John Doe',
          followersCount: 100,
          postsCount: 50,
          isCurrentUser: true
        },
        global: {
            mocks: {
              formatHostImageUrl
            }
          }
      });
    });

    it('renders the profile image', () => {
      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe(formatHostImageUrl('profile.jpg'));    });

    it('does not render avatar placeholder', () => {
      expect(wrapper.findComponent(AvatarPlaceholder).exists()).toBe(false);
    });

    it('displays profile information', () => {
      expect(wrapper.text()).toContain('John Doe');
      expect(wrapper.text()).toContain('100 followers');
      expect(wrapper.text()).toContain('50 Articles/Posts');
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
        }
      });
    });

    it('renders the avatar placeholder', () => {
      expect(wrapper.findComponent(AvatarPlaceholder).exists()).toBe(true);
    });

    it('does not render the profile image', () => {
      expect(wrapper.find('img').exists()).toBe(false);
    });

    it('does not render action buttons for non-current user', () => {
      expect(wrapper.findAllComponents(ButtonUi).length).toBe(0);
    });
  });

});
