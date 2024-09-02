import { mount } from '@vue/test-utils';
import SuccessPage from '@/features/Auth/Pages/SuccessPage.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'vue-router';

// Mocking the router
vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  }));
  
  describe('SuccessPage.vue', () => {
    let wrapper;
    let router;
  
    beforeEach(() => {
      router = useRouter();
      wrapper = mount(SuccessPage, {
        global: {
          mocks: {
            $router: router,
          },
        },
      });
    });
  
    it('renders correctly', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('h1').text()).toBe('Submission Successful!');
      expect(wrapper.find('p').text()).toBe('Your information has been successfully submitted.');
      expect(wrapper.find('button').text()).toBe('Continue');
    });
  
    it('navigates home when the "Continue" button is clicked', async () => {
      await wrapper.find('button').trigger('click');
      expect(router.push).toHaveBeenCalledWith('/authentication');
    });
  });