import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AvatarPlaceholder from '../AvatarPlaceholder/AvatarPlaceholder.vue'



describe('AvatarPlaceholder Unit Test ',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = mount(AvatarPlaceholder,{
            props:{
                username:'user name',
            }
        })
    })

    it('render user name correctly',()=>{
        expect(wrapper.text()).toContain('UN')
    })

    it('it render correct styling',()=>{
        const avatarStyle = wrapper.attributes('style')
        expect(avatarStyle).toContain('color')
        expect(avatarStyle).toContain('background-color')
    })
})