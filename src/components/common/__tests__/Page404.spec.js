import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Page404 from '@/components/common/Pages/Page-404.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/community', name: 'community' }],
});

describe('Page404 Component', () => {
  it('renders the "404" status message correctly', () => {
    const wrapper = mount(Page404, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.find('h1').text()).toContain('404');
  });

  it('displays the default error message when no errorMessage prop is provided', async () => {
    const wrapper = mount(Page404, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    expect(wrapper.find('p').text()).toContain("Page not found. Sorry, we couldn't find the page you're looking for.");
  });

  it('renders a custom error message when provided', async () => {
    const customErrorMessage = "This is a custom error message.";
    const wrapper = mount(Page404, {
      props: { errorMessage: customErrorMessage },
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    expect(wrapper.find('p').text()).toContain(customErrorMessage);
  });

  it('contains a router-link to the community page with correct text', async () => {
    const wrapper = mount(Page404, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    const routerLink = wrapper.findComponent({ name: 'RouterLink' });
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.text()).toContain('Go back Our Community');
    expect(routerLink.props('to')).toBe('/community');
  });
});
