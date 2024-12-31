import TopProfileShimmer from "../TopProfileShimmer.vue";
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';


describe('ProfileShimmer.vue', () => {
    it('renders the component correctly', () => {
      const wrapper = mount(TopProfileShimmer);
  
      // Check if the component exists
      expect(wrapper.exists()).toBe(true);
  
      // Check if the shimmer elements are rendered
      const shimmerAvatar = wrapper.find('.shimmer-avatar');
      const shimmerName = wrapper.find('.shimmer-name');
      const shimmerInfo = wrapper.find('.shimmer-info');
  
      expect(shimmerAvatar.exists()).toBe(true);
      expect(shimmerName.exists()).toBe(true);
      expect(shimmerInfo.exists()).toBe(true);
    });
  
    // it('applies the correct styles to the shimmer elements', () => {
    //   const wrapper = mount(TopProfileShimmer);
  
    //   // Check the styles of the shimmer avatar
    //   const shimmerAvatar = wrapper.find('.shimmer-avatar');
    //   expect(shimmerAvatar.attributes('style')).toContain('background: linear-gradient');
    //   expect(shimmerAvatar.attributes('style')).toContain('animation: shimmer 2s infinite linear');
  
    //   // Check the styles of the shimmer name
    //   const shimmerName = wrapper.find('.shimmer-name');
    //   expect(shimmerName.attributes('style')).toContain('background: linear-gradient');
    //   expect(shimmerName.attributes('style')).toContain('animation: shimmer 2s infinite linear');
  
    //   // Check the styles of the shimmer info
    //   const shimmerInfo = wrapper.find('.shimmer-info');
    //   expect(shimmerInfo.attributes('style')).toContain('background: linear-gradient');
    //   expect(shimmerInfo.attributes('style')).toContain('animation: shimmer 2s infinite linear');
    // });
  
    it('has the correct structure', () => {
      const wrapper = mount(TopProfileShimmer);
  
      // Check the structure of the component
      expect(wrapper.find('.profile-shimmer').exists()).toBe(true);
      expect(wrapper.find('.shimmer-avatar').exists()).toBe(true);
      expect(wrapper.find('.shimmer-name').exists()).toBe(true);
      expect(wrapper.find('.shimmer-info').exists()).toBe(true);
    });
  });