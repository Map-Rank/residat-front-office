import PostSlider from "../components/PostSlider.vue";
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'


describe('PostSlider', () => {
    it('renders the shimmer loader when posts are null', () => {
      const wrapper = mount(PostSlider, {
        props: {
          posts: null
        }
      })
      expect(wrapper.find('.animate-pulse').exists()).toBe(true)
    })
  
    it('renders the "No post in this zone" message when posts are empty', () => {
      const wrapper = mount(PostSlider, {
        props: {
          posts: []
        }
      })
      expect(wrapper.find('.text-gray-500').text()).toBe('No post in this zone')
    })
  
    it('renders the posts when posts are available', () => {
      const posts = [
        {
          images: [{ url: 'https://example.com/image1.jpg' }],
          creator: [{ first_name: 'John', last_name: 'Doe', avatar: 'https://example.com/avatar1.jpg' }],
          content: 'This is a test post'
        }
      ]
      const wrapper = mount(PostSlider, {
        props: {
          posts
        }
      })
      expect(wrapper.find('.bg-white').exists()).toBe(true)
      expect(wrapper.find('img[alt="Post Image"]').exists()).toBe(true)
      expect(wrapper.find('img[alt="Avatar"]').exists()).toBe(true)
      expect(wrapper.find('.text-gray-700').text()).toBe('This is a test post')
    })
  
    it('updates the slider position when slideLeft is called', async () => {
      const posts = [
        {
          images: [{ url: 'https://example.com/image1.jpg' }],
          creator: [{ first_name: 'John', last_name: 'Doe', avatar: 'https://example.com/avatar1.jpg' }],
          content: 'This is a test post'
        },
        {
          images: [{ url: 'https://example.com/image2.jpg' }],
          creator: [{ first_name: 'Jane', last_name: 'Doe', avatar: 'https://example.com/avatar2.jpg' }],
          content: 'This is another test post'
        }
      ]
      const wrapper = mount(PostSlider, {
        props: {
          posts
        }
      })
  
      // Set currentIndex to 1
      await wrapper.setData({ currentIndex: 1 })
  
      // Simulate slideLeft
      await wrapper.vm.slideLeft()
  
      // Verify currentIndex and slider position
      expect(wrapper.vm.currentIndex).toBe(0)
      const slider = wrapper.find('.flex')
      expect(slider.element.style.transform).toBe('translateX(0px)')
    })
  
    it('updates the slider position when slideRight is called', async () => {
      const posts = [
        {
          images: [{ url: 'https://example.com/image1.jpg' }],
          creator: [{ first_name: 'John', last_name: 'Doe', avatar: 'https://example.com/avatar1.jpg' }],
          content: 'This is a test post'
        },
        {
          images: [{ url: 'https://example.com/image2.jpg' }],
          creator: [{ first_name: 'Jane', last_name: 'Doe', avatar: 'https://example.com/avatar2.jpg' }],
          content: 'This is another test post'
        }
      ]
      const wrapper = mount(PostSlider, {
        props: {
          posts
        }
      })
  
      // Simulate slideRight
      await wrapper.vm.slideRight()
  
      // Verify currentIndex and slider position
      expect(wrapper.vm.currentIndex).toBe(1)
      const slider = wrapper.find('.flex')
      expect(slider.element.style.transform).toBe('translateX(-400px)')
    })
  
    it('handles image errors by setting a fallback image', async () => {
      const posts = [
        {
          images: [{ url: 'https://example.com/image1.jpg' }],
          creator: [{ first_name: 'John', last_name: 'Doe', avatar: 'https://example.com/avatar1.jpg' }],
          content: 'This is a test post'
        }
      ]
      const wrapper = mount(PostSlider, {
        props: {
          posts
        }
      })
  
      // Simulate an image error
      const avatarImage = wrapper.find('img[alt="Avatar"]')
      await avatarImage.trigger('error')
  
      // Verify the fallback image is set
      expect(avatarImage.attributes('src')).toBe('/assets/images/Community/profile.png')
    })
  })