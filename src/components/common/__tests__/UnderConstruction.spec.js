import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import UnderConstruction from '@/components/common/Pages/UnderConstruction.vue';

// Set up a mock router for testing <router-link>
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/community', name: 'community' }],
});

describe('UnderConstruction Component', () => {
  it('renders the default error message when no errorMessage prop is provided', async () => {
    const wrapper = mount(UnderConstruction, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    expect(wrapper.text()).toContain("This section is still under construction. Check back soon!");
  });

  it('renders a custom error message when provided', async () => {
    const customErrorMessage = "We're updating this page. Please check back later.";
    const wrapper = mount(UnderConstruction, {
      props: { errorMessage: customErrorMessage },
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    expect(wrapper.text()).toContain(customErrorMessage);
  });

  it('displays the under construction image correctly', () => {
    const wrapper = mount(UnderConstruction, {
      global: {
        plugins: [router],
      },
    });
    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    // Note: Adjust the path as necessary based on how your project handles static assets
    expect(image.attributes('src')).toBeTruthy();
  });

  it('contains a router-link to the community page with correct text', async () => {
    const wrapper = mount(UnderConstruction, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    const routerLink = wrapper.findComponent({ name: 'RouterLink' });
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.text()).toContain('Visit Our Community');
    expect(routerLink.props('to')).toBe('/community');
  });
});
