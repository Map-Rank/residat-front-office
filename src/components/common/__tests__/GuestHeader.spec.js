import { mount } from '@vue/test-utils';
import GuestHeader from '@/components/common/Header/GuestHeader.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'vue-router';

// Mocking the router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    resolve: vi.fn().mockImplementation((route) => ({
      href: `/${route.name}/${route.params.tab}`,
    })),
  })),
}));

describe('GuestHeader.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(GuestHeader, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the translation function
          $router: useRouter(),
        },
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'AppLogo' }).exists()).toBe(true);
  });

  it('navigates to the register page when the register button is clicked', async () => {
    const newTabUrl = wrapper.vm.$router.resolve({
      name: 'authentication',
      params: { tab: 'register' }
    }).href;

    vi.spyOn(window, 'open').mockImplementation(() => {});
    await wrapper.findComponent({ name: 'ButtonUi' }).trigger('click');
    
    expect(window.open).toHaveBeenCalledWith(newTabUrl, '_blank');
  });
});
