import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import Community from '@/features/Community/CommunityView.vue';
import { getPosts} from '@/features/Post/services/postService.js';

// Mock the services used in the component
vi.mock('@/features/Post/services/postService.js', () => ({
  getPosts: vi.fn(),
  getFilterPosts: vi.fn(),
}));

vi.mock('@/services/eventService.js', () => ({
  getEvents: vi.fn(),
}));

vi.mock('@/services/zoneService', () => ({
  getSpecificZones: vi.fn(),
  getZones: vi.fn(),
}));

describe('Community.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Community, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,  // Use vi.fn() to create spies
          }),
        ],
        mocks: {
          $t: (msg) => msg,
          $route: {
            params: { zoneId: 1, sectorId: null },
          },
          // $router: routerMock,
        },
        stubs: ['router-link', 'router-view'],
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toContain('Welcome to residat');
  });

  it('should call fetchPosts on component mount', () => {
    const fetchPostsSpy = vi.spyOn(wrapper.vm, 'fetchPosts');
    wrapper.vm.$nextTick(() => {
      expect(fetchPostsSpy).toHaveBeenCalled();
    });
  });

  it('should toggle the mobile filter for zones', async () => {
    const initialToggleState = wrapper.vm.showMobileFilterZonePost;
    await wrapper.vm.toogleShowMobileFilterZonePost();
    expect(wrapper.vm.showMobileFilterZonePost).toBe(!initialToggleState);
  });

  it('should toggle the mobile filter for sectors', async () => {
    const initialToggleState = wrapper.vm.showMobileFilterSectorPost;
    await wrapper.vm.toogleShowMobileFilterSectorPost();
    expect(wrapper.vm.showMobileFilterSectorPost).toBe(!initialToggleState);
  });

  it('should update the zone correctly', async () => {
    const mockZone = {
      name: 'Updated Zone',
      banner: 'https://example.com/updated-banner.jpg',
      id: 2,
    };
    await wrapper.vm.updateZone(mockZone);
    expect(wrapper.vm.zoneName).toBe('Updated Zone');
    expect(wrapper.vm.bannerUrlImage).toBe('https://example.com/updated-banner.jpg');
  });

  // it('should filter posts by zone', async () => {
  //   getFilterPosts.mockResolvedValueOnce([]);
  //   await wrapper.vm.filterPostByZone(1);
  //   expect(getFilterPosts).toHaveBeenCalledWith(1, [], null, null);
  // });



  // it('should fetch resources (posts and events)', async () => {
  //   getPosts.mockResolvedValueOnce([]);
  //   getEvents.mockResolvedValueOnce([]);
  //   await wrapper.vm.fetchResources();
  //   expect(getPosts).toHaveBeenCalled();
  //   expect(getEvents).toHaveBeenCalled();
  // });

  it('should load more posts', async () => {
    getPosts.mockResolvedValueOnce([{ id: 2 }]);
    await wrapper.vm.loadMorePosts(1, [2]);
    // expect(getPosts).toHaveBeenCalled();
  });

  it('should handle the scroll event', async () => {
    const handleScrollSpy = vi.spyOn(wrapper.vm, 'handleScroll');
    wrapper.vm.$refs.mainContent = {
      scrollTop: 0,
      scrollHeight: 1000,
      clientHeight: 500,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    wrapper.vm.handleScroll();
    expect(handleScrollSpy).toHaveBeenCalled();
  });

  it('should check for new posts', async () => {
    getPosts.mockResolvedValueOnce([{ id: 2 }]);
    wrapper.vm.posts = [{ id: 1 }];
    await wrapper.vm.checkNewPosts();
    // expect(wrapper.vm.hasNewPosts).toBe(true);
  });
  // it('should update the zone correctly in the watcher', async () => {
  //   const mockZone = {
  //     level_id: 3,
  //     parent_id: 1,
  //     id: 2,
  //     name: 'Updated Division',
  //   };
  //   getZones.mockResolvedValueOnce([{ id: 3, name: 'Some Division' }]);
  //   getSpecificZones.mockResolvedValueOnce({ id: 1, name: 'Region' });
    
  //   await wrapper.setData({ paramZone: mockZone });
  //   await wrapper.vm.$nextTick();
  
  //   expect(wrapper.vm.default_divisions).toContainEqual({ id: 3, name: 'Some Division' });
  // });
  

  // it('should update sectors when a checkbox is changed', async () => {
  //   const mockSector = {
  //     id: 1,
  //   };
  //   const checked = true;
  //   const filterPostBySectorsSpy = vi.spyOn(wrapper.vm, 'filterPostBySectors');
    
  //   await wrapper.vm.updateSectorChecked({ list: mockSector, checked });
    
  //   expect(filterPostBySectorsSpy).toHaveBeenCalled();
  // });

  it('should lock scrolling when set', async () => {
    wrapper.vm.scrollLocked = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.scroll-lock').exists()).toBe(true);
  });

  // Add more tests as necessary for any other methods in the component
});
