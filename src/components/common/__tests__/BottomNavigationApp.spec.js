import { describe, it, expect } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import BottomNavigationApp from '@/components/common/BottomNavigator/index.vue';
import IconWithLabel from '@/components/common/IconWithLabel/index.vue';

// Mock Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/community', name: 'community' },
    { path: '/dashboard', name: 'dashboard' },
    { path: '/create-post', name: 'create-post' },
    { path: '/event', name: 'event' },
    { path: '/chat-room', name: 'chat-room' },
    // Define other routes as necessary
  ],
});

describe('BottomNavigationApp Component', () => {
  // Test for rendering IconWithLabel components
  it('renders the correct number of IconWithLabel components', () => {
    const wrapper = mount(BottomNavigationApp, {
      global: {
        plugins: [router],
        stubs: {
          IconWithLabel: RouterLinkStub, // Stub IconWithLabel if it includes <router-link>
        },
      },
    });

    expect(wrapper.findAllComponents(IconWithLabel).length).toBe(4); // Based on navItems length
  });

  // Test isActive method
  it('correctly identifies the active navigation item', async () => {
    router.push({ name: 'community' }); // Navigate to 'community'
    await router.isReady();

    const wrapper = mount(BottomNavigationApp, {
      global: {
        plugins: [router],
        stubs: {
          IconWithLabel, // Use the real component if you want to test prop passing
        },
      },
    });

    await wrapper.vm.$nextTick();
    const activeItems = wrapper.findAllComponents(IconWithLabel).filter(c => c.props('isActive'));
    expect(activeItems.length).toBe(1);
    expect(activeItems[0].props('routerName')).toBe('community');
  });

  // Optionally, test that navItems props are correctly passed to each IconWithLabel
  it('passes correct props to each IconWithLabel component', () => {
    const wrapper = mount(BottomNavigationApp, {
      global: {
        plugins: [router],
        stubs: {
          IconWithLabel, // Use real component to check props
        },
      },
    });

    const icons = wrapper.findAllComponents(IconWithLabel);
    expect(icons[0].props('svgContent')).toContain('community-outline.svg');
    // Add assertions for other props as needed
  });
});
