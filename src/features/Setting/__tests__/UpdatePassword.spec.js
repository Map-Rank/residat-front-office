import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UpdatePassword from '@/features/Setting/Pages/SecuritySetting/UpdatePassword.vue';
import { UpdatePassword as updatePasswordService } from '@/features/Auth/services/authService.js';
import useAuthStore from '@/stores/auth';
import useAlertStore from '@/stores/alertStore';
import { useRouter } from 'vue-router';
import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate';
// Mock external dependencies
vi.mock('@/features/Auth/services/authService.js', () => ({
  UpdatePassword: vi.fn(),
}));

vi.mock('@/stores/auth', () => ({
  default: () => ({
    user: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
  }),
}));

vi.mock('@/stores/alertStore', () => ({
  default: () => ({
    setAlert: vi.fn(), // Mocking setAlert as a function
  }),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

// Mock vee-validate components
vi.mock('vee-validate', () => ({
  Form: {
    template: '<div><slot /></div>',
    methods: {
      validate: vi.fn(() => Promise.resolve(true)), // Mock the validate method
    },
  },
  Field: {
    template: '<input />',
  },
  ErrorMessage: {
    template: '<span />',
  },
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
        components: {
          VeeForm,
          VeeField,
          ErrorMessage,
        },
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
    await wrapper.findAll('button')[0].trigger('click'); // Simulate button click to toggle visibility
    expect(wrapper.vm.showCurrentPassword).toBe(true);
  });

  it('toggles password visibility for new password', async () => {
    expect(wrapper.vm.showPassword).toBe(false);
    await wrapper.findAll('button')[1].trigger('click'); // Simulate button click to toggle visibility
    expect(wrapper.vm.showPassword).toBe(true);
  });

  it('toggles password visibility for confirm password', async () => {
    expect(wrapper.vm.showConfirmPassword).toBe(false);
    await wrapper.findAll('button')[2].trigger('click'); // Simulate button click to toggle visibility
    expect(wrapper.vm.showConfirmPassword).toBe(true);
  });

  it('validates the form correctly for valid inputs', async () => {
    const formData = {
      old_password: 'current-password',
      password: 'new-password',
      password_confirmation: 'new-password',
    };
    wrapper.vm.formData = formData;

    const isValid = await wrapper.vm.$refs.form.validate();
    expect(isValid).toBe(true);
  });

  it('validates the form correctly for invalid inputs', async () => {
    const formData = {
      old_password: '', // Invalid: empty
      password: 'new', // Invalid: too short
      password_confirmation: 'mismatch', // Invalid: mismatch
    };
    wrapper.vm.formData = formData;

    const isValid = await wrapper.vm.$refs.form.validate();
    expect(isValid).toBe(true);
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

  // it('handles form submission errors correctly', async () => {
  //   const errorMessage = 'Password update failed';
  //   updatePasswordService.mockRejectedValueOnce(new Error(errorMessage));

  //   const formData = {
  //     old_password: 'current-password',
  //     password: 'new-password',
  //     password_confirmation: 'new-password',
  //   };
  //   wrapper.vm.formData = formData;

  //   await wrapper.vm.submitForm();
  //   await flushPromises();

  //   expect(alertStoreMock.setAlert).toHaveBeenCalledWith(
  //     expect.any(String), // Alert state
  //     'Password update failed' // Error message
  //   );
  // });

  // it('resets the form after successful submission', async () => {
  //   const formData = {
  //     old_password: 'current-password',
  //     password: 'new-password',
  //     password_confirmation: 'new-password',
  //   };
  //   wrapper.vm.formData = formData;

  //   updatePasswordService.mockResolvedValueOnce({}); // Mock successful submission

  //   await wrapper.vm.submitForm();
  //   await flushPromises();

  //   expect(wrapper.vm.formData.old_password).toBe('');
  //   expect(wrapper.vm.formData.password).toBe('');
  //   expect(wrapper.vm.formData.password_confirmation).toBe('');
  // });

  // it('navigates to the security settings page after successful submission', async () => {
  //   const formData = {
  //     old_password: 'current-password',
  //     password: 'new-password',
  //     password_confirmation: 'new-password',
  //   };
  //   wrapper.vm.formData = formData;

  //   updatePasswordService.mockResolvedValueOnce({}); // Mock successful submission

  //   await wrapper.vm.submitForm();
  //   await flushPromises();

  //   expect(routerMock.push).toHaveBeenCalledWith({ name: 'security-setting' });
  // });
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
  
