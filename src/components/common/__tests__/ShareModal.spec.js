import { beforeEach,  it,vi, expect, describe} from 'vitest'
import {mount} from '@vue/test-utils'
import ShareModal from '../ShareModal/ShareModal.vue'


describe('ShareModal Unit Test', () => {

    let wrapper 
    const   props ={
        showModal:true,
        postLink:'https://..',
        message:'modal Message'
    }
    beforeEach(() => {
        wrapper = mount(ShareModal,{
          props
        })
    })

    it('renders when showModal is true', () => {
        expect(wrapper.isVisible()).toBe(true);
      });
    
      it('does not render when showModal is false', async () => {
        await wrapper.setProps({ showModal: false });
        expect(wrapper.isVisible()).toBe(false);
      });


    it('render postLink and message',()=>{
        expect(wrapper.text()).toContain('https://..')
    })

    it('encodes the postLink and message for sharing URLs', () => {
        const encodedPostLink = encodeURIComponent(props.postLink);
        const encodedMessage = encodeURIComponent(props.message);
        expect(wrapper.html()).toContain(encodedPostLink);
        expect(wrapper.html()).toContain(encodedMessage);
      });
    
      it('calls copyToClipboard method when Copy Link button is clicked', async () => {

        wrapper.vm.copyToClipboard = vi.fn();
        await wrapper.find('button[ @click="copyToClipboard"]').trigger('click');
        expect(wrapper.vm.copyToClipboard).toHaveBeenCalledTimes(1);
      });
    
      it('emits close event when Close button is clicked', async () => {
        await wrapper.find('button[ @click="closeModal"]').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('close');
      });
    
})