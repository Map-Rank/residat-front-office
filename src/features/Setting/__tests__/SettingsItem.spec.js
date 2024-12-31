import SettingsItem from "../components/SettingsItem.vue";
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
describe('SettingsItem', () => {
    // Mock $router
    const $router = {
      push: vi.fn() // Mock the push method
    }
  
    // Mount the component with mocks
    const wrapper = mount(SettingsItem, {
      global: {
        mocks: {
          $router
        }
      },
      props: {
        title: 'Account Preferences',
        route: 'account-preferences'
      }
    })
  
    it('renders the component correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })
  
    it('renders the correct title', () => {
      const title = wrapper.find('p')
      expect(title.text()).toBe('Account Preferences')
    })
  
    it('calls navigateTo method when clicked', async () => {
      await wrapper.trigger('click') // Simulate a click event
      expect($router.push).toHaveBeenCalledWith({ name: 'account-preferences' })
    })
  
    it('logs the navigation message', async () => {
      const consoleSpy = vi.spyOn(console, 'log') // Spy on console.log
      await wrapper.trigger('click') // Simulate a click event
      expect(consoleSpy).toHaveBeenCalledWith('Navigating to:', 'account-preferences')
    })
  })