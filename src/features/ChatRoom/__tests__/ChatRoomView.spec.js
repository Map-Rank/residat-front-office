import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatRoomView from '@/features/ChatRoom/ChatRoomView.vue'
import UnderConstruction from '@/components/common/Pages/UnderConstruction.vue'

// Mock the UnderConstruction component

describe('ChatRoomView Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ChatRoomView, {
      props: { UnderConstruction }
    })
  })
  it('renders UnderConstruction component', () => {
    const underConstruction = wrapper.findComponent(UnderConstruction)

    expect(underConstruction.exists()).toBe(true)
  })
})
