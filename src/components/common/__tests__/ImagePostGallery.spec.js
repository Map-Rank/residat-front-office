import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ImagePostGallery from '@/components/gallery/ImagePostGallery/index.vue';

describe('ImagePostGallery Component', () => {
  const createComponent = (propsData) => {
    return mount(ImagePostGallery, { propsData });
  };

  it('renders one image correctly', () => {
    const wrapper = createComponent({ Images: [{ url: 'image1.jpg', alt: 'Image 1' }] });
    expect(wrapper.findAll('img').length).toBe(1);
  });

  it('renders two images side by side', () => {
    const wrapper = createComponent({
      Images: [{ url: 'image1.jpg', alt: 'Image 1' }, { url: 'image2.jpg', alt: 'Image 2' }],
    });
    expect(wrapper.findAll('img').length).toBe(2);
  });

  it('renders more than two images with correct flex basis', () => {
    const wrapper = createComponent({
      Images: [
        { url: 'image1.jpg', alt: 'Image 1' },
        { url: 'image2.jpg', alt: 'Image 2' },
        { url: 'image3.jpg', alt: 'Image 3' },
        { url: 'image4.jpg', alt: 'Image 4' },
      ],
    });
    expect(wrapper.findAll('img').length).toBe(3);
    const thirdImage = wrapper.findAll('img')[2];
    expect(thirdImage.attributes('style')).toContain('flex-basis');
  });

  it('emits customFunction on click', async () => {
    const wrapper = createComponent({
      Images: [{ url: 'image1.jpg', alt: 'Image 1' }],
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('customFunction');
  });
  
  // Add additional tests if needed
});
