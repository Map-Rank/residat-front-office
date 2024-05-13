import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import NoSearchResult from '@/components/common/Pages/NoSearchResult.vue';

// Mocking Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/community', name: 'community' }],
});

describe('NoSearchResult Component', () => {




  it('contains a router-link to the community page', async () => {
    const wrapper = mount(NoSearchResult, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    const routerLink = wrapper.findComponent({ name: 'RouterLink' });
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.props('to')).toEqual('/community');
  });
});
