import { mount } from '@vue/test-utils';
import HeaderApp from '@/components/common/Header/index.vue';
import IconWithLabel from '@/components/common/IconWithLabel/index.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';
import SearchBar from '@/components/base/SearchBar.vue';
import useAuthStore from '@/stores/auth';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AppLogo from '@/components/base/AppLogo.vue';
import { useRouter } from 'vue-router';

vi.mock('@/stores/auth');
vi.mock('vue-router');


describe('HeaderApp.vue', () => {
  let wrapper;
  let authStoreMock;
  let routerMock;

  beforeEach(() => {
    authStoreMock = {
      user: {
        first_name: 'John',
        avatar: 'path/to/avatar.jpg',
      },
      logOut: vi.fn(),
    };

    useAuthStore.mockReturnValue(authStoreMock);
    routerMock = {
      push: vi.fn(),
      replace: vi.fn(),
      currentRoute: { name: 'home' },
    };

    useRouter.mockReturnValue(routerMock);

    wrapper = mount(HeaderApp, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the $t function for localization
          $router: routerMock,
          $route: { name: 'home' },
          $i18n: { locale: 'en' }, // Mocking the $i18n object
        },
        components: {
          SearchBar,
          IconWithLabel,
          ButtonUi,
          AppLogo,
        },
      },
    });

    wrapper.vm.openModal = vi.fn();
    wrapper.vm.toggleMenu = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(AppLogo).exists()).toBe(true);
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
  });

  it('toggles the profile menu visibility', async () => {
    expect(wrapper.vm.currentMenu).toBe(null);
    await wrapper.find('.menu .dropdown').trigger('click');
    expect(wrapper.vm.currentMenu).toBe('menu');
  });

  it('navigates to the correct route when a menu item is clicked', async () => {
    wrapper.vm.isMenuVisible = true;
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAllComponents(ButtonUi);
    expect(buttons.length).toBe(13); // Profile, Create Post, Create Event, Settings, Logout

    await buttons[0].trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'social-profile' });

    await buttons[1].trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'create-post' });

    await buttons[2].trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'create-event' });

    await buttons[3].trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'setting' });
    
    await buttons[4].trigger('click');
    expect(wrapper.vm.toggleMenu).toHaveBeenCalled();
    
    
    await buttons[5].trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'change-langauge' });
  });

  it('toggles the language menu visibility and changes language', async () => {
    expect(wrapper.vm.currentMenu).toBe(null);
    await wrapper.find('.langMenu .dropdown').trigger('click');
    expect(wrapper.vm.currentMenu).toBe('language');

    const languageButtons = wrapper.findAllComponents(ButtonUi);
    expect(languageButtons.length).toBeGreaterThanOrEqual(2);
  });
});