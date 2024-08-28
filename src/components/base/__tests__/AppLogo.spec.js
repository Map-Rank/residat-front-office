import { shallowMount } from '@vue/test-utils';
import AppLogo from '@/components/base/AppLogo.vue';
import { describe, it, expect } from 'vitest';

describe('AppLogo.vue', () => {
  it('renders the white logo when isWhite is true', () => {
    const wrapper = shallowMount(AppLogo, {
      props: { isWhite: true }
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/src/assets/images/Logos/logo-small-white.svg');
    expect(img.attributes('alt')).toBe('Logo');
  });

  it('renders the default logo when isWhite is false', () => {
    const wrapper = shallowMount(AppLogo, {
      props: { isWhite: false }
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/src/assets/images/Logos/logo-small.svg');
    expect(img.attributes('alt')).toBe('Logo');
  });

 
});
