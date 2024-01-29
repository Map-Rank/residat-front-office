import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RefreshError from '@/components/common/Pages/RefreshError.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';

describe('RefreshError Component', () => {
  const props = {
    errorMessage: "Something went wrong.",
    imageUrl: "/path/to/error-image.jpg"
  };

  it('renders the errorMessage and imageUrl props correctly', () => {
    const wrapper = mount(RefreshError, {
      props,
      global: {
        stubs: { ButtonUi } // Optionally stub ButtonUi if it's complex or you want to isolate the test
      }
    });

    expect(wrapper.find('p').text()).toContain(props.errorMessage);
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(props.imageUrl);
  });

  it('emits the refreshPage event when the Refresh Page button is clicked', async () => {
    const wrapper = mount(RefreshError, {
      props,
      global: {
        components: { ButtonUi } // Use real ButtonUi for direct interaction
      }
    });

    await wrapper.findComponent(ButtonUi).vm.$emit('clickButton');
    expect(wrapper.emitted()).toHaveProperty('refreshPage');
  });
});
