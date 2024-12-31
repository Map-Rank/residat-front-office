import { shallowMount } from '@vue/test-utils'
import DashBoardView from '@/features/DashBaord/DashBoardView.vue'
import MapComponent from '@/features/DashBaord/components/MapComponent.vue'
import WaterStressChart from '@/components/base/Charts/WaterStressChart.vue'
import ZoneInfo from '@/features/DashBaord/components/ZoneInfo.vue'
import PostSlider from '@/features/DashBaord/components/PostSlider.vue'
import ZonePostFilter from '@/features/Community/components/ZonePostFilter/ZonePostFilter.vue'
import ButtonUi from '@/components/base/ButtonUi.vue'
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import { ReportType } from '@/constants/reportData.js';

import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useToast } from 'vue-toastification';

// Mock the dashboardStore
vi.mock('@/stores/dashboardStore.js', () => ({
  useDashboardStore: vi.fn(() => ({
    latitude: 10,
    longitude: 20,
    zoomIndex: 5,
    zoneId: null,
    setDashboardParams: vi.fn(), // Mock the setDashboardParams method
  })),
}))

// Mock vue-toastification
vi.mock('vue-toastification', () => ({
  useToast: vi.fn(() => ({
    error: vi.fn(), // Mock the error method
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
          $router: {
            push: vi.fn(),
          },
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

  it('should toggle isZoneStatistics when toggleZoneStatistics is called', async () => {
    await wrapper.vm.toggleZoneStatistics()
    expect(wrapper.vm.isZoneStatistics).toBe(false)
    await wrapper.vm.toggleZoneStatistics()
    expect(wrapper.vm.isZoneStatistics).toBe(true)
  })

  it('should toggle isZoneStatisticsMObile when toggleZoneStatisticsMobile is called', async () => {
    await wrapper.vm.toggleZoneStatisticsMobile()
    expect(wrapper.vm.isZoneStatisticsMObile).toBe(true)
    await wrapper.vm.toggleZoneStatisticsMobile()
    expect(wrapper.vm.isZoneStatisticsMObile).toBe(false)
  })

  it('should toggle ShowNavigationZone when toggleNavigationZone is called', async () => {
    await wrapper.vm.toggleNavigationZone()
    expect(wrapper.vm.ShowNavigationZone).toBe(true)
    await wrapper.vm.toggleNavigationZone()
    expect(wrapper.vm.ShowNavigationZone).toBe(false)
  })

  it('should toggle showLayers when toggleLayer is called', async () => {
    await wrapper.vm.toggleLayer()
    expect(wrapper.vm.showLayers).toBe(true)
    await wrapper.vm.toggleLayer()
    expect(wrapper.vm.showLayers).toBe(false)
  })

  it('should call zoneClick method with correct parameters', async () => {
    const zone = { id: 1, parent_id: 0, name: 'Zone 1', latitude: 10, longitude: 20 }
    const zoomIndex = 8
    await wrapper.vm.zoneClick(zone, zoomIndex)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'dashboard' })
  })

  it('should call disasterClick method with correct parameters', async () => {
    const marker = { zone_id: 1, locality: 'Locality 1', latitude: 10, longitude: 20 }
    await wrapper.vm.disasterClick(marker)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'dashboard' })
  })

  it('should call searchMap method and show toast error if zoneMapToSearch is null', async () => {
    await wrapper.vm.searchMap()
    expect(wrapper.vm.toast.error).toHaveBeenCalledWith('Select a zone please')
  })

  it('should call searchMap method and navigate if zoneMapToSearch is not null', async () => {
    const zone = { id: 1, parent_id: 0, name: 'Zone 1', latitude: 10, longitude: 20 }
    await wrapper.setData({ zoneMapToSearch: zone })
    await wrapper.vm.searchMap()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'dashboard' })
  })

  it('should update zoneIdToSearch when selectZoneToSearch is called', async () => {
    const id = 1
    await wrapper.vm.selectZoneToSearch(id)
    expect(wrapper.vm.zoneIdToSearch).toBe(id)
  })

  it('should update zoneMapToSearch and call searchMap when updateZone is called', async () => {
    const zone = { id: 1, parent_id: 0, name: 'Zone 1', latitude: 10, longitude: 20 }
    await wrapper.vm.updateZone(zone)
    expect(wrapper.vm.zoneMapToSearch).toEqual(zone)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'dashboard' })
  })

  // it('should update reportType when updateReportType is called', async () => {
  //   const type = ReportType.FLOOD
  //   await wrapper.vm.updateReportType(type)
  //   expect(wrapper.vm.reportType).toBe(type)
  // })

  // it('should handle window resize and update isMobileView', async () => {
  //   window.innerWidth = 500
  //   window.dispatchEvent(new Event('resize'))
  //   expect(wrapper.vm.isMobileView).toBe(false)

  //   window.innerWidth = 1000
  //   window.dispatchEvent(new Event('resize'))
  //   expect(wrapper.vm.isMobileView).toBe(false)
  // })

  // it('should call toggleZoneStatistics when button-ui is clicked', async () => {
  //   const toggleZoneStatisticsSpy = vi.spyOn(wrapper.vm, 'toggleZoneStatistics')
  
  //   // Directly trigger the click event on the button element
  //   const button = wrapper.find('button')
  //   await button.trigger('click')
  
  //   await nextTick()
  
  //   expect(toggleZoneStatisticsSpy).toHaveBeenCalledTimes(1)
  // })

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
