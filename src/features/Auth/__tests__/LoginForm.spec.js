import { describe, it, expect, vi,beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginForm from '@/features/Auth/Forms/LoginForm.vue';
import AlertForm from '@/components/common/AlertFrom/AlertForm.vue';
import useAuthStore from '@/stores/auth';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() }))
}));

vi.mock('@/stores/auth', () => ({
    default: vi.fn(() => ({
      user: null,
      token: null,
      isloggedIn: false,
      isEmailVerified: null,
      setUser: vi.fn(),
      setToken: vi.fn(),
      logOut: vi.fn(),
      // Add other methods or properties as needed
    }))
  }));
  

  vi.mock('@/stores/alertStore', () => ({
    default: vi.fn(() => ({
      state: {
        show: false,
        message: '',
        variant: '',
        timeOut: 2000
      },
      setAlert: vi.fn()
    }))
  }));
  

vi.mock('@/features/Auth/services/authService', () => ({
  loginUser: vi.fn(() => Promise.resolve())
}));

describe('LoginForm Component', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(LoginForm, {
      global: {
        plugins: [useAuthStore()],
        components: { AlertForm },
        mocks: {
          $router: { push: vi.fn() }
        }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('WELCOME BACK');
    expect(wrapper.findComponent(AlertForm).exists()).toBe(true);
  });

  it('toggles password visibility', async () => {
    expect(wrapper.vm.showPassword).toBe(false);
    await wrapper.find('button[type="button"]').trigger('click');
    expect(wrapper.vm.showPassword).toBe(true);
  });

//   it('handles form submission', async () => {
//     const emailInput = wrapper.find('input[name="email"]');
//     const passwordInput = wrapper.find('input[name="password"]');
  
//     // Check if the inputs exist
//     expect(emailInput.exists()).toBe(true);
//     expect(passwordInput.exists()).toBe(true);
  
//     // Set values
//     await emailInput.setValue('test@example.com');
//     await passwordInput.setValue('password123');
//     await wrapper.find('form').trigger('submit.prevent');
//     await flushPromises();
  
//     // Verify interaction with the store and router
//     const authStore = useAuthStore();
//     expect(authStore.setUser).toHaveBeenCalled();
//     expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'community' });
//   });
  //TODO correct this test 
// it('handles form submission', async () => {
  
//     const emailInput = wrapper.find('#email');
//     const passwordInput = wrapper.find('#password');
  
//     // Check if the inputs exist
//     expect(emailInput.exists()).toBe(true);
//     expect(passwordInput.exists()).toBe(true);
  
//     // Set values
//     await emailInput.setValue('test@example.com');
//     await passwordInput.setValue('password123');
//     await wrapper.find('form').trigger('submit.prevent');
//     await flushPromises();
  
//     // Verify interaction with the store and router
//     const authStore = useAuthStore();
//     expect(authStore.setUser).toHaveBeenCalled();
//     expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'community' });
//   });
  
  

  // Additional tests for form validation and error handling can be added
});
