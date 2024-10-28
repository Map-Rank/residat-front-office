import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import ImageSlider from '@/components/gallery/ImageSlider.vue';

describe('ImageSlider.vue', () => {
  let wrapper;
  const mockImages = [
    { url: 'https://example.com/image1.jpg' },
    { url: 'https://example.com/image2.jpg' },
    { url: 'https://example.com/image3.jpg' },
  ];

  beforeEach(() => {
    wrapper = mount(ImageSlider, {
      props: {
        images: mockImages,
      },
    });
  });

  it('renders correctly with the first image', () => {
    expect(wrapper.find('.slider-image').exists()).toBe(true);
    expect(wrapper.find('.slider-image').attributes('src')).toBe(mockImages[0].url);
  });

  it('displays the next image when the "next" button is clicked', async () => {
    expect(wrapper.vm.currentIndex).toBe(0);

    // Simulate clicking the "next" button
    await wrapper.find('.next').trigger('click');

    expect(wrapper.vm.currentIndex).toBe(1);
    expect(wrapper.find('.slider-image').attributes('src')).toBe(mockImages[1].url);
  });

  it('displays the previous image when the "prev" button is clicked', async () => {
    // Set the current index to the second image
    wrapper.setData({ currentIndex: 1 });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentIndex).toBe(1);

    // Simulate clicking the "prev" button
    await wrapper.find('.prev').trigger('click');

    expect(wrapper.vm.currentIndex).toBe(0);
    expect(wrapper.find('.slider-image').attributes('src')).toBe(mockImages[0].url);
  });

  it('loops back to the first image after reaching the last image', async () => {
    // Set the current index to the last image
    wrapper.setData({ currentIndex: mockImages.length - 1 });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentIndex).toBe(2);

    // Simulate clicking the "next" button
    await wrapper.find('.next').trigger('click');

    expect(wrapper.vm.currentIndex).toBe(0); // Loop back to the first image
    expect(wrapper.find('.slider-image').attributes('src')).toBe(mockImages[0].url);
  });

  it('loops back to the last image when "prev" is clicked on the first image', async () => {
    expect(wrapper.vm.currentIndex).toBe(0);

    // Simulate clicking the "prev" button
    await wrapper.find('.prev').trigger('click');

    expect(wrapper.vm.currentIndex).toBe(mockImages.length - 1); // Loop back to the last image
    expect(wrapper.find('.slider-image').attributes('src')).toBe(mockImages[mockImages.length - 1].url);
  });

  it('displays the skeleton loader while an image is loading', async () => {
    // Simulate image loading
    wrapper.setData({ isLoading: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.skeleton-loader').exists()).toBe(true);
    expect(wrapper.find('.slider-image').exists()).toBe(false);

    // Simulate image load complete
    wrapper.setData({ isLoading: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.skeleton-loader').exists()).toBe(false);
    expect(wrapper.find('.slider-image').exists()).toBe(true);
  });

  it('computes hasMultipleImages correctly', () => {
    // When there are multiple images
    expect(wrapper.vm.hasMultipleImages).toBe(true);

    // When there is only one image
    wrapper = mount(ImageSlider, {
      props: {
        images: [{ url: 'https://example.com/single-image.jpg' }],
      },
    });

    expect(wrapper.vm.hasMultipleImages).toBe(false);
  });

  it('displays navigation buttons when there are multiple images', () => {
    expect(wrapper.find('.prev').exists()).toBe(true);
    expect(wrapper.find('.next').exists()).toBe(true);
  });

  it('hides navigation buttons when there is only one image', () => {
    wrapper = mount(ImageSlider, {
      props: {
        images: [{ url: 'https://example.com/single-image.jpg' }],
      },
    });

    expect(wrapper.find('.prev').exists()).toBe(false);
    expect(wrapper.find('.next').exists()).toBe(false);
  });
});
