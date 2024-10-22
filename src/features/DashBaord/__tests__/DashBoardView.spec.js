import { shallowMount, createLocalVue } from '@vue/test-utils'
import DashBoardView from '@/features/DashBaord/DashBoardView.vue'
import MapComponent from '@/features/DashBaord/components/MapComponent.vue'
import WaterStressChart from '@/components/base/Charts/WaterStressChart.vue'
import ZoneInfo from '@/features/DashBaord/components/ZoneInfo.vue'
import PostSlider from '@/features/DashBaord/components/PostSlider.vue'
import ZonePostFilter from '@/features/Community/components/ZonePostFilter/ZonePostFilter.vue'
import ButtonUi from '@/components/base/ButtonUi.vue'
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import { useDashboardStore } from '@/stores/dashboardStore.js'
import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('@/stores/dashboardStore.js', () => ({
  useDashboardStore: vi.fn(() => ({
    latitude: 10,
    longitude: 20,
    zoomIndex: 5,
    zoneId: null,
  })),
}))

describe('DashBoardView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DashBoardView, {
      global: {
        components: {
          MapComponent,
          WaterStressChart,
          ZoneInfo,
          PostSlider,
          ZonePostFilter,
          ButtonUi,
          BaseDropdown,
        },

        mocks: {
          $t: (msg) => msg,
          $route: {
            params: { zoneId: 1, sectorId: null },
          },
          // $router: routerMock,
        },
      },
    })
  })

  it('should render MapComponent with correct props', () => {
    const mapComponent = wrapper.findComponent(MapComponent)
    expect(mapComponent.exists()).toBe(true)
    expect(mapComponent.props('latitude')).toBe(10)
    expect(mapComponent.props('longitude')).toBe(20)
    expect(mapComponent.props('zoomIndex')).toBe(5)
  })

  it('should render WaterStressChart', () => {
    const waterStressChart = wrapper.findComponent(WaterStressChart)
    expect(waterStressChart.exists()).toBe(true)
  })

  it('should render ZoneInfo component when isZoneStatistics is false', async () => {
    await wrapper.setData({ isZoneStatistics: false })
    const zoneInfo = wrapper.findComponent(ZoneInfo)
    expect(zoneInfo.exists()).toBe(true)
  })

  it('should render PostSlider component', () => {
    const postSlider = wrapper.findComponent(PostSlider)
    expect(postSlider.exists()).toBe(true)
  })

  it('should render ZonePostFilter component', () => {
    const zonePostFilter = wrapper.findComponent(ZonePostFilter)
    expect(zonePostFilter.exists()).toBe(true)
  })

  it('should call toggleZoneStatistics when button-ui is clicked', async () => {
    const toggleZoneStatistics = vi.spyOn(wrapper.vm, 'toggleZoneStatistics')
    const button = wrapper.findComponent(ButtonUi)
    await button.vm.$emit('clickButton')
    expect(toggleZoneStatistics).toHaveBeenCalled()
  })

  // it('should render BaseDropdown when inSubDivision is true', async () => {
  //   await wrapper.setData({ inSubDivision: true })
  //   const baseDropdown = wrapper.findComponent(BaseDropdown)
  //   expect(baseDropdown.exists()).toBe(true)
  // })

  // it('should call searchMap when search button is clicked', async () => {
  //   const searchMap = vi.spyOn(wrapper.vm, 'searchMap')
  //   const searchButton = wrapper.findAllComponents(ButtonUi).at(1) // Assuming second button is search
  //   await searchButton.vm.$emit('clickButton')
  //   expect(searchMap).toHaveBeenCalled()
  // })
})
