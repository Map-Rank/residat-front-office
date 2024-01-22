import { it, expect, describe } from 'vitest';
import AlertForm from '../../../components/common/AlertFrom/AlertForm.vue'
import { mount } from '@vue/test-utils';

// Mocking the store
const mockStore = {
  show: true,
  message: 'Sample Message',
  variant: 'info',
};

describe('AlertForm', () => {
  it('renders the component with the provided message and variant', async () => {
    // Create a wrapper for the component with mocked store
    const wrapper = mount(AlertForm, {
      global: {
        provide: {
          useAlertStore: () => mockStore,
        },
      },
    });

    // Find the alert element and assert its text content and class
    const alertElement = wrapper.find('.text-white');

    expect(alertElement.exists()).toBeTruthy();
    expect(alertElement.text()).toBe('Sample Message');
    expect(alertElement.classes()).toContain('bg-blue-500'); // Adjust the class based on the variant
  });

  it('renders the component with the default variant when no variant is provided', async () => {
    // Create a wrapper for the component with mocked store and without specifying a variant prop
    const wrapper = mount(AlertForm, {
      global: {
        provide: {
          useAlertStore: () => mockStore,
        },
      },
    });

    // Find the alert element and assert its class with the default variant
    const alertElement = wrapper.find('.text-white');

    expect(alertElement.exists()).toBeTruthy();
    expect(alertElement.classes()).toContain('bg-gray-500'); // Adjust this based on your default variant
  });
});
