import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CreatePost from '@/features/CreatePost/CreatePost.vue';
import BaseImagePicker from '@/components/base/BaseImagePicker.vue';
import ImagePreviewGallery from '@/components/gallery/ImagePreviewGallery/index.vue';
import PostSpecificInformation from '@/features/CreatePost/components/PostSpecificInformation.vue';
import TopContentForm from '@/features/CreatePost/components/TopContentForm.vue';
import AlertForm from '@/components/common/AlertFrom/AlertForm.vue';
import { createPost, updatePost } from '@/features/Post/services/postService.js';

// Mocking dependencies
vi.mock('@/features/CreatePost/components/PostSpecificInformation.vue');
vi.mock('@/features/CreatePost/components/TopContentForm.vue');
vi.mock('@/components/gallery/ImagePreviewGallery/index.vue');
vi.mock('@/components/base/BaseImagePicker.vue');
vi.mock('@/components/common/AlertForm/AlertForm.vue');
vi.mock('../Post/services/postService', () => ({
  createPost: vi.fn().mockResolvedValue({ status: true }),
  updatePost: vi.fn().mockResolvedValue({ status: true })
}));

describe('CreatePost Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CreatePost);
  });

  it('renders child components', () => {
    expect(wrapper.findComponent(BaseImagePicker).exists()).toBe(true);
    expect(wrapper.findComponent(ImagePreviewGallery).exists()).toBe(true);
    expect(wrapper.findComponent(PostSpecificInformation).exists()).toBe(true);
    expect(wrapper.findComponent(TopContentForm).exists()).toBe(true);
    expect(wrapper.findComponent(AlertForm).exists()).toBe(true);
  });

  it('handles image upload', async () => {
    const file = new File([''], 'test-image.png', { type: 'image/png' });
    await wrapper.vm.handleImageUpload([file]);
    expect(wrapper.vm.formData.images.length).toBe(1);
    expect(wrapper.vm.imagesToFromLocalPreview.length).toBe(1);
  });

  it('submits post', async () => {
    wrapper.vm.formData.content = 'Test content';
    wrapper.vm.zoneId = '1';
    await wrapper.vm.submitPost();
    expect(createPost).toHaveBeenCalled();
  });

  it('updates post', async () => {
    wrapper.setData({ isEditing: true });
    wrapper.vm.formData.content = 'Test content';
    wrapper.vm.zoneId = '1';
    await wrapper.vm.submitPost();
    expect(updatePost).toHaveBeenCalled();
  });

  // Additional tests...
});
