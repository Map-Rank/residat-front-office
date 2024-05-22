// import { describe, it, expect } from 'vitest';
// import { mount } from '@vue/test-utils';
import EventAlertBox from '@/components/common/EventAlertBox/EventAlertBox.vue';
import SectionTitle from '@/components/base/SectionTitle.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import EventAlertBox from '@/components/base/EventAlertBox.vue';
// import SectionTitle from '@/components/base/SectionTitle.vue';
import { truncateText } from '@/utils/formating';

describe('EventAlertBox.vue', () => {
  let wrapper;
  let mockEvents;

  beforeEach(() => {
    mockEvents = [
      { id: 1, title: 'Event 1', organized_by: 'Organizer 1', published_at: '2022-01-01', location: 'Location 1', image: 'image1.jpg' },
      { id: 2, title: 'Event 2', organized_by: 'Organizer 2', published_at: '2022-01-02', location: 'Location 2', image: 'image2.jpg' },
      { id: 3, title: 'Event 3', organized_by: 'Organizer 3', published_at: '2022-01-03', location: 'Location 3', image: 'image3.jpg' },
    ];

    vi.useFakeTimers(); // Use fake timers for the interval

    wrapper = mount(EventAlertBox, {
      props: {
        events: mockEvents,
        sectionTitle: 'Upcoming Events'
      },
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the $t function for localization
        },
        components: {
          SectionTitle,
        }
      }
    });
  });

  afterEach(() => {
    vi.clearAllTimers(); // Clear timers after each test
  });

  it('renders the component with events', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(SectionTitle).exists()).toBe(true);
    expect(wrapper.findComponent(SectionTitle).props('title')).toBe('Upcoming Events');

    const eventItems = wrapper.findAll('.p-3.bg-white.rounded-xl.flex.items-start.space-x-4');
    expect(eventItems.length).toBe(2); // Only 2 events should be displayed initially
  });

  it('displays truncated event information', () => {
    const eventItem = wrapper.findAll('.p-3.bg-white.rounded-xl.flex.items-start.space-x-4').at(0);
    expect(eventItem.find('.menu.font-semibold.title').text()).toBe(truncateText(mockEvents[0].title, 25));
    expect(eventItem.find('p').text()).toContain(truncateText(mockEvents[0].organized_by, 25));
  });

  // it('rotates events every 5 seconds', async () => {
  //   expect(wrapper.vm.currentIndex).toBe(0);
  //   vi.advanceTimersByTime(5000);
  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.vm.currentIndex).toBe(1);
  //   expect(wrapper.vm.displayedEvents).toEqual([
  //     mockEvents[1],
  //     mockEvents[2]
  //   ]);

  //   vi.advanceTimersByTime(5000);
  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.vm.currentIndex).toBe(2);
  //   expect(wrapper.vm.displayedEvents).toEqual([
  //     mockEvents[2],
  //     mockEvents[0]
  //   ]);

  //   vi.advanceTimersByTime(5000);
  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.vm.currentIndex).toBe(0);
  //   expect(wrapper.vm.displayedEvents).toEqual([
  //     mockEvents[0],
  //     mockEvents[1]
  //   ]);
  // });


});
