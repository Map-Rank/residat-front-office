import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import dashboard from '@/features/DashBoard/DashBoard.vue'
import UnderConstruction from '@/components/common/Pages/UnderConstruction.vue'

// Mock the UnderConstruction component

describe('dashboard Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(dashboard, {
      props: { UnderConstruction }
    })
  })
  it('renders UnderConstruction component', () => {
    const underConstruction = wrapper.findComponent(UnderConstruction)

    expect(underConstruction.exists()).toBe(true)
  })
})
