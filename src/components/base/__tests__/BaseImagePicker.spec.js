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
        type: 'file'
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

  it('emits handleFileChange with the selected files when changed', async () => {
    // Create a mock file list
    const files = [new File([], 'test.jpg')]
    const input = wrapper.find('input[type="file"]')

    Object.defineProperty(input.element, 'files', {
      value: files,
      writable: true
    })

    await input.trigger('change')

    const emittedEvents = wrapper.emitted('handleFileChange')
    expect(emittedEvents).toBeTruthy()
    expect(emittedEvents[0]).toEqual([files])
  })
})
