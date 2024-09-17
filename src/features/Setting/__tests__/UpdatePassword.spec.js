import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UpdatePassword from '@/features/Setting/Pages/SecuritySetting/UpdatePassword.vue';
import { UpdatePassword as updatePasswordService } from '@/features/Auth/services/authService.js';
import useAuthStore from '@/stores/auth';
import useAlertStore from '@/stores/alertStore';
import { useRouter } from 'vue-router';

vi.mock('@/features/Auth/services/authService.js', () => ({
  UpdatePassword: vi.fn(),
}));

vi.mock('@/stores/auth', () => ({
  default: () => ({
    user: {
      old_password: '',
      password: '',
      password_confirmation: ''
    }
  })
}));

vi.mock('@/stores/alertStore', () => ({
    default: () => ({
      setAlert: vi.fn(),  // Mocking setAlert as a function
    }),
  }));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('UpdatePassword.vue', () => {
  let wrapper;
  let authStoreMock;
  let alertStoreMock;
  let routerMock;

  beforeEach(() => {
    authStoreMock = useAuthStore();
    alertStoreMock = useAlertStore();
    routerMock = useRouter();

    wrapper = mount(UpdatePassword, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the translation function
        },
      },
    });
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes with the correct form data', () => {
    const formData = wrapper.vm.formData;
    expect(formData.old_password).toBe('');
    expect(formData.password).toBe('');
    expect(formData.password_confirmation).toBe('');
  });

  it('toggles password visibility for current password', async () => {
    expect(wrapper.vm.showCurrentPassword).toBe(false);
    await wrapper.find('button').trigger('click'); // Simulate button click to toggle visibility
    expect(wrapper.vm.showCurrentPassword).toBe(true);
  });

  it('submits the form when valid and calls UpdatePassword service', async () => {
    const formData = {
      old_password: 'current-password',
      password: 'new-password',
      password_confirmation: 'new-password',
    };
    wrapper.vm.formData = formData;

    await wrapper.vm.submitForm();
    await flushPromises();

    expect(updatePasswordService).toHaveBeenCalledWith(
      formData,
      wrapper.vm.handleSuccess,
      wrapper.vm.handleError
    );
  });

//   it('displays success message and redirects on successful update', async () => {
//     updatePasswordService.mockResolvedValueOnce();
  
//     await wrapper.vm.updatePassword();
//     await flushPromises(); // Ensure async operations are completed before checking
  
//     expect(alertStoreMock.setAlert).toHaveBeenCalledWith(
//       'PROCESSING',
//       'please wait we are updating your password...'
//     );
//     expect(routerMock.push).toHaveBeenCalledWith({ name: 'security-setting' });
//   });
  

//   it('displays an error if password update fails', async () => {
//     const error = { message: 'An error occurred' };
//     updatePasswordService.mockRejectedValueOnce(error);

//     await wrapper.vm.updatePassword();
//     expect(alertStoreMock.setAlert).toHaveBeenCalledWith(
//       'ERROR',
//       error.message
//     );
//   });

//   it('shows validation error messages if form validation fails', async () => {
//     wrapper.vm.formData = {
//       old_password: '',
//       password: '',
//       password_confirmation: ''
//     };
  
//     await wrapper.vm.updatePassword();
//     await flushPromises(); // Ensure all promises are resolved
  
//     expect(wrapper.find('ErrorMessage[name="old_password"]').exists()).toBe(true);
//     expect(wrapper.find('ErrorMessage[name="password"]').exists()).toBe(true);
//     expect(wrapper.find('ErrorMessage[name="password_confirmation"]').exists()).toBe(true);
//   });
  
});
