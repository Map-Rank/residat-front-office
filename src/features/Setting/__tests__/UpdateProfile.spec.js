import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UpdateProfile from '@/features/Setting/Pages/AccountPreferences/UpdateProfile.vue';
import { UpdateUser } from '@/features/Auth/services/authService.js';
// import useAuthStore from '@/stores/auth';
// import { useRouter } from 'vue-router';
// import { useToast } from "vue-toastification";

vi.mock('@/features/Auth/services/authService.js', () => ({
  UpdateUser: vi.fn(),
}));

vi.mock('@/stores/auth', () => ({
  default: () => ({
    user: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '123456789',
      avatar: 'avatar.jpg',
      gender: 'male',
    },
  }),
}));

vi.mock('@/stores/zoneStore.js', () => ({
  default: () => ({
    getAllZones: [],
  }),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('vue-toastification', () => ({
  useToast: () => ({
    success: vi.fn(),
  }),
}));

describe('UpdateProfile.vue', () => {
  let wrapper;
  // let authStoreMock;
  // let routerMock;
  // let toastMock;

  beforeEach(() => {
    // Initialize Pinia before each test
    setActivePinia(createPinia());

    // authStoreMock = useAuthStore();
    // routerMock = useRouter();
    // toastMock = useToast();

    wrapper = mount(UpdateProfile, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking translations
        },
      },
    });
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes with correct default values from auth store', () => {
    const formData = wrapper.vm.formData;
    expect(formData.first_name).toBe('John');
    expect(formData.last_name).toBe('Doe');
    expect(formData.email).toBe('john@example.com');
    expect(formData.phone).toBe('123456789');
    expect(formData.avatar).toBe('avatar.jpg');
    expect(formData.gender).toBe('male');
  });

  it('renders the preview image if avatar is present', async () => {
    wrapper.vm.formData.avatar = 'avatar.jpg';
    await flushPromises();

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('avatar.jpg');
  });

  it('calls UpdateUser service on form submission with the correct form data', async () => {
    const formData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '123456789',
      avatar: null,
      gender: 'male',
    };
    wrapper.vm.formData = formData;

    await wrapper.vm.submitForm();
    expect(UpdateUser).toHaveBeenCalledWith(formData, wrapper.vm.authStore, wrapper.vm.handleSuccess, wrapper.vm.handleError);
  });

//   it('displays a success toast and redirects on successful update', async () => {
//     UpdateUser.mockResolvedValueOnce();
//     await wrapper.vm.submitForm();
//     expect(toastMock.success).toHaveBeenCalledWith('update_profile_success', { timeout: 2000 });
//     expect(routerMock.push).toHaveBeenCalledWith({ name: 'account-preferences' });
//   });

//   it('displays error if UpdateUser fails', async () => {
//     const error = { email: ['Email is already taken'] };
//     UpdateUser.mockRejectedValueOnce(error);
//     await wrapper.vm.submitForm();

//     // Simulate handling error
//     expect(wrapper.vm.alertStore.setAlert).toBeCalledWith('ERROR', 'Email is already taken');
//   });

//   it('handles file upload change', async () => {
//     const file = new File(['test'], 'avatar.jpg', { type: 'image/jpeg' });
//     const fileInput = wrapper.find('input[type="file"]');
//     await fileInput.trigger('change', { target: { files: [file] } });

//     expect(wrapper.vm.formData.avatar).toBe(file);
//     expect(wrapper.vm.isImageFromLocal).toBe(true);
//   });
});
