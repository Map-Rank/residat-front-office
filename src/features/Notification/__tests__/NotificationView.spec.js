import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationView from '@/features/Notification/NotificationView.vue'
import { getNotifications } from '@/services/notificationService.js'

// Mock the notificationService
vi.mock("@/services/notificationService.js", () => ({
  getNotifications: vi.fn()
}))

// Mock $t for i18n translations
const mockI18n = {
  $t: (key) => key
}

describe('NotificationView Component', () => {
  const mockNotifications = [
    {
      id: 1,
      titre_en: 'Test Notification 1',
      banner: 'https://example.com/image1.jpg',
      content_en: 'Test content 1',
      created_at: new Date().toISOString(),
      user: { first_name: 'John' },
      zone: { name: 'Zone 1' }
    },
    {
      id: 2,
      titre_en: 'Test Notification 2',
      banner: 'https://example.com/image2.jpg',
      content_en: 'Test content 2',
      created_at: new Date().toISOString(),
      user: { first_name: 'Jane' },
      zone: { name: 'Zone 2' }
    }
  ]

  it('renders correctly with no notifications', async () => {
    // Mock empty notifications
    getNotifications.mockResolvedValue([])

    const wrapper = mount(NotificationView, {
      global: {
        provide: {
          i18n: mockI18n
        },
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Wait for async operations
    await wrapper.vm.$nextTick()

    // Check for no notifications message
    expect(wrapper.text()).toContain('no_notification')
    expect(wrapper.findComponent({ name: 'NotificationItem' }).exists()).toBe(false)
  })

  it('renders notifications correctly', async () => {
    // Mock notifications
    getNotifications.mockResolvedValue(mockNotifications)

    const wrapper = mount(NotificationView, {
      global: {
        provide: {
          i18n: mockI18n
        },
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Wait for async operations
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    // Check number of notification items
    const notificationItems = wrapper.findAllComponents({ name: 'NotificationItem' })
    expect(notificationItems.length).toBe(2)

    // Check if the first notification is rendered correctly
    const firstNotification = notificationItems[0].props('notification')
    expect(firstNotification.titre_en).toBe('Test Notification 1')
    expect(firstNotification.content_en).toBe('Test content 1')
  })

  it('handles fetch notifications error', async () => {
    // Mock error scenario
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    getNotifications.mockRejectedValue(new Error('Fetch error'))

    const wrapper = mount(NotificationView, {
      global: {
        provide: {
          i18n: mockI18n
        },
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Wait for async operations
    await wrapper.vm.$nextTick()

    // Check if error is logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to fetch notifications:", 
      expect.any(Error)
    )

    // Check for no notifications message
    expect(wrapper.text()).toContain('no_notification')

    // Restore console.error
    consoleErrorSpy.mockRestore()
  })

  it('has correct initial state', () => {
    const wrapper = mount(NotificationView, {
      global: {
        provide: {
          i18n: mockI18n
        },
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Check initial data
    expect(wrapper.vm.notifications).toEqual([])
    expect(wrapper.vm.isInstitution).toBe(true)
  })
})