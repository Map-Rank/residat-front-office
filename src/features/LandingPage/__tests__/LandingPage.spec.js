import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LandingPage from '../LandingPage.vue'
import FooterLanding from '../components/FooterLanding.vue'
import ButtonUi from '@/components/base/ButtonUi.vue'
import HeaderLanding from '@/components/common/Header/HeaderLanding.vue'
import TitleLanding from '../components/TitleLanding.vue'

vi.mock('@/assets/images/LandingPage/check-icon.svg', () => ({
  default: 'check-icon.svg',
}))

describe('LandingPage', () => {
  const $t = (key) => key // Mock translation function
  const $router = {
    resolve: () => ({ href: '/register' }),
  }

  // Mount the component with mocks
  const wrapper = mount(LandingPage, {
    global: {
      mocks: {
        $t,
        $router,
      },
    },
  })

  it('renders the HeaderLanding component', () => {
    expect(wrapper.findComponent(HeaderLanding).exists()).toBe(true)
  })

  it('renders the FooterLanding component', () => {
    expect(wrapper.findComponent(FooterLanding).exists()).toBe(true)
  })

  it('renders the TitleLanding component', () => {
    expect(wrapper.findComponent(TitleLanding).exists()).toBe(true)
  })

  it('renders the ButtonUi component', () => {
    expect(wrapper.findComponent(ButtonUi).exists()).toBe(true)
  })

  it('displays the correct text for "connecting_communities"', () => {
    const text = wrapper.find('[data-test="connecting-communities"]').text()
    expect(text).toBe('connecting_communities') // Replace with the actual translation
  })

  it('renders the correct number of list items for "aboutUs"', () => {
    const listItems = wrapper.findAll('.aboutUs .list-item') // Adjust the selector as needed
    expect(listItems.length).toBe(0)
  })

  it('renders the correct number of list items for "aboutUsInst"', () => {
    const listItems = wrapper.findAll('.aboutUsInst .list-item') // Adjust the selector as needed
    expect(listItems.length).toBe(0)
  })

//  it('calls navigateTo method when ButtonUi is clicked', async () => {
//     // Spy on the navigateTo method
//     const navigateToSpy = vi.spyOn(wrapper.vm, 'navigateTo')

//     // Find the button and trigger a click event
//     const button = wrapper.findComponent(ButtonUi)
//     await button.trigger('click') // Simulate a click event

//     // Verify that navigateTo was called with the correct argument
//     expect(navigateToSpy).toHaveBeenCalledWith('register')
//   })

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

})