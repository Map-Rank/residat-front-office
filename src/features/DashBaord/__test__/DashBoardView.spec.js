import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DashBaord from '@/features/DashBoard/DashBoard.vue'
import UnderConstruction from '@/components/common/Pages/UnderConstruction.vue'

// Mock the UnderConstruction component

describe('DashBaord Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(DashBaord, {
      props: { UnderConstruction }
    })
  })
  it('renders UnderConstruction component', () => {
    const underConstruction = wrapper.findComponent(UnderConstruction)

    expect(underConstruction.exists()).toBe(true)
  })
})
