import { it, expect, describe } from 'vitest';
import SectionTitle from '@/components/base/SectionTitle.vue';
import { mount } from '@vue/test-utils';

describe('SectionTitle', () => {
  // Mount the component with props
  const wrapper = mount(SectionTitle, {
    props: {
      title: 'Sample Title',
      css: 'custom-class',
    },
  });

  it('renders the component with the provided title', () => {
    // Find the title element and assert its text content
    const titleElement = wrapper.find('.title');
    expect(titleElement).toBeTruthy(); // Check if the title element exists
    expect(titleElement.text()).toBe('Sample Title');
  });

  it('applies the provided CSS class', () => {
    // Check if the component has the custom CSS class applied
    expect(wrapper.classes()).toContain('custom-class');
  });

  it('has default CSS class "bg-secondary-normal"', () => {
    // Check if the component has the default CSS class applied
    expect(wrapper.classes()).toContain('bg-secondary-normal');
  });
});
