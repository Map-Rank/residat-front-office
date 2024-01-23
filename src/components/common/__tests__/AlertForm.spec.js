import { describe, it, expect, vi, beforeEach } from 'vitest'
// import useAlertStore from '@/stores/alertStore'
import { AlertStates } from '../AlertFrom/AlertState'
import { mount } from '@vue/test-utils'
import Alert from '@/components/common/AlertFrom/AlertForm.vue'

vi.mock('@/stores/alertStore', () => {
  return {
    default: vi.fn(() => ({
      state: vi.ref({
        show: false,
        message: '',
        variant: AlertStates.INFO,
      }),
    })),
  };
});

describe('Alert', () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    const useAlertStore = vi.importMock('@/stores/alertStore').default;

    mockStore = useAlertStore();

    wrapper = mount(Alert, {
      global: {
        mocks: {
          $store: mockStore,
        },
      },
    });
  });

  it('does not render when store.show is false', () => {
    expect(wrapper.find('.alert').exists()).toBe(false);
  });

  it('renders when store.show is true', async () => {
    mockStore.state.show = true;
    mockStore.state.message = 'Test Message';
    await wrapper.vm.$nextTick(); // Wait for Vue to update the DOM
    expect(wrapper.find('.alert').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test Message');
  });


});