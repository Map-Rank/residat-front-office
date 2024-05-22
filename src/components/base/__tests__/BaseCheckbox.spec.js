import { mount } from '@vue/test-utils';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import { it, expect, describe, beforeEach } from 'vitest';

describe('BaseCheckbox', () => {
  let $route;

  beforeEach(() => {
    // Mocking the $route object
    $route = {
      params: {
        sectorId: '1,2,3', // Example value
      },
    };
  });

  it('accepts its props', () => {
    const list = { id: 1, name: 'test', value: 'testValue' };
    const wrapper = mount(BaseCheckbox, {
      props: { list },
      global: {
        mocks: {
          $route,
        },
      },
    });

    const inputElement = wrapper.find('input[type="checkbox"]');
    expect(inputElement.attributes('id')).toBe(list.name);
  });

  // it('emits change event with correct payload', async () => {
  //   const list = { id: 1, name: 'test', value: 'testValue' };
  //   const wrapper = mount(BaseCheckbox, {
  //     props: { list },
  //     global: {
  //       mocks: {
  //         $route,
  //       },
  //     },
  //   });

  //   const inputElement = wrapper.find('input[type="checkbox"]');
  //   await inputElement.setChecked(); // This should trigger the change event

  //   // Debugging output
  //   console.log('emitted events:', wrapper.emitted());

  //   expect(wrapper.emitted()).toHaveProperty('change');
  //   const emittedChange = wrapper.emitted('change');
  //   expect(emittedChange[0]).toEqual([{ list: list, checked: true }]);
  // });

  it('binds the checked value to the v-model', async () => {
    const list = { id: 1, name: 'test', value: 'testValue' };
    const wrapper = mount(BaseCheckbox, {
      props: { list },
      global: {
        mocks: {
          $route,
        },
      },
    });

    const inputElement = wrapper.find('input[type="checkbox"]');
    await inputElement.setChecked();

    expect(wrapper.vm.checked).toBe(true);
  });
});
