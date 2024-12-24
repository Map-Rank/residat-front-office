import { shallowMount } from '@vue/test-utils';
import EventBox from '@/features/Event/Components/EventBox.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteEvent } from '@/services/eventService';
import { createTestingPinia } from '@pinia/testing';
// Mock deleteEvent function
vi.mock('@/services/eventService', () => ({
  deleteEvent: vi.fn(),
}));

describe('EventBox.vue', () => {
  let wrapper;
const mockEvent = {
  id: 1,
  title: 'Test Event',
  image: '/assets/event.jpg',
  location: 'New York',
  humanize_date_creation: '2 days ago',
  published_at: '2024-10-05',
  date_debut: '2024-10-05T14:30:00', // Updated to match new date field
  date_fin: '2024-10-05T17:30:00', // Updated to match new date field
  description: 'This is a very long test event description that is long enough for testing the truncated text and Read more functionality. It should exceed 100 characters easily to trigger the Read more feature.',
};

beforeEach(() => {
  wrapper = shallowMount(EventBox, {
    props: {
      event: mockEvent,
      showMenu: true,
    },
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        })
      ],
      mocks: {
        $router: {
          push: vi.fn(),
        },
        $t: (key) => {
          // Mock translation function
          const translations = {
            'date': 'Date',
            'time': 'Time'
          };
          return translations[key] || key;
        }
      },
    },
  });
});

it('renders correctly', () => {
  expect(wrapper.exists()).toBe(true);
  expect(wrapper.find('h3').text()).toBe(mockEvent.title);
});

it('formats date and time correctly', () => {
  const dateElement = wrapper.findAll('p')[0];
  const timeElement = wrapper.findAll('p')[1];

  expect(dateElement.text()).toContain('05/10/2024');
  expect(timeElement.text()).toContain('14:30:00');
});

it('displays truncated description and read more functionality', async () => {
  expect(wrapper.vm.truncatedDescription).toBe('This is a very long test event description that is long enough for testing the truncated text and Re...');
  expect(wrapper.vm.shouldShowReadMore).toBe(true);

  await wrapper.setData({ showFullDescription: true });
  expect(wrapper.vm.truncatedDescription).toBe(mockEvent.description);
});

it('navigates to event details when clicked', async () => {
  const eventDetailLink = wrapper.find('h3');
  await eventDetailLink.trigger('click');

  expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
    name: 'event-detail',
    params: { eventId: mockEvent.id },
  });
});

it('toggles the menu visibility on button click', async () => {
  expect(wrapper.vm.isMenuVisible).toBe(false);
  const button = wrapper.find('button');
  await button.trigger('click');
  expect(wrapper.vm.isMenuVisible).toBe(true);
});

//   it('edits the event when edit button is clicked', async () => {
//     const editButton = wrapper.findAllComponents(ButtonUi).at(0); // Find the first button, "Edit"
//     expect(editButton.exists()).toBe(true); // Ensure the edit button exists
//     await editButton.trigger('click'); // Trigger the click event
//     expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
//       name: 'edit-event',
//       params: { id: mockEvent.id },
//     });
//   });
  
//   it('deletes the event when delete button is clicked', async () => {
//     window.confirm = vi.fn().mockReturnValue(true); // Mock confirmation dialog
//     const deleteButton = wrapper.findAllComponents(ButtonUi).at(1); // Find the second button, "Delete"
//     expect(deleteButton.exists()).toBe(true); // Ensure the delete button exists
//     await deleteButton.trigger('click');
//     expect(deleteEvent).toHaveBeenCalledWith(mockEvent.id);
//   });
  
it('does not delete the event if user cancels confirmation', async () => {
  window.confirm = vi.fn().mockReturnValue(false); // Mock confirmation dialog
  const deleteButton = wrapper.findAllComponents(ButtonUi).at(1); // Find the second button, "Delete"
  expect(deleteButton.exists()).toBe(true); // Ensure the delete button exists
  await deleteButton.trigger('click');
  expect(deleteEvent).not.toHaveBeenCalled();
});
  
});
