import { it, expect, describe } from 'vitest';
import TitleSubtitle from '@/components/base/TitleSubtitle.vue';
import { mount } from '@vue/test-utils';

describe('TitleSubtitle', () => {
  const label = 'Label';
  const message = 'Message';

  // Mount the component with props
  const wrapper = mount(TitleSubtitle, {
    props: {
      label,
      message,
    },
  });

  it('renders the component with the provided label and message', () => {
    // Find the label and message elements and assert their text content
    const labelElement = wrapper.find('label');
    const messageElement = wrapper.find('span');

    expect(labelElement.exists()).toBeTruthy();
    expect(messageElement.exists()).toBeTruthy();

    expect(labelElement.text()).toBe(label);
    expect(messageElement.text()).toBe(message);
  });

  it('requires the label and message props', () => {
    // Test that the component requires the label and message props
    const { props } = wrapper.vm.$options;
    expect(props.label.required).toBeTruthy();
    expect(props.message.required).toBeTruthy();
  });
});
