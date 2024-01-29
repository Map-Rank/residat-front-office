import { describe, it, expect,beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SocialButton from '@/features/Auth/components/SocialButton.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';

describe('SocialButton Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SocialButton, {
      global: {
        components: {
          ButtonUi
        }
      }
    });
  });

  it('renders three social buttons', () => {
    const buttons = wrapper.findAllComponents(ButtonUi);
    expect(buttons.length).toBe(3);
  });

  it('has correct labels for buttons', () => {
    const buttonLabels = ['Google', 'Apple', 'Facebook'];
    const buttons = wrapper.findAllComponents(ButtonUi);

    buttons.forEach((button, index) => {
      expect(button.props('label')).toBe(buttonLabels[index]);
    });
  });

  it('has correct icons for each button', () => {
    const buttonIcons = [
      'assets\\icons\\colored\\google.svg',
      'assets\\icons\\colored\\apple.svg',
      'assets\\icons\\colored\\facebook.svg'
    ];
    const buttons = wrapper.findAllComponents(ButtonUi);

    buttons.forEach((button, index) => {
      expect(button.props('leftIcon')).toBe(buttonIcons[index]);
    });
  });

  // Additional tests can include checking for emitted events on button click, if applicable
});
