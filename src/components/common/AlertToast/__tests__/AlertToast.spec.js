import AlertToast, { AlertStates } from "../AlertToast.vue";
import { shallowMount } from '@vue/test-utils';
import { useToast } from 'vue-toastification'; // Import useToast to mock it
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mocking useToast function
vi.mock('vue-toastification', () => ({
    useToast: vi.fn(),
  }));
  
  describe('AlertToast.vue', () => {
    let wrapper;
    let toastMock;
  
    beforeEach(() => {
      toastMock = {
        info: vi.fn(),
        success: vi.fn(),
        error: vi.fn(),
        // toast: vi.fn(), // Mock the default toast function
      };
  
      // Mock the useToast hook to return the mock functions
      useToast.mockReturnValue(toastMock);
  
      wrapper = shallowMount(AlertToast);
    });
  
    it('shows an info toast when showAlert is called with INFO variant', () => {
      const message = 'Information message';
      wrapper.vm.showAlert(message, AlertStates.INFO);
  
      expect(toastMock.info).toHaveBeenCalledWith(message);
    });
  
    it('shows a success toast when showAlert is called with SUCCESS variant', () => {
      const message = 'Success message';
      wrapper.vm.showAlert(message, AlertStates.SUCCESS);
  
      expect(toastMock.success).toHaveBeenCalledWith(message);
    });
  
    it('shows an error toast when showAlert is called with ERROR variant', () => {
      const message = 'Error message';
      wrapper.vm.showAlert(message, AlertStates.ERROR);
  
      expect(toastMock.error).toHaveBeenCalledWith(message);
    });
  
    it('shows a processing toast when showAlert is called with PROCESSING variant', () => {
      const message = 'Processing message';
      wrapper.vm.showAlert(message, AlertStates.PROCESSING);
  
      expect(toastMock.info).toHaveBeenCalledWith(message, expect.objectContaining({ icon: '🔄', duration: 5000 }));
    });
  
    it('shows a default toast when showAlert is called with an unknown variant', () => {
      const message = 'Default message';
      wrapper.vm.showAlert(message, 'unknownVariant');
      expect(toastMock.info).toHaveBeenCalledWith(message);

    //   expect(toastMock.toast).toHaveBeenCalledWith(message); // Checking the default toast method
    });
  });