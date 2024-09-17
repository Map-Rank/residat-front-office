import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FeedbackButton from '@/components/base/FeedbackButton.vue';
import { useToast } from 'vue-toastification';
import { createFeedback } from '@/services/feedbackService.js';

// Mock the useToast function
vi.mock('vue-toastification', () => ({
  useToast: vi.fn(() => ({
    success: vi.fn(),
    error: vi.fn(),
  })),
}));

// Mock the createFeedback service
vi.mock('@/services/feedbackService.js', () => ({
  createFeedback: vi.fn(),
}));

describe('FeedbackButton.vue', () => {
  let wrapper;
  let toastMock;

  beforeEach(() => {
    toastMock = {
      success: vi.fn(),
      error: vi.fn(),
    };
    useToast.mockReturnValue(toastMock);

    wrapper = shallowMount(FeedbackButton, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the $t function for localization
        },
      },
    });
  });

  it('toggles the feedback form visibility', async () => {
    expect(wrapper.vm.showForm).toBe(false);
    await wrapper.find('.feedback-button').trigger('click');
    expect(wrapper.vm.showForm).toBe(true);
    await wrapper.find('.feedback-button').trigger('click');
    expect(wrapper.vm.showForm).toBe(false);
  });





  it('displays an error toast when feedback is not provided', async () => {
    wrapper.vm.formData.text = null;

    await wrapper.vm.submitFeedback();

    expect(createFeedback).not.toHaveBeenCalled();
    expect(toastMock.error).toHaveBeenCalledWith('Please Enter a feedback');
  });


  it('shows the WhatsApp link correctly when the form is visible', async () => {
    // Set the showForm property to true
    wrapper.setData({ showForm: true });
    await wrapper.vm.$nextTick();

    // Find the WhatsApp link
    const whatsappLink = wrapper.find('a[href*="wa.me"]');
    
    // Assertions
    expect(whatsappLink.exists()).toBe(true);
    expect(whatsappLink.attributes('target')).toBe('_blank');
  });


});
