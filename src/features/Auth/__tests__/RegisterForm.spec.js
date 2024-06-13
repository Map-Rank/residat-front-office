import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RegisterForm from '@/features/Auth/Forms/RegisterForm.vue';
// import { useRouter } from 'vue-router';
// import useAuthStore from '@/stores/auth';

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

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}));

describe('RegisterForm Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(RegisterForm);
    expect(wrapper.text()).toContain('PERSONAL INFORMATION');
  });

  // it('updates data on input', async () => {
  //   const wrapper = mount(RegisterForm);
  //   const input = wrapper.find('input[name="first_name"]');
  //   await input.setValue('John');
  //   expect(wrapper.vm.formData.first_name).toBe('John');
  // });

  // // Add tests for other fields similarly

  // it('validates form and navigates on successful submission', async () => {
  //   const wrapper = mount(RegisterForm);
  //   const router = useRouter();
  //   const authStore = useAuthStore();

  //   // Mock the form submission
  //   wrapper.vm.registerForm = vi.fn();

  //   // Fill in the form fields
  //   await wrapper.find('input[name="first_name"]').setValue('John');
  //   await wrapper.find('input[name="email"]').setValue('john@example.com');
  //   // Fill in other fields as necessary

  //   // Trigger form submission
  //   await wrapper.find('form').trigger('submit.prevent');
  //   await flushPromises();

  //   expect(wrapper.vm.registerForm).toHaveBeenCalled();
  //   expect(router.push).toHaveBeenCalledWith({ name: 'community' });
  //   expect(authStore.setUser).toHaveBeenCalled();
  // });

  // Additional tests can include error handling, navigation to other steps, and more
});
