import { shallowMount } from '@vue/test-utils';
import ResetPassword from '@/features/Auth/ResetPassword.vue';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Correct the mock import path for the authService
vi.mock('@/features/Auth/services/authService', () => ({
  ResetPassword: vi.fn(),
}));

// Mock the toastification plugin
const toastMock = {
  success: vi.fn(),
  error: vi.fn(),
};

vi.mock('vue-toastification', () => ({
  useToast: () => toastMock,
}));

describe('ResetPassword.vue', () => {
  let wrapper;

  const factory = (propsData) => {
    return shallowMount(ResetPassword, {
      propsData,
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
        })],
        mocks: {
          $t: (msg) => msg, // Mocking the translation function
          $route: {
            query: {
              email: 'test@example.com',
              token: 'testToken',
            },
          },
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = factory();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('reset_password');
  });

  it('displays the correct email from URL query', () => {
    expect(wrapper.vm.emailFromUrl).toBe('test@example.com');
  });

//   it('validates the password fields and calls submitForm if valid', async () => {
//     const submitFormSpy = vi.spyOn(wrapper.vm, 'submitForm');
//     await wrapper.setData({
//       userData: {
//         password: 'validpassword',
//         password_confirmation: 'validpassword',
//       },
//     });

//     await wrapper.vm.resetPassword();

//     expect(submitFormSpy).toHaveBeenCalled();
//   });

//   it('shows an error toast if the passwords do not match', async () => {
//     await wrapper.setData({
//       userData: {
//         password: 'password1',
//         password_confirmation: 'password2',
//       },
//     });

//     await wrapper.vm.resetPassword();

//     expect(toastMock.error).toHaveBeenCalledWith('please_wait_we_reset_your_password');
//   });

//   it('calls the ResetPassword function and shows success toast on success', async () => {
//     const ResetPasswordMock = require('@/features/Auth/services/authService').ResetPassword;
//     ResetPasswordMock.mockResolvedValueOnce();

//     await wrapper.setData({
//       userData: {
//         password: 'validpassword',
//         password_confirmation: 'validpassword',
//       },
//     });

//     await wrapper.vm.submitForm();

//     expect(ResetPasswordMock).toHaveBeenCalledWith(
//       'test@example.com',
//       wrapper.vm.userData,
//       'testToken',
//       wrapper.vm.handleSuccess,
//       wrapper.vm.handleError
//     );
//     expect(toastMock.success).toHaveBeenCalledWith('Password are updated succesfully', { timeout: 2000 });
//   });

//   it('calls the ResetPassword function and shows error toast on failure', async () => {
//     const ResetPasswordMock = require('@/features/Auth/services/authService').ResetPassword;
//     ResetPasswordMock.mockRejectedValueOnce({
//       email: ['Email is invalid'],
//     });

//     await wrapper.setData({
//       userData: {
//         password: 'validpassword',
//         password_confirmation: 'validpassword',
//       },
//     });

//     await wrapper.vm.submitForm();

//     expect(ResetPasswordMock).toHaveBeenCalledWith(
//       'test@example.com',
//       wrapper.vm.userData,
//       'testToken',
//       wrapper.vm.handleSuccess,
//       wrapper.vm.handleError
//     );
//     expect(toastMock.error).toHaveBeenCalledWith('please_wait_we_reset_your_password');
//   });
});
