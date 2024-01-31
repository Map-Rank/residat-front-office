import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import SearchResult from '@/features/Search/SearchResult.vue'
import PostComponent from '@/features/Post/index.vue'
import NoSearchResult from '@/components/common/Pages/NoSearchResult.vue'
import SectionTitle from '@/components/base/SectionTitle.vue'
import { getPostsByZone } from '@/features/Post/services/postService.js'

vi.mock('@/features/Post/services/postService', () => ({
  getPostsByZone: vi.fn(() =>
    Promise.resolve([
      {
        id: 1882,
        creator: [
          {
            id: 1,
            first_name: 'users 1',
            last_name: 'last name 1',
            code: null,
            email: 'user@user.com',
            phone: '237698803158',
            address: null,
            date_of_birth: '1996-03-12',
            gender: 'male',
            zone_id: '1',
            active: '1',
            verified: '1',
            activated_at: '2023-12-27 14:19:42',
            email_verified_at: '2023-12-27T14:19:42.000000Z',
            created_at: '2023-12-27T14:19:42.000000Z',
            updated_at: '2023-12-27T14:19:42.000000Z'
          }
        ]
      },
      {
        id: 1882,
        creator: [
          {
            id: 1,
            first_name: 'users 1',
            last_name: 'last name 1',
            code: null,
            email: 'user@user.com',
            phone: '237698803158',
            address: null,
            date_of_birth: '1996-03-12',
            gender: 'male',
            zone_id: '1',
            active: '1',
            verified: '1',
            activated_at: '2023-12-27 14:19:42',
            email_verified_at: '2023-12-27T14:19:42.000000Z',
            created_at: '2023-12-27T14:19:42.000000Z',
            updated_at: '2023-12-27T14:19:42.000000Z'
          }
        ]
      },
      {
        id: 1882,
        creator: [
          {
            id: 1,
            first_name: 'users 1',
            last_name: 'last name 1',
            code: null,
            email: 'user@user.com',
            phone: '237698803158',
            address: null,
            date_of_birth: '1996-03-12',
            gender: 'male',
            zone_id: '1',
            active: '1',
            verified: '1',
            activated_at: '2023-12-27 14:19:42',
            email_verified_at: '2023-12-27T14:19:42.000000Z',
            created_at: '2023-12-27T14:19:42.000000Z',
            updated_at: '2023-12-27T14:19:42.000000Z'
          }
        ]
      }
    ])
  )
}))

describe('SearchResult Component', () => {
  let wrapper
  let fetchPosts

  beforeEach(() => {
    wrapper = mount(SearchResult, {
      props: { id: '1' },
      data() {
        return {
          topLoading: false,
          bottomLoading: false
        }
      },
      stubs: {
        PostComponent
      }
    })

    fetchPosts = vi.spyOn(SearchResult.methods, 'fetchPosts')
    wrapper.vm.$options.created.call(wrapper.vm)
  })

  it('fetch post', async () => {
    const wrapper = mount(SearchResult, {
      props: {
        id: '2'
      }
    })

    expect(wrapper.vm.topLoading).toBe(true)

    await flushPromises()
    expect(fetchPosts).toHaveBeenCalled()

    expect(wrapper.vm.topLoading).toBe(false)

    expect(wrapper.vm.filteredPosts.length).toBeGreaterThan(1)
  })

  it('renders SectionTitle', () => {
    expect(wrapper.findComponent(SectionTitle).exists()).toBe(true)
  })

  it('renders NoSearchResult when no posts are found', async () => {
    getPostsByZone.mockResolvedValueOnce([])
    await wrapper.vm.fetchPosts()
    expect(wrapper.findComponent(NoSearchResult).exists()).toBe(true)
  })

  //TODO TEST

  // it('renders PostComponent for each post', async () => {
  //   const fetchPosts = vi.spyOn(SearchResult.methods, 'fetchPosts')

  //   const wrapper = mount(SearchResult, {
  //     props: {
  //       id: '2'
  //     }
  //   })

  //   // await flushPromises()
  //   expect(wrapper.vm.topLoading).toBe(false)
  //   expect(fetchPosts).toHaveBeenCalled()
  //   expect(wrapper.findComponent(PostComponent).exists()).toBe(true)
  //   // expect(wrapper.findAllComponents(PostComponent).length).toBeGreaterThan(2)
  // })
})
