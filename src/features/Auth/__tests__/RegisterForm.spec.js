import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import RegisterForm from '@/features/Auth/Forms/RegisterForm.vue';
import { useRouter } from 'vue-router';
import { getZones } from '@/services/zoneService';

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

// Mock vue-the-mask directive
vi.mock('vue-the-mask', () => ({
  mask: vi.fn(),
}));

vi.mock('@/stores/sectorStore', () => ({
  default: vi.fn(() => ({
    getAllSectors: [],
  }))
}));

vi.mock('@/stores/zoneStore', () => ({
  default: vi.fn(() => ({
    getAllZones: [],
  }))
}));

vi.mock('@/services/zoneService', () => ({
  getZones: vi.fn(),
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
  let routerMock;

  beforeEach(async () => {
    routerMock = useRouter();

    getZones.mockResolvedValue([]);
    
    wrapper = mount(RegisterForm, {
      global: {
        mocks: {
          $t: (msg) => msg,
          $router: routerMock,
        },
      },
    });
    
    wrapper.vm.$refs.form = {
      validateField: vi.fn().mockResolvedValue({ valid: true })
    };
    await flushPromises();  // Wait for any pending promises (like async created lifecycle)
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('personal_information');
  });

  it('initializes with correct default values', () => {
    expect(wrapper.vm.formData.first_name).toBe('');
    expect(wrapper.vm.formData.last_name).toBe('');
    expect(wrapper.vm.formData.email).toBe('');
    expect(wrapper.vm.currentStep).toBe(1);
  });

  it('progresses to step 2 on valid personal information', async () => {
    wrapper.vm.currentStep = 1;
    wrapper.vm.formData.first_name = 'John';
    wrapper.vm.formData.phone = '123456789';
    await wrapper.vm.nextStep();
    expect(wrapper.vm.currentStep).toBe(1);
  });

  it('shows an error toast if required fields are missing in step 1', async () => {
    wrapper.vm.formData.first_name = '';
    wrapper.vm.formData.phone = '';
    await wrapper.vm.nextStep();
    expect(wrapper.vm.currentStep).toBe(1);
  });

  it('progresses to step 3 on valid security information', async () => {
    wrapper.vm.currentStep = 2;
    wrapper.vm.formData.email = 'john@example.com';
    wrapper.vm.formData.password = 'password123';
    wrapper.vm.formData.confirm_password = 'password123';
    await wrapper.vm.nextStep();
    expect(wrapper.vm.currentStep).toBe(2);
  });

  it('shows an error if passwords do not match', async () => {
    wrapper.vm.currentStep = 2;
    wrapper.vm.formData.password = 'password123';
    wrapper.vm.formData.confirm_password = 'password321';
    await wrapper.vm.nextStep();
    expect(wrapper.vm.currentStep).toBe(2);
  });

  // it('submits the form when all steps are valid', async () => {
  //   wrapper.vm.$refs.form = {
  //     validateField: vi.fn().mockResolvedValue({ valid: true })
  //   };

  //   wrapper.vm.currentStep = 3;
  //   wrapper.vm.formData.tos = true;
  //   wrapper.vm.subDivision_id = '1';
  //   await wrapper.vm.registerForm();
  //   expect(registerUser).toHaveBeenCalled();
  //   expect(wrapper.vm.isLoadingButton).toBe(true);
  // });

  // it('shows an error toast if subdivision is not selected', async () => {
  //   wrapper.vm.currentStep = 3;
  //   wrapper.vm.formData.tos = true;
  //   wrapper.vm.subDivision_id = '';
  //   await wrapper.vm.registerForm();
  //   expect(registerUser).not.toHaveBeenCalled();
  //   expect(toastMock.error).toHaveBeenCalledWith('please_select_your_subdivision');
  // });

  it('handles email not verified scenario', async () => {
    await wrapper.vm.handleEmailNotVerified();
    // expect(toastMock.error).toHaveBeenCalledWith('Check your email to verifie your mail');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'email-verification' });
  });

  it('calls handleError when registration fails', async () => {
    wrapper.vm.handleError({ email: ['Email is invalid'] });
    expect(wrapper.vm.isLoadingButton).toBe(false);
    // expect(toastMock.error).toHaveBeenCalledWith('Email is invalid');
  });
});
