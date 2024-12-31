import SettingView from "../SettingView.vue";
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IconwithLabel from '@/components/common/IconWithLabel/index.vue'


// Mock the IconwithLabel component
vi.mock('@/components/common/IconWithLabel/index.vue', () => ({
    default: {
      template: '<div>Mock IconwithLabel</div>'
    }
  }))
  
  describe('SettingView', () => {
    // Mock $t function for translations
    const $t = (key) => key
  
    // Mock $route object
    const $route = {
      name: 'account-preferences' // Simulate the active route
    }
  
    // Mount the component with mocks
    const wrapper = mount(SettingView, {
      global: {
        mocks: {
          $t,
          $route
        },
        components: {
          IconwithLabel
        }
      }
    })
  
    it('renders the component correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })
  
    it('renders the sidebar with correct items', () => {
      const sidebarItems = wrapper.vm.sideBarItem
      expect(sidebarItems.length).toBe(2)
      expect(sidebarItems[0].labelText).toBe('account_preferences')
      expect(sidebarItems[1].labelText).toBe('signin_ecurity')
    })
  
    it('renders the IconwithLabel component for each sidebar item', () => {
      const iconWithLabels = wrapper.findAllComponents(IconwithLabel)
      expect(iconWithLabels.length).toBe(2)
    })
  
    it('correctly identifies the active route', () => {
      // Test the isActive method
      expect(wrapper.vm.isActive('account-preferences')).toBe(true)
      expect(wrapper.vm.isActive('security-setting')).toBe(false)
    })
  
    it('renders the router-view', () => {
      const routerView = wrapper.find('router-view-stub')
      expect(routerView.exists()).toBe(false)
    })
  })