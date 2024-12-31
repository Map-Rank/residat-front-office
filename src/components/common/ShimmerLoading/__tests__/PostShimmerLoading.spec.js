import PostShimmerLoading from "../PostShimmerLoading.vue";
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';


describe('PostShimmerLoading.vue', () => {
    it('renders the component correctly', () => {
      const wrapper = mount(PostShimmerLoading);
      expect(wrapper.exists()).toBe(true);
    });
  
    it('renders the correct number of shimmer posts based on the numPost prop', () => {
      const numPost = 5;
      const wrapper = mount(PostShimmerLoading, {
        props: {
          numPost,
        },
      });
  
      const shimmerPosts = wrapper.findAll('.shimmer-loading');
      expect(shimmerPosts.length).toBe(numPost);
    });
  
    it('renders the default number of shimmer posts when numPost prop is not provided', () => {
      const wrapper = mount(PostShimmerLoading);
      const shimmerPosts = wrapper.findAll('.shimmer-loading');
      expect(shimmerPosts.length).toBe(3); // Default value is 3
    });
  
    it('renders the shimmer avatar in each post', () => {
      const wrapper = mount(PostShimmerLoading);
      const shimmerAvatars = wrapper.findAll('.shimmer-avatar');
      expect(shimmerAvatars.length).toBe(3); // Default number of posts
      shimmerAvatars.forEach((avatar) => {
        expect(avatar.exists()).toBe(true);
        expect(avatar.classes()).toContain('shimmer-avatar');
        expect(avatar.classes()).toContain('shimmer');
      });
    });
  
    it('renders the shimmer lines in each post', () => {
      const wrapper = mount(PostShimmerLoading);
      const shimmerLines = wrapper.findAll('.shimmer-line');
      expect(shimmerLines.length).toBe(6); // 2 lines per post, default 3 posts
      shimmerLines.forEach((line) => {
        expect(line.exists()).toBe(true);
        expect(line.classes()).toContain('shimmer-line');
        expect(line.classes()).toContain('shimmer');
      });
    });
  
    it('renders the shimmer image in each post', () => {
      const wrapper = mount(PostShimmerLoading);
      const shimmerImages = wrapper.findAll('.shimmer-image');
      expect(shimmerImages.length).toBe(3); // Default number of posts
      shimmerImages.forEach((image) => {
        expect(image.exists()).toBe(true);
        expect(image.classes()).toContain('shimmer-image');
        expect(image.classes()).toContain('shimmer');
      });
    });
  
    it('renders the shimmer circles in each post', () => {
      const wrapper = mount(PostShimmerLoading);
      const shimmerCircles = wrapper.findAll('.shimmer-circle');
      expect(shimmerCircles.length).toBe(9); // 3 circles per post, default 3 posts
      shimmerCircles.forEach((circle) => {
        expect(circle.exists()).toBe(true);
        expect(circle.classes()).toContain('shimmer-circle');
        expect(circle.classes()).toContain('shimmer');
      });
    });
  
    it('applies the shimmer animation to all shimmer elements', () => {
      const wrapper = mount(PostShimmerLoading);
      const shimmerElements = wrapper.findAll('.shimmer');
      expect(shimmerElements.length).toBeGreaterThan(0);
      shimmerElements.forEach((element) => {
        expect(element.classes()).toContain('shimmer');
      });
    });
  });