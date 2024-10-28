import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShowPost from '@/components/common/ShowPost/index.vue';
import { getSpecificPost, commentPost } from '@/features/Post/services/postService';
import { createTestingPinia } from '@pinia/testing';

vi.mock('@/features/Post/services/postService', () => ({
    getSpecificPost: vi.fn(),
    commentPost: vi.fn(),
  }));
  
  describe('ShowPost.vue', () => {
    let wrapper;
    const mockPost = {
      id: 1,
      images: [{ url: 'image1.jpg' }, { url: 'image2.jpg' }],
      comments: [{ text: 'Great post!' }, { text: 'Thanks for sharing!' }],
    };
  
    beforeEach(async () => {
      getSpecificPost.mockResolvedValue(mockPost);
  
      wrapper = shallowMount(ShowPost, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn, // This is the key to avoid the error
            }),
          ],
          mocks: {
            $route: {
              params: { id: 1 },
            },
            $router: {
              go: vi.fn(),
              push: vi.fn(),
            },
          },
        },
      });
  
      await wrapper.vm.$nextTick(); // Wait for the component to finish mounting
    });
  
    it('renders the component correctly', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.info').exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'ImageSlider' }).exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'UserInfoPostDetails' }).exists()).toBe(true);
      expect(wrapper.findAllComponents({ name: 'CommentInfoBox' })).toHaveLength(mockPost.comments.length);
    });
  
 
  
    it('submits a comment and updates the post', async () => {
      wrapper.vm.commentText = 'New Comment';
      await wrapper.vm.commentPost();
  
      expect(commentPost).toHaveBeenCalledWith(1, { text: 'New Comment' });
      expect(getSpecificPost).toHaveBeenCalledWith(1);
      expect(wrapper.vm.commentText).toBe('');
      expect(wrapper.vm.loading).toBe(false);
    });
  
    it('shows a loading indicator when a comment is being submitted', async () => {
      wrapper.vm.loading = true;
      await wrapper.vm.$nextTick();
  
      expect(wrapper.findComponent({ name: 'LoadingIndicator' }).exists()).toBe(true);
    });
    it('display post images ', async () => {
   
  
      expect(wrapper.findComponent({ name: 'ImageSlider' }).exists()).toBe(true);
    });
  });