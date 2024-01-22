import { it, expect, describe } from 'vitest'
import SearchBar from '@/components/base/SearchBar.vue'
import { mount } from '@vue/test-utils'

describe('SearchBar', () => {
  const wrapper = mount(SearchBar)

  it('renders without errors', () => {
    expect(wrapper).toBeTruthy()
  })

  it('initializes with empty searchQuery and filteredZones', () => {
    expect(wrapper.vm.searchQuery).toBe('')
    expect(wrapper.vm.filteredZones).toEqual([])
  })

  it('correctly filters zones based on searchQuery', async () => {
    wrapper.vm.zones = [
      {
        id: 1,
        name: 'ZoneA',
        banner: '',
        created_at: ''
      },
      {
        id: 1,
        name: 'ZoneA',
        banner: '',
        created_at: ''
      },
      {
        id: 1,
        name: 'ZoneA',
        banner: '',
        created_at: ''
      }
    ]

    wrapper.vm.searchQuery = 'Zone'

    await wrapper.vm.$nextTick()

    // Assert the filteredZones
    expect(wrapper.vm.filteredZones).toEqual([
      {
        id: 1,
        name: 'ZoneA',
        banner: '',
        created_at: ''
      },
      {
        id: 1,
        name: 'ZoneA',
        banner: '',
        created_at: ''
      },
      {
        id: 1,
        name: 'ZoneA',
        banner: '',
        created_at: ''
      }
    ])
  })
})
