import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import App from '@/App.vue';
import HeaderApp from '@/components/common/Header/index.vue';
import GuestHeader from '@/components/common/Header/GuestHeader.vue';
import BottomNavigationAppApp from '@/components/common/BottomNavigator/index.vue';
import FeedbackButton from '@/components/base/FeedbackButton.vue';
import NotificationHandler from '@/components/base/NotificationHandler.vue';
import { ModalsContainer } from 'vue-final-modal';
import AuthModal from '@/components/common/Modal/AuthModal.vue';
import useAuthStore from '@/stores/auth';
import usePostStore from '@/features/Post/store/postStore';
import useModalStore from '@/stores/modalStore.js';


// Mock Firebase messaging
vi.mock('firebase/messaging', () => ({
    onMessage: vi.fn(), // Mock onMessage function
}));

// Mock the firebaseConfig.js file
vi.mock('@/firebaseConfig', () => ({
    messaging: {}, // Mock the messaging object
}));

// Mocking the stores
vi.mock('@/stores/auth');
vi.mock('@/features/Post/store/postStore');
vi.mock('@/stores/modalStore.js');

describe('App Component', () => {
    let wrapper;
    let authStoreMock;
    let postStoreMock;
    let modalStoreMock;

    beforeEach(() => {
        authStoreMock = {
            hiddenClass: '',
            showClass: '',
            showGuessHeader: false,
        };
        useAuthStore.mockReturnValue(authStoreMock);

        postStoreMock = {
            hideComponent: false,
        };
        usePostStore.mockReturnValue(postStoreMock);

        modalStoreMock = {
            showAuthModal: false,
        };
        useModalStore.mockReturnValue(modalStoreMock);

        wrapper = mount(App, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],  // Using the testing Pinia here
                stubs: {
                    RouterView: true, // Stub out <router-view> since it's not being tested here
                },
                mocks: {
                    $t: (msg) => msg, // Mock the $t function for localization
                    $route: { name: 'community' }, // Mock the $route object
                },
            },
        });
    });

    it('renders the HeaderApp component', () => {
        expect(wrapper.findComponent(HeaderApp).exists()).toBe(true);
    });

    it('conditionally renders GuestHeader based on showGuessHeader', async () => {
        authStoreMock.showGuessHeader = true;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(GuestHeader).exists()).toBe(true);

        authStoreMock.showGuessHeader = false;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(GuestHeader).exists()).toBe(false);
    });

    it('renders NotificationHandler component', () => {
        expect(wrapper.findComponent(NotificationHandler).exists()).toBe(true);
    });

    it('conditionally renders BottomNavigationAppApp based on hideComponent', async () => {
        postStoreMock.hideComponent = true;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(BottomNavigationAppApp).exists()).toBe(true);

        postStoreMock.hideComponent = false;
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
        modalStoreMock.showAuthModal = true;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(AuthModal).exists()).toBe(true);

        modalStoreMock.showAuthModal = false;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(AuthModal).exists()).toBe(false);
    });

    it('correctly identifies the active navigation item', async () => {
        const headerWrapper = wrapper.findComponent(HeaderApp);
        expect(headerWrapper.vm.isActive('community')).toBe(true);
        expect(headerWrapper.vm.isActive('dashboard')).toBe(false);
    });
});
