import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AvatarPostShimmer from '../AvatarPostShimmer.vue';

describe('AvatarPostShimmer.vue', () => {
    it('renders the correct number of shimmer placeholders', () => {
      const numShimmers = 5;
      const wrapper = mount(AvatarPostShimmer, {
        props: {
          numShimmers,
        },
      });
  
      // Check that the correct number of shimmer placeholders is rendered
      const shimmerCards = wrapper.findAll('.shimmer-card');
      expect(shimmerCards.length).toBe(numShimmers);
    });
  
    it('renders the default number of shimmer placeholders when no prop is provided', () => {
      const wrapper = mount(AvatarPostShimmer);
  
      // Check that the default number of shimmer placeholders is rendered
      const shimmerCards = wrapper.findAll('.shimmer-card');
      expect(shimmerCards.length).toBe(3); // Default is 3
    });
  
    it('applies the correct component height', () => {
      const componentHeight = '200px';
      const wrapper = mount(AvatarPostShimmer, {
        props: {
          componentHeight,
        },
      });
  
      // Check that the component height is applied correctly
      const avatarShimmer = wrapper.find('.avatar_post-shimmer');
      expect(avatarShimmer.attributes('style')).toContain(`height: ${componentHeight}`);
    });
  
    it('applies the default component height when no prop is provided', () => {
      const wrapper = mount(AvatarPostShimmer);
  
      // Check that the default component height is applied
      const avatarShimmer = wrapper.find('.avatar_post-shimmer');
      expect(avatarShimmer.attributes('style')).toContain('height: auto'); // Default is 'auto'
    });
  
    it('renders shimmer avatars and content correctly', () => {
      const wrapper = mount(AvatarPostShimmer);
  
      // Check that shimmer avatars and content are rendered
      const shimmerAvatars = wrapper.findAll('.shimmer-avatar');
      const shimmerContents = wrapper.findAll('.shimmer-content');
  
      expect(shimmerAvatars.length).toBe(3); // Default is 3
      expect(shimmerContents.length).toBe(3); // Default is 3
  
      // Check that each shimmer content has two shimmer lines
      shimmerContents.forEach((content) => {
        const shimmerLines = content.findAll('.shimmer-line');
        expect(shimmerLines.length).toBe(2);
      });
    });
  });