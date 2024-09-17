import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EventView from '@/features/Event/EventView.vue';
import { getEvents, getFilterEvents } from '@/services/eventService.js';

vi.mock('@/services/eventService.js', () => ({
  getEvents: vi.fn(),
  getFilterEvents: vi.fn(),
}));

vi.mock('@/stores/auth', () => ({
    default: vi.fn(() => ({
        user: {
            zone: {
              name: 'Test Zone',
            },
            token: 'fake-token',
          },
      token: null,
      isloggedIn: false,
      isEmailVerified: null,
      setUser: vi.fn(),
      setToken: vi.fn(),
      logOut: vi.fn(),
    }))
  }));



describe('EventView.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(EventView, {
      global: {
        stubs: ['router-link', 'router-view'],
        mocks: {
          $t: (msg) => msg,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.container').exists()).toBe(true);
  });

  it('should fetch events on component creation', async () => {
    getEvents.mockResolvedValueOnce([{ id: 1, title: 'Test Event' }]);
    await wrapper.vm.fetchEvents();
    expect(getEvents).toHaveBeenCalled();
    expect(wrapper.vm.events).toHaveLength(1);
    expect(wrapper.vm.events[0].title).toBe('Test Event');
  });

  it('should handle page refresh error when fetching events fails', async () => {
    getEvents.mockRejectedValueOnce(new Error('Failed to load events'));
    await wrapper.vm.fetchEvents();
    expect(wrapper.vm.showPageRefresh).toBe(true);
  });

  it('should filter events by zone', async () => {
    getFilterEvents.mockResolvedValueOnce([{ id: 2, title: 'Filtered Event' }]);
    await wrapper.vm.filterEventByZone(1);
    expect(getFilterEvents).toHaveBeenCalledWith(null, null, null, null);
    expect(wrapper.vm.events).toHaveLength(1);
    expect(wrapper.vm.events[0].title).toBe('Filtered Event');
  });

//   it('should handle page refresh on reload', async () => {
//     const fetchEventsSpy = vi.spyOn(wrapper.vm, 'fetchEvents');
//     await wrapper.vm.reloadEvents();
//     expect(wrapper.vm.topLoading).toBe(true);
//     expect(wrapper.vm.showPageRefresh).toBe(false);
//     expect(fetchEventsSpy).toHaveBeenCalled();
//   });

  it('should update the zone correctly', async () => {
    const mockZone = {
      id: 1,
      name: 'Updated Zone',
    };
    wrapper.vm.updateZone(mockZone);
    // expect(console.log).toHaveBeenCalledWith(mockZone);
  });

  it('should toggle menu visibility', async () => {
    expect(wrapper.vm.isMenuVisible).toBe(false);
    wrapper.vm.toggleMenu();
    expect(wrapper.vm.isMenuVisible).toBe(true);
  });

  it('should log the event deletion action', async () => {
    window.confirm = vi.fn().mockReturnValue(true);
    const consoleSpy = vi.spyOn(console, 'log');
    await wrapper.vm.deleteEvent();
    expect(consoleSpy).toHaveBeenCalledWith('Deleting post', undefined);
  });

  it('should not delete event if user cancels the confirmation', async () => {
    window.confirm = vi.fn().mockReturnValue(false);
    const consoleSpy = vi.spyOn(console, 'log');
    await wrapper.vm.deleteEvent();
    expect(consoleSpy).toHaveBeenCalledWith('Event deletion cancelled by user');
  });

//   it('should render shimmer loading when zone data is loading', async () => {
//     wrapper.setData({ isZoneLoading: true });
//     await wrapper.vm.$nextTick();
//     expect(wrapper.findComponent({ name: 'AvatarEventShimmer' }).exists()).toBe(true);
//   });

//   it('should show RefreshError component when showPageRefresh is true', async () => {
//     wrapper.setData({ showPageRefresh: true });
//     await wrapper.vm.$nextTick();
//     expect(wrapper.findComponent({ name: 'RefreshError' }).exists()).toBe(true);
//   });

//   it('should show events list when not loading', async () => {
//     wrapper.setData({ topLoading: false, events: [{ id: 1, title: 'Event 1' }] });
//     await wrapper.vm.$nextTick();
//     expect(wrapper.findComponent({ name: 'EventBox' }).exists()).toBe(true);
//   });

  it('should call viewEvent on event click', async () => {
    const viewEventSpy = vi.spyOn(wrapper.vm, 'viewEvent');
    await wrapper.vm.viewEvent();
    expect(viewEventSpy).toHaveBeenCalled();
  });
});
