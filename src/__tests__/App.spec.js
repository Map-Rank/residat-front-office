import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'; // Import the testing Pinia
import App from '@/App.vue';
import HeaderApp from '@/components/common/Header/index.vue';
import GuestHeader from '@/components/common/Header/GuestHeader.vue';
import BottomNavigationAppApp from '@/components/common/BottomNavigator/index.vue';
import FeedbackButton from '@/components/base/FeedbackButton.vue';
import NotificationHandler from '@/components/base/NotificationHandler.vue';
import { ModalsContainer } from 'vue-final-modal';
import AuthModal from '@/components/common/Modal/AuthModal.vue';

// Mock Firebase messaging
vi.mock('firebase/messaging', () => ({
  onMessage: vi.fn(), // Mock onMessage function
}));

// Mock the firebaseConfig.js file
vi.mock('@/firebaseConfig', () => ({
  messaging: {}, // Mock the messaging object
}));

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],  // Using the testing Pinia here
        stubs: {
          RouterView: true, // Stub out <router-view> since it's not being tested here
        },
        mocks: {
            $t: (msg) => msg, // Mock the $t function globally
            $route: { name: 'community' } // Mock the $route object
          },
      },
    });
  });

  it('renders the HeaderApp component', () => {
    expect(wrapper.findComponent(HeaderApp).exists()).toBe(true);
  });

  it('conditionally renders GuestHeader based on showGuessHeader', async () => {
    const authStore = wrapper.vm.$store.auth; // Accessing the mocked Pinia store
    authStore.showGuessHeader = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(GuestHeader).exists()).toBe(true);

    authStore.showGuessHeader = false;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(GuestHeader).exists()).toBe(false);
  });

  it('renders NotificationHandler component', () => {
    expect(wrapper.findComponent(NotificationHandler).exists()).toBe(true);
  });

  it('conditionally renders BottomNavigationAppApp based on hideComponent', async () => {
    const postStore = wrapper.vm.$store.post; // Accessing the mocked Pinia store
    postStore.hideComponent = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(BottomNavigationAppApp).exists()).toBe(true);

    postStore.hideComponent = false;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(BottomNavigationAppApp).exists()).toBe(false);
  });

  it('renders FeedbackButton component', () => {
    expect(wrapper.findComponent(FeedbackButton).exists()).toBe(true);
  });

  it('renders ModalsContainer component', () => {
    expect(wrapper.findComponent(ModalsContainer).exists()).toBe(true);
  });

  it('conditionally renders AuthModal based on showAuthModal', async () => {
    const modalStore = wrapper.vm.$store.modal; // Accessing the mocked Pinia store
    modalStore.showAuthModal = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AuthModal).exists()).toBe(true);

    modalStore.showAuthModal = false;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AuthModal).exists()).toBe(false);
  });
});
