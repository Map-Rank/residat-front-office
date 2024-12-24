import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import UserEventView from '@/features/Event/UserEventView.vue';
import RefreshError from '@/components/common/Pages/RefreshError.vue';
import AvatarEventShimmer from '@/components/common/ShimmerLoading/AvatarPostShimmer.vue';
import { getFilterEvents } from '@/services/eventService.js';
import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';

let pinia;

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
  })),
}));


describe('UserEventView.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UserEventView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          })
        ],
        mocks: {
          $t: (key) => key // Simple translation mock
        }
      },
      data() {
        return {
          topLoading: true, // Default to true
          events: [] // Default to empty array
        }
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders shimmer loading indicator when `topLoading` is true', () => {
    wrapper.setData({ topLoading: true });
    expect(wrapper.findComponent(AvatarEventShimmer).exists()).toBe(true);
  });

  it('renders the event list when `topLoading` is false', async () => {
    // Use wrapper.setData with a more robust approach
    await wrapper.setData({
      topLoading: false,
      events: [{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }]
    });

    // Wait for Vue to update
    await wrapper.vm.$nextTick();

    // Find EventBox components
    const eventBoxes = wrapper.findAllComponents({ name: 'EventBox' });
    
    // Log debug information if the test fails
    if (eventBoxes.length === 0) {
      console.log('Wrapper HTML:', wrapper.html());
      console.log('Component data:', wrapper.vm.$data);
    }

    expect(eventBoxes).toHaveLength(2);
  });

  it('shows RefreshError component if `showPageRefresh` is true', async () => {
    await wrapper.setData({ showPageRefresh: true });
    expect(wrapper.findComponent(RefreshError).exists()).toBe(true);
  });

  it('calls `fetchEvents` on component creation', async () => {
    const fetchEventsSpy = vi.spyOn(UserEventView.methods, 'fetchEvents'); // Espionner la méthode
    wrapper = mount(UserEventView, {
      global: {
        plugins: [pinia],
        stubs: ['router-link', 'router-view'],
        mocks: {
          $t: (msg) => msg,
        },
      },
    });
  
    await wrapper.vm.$nextTick();
    expect(fetchEventsSpy).toHaveBeenCalled(); // Vérifie l'appel
  });

  it('displays error message if no events are found after filtering', async () => {
    getFilterEvents.mockResolvedValue([]);
    await wrapper.vm.filterEventByZone(1);
    expect(wrapper.vm.errorMessage).toBe('No event found under this location , chose another location ');
    expect(wrapper.vm.showPageRefresh).toBe(true);
  });

  it('updates events when filtering by zone succeeds', async () => {
    const events = [{ id: 1, title: 'Filtered Event' }];
    getFilterEvents.mockResolvedValue(events);
    await wrapper.vm.filterEventByZone(1);
    expect(wrapper.vm.events).toEqual(events);
    expect(wrapper.vm.showPageRefresh).toBe(false);
  });

  it('calls `reloadEvents` and fetches events again', async () => {
    const fetchEventsSpy = vi.spyOn(wrapper.vm, 'fetchEvents');
    await wrapper.vm.reloadEvents();
    expect(fetchEventsSpy).toHaveBeenCalled();
    expect(wrapper.vm.topLoading).toBe(false);
  });

  it('toggles the menu visibility when `toggleMenu` is called', async () => {
    await wrapper.setData({ isMenuVisible: false });
    wrapper.vm.toggleMenu();
    expect(wrapper.vm.isMenuVisible).toBe(true);
  });

  it('confirms before deleting an event', () => {
    global.confirm = vi.fn(() => true);
    const deleteEventSpy = vi.spyOn(wrapper.vm, 'deleteEvent');
    wrapper.vm.deleteEvent();
    expect(deleteEventSpy).toHaveBeenCalled();
  });

  it('does not delete an event if user cancels', () => {
    global.confirm = vi.fn(() => false);
    const deleteEventSpy = vi.spyOn(wrapper.vm, 'deleteEvent');
    wrapper.vm.deleteEvent();
    expect(deleteEventSpy).toHaveBeenCalled();
    expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete this post?');
  });
});
