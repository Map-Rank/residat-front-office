import { mount } from '@vue/test-utils';
import OTP from '@/features/Auth/components/OTP.vue';
import { describe, it, expect,  beforeEach } from 'vitest';

describe('OTP.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(OTP, {
      global: {
        mocks: {
          $t: (msg) => msg,  // Mock translation function
        },
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.find('h2').text()).toBe('OTP Verification');
    expect(wrapper.find('button').text()).toBe('Verifi OTP');
  });

//   it('focuses on the next input when a digit is entered', async () => {
//     const inputs = wrapper.findAll('input');
//     await inputs[0].setValue('1');
    
//     // Check if the second input is focused
//     expect(inputs[1].element).toBe(document.activeElement);
//   });

//   it('calls verifyOtp when the button is clicked', async () => {
//     const spy = vi.spyOn(wrapper.vm, 'verifyOtp');
//     await wrapper.find('button').trigger('click');
//     expect(spy).toHaveBeenCalled();
//   });

//   it('starts a countdown on mount', () => {
//     expect(wrapper.vm.counter).toBe(30);
//     vi.advanceTimersByTime(1000);
//     expect(wrapper.vm.counter).toBe(29);
//   });

//   it('clears the interval on destroy', () => {
//     wrapper.unmount();
//     expect(clearInterval).toHaveBeenCalledWith(wrapper.vm.interval);
//   });
});
