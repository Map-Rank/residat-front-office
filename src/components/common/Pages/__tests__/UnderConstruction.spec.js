import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UnderConstruction from '@/components/common/Pages/UnderConstruction.vue'

describe('UnderConstruction Component', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(UnderConstruction)
    
    // Vérifier le titre
    const title = wrapper.find('h1')
    expect(title.text()).toBe('Under Construction')
    
    // Vérifier l'image
    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('alt')).toBe('Under Construction')
    
    // Vérifier le message par défaut
    const errorMessage = wrapper.find('p')
    expect(errorMessage.text()).toBe('This section is still under construction. Check back soon!')
  })

  it('renders custom error message when provided', () => {
    const customMessage = 'Maintenance en cours'
    const wrapper = mount(UnderConstruction, {
      props: {
        errorMessage: customMessage
      }
    })
    
    const errorMessage = wrapper.find('p')
    expect(errorMessage.text()).toBe(customMessage)
  })

  it('contains a router link to community page', () => {
    const wrapper = mount(UnderConstruction)
    
    const routerLink = wrapper.find('router-link')
    expect(routerLink.exists()).toBe(true)
    expect(routerLink.text()).toBe('Visit Our Community')
    expect(routerLink.attributes('to')).toBe('/community')
  })

  it('has correct CSS classes for layout and styling', () => {
    const wrapper = mount(UnderConstruction)
    
    // Vérifier les classes de la div principale
    const mainDiv = wrapper.find('div')
    expect(mainDiv.classes()).toContain('flex')
    expect(mainDiv.classes()).toContain('items-center')
    expect(mainDiv.classes()).toContain('justify-center')
    expect(mainDiv.classes()).toContain('min-h-screen')
    expect(mainDiv.classes()).toContain('bg-gray-100')
  })
})