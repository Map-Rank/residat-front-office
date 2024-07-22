import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RegisterForm from '@/features/Auth/Forms/RegisterForm.vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';
import { registerUser } from '@/features/Auth/services/authService';
import { useToast } from "vue-toastification";
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

vi.mock('@/features/Auth/services/authService', () => ({
  registerUser: vi.fn(),
}));

vi.mock('vue-toastification', () => ({
  useToast: () => ({
    info: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  }),
}));

describe('RegisterForm Component', () => {
  let wrapper;
  let authStoreMock;
  let routerMock;
  let toastMock;

  beforeEach(() => {
    authStoreMock = useAuthStore();
    routerMock = useRouter();
    toastMock = useToast();

    wrapper = mount(RegisterForm, {
      global: {
        mocks: {
          $t: (msg) => msg,
          $router: routerMock,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('personal_information');
  });

  it('updates data on input', async () => {
    const input = wrapper.find('input[name="first_name"]');
    await input.setValue('John');
    expect(wrapper.vm.formData.first_name).toBe('John');
  });

  it('toggles password visibility', async () => {
    const toggleButton = wrapper.find('button[type="button"]');
    expect(wrapper.vm.showPassword).toBe(false);
    await toggleButton.trigger('click');
    expect(wrapper.vm.showPassword).toBe(true);
    await toggleButton.trigger('click');
    expect(wrapper.vm.showPassword).toBe(false);
  });

  it('validates form and navigates on successful submission', async () => {
    // Fill in the form fields
    await wrapper.find('input[name="first_name"]').setValue('John');
    await wrapper.find('input[name="last_name"]').setValue('Doe');
    await wrapper.find('input[name="email"]').setValue('john@example.com');
    await wrapper.find('input[name="phone"]').setValue('1234567890');
    await wrapper.find('input[name="password"]').setValue('password123');
    await wrapper.find('input[name="confirm_password"]').setValue('password123');
    wrapper.setData({
      formData: {
        tos: true,
      },
      subDivision_id: '1',
    });

    // Mock the form submission
    wrapper.vm.registerForm = vi.fn();
    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(registerUser).toHaveBeenCalledWith(
      wrapper.vm.formData,
      authStoreMock,
      wrapper.vm.handleSuccess,
      wrapper.vm.handleError,
      wrapper.vm.handleEmailNotVerified
    );
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'community' });
    expect(authStoreMock.setUser).toHaveBeenCalled();
  });

  it('displays an error message if TOS is not accepted', async () => {
    wrapper.setData({
      formData: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        password: 'password123',
        confirm_password: 'password123',
        tos: false,
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(toastMock.error).toHaveBeenCalledWith('accept_terms_of_service');
  });
});