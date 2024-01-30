import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutUserInfo from '@/features/SocialProfile/components/AboutUserInfo/index.vue';

describe('AboutUserInfo Component', () => {
  let wrapper;

  describe('With all props provided', () => {
    beforeEach(() => {
      wrapper = mount(AboutUserInfo, {
        props: {
          username: 'JohnDoe',
          description: 'A brief description about John Doe.',
          location: 'New York',
          phone: '123-456-7890',
          email: 'john@example.com',
          joinDate: '2023-01-01'
        }
      });
    });

    it('renders all provided information', () => {
      expect(wrapper.text()).toContain('JohnDoe');
      expect(wrapper.text()).toContain('A brief description about John Doe.');
      expect(wrapper.text()).toContain('From New York');
      expect(wrapper.text()).toContain('123-456-7890');
      expect(wrapper.text()).toContain('john@example.com');
      expect(wrapper.text()).toContain('2023-01-01');
    });
  });

  describe('With some props omitted', () => {
    beforeEach(() => {
      wrapper = mount(AboutUserInfo, {
        props: {
          username: 'JohnDoe',
          description: 'A brief description about John Doe.'
          // Omitting location, phone, email, and joinDate
        }
      });
    });

    it('does not render omitted information', () => {
      expect(wrapper.text()).toContain('JohnDoe');
      expect(wrapper.text()).toContain('A brief description about John Doe.');
      expect(wrapper.text()).not.toContain('From New York');
      expect(wrapper.text()).not.toContain('123-456-7890');
      expect(wrapper.text()).not.toContain('john@example.com');
      expect(wrapper.text()).not.toContain('2023-01-01');
    });
  });

  // Additional tests can be added as necessary
});
