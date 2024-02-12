import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount,flushPromises } from '@vue/test-utils';
import CreatePost from '@/features/CreatePost/CreatePost.vue';
import BaseImagePicker from '@/components/base/BaseImagePicker.vue';
import ImagePreviewGallery from '@/components/gallery/ImagePreviewGallery/index.vue';
import PostSpecificInformation from '@/features/CreatePost/components/PostSpecificInformation.vue';
import TopContentForm from '@/features/CreatePost/components/TopContentForm.vue';
import AlertForm from '@/components/common/AlertFrom/AlertForm.vue';
import { createPost, updatePost } from '@/features/Post/services/postService.js';
import { createPinia, setActivePinia } from 'pinia';



// Mocking stores
vi.mock('@/stores/sectorStore', () => ({
  default: vi.fn(() => ({
    getAllSectors: vi.fn(),
  })),
}));

vi.mock('@/stores/postStore', () => ({
  default: vi.fn(() => ({
    contentFromPostInput: '',
    postToEdit: null,
  })),
}));

vi.mock('@/stores/alertStore', () => ({
  default: vi.fn(() => ({
    setAlert: vi.fn(),
  })),
}));

// Mocking services
vi.mock('@/features/Post/services/postService', () => ({
  createPost: vi.fn(),
  updatePost: vi.fn(),
}));


// Mock URL.createObjectURL
// eslint-disable-next-line no-undef
global.URL.createObjectURL = vi.fn((file) => `mockImageUrl/${file.name}`);

describe('CreatePost Component', () => {
  let wrapper;
  let pinia;
  let submitPostSpy;
  beforeEach(() => {
    
    pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(CreatePost, {
      global: {
        stubs: {
          AlertForm,
          PostSpecificInformation,
          TopContentForm,
          ImagePreviewGallery,
          BaseImagePicker,
        },
      },
    });

    submitPostSpy = vi.spyOn(CreatePost.methods, 'submitPost')

  });

  it('initializes with default data', () => {
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.isEditing).toBe(false);
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

  //TODO TEST

  // it('submits post', async () => {
  //   wrapper.vm.formData.content = 'Test content';
  //   wrapper.vm.zoneId = '1';
    
  //   expect(wrapper.vm.isLoading).toBe(false)
  //   const submitBtn = wrapper.find('button')

  //  await  submitBtn.trigger('click')
  //   await wrapper.vm.$nextTick();

  //   expect(submitPostSpy).toHaveBeenCalled();
  // });

  // it('updates post', async () => {

  //   wrapper.setData({ isEditing: true });
  //   wrapper.vm.formData.content = 'Test content';
  //   wrapper.vm.zoneId = '1';
  //   // await wrapper.vm.submitPost();
  //   expect(submitPostSpy).toHaveBeenCalled()
  //   expect(updatePost).toHaveBeenCalled();
  // });

  // it('calls createPost on form submission', async () => {
  //   // Setup mock data for form submission
  //   wrapper.vm.formData.content = 'Test content';
  //   wrapper.vm.formData.zoneId = '1';
  //   wrapper.vm.formData.sectorChecked = ['sector1'];

  //   await wrapper.find('form').trigger('submit.prevent');

  //   // Check if createPost method was called
  //   expect(createPost).toHaveBeenCalled();
  // });

  // Add more tests as needed
});
