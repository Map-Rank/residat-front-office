import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ImagePreviewGallery from '@/components/gallery/ImagePreviewGallery/index.vue';

describe('ImagePreviewGallery Component', () => {
  const createComponent = (propsData) => {
    return mount(ImagePreviewGallery, { propsData });
  };

  it('renders one image correctly', () => {
    const wrapper = createComponent({ Images: [{ src: 'image1.jpg', alt: 'Image 1' }] });
    expect(wrapper.findAll('img').length).toBe(1);
    expect(wrapper.find('.delete-icon').exists()).toBe(true);
  });

  it('renders two images side by side', () => {
    const wrapper = createComponent({
      Images: [{ src: 'image1.jpg', alt: 'Image 1' }, { src: 'image2.jpg', alt: 'Image 2' }],
    });
    expect(wrapper.findAll('img').length).toBe(2);
    expect(wrapper.findAll('.delete-icon').length).toBe(2);
  });

  it('emits removeImage event when delete button is clicked', async () => {
    const wrapper = createComponent({ Images: [{ src: 'image1.jpg', alt: 'Image 1' }] });
    await wrapper.find('.delete-icon').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('removeImage');
  });

  it('emits customFunction on click', async () => {
    const wrapper = createComponent({ Images: [{ src: 'image1.jpg', alt: 'Image 1' }] });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('customFunction');
  });

  // Add more tests for scenarios with ImagesFromHostToPreview and for calculateFlexBasis methods
});
