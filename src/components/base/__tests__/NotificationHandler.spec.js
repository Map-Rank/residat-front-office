import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import NotificationHandler from '@/components/base/NotificationHandler.vue';
import { onMessage } from 'firebase/messaging';
import { useToast, POSITION } from 'vue-toastification';

vi.mock('firebase/messaging', () => ({
  onMessage: vi.fn(),
}));

// Mock the firebaseConfig.js file
vi.mock('@/firebaseConfig', () => ({
  messaging: {}, // Mock the messaging object
}));

vi.mock('vue-toastification', () => ({
  useToast: vi.fn(() => ({
    info: vi.fn(),
  })),
  POSITION: {
    TOP_RIGHT: 'top-right',
  },
}));

describe('NotificationHandler', () => {
  let toastMock;

  beforeEach(() => {
    toastMock = {
      info: vi.fn(),
    };
    useToast.mockReturnValue(toastMock);
  });

  it('should display a notification when a message is received', async () => {
    const mockPayload = {
      notification: {
        title: 'Test Title',
        body: 'Test Body',
      },
    };

    // Mock onMessage to call the callback with the payload
    onMessage.mockImplementation((_, callback) => {
      callback(mockPayload);
    });

    shallowMount(NotificationHandler);

    // Verify that onMessage was called
    expect(onMessage).toHaveBeenCalledWith(expect.anything(), expect.any(Function));

    // Verify that toast.info was called with the correct arguments
    expect(toastMock.info).toHaveBeenCalledWith(mockPayload.notification.body, expect.objectContaining({
      title: mockPayload.notification.title,
      icon: expect.any(String),
      position: POSITION.TOP_RIGHT,
      timeout: 10000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastClassName: 'my-custom-toast-class',
      bodyClassName: 'custom-body-class',
    }));

  });
});
