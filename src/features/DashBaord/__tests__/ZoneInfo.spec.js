import ZoneInfo from "../components/ZoneInfo.vue";
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'


describe('ZoneInfo', () => {
    it('renders the skeleton loader when zone is null', () => {
      const wrapper = mount(ZoneInfo, {
        props: {
          zone: null
        }
      })
      expect(wrapper.find('.skeleton-banner').exists()).toBe(true)
      expect(wrapper.find('.skeleton-text-wide').exists()).toBe(true)
      expect(wrapper.find('.skeleton-text-narrow').exists()).toBe(true)
    })
  
    it('renders the zone banner when zone.banner is provided', () => {
      const zone = {
        banner: 'https://example.com/banner.jpg',
        name: 'Test Zone',
        latitude: 0,
        longitude: 0,
        civils: 100,
        accidents: 10
      }
      const wrapper = mount(ZoneInfo, {
        props: {
          zone
        }
      })
      const banner = wrapper.find('img[alt="Zone Banner"]')
      expect(banner.exists()).toBe(true)
      expect(banner.attributes('src')).toBe(zone.banner)
    })
  
    it('renders the zone name when zone.name is provided', () => {
      const zone = {
        name: 'Test Zone',
        latitude: 0,
        longitude: 0,
        civils: 100,
        accidents: 10
      }
      const wrapper = mount(ZoneInfo, {
        props: {
          zone
        }
      })
      expect(wrapper.find('h2').text()).toBe(zone.name)
    })
  
    // it('renders the latitude and longitude when provided', () => {
    //   const zone = {
    //     name: 'Test Zone',
    //     latitude: 0,
    //     longitude: 0,
    //     civils: 100,
    //     accidents: 10
    //   }
    //   const wrapper = mount(ZoneInfo, {
    //     props: {
    //       zone
    //     }
    //   })
    //   expect(wrapper.find('p:contains("Latitude:")').text()).toBe('Latitude: 0')
    //   expect(wrapper.find('p:contains("Longitude:")').text()).toBe('Longitude: 0')
    // })
  
    // it('renders the number of civils and accidents when provided', () => {
    //   const zone = {
    //     name: 'Test Zone',
    //     latitude: 0,
    //     longitude: 0,
    //     civils: 100,
    //     accidents: 10
    //   }
    //   const wrapper = mount(ZoneInfo, {
    //     props: {
    //       zone
    //     }
    //   })
    //   expect(wrapper.find('p:contains("Number of Civils:")').text()).toBe('Number of Civils: 100')
    //   expect(wrapper.find('p:contains("Number of Accidents:")').text()).toBe('Number of Accidents: 10')
    // })
  
    // it('does not render latitude and longitude when they are null', () => {
    //   const zone = {
    //     name: 'Test Zone',
    //     latitude: null,
    //     longitude: null,
    //     civils: 100,
    //     accidents: 10
    //   }
    //   const wrapper = mount(ZoneInfo, {
    //     props: {
    //       zone
    //     }
    //   })
    //   expect(wrapper.find('p:contains("Latitude:")').exists()).toBe(false)
    //   expect(wrapper.find('p:contains("Longitude:")').exists()).toBe(false)
    // })
  
    // it('does not render civils and accidents when they are null', () => {
    //   const zone = {
    //     name: 'Test Zone',
    //     latitude: 0,
    //     longitude: 0,
    //     civils: null,
    //     accidents: null
    //   }
    //   const wrapper = mount(ZoneInfo, {
    //     props: {
    //       zone
    //     }
    //   })
    //   expect(wrapper.find('p:contains("Number of Civils:")').exists()).toBe(false)
    //   expect(wrapper.find('p:contains("Number of Accidents:")').exists()).toBe(false)
    // })
  })