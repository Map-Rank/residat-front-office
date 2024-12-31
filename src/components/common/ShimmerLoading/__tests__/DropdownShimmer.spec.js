import DropdownShimmer from "../DropdownShimmer.vue";
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';


describe('DropdownShimmer.vue', () => {
    it('renders the correct number of dropdowns based on the numDropdowns prop', () => {
      const numDropdowns = 5; // Custom number of dropdowns
      const wrapper = mount(DropdownShimmer, {
        props: {
          numDropdowns,
        },
      });
  
      // Verify the number of dropdowns rendered
      const dropdowns = wrapper.findAll('.shimmer-dropdown');
      expect(dropdowns.length).toBe(numDropdowns);
    });
  
    it('renders the default number of dropdowns when numDropdowns prop is not provided', () => {
      const wrapper = mount(DropdownShimmer);
  
      // Verify the default number of dropdowns (default is 3)
      const dropdowns = wrapper.findAll('.shimmer-dropdown');
      expect(dropdowns.length).toBe(3);
    });
  
    it('applies the correct component height based on the componentHeight prop', () => {
      const componentHeight = '200px'; // Custom height
      const wrapper = mount(DropdownShimmer, {
        props: {
          componentHeight,
        },
      });
  
      // Verify the component height
      const dropdownShimmer = wrapper.find('.dropdown-shimmer');
      expect(dropdownShimmer.attributes('style')).toContain(`height: ${componentHeight}`);
    });
  
    it('applies the default component height when componentHeight prop is not provided', () => {
      const wrapper = mount(DropdownShimmer);
  
      // Verify the default component height (default is 'auto')
      const dropdownShimmer = wrapper.find('.dropdown-shimmer');
      expect(dropdownShimmer.attributes('style')).toContain('height: auto');
    });
  
    it('renders shimmer labels and lines for each dropdown', () => {
      const numDropdowns = 3; // Number of dropdowns
      const wrapper = mount(DropdownShimmer, {
        props: {
          numDropdowns,
        },
      });
  
      // Verify shimmer labels and lines for each dropdown
      const dropdowns = wrapper.findAll('.shimmer-dropdown');
      dropdowns.forEach((dropdown) => {
        const label = dropdown.find('.shimmer-label');
        const line = dropdown.find('.shimmer-line');
        expect(label.exists()).toBe(true);
        expect(line.exists()).toBe(true);
      });
    });
  });