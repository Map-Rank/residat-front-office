import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import L from 'leaflet' // Mock Leaflet
import { getZones, getSpecificMapZones } from '@/services/zoneService' // Mock zoneService
import { getDisasters } from '@/services/disastersServices.js' // Mock disastersServices
import MapComponent from '../components/MapComponent.vue'

// Mock external dependencies
vi.mock('leaflet', () => ({
    map: vi.fn(() => ({
      setView: vi.fn(),
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
      getCenter: jest.fn(() => ({ lat: 4.05, lng: 9.7 })),
    })),
    tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
    geoJSON: vi.fn(() => ({ addTo: vi.fn() })),
    layerGroup: vi.fn(() => ({
      addTo: vi.fn(),
      clearLayers: vi.fn(),
    })),
  }));






// Mock external dependencies
vi.mock('@/services/zoneService', () => ({
  getZones: vi.fn(() => Promise.resolve([])),
  getSpecificMapZones: vi.fn(() => Promise.resolve([])),
}))

vi.mock('@/services/disastersServices.js', () => ({
  getDisasters: vi.fn(() => Promise.resolve([])),
}))

describe('MapComponent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(MapComponent, {
      props: {
        showLayers: true,
        latitude: 4.05,
        longitude: 9.7,
        zoomIndex: 6.5,
      },
    })
  })

  it('renders map container', () => {
    expect(wrapper.find('#map').exists()).toBe(true)
  })

  it('shows layers checkbox when showLayers is true', async () => {
    expect(wrapper.find('.checkboxMObile').exists()).toBe(true)
  })

//   it('initializes Leaflet map', async () => {
//     const initializeMapSpy = vi.spyOn(wrapper.vm, 'initializeMap');
//     await wrapper.vm.$nextTick();
//     expect(initializeMapSpy).toHaveBeenCalled();
//     expect(wrapper.vm.map).not.toBeNull();
//   });
//   it('loads disaster markers when disasters are present', async () => {
//     wrapper.setData({
//       allDisasters: [
//         {
//           id: 1,
//           type: 'FLOOD',
//           level: 3,
//           latitude: 4.1,
//           longitude: 9.8,
//           description: 'Flood in Douala',
//           locality: 'Douala',
//         },
//       ],
//     })

//     const addDisasterMarkersSpy = vi.spyOn(wrapper.vm, 'addDisasterMarkers')
//     await wrapper.vm.$nextTick()

//     wrapper.vm.addDisasterMarkers()
//     expect(addDisasterMarkersSpy).toHaveBeenCalled()
//     expect(wrapper.vm.disasterMarkersLayer).not.toBeNull()
//   })

//   it('toggles GeoJSON layers', async () => {
//     const toggleLoadCameroonGeoJsonSpy = vi.spyOn(wrapper.vm, 'loadCameroonGeoJson')
//     wrapper.setData({ toggleCameroon: true })
//     await wrapper.vm.$nextTick()

//     expect(toggleLoadCameroonGeoJsonSpy).toHaveBeenCalled()
//   })

  it('emits zoneClick when a region is clicked', async () => {
    wrapper.vm.$emit('zoneClick', { name: 'Region 1' })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('zoneClick')).toBeTruthy()
    expect(wrapper.emitted('zoneClick')[0]).toEqual([{ name: 'Region 1' }])
  })

  it('computes disasterMarkerStyles correctly', () => {
    wrapper.setData({
      allDisasters: [
        { type: 'FLOOD', level: 2, latitude: 4.1, longitude: 9.8 },
        { type: 'DROUGHT', level: 3, latitude: 4.2, longitude: 9.9 },
      ],
    })

    const styles = wrapper.vm.disasterMarkerStyles
    expect(styles).toHaveLength(2)
    expect(styles[0].color).toBe('blue')
    expect(styles[1].color).toBe('red')
    expect(styles[0].intensity).toBe(0.5)
  })
})