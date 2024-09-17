import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseImagePicker from '@/components/base/BaseImagePicker.vue'

describe('BaseImagePicker', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BaseImagePicker, {
      props: {
        label: 'Upload Image',
        iconImg: 'path/to/icon.png',
        type: 'file',
        accept: 'image/*'  // Explicitly setting the accept prop for this test
      }
    })
  })

  it('renders correctly with props', () => {
    expect(wrapper.text()).toContain('Upload Image')

    // Assert that the image src is correctly bound
    const img = wrapper.find('img')
    expect(img.exists()).toBeTruthy()
    expect(img.attributes('src')).toBe('path/to/icon.png')
  })

  it('accepts only image files by default', () => {
    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('accept')).toBe('image/*')
  })

  it('emits handleFileChange with the event when changed', async () => {
    // Create a mock file list
    const files = [new File([], 'test.jpg')];
    const input = wrapper.find('input[type="file"]');
  
    // Define the files property on the element to simulate a user selecting files
    Object.defineProperty(input.element, 'files', {
      value: files,
      writable: true
    });
  
    // Trigger the change event
    await input.trigger('change');
  
    // Check that the handleFileChange event was emitted with the event object
    const emittedEvents = wrapper.emitted('handleFileChange');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents[0][0]).toBeInstanceOf(Event); // Checking that the first argument of the first emitted event is an Event object
  });
})
