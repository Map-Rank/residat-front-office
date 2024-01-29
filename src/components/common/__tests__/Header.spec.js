import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import HeaderApp from '@/components/common/Header/index.vue';
import IconWithLabel from '@/components/common/IconWithLabel/index.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';
import SearchBar from '@/components/base/SearchBar.vue';
import useAuthStore from '@/stores/auth';

//mock store
vi.mock('@/stores/auth', () => ({
  default:vi.fn(()=>({
    logOut:vi.fn()
  }))
}));

// Setup mock router
const routes = [
  { path: '/community', name: 'community' },
  { path: '/dashbaord', name: 'dashbaord' },
  { path: '/chat-room', name: 'chat-room' },
  { path: '/event', name: 'event' },
  { path: '/social-profile', name: 'social-profile' },
  { path: '/create-post', name: 'create-post' },
  { path: '/authentication', name: 'authentication' },
  { path: '/:catchAll(.*)*', name: 'not-found' }

];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Mock router.push to return a promise
router.push = vi.fn().mockImplementation(() => Promise.resolve());

describe('HeaderApp Component', () => {
  it('renders navigation items correctly', async () => {
    
    const wrapper = mount(HeaderApp, {
      global: {
        plugins: [router],
        components: { IconWithLabel, ButtonUi, SearchBar },
      },
    });

    expect(wrapper.findAllComponents(IconWithLabel).length).toBe(6);
    expect(wrapper.findAllComponents(ButtonUi).length).toBe(6);
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
  });

  it('toggles dropdown menu visibility', async () => {
    const wrapper = mount(HeaderApp, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.vm.isMenuVisible).toBe(false);
    const dropdown = wrapper.find('.dropdown')
    expect(dropdown.exists()).toBe(true)
    await dropdown.trigger('click');
    expect(wrapper.vm.isMenuVisible).toBe(true);
  });

  it('navigates correctly when menu items are clicked', async () => {
    router.push = vi.fn();
    const authStore = useAuthStore();
    authStore.logOut = vi.fn();
    const wrapper = mount(HeaderApp, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.vm.menuMethods(0); // Simulate clicking 'Profile Page'
    expect(router.push).toHaveBeenCalledWith({ name: 'social-profile' });

    await wrapper.vm.menuMethods(1); // Simulate clicking 'Create Post'
    expect(router.push).toHaveBeenCalledWith({ name: 'create-post' });

    // TODO correst this test 
    // // Ensure logout action calls auth store logout method and navigates
    // await wrapper.vm.menuMethods(2); // Simulate clicking 'Logout'
    // await flushPromises();
    // expect(wrapper.vm.logout()).toHaveBeenCalled();
    // expect(router.push).toHaveBeenCalledWith({ name: 'authentication' });
  });

});
