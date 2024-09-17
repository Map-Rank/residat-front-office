import { shallowMount } from '@vue/test-utils';
import ForgotPassword from '@/features/Auth/ForgotPassword.vue';
import { createTestingPinia } from '@pinia/testing';
import { useToast } from 'vue-toastification';
import { describe, it, expect, vi ,beforeEach } from 'vitest';

// Mock the authService
vi.mock('@/components/auth/services/authService', () => ({
  ForgotPassword: vi.fn(),
}));

// Mock Firebase messaging
vi.mock('firebase/messaging', () => ({
    onMessage: vi.fn(), // Mock onMessage function
}));

// Mock the firebaseConfig.js file
vi.mock('@/firebaseConfig', () => ({
    messaging: {}, // Mock the messaging object
}));

// Mock the toastification plugin
const toastMock = {
  success: vi.fn(),
  error: vi.fn(),
};

vi.mock('vue-toastification', () => ({
  useToast: () => toastMock,
}));

describe('ForgotPassword.vue', () => {
  let wrapper;

  const factory = (propsData) => {
    return shallowMount(ForgotPassword, {
      propsData,
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
        })],
        mocks: {
          $t: (msg) => msg, // Mocking the translation function
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = factory();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('forgot_password');
  });

  it('validates the email field', async () => {
    await wrapper.setData({
      userData: {
        email: '',
      },
    });

    await wrapper.find('button[type="submit"]').trigger('click');
    expect(toastMock.error).toHaveBeenCalledWith('please_wait_creating_account');
  });

//   it('calls the ForgotPassword function and shows success toast on success', async () => {
//     const ForgotPasswordMock = require('@/features/Auth/services/authService').ForgotPassword;
//     ForgotPasswordMock.mockResolvedValueOnce();

//     await wrapper.setData({
//       userData: {
//         email: 'test@example.com',
//       },
//     });

//     await wrapper.find('button[type="submit"]').trigger('click');

//     expect(ForgotPasswordMock).toHaveBeenCalledWith(
//       wrapper.vm.userData,
//       wrapper.vm.handleSuccess,
//       wrapper.vm.handleError
//     );
//     expect(toastMock.success).toHaveBeenCalledWith('Link are successfully send', { timeout: 2000 });
//   });

//   it('calls the ForgotPassword function and shows error toast on failure', async () => {
//     const ForgotPasswordMock = require('@/components/auth/services/authService').ForgotPassword;
//     ForgotPasswordMock.mockRejectedValueOnce({
//       email: ['Email is invalid'],
//     });

//     await wrapper.setData({
//       userData: {
//         email: 'invalidemail',
//       },
//     });

//     await wrapper.find('button[type="submit"]').trigger('click');

//     expect(ForgotPasswordMock).toHaveBeenCalledWith(
//       wrapper.vm.userData,
//       wrapper.vm.handleSuccess,
//       wrapper.vm.handleError
//     );
//     expect(toastMock.error).toHaveBeenCalledWith('please_wait_creating_account');
//   });
});
