import { mount } from '@vue/test-utils';
import HeaderLanding from '@/components/common/Header/HeaderLanding.vue';
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

// Mocking localStorage
const mockLocalStorage = {
  setItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('HeaderLanding.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HeaderLanding, {
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

  it('toggles the language menu', async () => {
    expect(wrapper.vm.isShowLangaugeMenu).toBe(false);
    await wrapper.find('.langMenu .dropdown').trigger('click');
    expect(wrapper.vm.isShowLangaugeMenu).toBe(true);
  });



  it('toggles the sidebar', async () => {
    expect(wrapper.vm.isSidebarOpen).toBe(false);
    await wrapper.find('button[aria-label="header_burger_menu"]').trigger('click');
    expect(wrapper.vm.isSidebarOpen).toBe(true);
  });

  it('navigates to the correct tab', async () => {
    const newTabUrl = wrapper.vm.$router.resolve({
      name: 'authentication',
      params: { tab: 'register' }
    }).href;
    vi.spyOn(window, 'open').mockImplementation(() => {});
    await wrapper.vm.navigateTo('register');
    expect(window.open).toHaveBeenCalledWith(newTabUrl, '_blank');
  });

  it('constructs the correct absolute href', () => {
    const relativeHref = '#about-us';
    const absoluteHref = wrapper.vm.absoluteHref(relativeHref);
    expect(absoluteHref).toBe(`${window.location.origin}/${relativeHref}`);
  });
});
