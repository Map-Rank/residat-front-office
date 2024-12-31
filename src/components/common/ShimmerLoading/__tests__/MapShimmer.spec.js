import MapShimmer from "../MapShimmer.vue";
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';


describe('MapShimmer.vue', () => {
    it('renders the component correctly', () => {
      const wrapper = mount(MapShimmer);
      expect(wrapper.exists()).toBe(true);
    });
  
    it('displays the "Loading Map..." text', () => {
      const wrapper = mount(MapShimmer);
      const loadingText = wrapper.find('.shimmer-map p');
      expect(loadingText.exists()).toBe(true);
      expect(loadingText.text()).toBe('Loading Map...');
    });
  
    it('applies the shimmer animation to the map container', () => {
      const wrapper = mount(MapShimmer);
      const shimmerMap = wrapper.find('.shimmer-map');
      expect(shimmerMap.exists()).toBe(true);
      expect(shimmerMap.classes()).toContain('shimmer-map');
    });
  
    it('renders the legend container', () => {
      const wrapper = mount(MapShimmer);
      const shimmerLegend = wrapper.find('.shimmer-legend');
      expect(shimmerLegend.exists()).toBe(true);
    });
  
    it('accepts the legendItems prop', () => {
      const legendItems = 5;
      const wrapper = mount(MapShimmer, {
        props: {
          legendItems,
        },
      });
  
      // Verify the prop is passed correctly
      expect(wrapper.props('legendItems')).toBe(legendItems);
    });
  });