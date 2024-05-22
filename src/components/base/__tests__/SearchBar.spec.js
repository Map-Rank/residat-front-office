// import { it, expect, describe } from 'vitest'
import SearchBar from '@/components/base/SearchBar.vue'
import { mount } from '@vue/test-utils'
// import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// import SearchBar from '@/components/base/SearchBar.vue';
import { getZones } from '@/services/zoneService.js';

vi.mock('@/services/zoneService.js', () => ({
  getZones: vi.fn(),
}));

describe('SearchBar.vue', () => {
  let wrapper;

  beforeEach(() => {
    getZones.mockResolvedValue([
      { id: 1, name: 'Zone 1' },
      { id: 2, name: 'Zone 2' },
      { id: 3, name: 'Zone 3' },
    ]);

    wrapper = mount(SearchBar, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the $t function for localization
          $router: {
            push: vi.fn(),
            replace: vi.fn(),
            currentRoute: { name: 'home' },
          },
        },
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('filters zones based on search query', async () => {
    wrapper.setData({ zones: await getZones() });
    await wrapper.setData({ searchQuery: 'Zone 1' });
    await wrapper.vm.filterZones();

    expect(wrapper.vm.filteredZones).toEqual([{ id: 1, name: 'Zone 1' }]);
  });


  it('calls searchZone method on Enter key', async () => {
    wrapper.setData({
      searchQuery: 'Zone 1',
      zones: await getZones(),
      filteredZones: [{ id: 1, name: 'Zone 1' }],
    });

    await wrapper.find('input').trigger('keyup.enter');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'search-result',
      params: { zoneId: 1 },
    });
  });

  it('fetches all zones on mouseover', async () => {
    await wrapper.find('input').trigger('mouseover');
    expect(getZones).toHaveBeenCalled();
    expect(wrapper.vm.zones).toEqual([
      { id: 1, name: 'Zone 1' },
      { id: 2, name: 'Zone 2' },
      { id: 3, name: 'Zone 3' },
    ]);
  });
});
