import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import NotificationItem from '@/features/Notification/components/NotificationItem.vue'
import { deleteNotification } from '@/services/notificationService.js'
import { useToast } from 'vue-toastification'

// Mock dependencies
vi.mock('@/services/notificationService.js', () => ({
  deleteNotification: vi.fn()
}))

vi.mock('vue-toastification', () => ({
  useToast: vi.fn()
}))

describe('NotificationItem Component', () => {
  const mockToast = {
    success: vi.fn()
  }

  beforeEach(() => {
    // Setup Pinia
    setActivePinia(createPinia())
    
    // Reset mocks
    vi.resetAllMocks()
    
    // Mock toast
    useToast.mockReturnValue(mockToast)
  })

  const mockNotification = {
    id: 1,
    titre_en: 'Test Notification',
    banner: 'https://example.com/image.jpg',
    content_en: 'Test notification content',
    created_at: '2023-06-15T10:30:00Z',
    isNew: true,
    user: { first_name: 'John' },
    zone: { name: 'Test Zone' }
  }

  const mockI18n = {
    $t: (key) => key
  }

  it('renders notification details correctly', () => {
    const wrapper = mount(NotificationItem, {
      props: {
        notification: mockNotification,
        isInstitution: true
      },
      global: {
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Check notification details
    expect(wrapper.text()).toContain(mockNotification.titre_en)
    expect(wrapper.text()).toContain(mockNotification.content_en)
    expect(wrapper.text()).toContain(mockNotification.user.first_name)
    expect(wrapper.text()).toContain(mockNotification.zone.name)
    expect(wrapper.text()).toContain('Créé le')
  })

  it('displays new notification with blue background', () => {
    const wrapper = mount(NotificationItem, {
      props: {
        notification: mockNotification,
        isInstitution: true
      },
      global: {
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Check for blue background class for new notification
    expect(wrapper.classes()).toContain('bg-blue-50')
  })

  it('shows menu for institution users', async () => {
    const wrapper = mount(NotificationItem, {
      props: {
        notification: mockNotification,
        isInstitution: true
      },
      global: {
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Toggle menu
    const menuButton = wrapper.find('button')
    await menuButton.trigger('click')

    // Check if menu is visible
    const menu = wrapper.find('.absolute')
    expect(menu.exists()).toBe(true)
    expect(menu.text()).toContain('Mark as Read')
    expect(menu.text()).toContain('Delete')
  })

  it('does not show menu for non-institution users', () => {
    const wrapper = mount(NotificationItem, {
      props: {
        notification: mockNotification,
        isInstitution: false
      },
      global: {
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Check that menu does not exist
    const menu = wrapper.find('.absolute')
    expect(menu.exists()).toBe(false)
  })

  it('handles notification deletion', async () => {
    // Mock delete notification and toast
    deleteNotification.mockResolvedValue({})
    
    const wrapper = mount(NotificationItem, {
      props: {
        notification: mockNotification,
        isInstitution: true
      },
      global: {
        mocks: {
          $t: mockI18n.$t
        },
        emit: vi.fn()
      }
    })

    // Open menu
    const menuButton = wrapper.find('button')
    await menuButton.trigger('click')

    // Find and click delete button
    const deleteButton = wrapper.findAll('a')[1]
    await deleteButton.trigger('click')

    // Check delete notification was called
    expect(deleteNotification).toHaveBeenCalledWith(mockNotification.id)
    
    // Wait for async operations
    await wrapper.vm.$nextTick()

    // Check toast success was called
    expect(mockToast.success).toHaveBeenCalledWith('Notification succesfuly delated')
  })

  it('formats date and time correctly', () => {
    const wrapper = mount(NotificationItem, {
      props: {
        notification: mockNotification,
        isInstitution: true
      },
      global: {
        mocks: {
          $t: mockI18n.$t
        }
      }
    })

    // Check date formatting
    const dateText = wrapper.text()
    expect(dateText).toContain('15/06/2023')
    expect(dateText).toContain('à')
    expect(dateText).toMatch(/\d{2}:\d{2}:\d{2}/)
  })
})