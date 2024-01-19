import { test  ,expect,describe} from 'vitest';
import ButtonUi from '@/components/base/ButtonUi.vue'
import {mount} from '@vue/test-utils'

describe('ButtonUi.vue Test', () => {
  test('Renders with label and click event', () => {
    const label = 'Submit';
    const wrapper = mount(ButtonUi, {
      props: {
        label: label,
      },
    });

    // Assert that the button has the correct label
    expect(wrapper.find('span').text()).toBe(label);

    // Assert that the click event is emitted when button is clicked
    wrapper.trigger('click');
    expect(wrapper.emitted().clickButton).toBeTruthy();
  });

  test('Applies proper CSS classes when props are provided', () => {
    const label = 'Submit';
    const leftIcon = 'left-icon.svg';
    const rightIcon = 'right-icon.svg';
    const isDisabled = true;
    const colorObject = { primary: true };
    const customCss = 'custom-class';
    const hoverState = true;
    const color = 'gray';
    const loading = true;
    const isRoundedMd = true;
    const type = 'button';
    const textCss = 'text-class';
    const isRoundedFull = false;
    const width = '1/2';

    const wrapper = mount(ButtonUi, {
      props: {
        label,
        leftIcon,
        rightIcon,
        isDisabled,
        colorObject,
        customCss,
        hoverState,
        color,
        loading,
        isRoundedMd,
        type,
        textCss,
        isRoundedFull,
        width,
      },
    });

    expect(wrapper.classes()).toContain('rounded-lg');
    expect(wrapper.classes()).toContain('gray');
    expect(wrapper.classes()).toContain('custom-class');
    expect(wrapper.classes()).toContain('hover:shadow-md');
    expect(wrapper.classes()).toContain('w-1/2');
  });
});
