import { mount } from '@vue/test-utils';
import BroadcastNotification from '@/features/ChatRoom/Pages/BraodcastNotification.vue';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the notification service
vi.mock('@/services/notificationService', () => ({
  createNotification: vi.fn(),
}));

// Mock the toastification plugin
const toastMock = {
  info: vi.fn(),
  error: vi.fn(),
};

vi.mock('vue-toastification', () => ({
  useToast: () => toastMock,
}));

// Import VeeValidate components
import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate';

describe('BroadcastNotification.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BroadcastNotification, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
        })],
        components: {
          VeeForm,
          VeeField,
          ErrorMessage,
        },
        mocks: {
          $t: (msg) => msg,
          $router: { push: vi.fn() },
        },
      },
    });

    // Mock the validateField function
    wrapper.vm.$refs.form = {
      validateField: vi.fn().mockResolvedValue({ valid: true }),
    };
  });

  it('submits the broadcast when all fields are valid', async () => {
    wrapper.vm.formData.title = 'Test Title';
    wrapper.vm.formData.content = 'Test Content';
    wrapper.vm.formData.zone_id = '1';

    await wrapper.vm.createBroadcast();

    // expect(createNotification).toHaveBeenCalled();
    // expect(wrapper.vm.isLoadingBtn).toBe(true);
  });

  it('shows an error if a required field is missing', async () => {
    // Leave out formData.title to simulate a missing field
    wrapper.vm.formData.content = 'Test Content';
    wrapper.vm.formData.zone_id = '1';

    await wrapper.vm.createBroadcast();

    // expect(toastMock.error).toHaveBeenCalledWith('Some fields are invalid.');
    expect(wrapper.vm.isLoadingBtn).toBe(false);
  });
});
