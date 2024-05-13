import { beforeEach, it, vi, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import ShareModal from '../ShareModal/ShareModal.vue'

describe('ShareModal Unit Test', () => {
  let wrapper
  const props = {
    showModal: true,
    postLink: 'https://..',
    message: 'modal Message'
  }
  beforeEach(() => {
    wrapper = mount(ShareModal, {
      props
    })
  })

  it('renders when showModal is true', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('does not render when showModal is false', async () => {
    await wrapper.setProps({ showModal: false })
    expect(wrapper.isVisible()).toBe(false)
  })

  it('render postLink and message', () => {
    expect(wrapper.text()).toContain('https://..')
  })

  it('encodes the postLink and message for sharing URLs', () => {
    const encodedPostLink = encodeURIComponent(props.postLink)
    const encodedMessage = encodeURIComponent(props.message)
    expect(wrapper.html()).toContain(encodedPostLink)
    expect(wrapper.html()).toContain(encodedMessage)
  })

  it('calls copyToClipboard method when Copy Link button is clicked', async () => {
    wrapper.setProps({ showModal: true })
    await wrapper.vm.$nextTick()

    // Mock the method
    wrapper.vm.copyToClipboard = vi.fn()
    await wrapper.vm.$nextTick() 

    // Find the button and trigger the click event
    const button = wrapper.find('.copy-link-button')
    expect(button.exists()).toBe(true) // Ensure the button is found
    await button.trigger('click')

    // Assert the mock method was called
    expect(wrapper.vm.copyToClipboard).toHaveBeenCalledTimes(1)
  })

  it('emits close event when Close button is clicked', async () => {

    await wrapper.setProps({ showModal: true });
    await wrapper.vm.$nextTick(); // Wait for the component to re-render
  
    const closeButton = wrapper.find('.close-modal-button');
    expect(closeButton.exists()).toBe(true); // Ensure the close button is found
    await closeButton.trigger('click');
  
    expect(wrapper.emitted()).toHaveProperty('close');
  })
})
