import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EventDetails from '@/features/Event/Pages/EventDetails.vue'
import { getSpecificEvent, deleteEvent } from '@/services/eventService.js'

vi.mock('@/services/eventService.js', () => ({
  getSpecificEvent: vi.fn(),
  deleteEvent: vi.fn(),
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

describe('EventDetails Component', () => {
  let wrapper

  const mockEvent = {
    id: '1',
    image: 'https://example.com/event.jpg',
    title: 'Test Event',
    description: 'This is a description of the event.',
    location: 'Test Location',
    published_at: '2023-12-01',
    organized_by: 'Test Organizer',
    humanize_date_creation: '1 day ago',
  }

  beforeEach(() => {
    getSpecificEvent.mockResolvedValue(mockEvent)

    wrapper = mount(EventDetails, {
      props: {
        eventId: '1',
      },
      global: {
        mocks: {
          $t: (msg) => msg, // Mock translation
        },
      },
    })
  })

  it('renders correctly', async () => {
    await flushPromises()
    expect(wrapper.text()).toContain(mockEvent.title)
    expect(wrapper.text()).toContain(mockEvent.organized_by)
    expect(wrapper.text()).toContain(mockEvent.location)
    expect(wrapper.text()).toContain(mockEvent.published_at)
  })

  it('fetches event data on mount', async () => {
    expect(getSpecificEvent).toHaveBeenCalledWith('1')
    await flushPromises()
    expect(wrapper.vm.event).toEqual(mockEvent)
  })

//   it('displays the event description and toggles read-more button', async () => {
//     await flushPromises()

//     // Check if the trimmed description is displayed
//     expect(wrapper.vm.trimmedDescription).toContain(mockEvent.description.slice(0, wrapper.vm.descriptionLimit))

//     // Simulate clicking "Read More"
//     await wrapper.find('button').trigger('click')

//     expect(wrapper.vm.isReadMore).toBe(true)
//     expect(wrapper.vm.trimmedDescription).toBe(mockEvent.description)

//     // Simulate clicking "Read Less"
//     await wrapper.find('button').trigger('click')

//     expect(wrapper.vm.isReadMore).toBe(false)
//   })

  it('shows image modal when the image is clicked', async () => {
    await flushPromises()
    expect(wrapper.vm.isImageModalVisible).toBe(false)

    // Simulate clicking the image
    await wrapper.find('img').trigger('click')

    expect(wrapper.vm.isImageModalVisible).toBe(true)
    expect(wrapper.vm.imageToPreview).toBe(mockEvent.image)
  })

  it('closes image modal when the modal is clicked outside', async () => {
    await flushPromises()

    // Simulate clicking the image to open the modal
    await wrapper.find('img').trigger('click')

    expect(wrapper.vm.isImageModalVisible).toBe(true)

    // Simulate clicking outside the modal
    await wrapper.find('.fixed').trigger('click')

    expect(wrapper.vm.isImageModalVisible).toBe(false)
  })

//   it('deletes the event and redirects to the events page', async () => {
//     deleteEvent.mockResolvedValueOnce()

//     await flushPromises()

//     // Simulate deleting the event
//     window.confirm = vi.fn().mockReturnValue(true) // Mock window.confirm
//     await wrapper.vm.deleteEvent()

//     expect(deleteEvent).toHaveBeenCalledWith(mockEvent.id)
//     expect(useRouter().push).toHaveBeenCalledWith({ name: 'events' })
//   })

  it('handles error while deleting the event', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    deleteEvent.mockRejectedValueOnce(new Error('Delete failed'))

    window.confirm = vi.fn().mockReturnValue(true)
    await wrapper.vm.deleteEvent()

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting event:', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })
})
