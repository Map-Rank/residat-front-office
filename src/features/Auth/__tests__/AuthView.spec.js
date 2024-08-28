import { shallowMount } from '@vue/test-utils';
import AuthView from '@/features/Auth/AuthView.vue';
import LoginForm from '@/features/Auth/Forms/LoginForm.vue';
import RegisterForm from '@/features/Auth/Forms/RegisterForm.vue';
import InstitutionRegister from '@/features/Auth/Forms/InstitutionRegister.vue';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, vi } from 'vitest';


// Mock Firebase messaging
vi.mock('firebase/messaging', () => ({
    onMessage: vi.fn(), // Mock onMessage function
}));

// Mock the firebaseConfig.js file
vi.mock('@/firebaseConfig', () => ({
    messaging: {}, // Mock the messaging object
}));


describe('AuthView.vue', () => {
    let wrapper;
  
    const factory = (propsData) => {
      return shallowMount(AuthView, {
        propsData,
        global: {
          plugins: [createTestingPinia({
            createSpy: vi.fn,
          })],
          mocks: {
            $route: {
              params: {
                tab: propsData?.tab || 'login',
              },
            },
            $router: {
              push: vi.fn((route) => {
                wrapper.setProps({ tab: route.params.tab });
              }),
            },
            $t: (msg) => msg,  // Mocking the translation function
          },
        },
      });
    };
  
    it('renders login tab by default', () => {
      wrapper = factory();
      expect(wrapper.findComponent(LoginForm).exists()).toBe(true);
      expect(wrapper.findComponent(RegisterForm).exists()).toBe(false);
      expect(wrapper.findComponent(InstitutionRegister).exists()).toBe(false);
    });
  
    it('renders register tab when "register" is passed as prop', () => {
      wrapper = factory({ tab: 'register' });
      expect(wrapper.findComponent(LoginForm).exists()).toBe(false);
      expect(wrapper.findComponent(RegisterForm).exists()).toBe(true);
      expect(wrapper.findComponent(InstitutionRegister).exists()).toBe(false);
    });
  
    it('renders institution register tab when "institution" is passed as prop', () => {
      wrapper = factory({ tab: 'institution' });
      expect(wrapper.findComponent(LoginForm).exists()).toBe(false);
      expect(wrapper.findComponent(RegisterForm).exists()).toBe(false);
      expect(wrapper.findComponent(InstitutionRegister).exists()).toBe(true);
    });
  
    // it('changes tab when setTab is called', async () => {
    //   wrapper = factory();
    //   await wrapper.vm.setTab('register');
    //   await wrapper.vm.$nextTick(); // Wait for the next DOM update cycle
    //   expect(wrapper.vm.currentTab).toBe('register');
    //   expect(wrapper.findComponent(RegisterForm).exists()).toBe(true);
    // });
  
    // it('navigates to institution register when the link is clicked', async () => {
    //   wrapper = factory();
    //   await wrapper.vm.navigateTo('institution');
    //   await wrapper.vm.$nextTick(); // Wait for the next DOM update cycle
    //   expect(wrapper.vm.currentTab).toBe('institution');
    //   expect(wrapper.findComponent(InstitutionRegister).exists()).toBe(true);
    // });
  
    // it('navigates back to login/register when the link is clicked in institution tab', async () => {
    //   wrapper = factory({ tab: 'institution' });
    //   await wrapper.vm.navigateTo('login');
    //   await wrapper.vm.$nextTick(); // Wait for the next DOM update cycle
    //   expect(wrapper.vm.currentTab).toBe('login');
    //   expect(wrapper.findComponent(LoginForm).exists()).toBe(true);
    // });
  
    it('closes the modal when closeAuthModel is called', () => {
      wrapper = factory();
      wrapper.vm.closeAuthModel();
      // Your close modal logic test here
      // Example: expect(wrapper.emitted().close).toBeTruthy();
    });
  });