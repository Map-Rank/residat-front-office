import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReportView from '../ReportView.vue'

describe('ReportView', () => {
  it('renders the UnderConstruction component', () => {
    const wrapper = mount(ReportView)
    expect(wrapper.findComponent({ name: 'UnderConstruction' }).exists()).toBe(true)
  })

  it('has the correct class on the root div', () => {
    const wrapper = mount(ReportView)
    const rootDiv = wrapper.find('div')
    expect(rootDiv.classes()).toContain('flex')
    expect(rootDiv.classes()).toContain('items-center')
    expect(rootDiv.classes()).toContain('justify-center')
    expect(rootDiv.classes()).toContain('min-h-screen')
    expect(rootDiv.classes()).toContain('bg-gray-100')
  })
})