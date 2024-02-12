import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FooterApp from '@/components/common/Footer/index.vue';
import AppLink from '@/components/common/Footer/appLink.vue';
import SocialIcon from '@/components/common/Footer/socialIcon.vue';

describe('FooterApp Component', () => {
  const wrapper = mount(FooterApp);

  it('renders the correct number of links', () => {
    const links = wrapper.findAllComponents(AppLink);
    expect(links.length).toBe(4); // Assuming you have 4 links as per your data
  });

  it('renders the correct number of social icons', () => {
    const icons = wrapper.findAllComponents(SocialIcon);
    expect(icons.length).toBe(3); // Based on your imgSrcs data
  });

  it('displays the current year', () => {
    const currentYear = new Date().getFullYear().toString();
    expect(wrapper.text()).toContain(`© ${currentYear} Map and Rank`);
  });

  //TODO correct this image test
//   it('renders logo image correctly', () => {
//     // Adjust the src path as necessary. This assumes the src might need correction
//     const logoImg = wrapper.find('img[src="../../../../public/assets/images/Logos/logo-medium.svg"]');
//     expect(logoImg.exists()).toBe(true);
//   });
});
