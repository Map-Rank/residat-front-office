import { it, expect, describe } from 'vitest';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import { mount } from '@vue/test-utils';

describe('BaseDropdown', () => {


  it('emits the selected option when changed', () => {
    const options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' }
    ];
    
    const wrapper = mount(BaseDropdown, {
      propsData: {
        options
      }
    });

    // Simulate changing the selected option
    const selectElement = wrapper.find('select');
    selectElement.trigger('change');

    // Check if the correct events are emitted with the selected option and its id
    expect(wrapper.emitted().input).toEqual([[options[0]]]);
    expect(wrapper.emitted().functionIdParams).toEqual([[options[0].id]]);
    expect(wrapper.emitted().selectedOptionId).toEqual([[options[0].id]]);
  });

  // Add more tests as per your requirements
});
