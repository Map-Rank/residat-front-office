import { it, expect, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseImagePicker from '@/components/base/BaseImagePicker.vue';

describe('BaseImagePicker', () => {
  it('receives props correctly', () => {
    const accept = 'image/png';
    const iconImg = 'path/to/icon.png';
    const type = 'file';
    const label = 'Upload Image';

    const wrapper = mount(BaseImagePicker, {
      props: {
        accept,
        iconImg,
        type,
        label,
      },
    });

    expect(wrapper.props('accept')).toBe(accept);
    expect(wrapper.props('iconImg')).toBe(iconImg);
    expect(wrapper.props('type')).toBe(type);
    expect(wrapper.props('label')).toBe(label);
  });

  it('emits handleFileChange event on file selection', async () => {
    const type = 'file'; // Set the type prop value

    const wrapper = mount(BaseImagePicker, {
      props: {
        type, // Pass the type prop to the component
      },
    });

    const fileInput = wrapper.find('input[type="file"]');

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInputEvent = { target: { files: [file] } };

    await fileInput.trigger('change', fileInputEvent);

    // Wait for Vue to update the component
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('handleFileChange')).toBeTruthy();
    expect(wrapper.emitted('handleFileChange')[0]).toEqual([fileInputEvent.target.files]);
  });
});
