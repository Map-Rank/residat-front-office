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
    date_debut: '2023-12-01T10:00:00',
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
          $t: (key) => {
            const translations = {
              'date': 'Date',
              'time': 'Time'
            };
            return translations[key] || key;
          }
        },
        // ... other global setup
      },
    })
  })

  it('renders correctly', async () => {
    await flushPromises()
    
    // Use the same formatting methods as in the component
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return date.toLocaleDateString("fr-FR", options);
    };
  
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
      return date.toLocaleTimeString("fr-FR", options);
    };
  
    const formattedDate = formatDate(mockEvent.date_debut);
    const formattedTime = formatTime(mockEvent.date_debut);
  
    const expectedTexts = [
      mockEvent.title,
      '1 day ago',
      'Test Event',
      'By: ' + mockEvent.organized_by,
      'Town :' + mockEvent.location,
      'Date ' + formattedDate,
      'Time: ' + formattedTime,
      'Details',
      mockEvent.description
    ];
  
    expectedTexts.forEach(text => {
      expect(wrapper.text()).toContain(text);
    });
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
