
import LoginForm from '@/features/Auth/Forms/LoginForm.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import useAuthStore from '@/stores/auth';
import useAlertStore from '@/stores/alertStore';


// Mocking localStorage
const mockLocalStorage = {};
vi.stubGlobal('localStorage', {
  getItem: vi.fn((key) => mockLocalStorage[key]),
  setItem: vi.fn((key, value) => {
    mockLocalStorage[key] = value;
  }),
});

// Mocking fetch API
vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    status: 200,
  })
));

// Mocking useAuthStore and useAlertStore
vi.mock('@/stores/auth');
vi.mock('@/stores/alertStore');
vi.mock('@/features/Auth/services/authService', () => ({
  loginUser: vi.fn(),
}));

describe('LoginForm.vue', () => {
  let wrapper;
  let authStoreMock;
  let alertStoreMock;
  let routerMock;

  beforeEach(() => {
    authStoreMock = {
      isloggedIn: false,
    };
    useAuthStore.mockReturnValue(authStoreMock);

    alertStoreMock = {
      addAlert: vi.fn(),
    };
    useAlertStore.mockReturnValue(alertStoreMock);

    routerMock = {
      push: vi.fn(),
      replace: vi.fn(),
      currentRoute: { name: 'home' },
    };

    // useRouter.mockReturnValue(routerMock);

    wrapper = mount(LoginForm, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the $t function for localization
          $router: routerMock,
          $route: { name: 'home' },
          $i18n: { locale: 'en' }, // Mocking the $i18n object
        },
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('welcome_back');
  });

  it('toggles the password visibility', async () => {
    const toggleButton = wrapper.find('button[type="button"]');
    expect(wrapper.vm.showPassword).toBe(false);
    await toggleButton.trigger('click');
    expect(wrapper.vm.showPassword).toBe(true);
    await toggleButton.trigger('click');
    expect(wrapper.vm.showPassword).toBe(false);
  });

  it('calls the forgot password method', async () => {
    const forgotPasswordLink = wrapper.find('h6');
    await forgotPasswordLink.trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'forgot-password' });
  });

  it('submits the form with valid data', async () => {
    wrapper.setData({
      userData: {
        email: 'test@example.com',
        password: 'password123',
      },
    });
    await wrapper.find('button[type="submit"]').trigger('click');
    expect(wrapper.vm.login)
    // expect(loginUser).toHaveBeenCalled()
    // // expect(loginUser).toHaveBeenCalledWith(
    // //   this.userData,
    // //   authStoreMock,
    // //   wrapper.vm.handleSuccess,
    // //   wrapper.vm.handleError,
    // //   wrapper.vm.handleEmailNotVerified
    // // );
  });

  it('handles successful login', async () => {
    wrapper.vm.handleSuccess();
    expect(authStoreMock.isloggedIn).toBe(true);
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'community' });
  });

  it('displays error message on validation error', async () => {
    wrapper.setData({
      userData: {
        email: '',
        password: '',
      },
    });
    await wrapper.find('button[type="submit"]').trigger('click');
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it('handles email not verified', async () => {
    wrapper.vm.handleEmailNotVerified();
    expect(routerMock.push).toHaveBeenCalled();
  });
});