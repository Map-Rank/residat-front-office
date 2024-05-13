import { mount } from '@vue/test-utils';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { it,expect,describe} from 'vitest';


describe('BaseCheckbox', () => {
  it('accepts its props', () => {
    const list = { name: 'test', value: 'testValue' };
    const wrapper = mount(BaseCheckbox, {
      props: { list }
    });

    const inputElement = wrapper.find('input[type="checkbox"]');
    expect(inputElement.attributes('id')).toBe(list.name);
  });

  it('emits change event with correct payload', async () => {
    const list = { name: 'test', value: 'testValue' };
    const wrapper = mount(BaseCheckbox, {
      props: { list }
    });

    const inputElement = wrapper.find('input[type="checkbox"]');
    await inputElement.setChecked(); // This should trigger the change event

    expect(wrapper.emitted()).toHaveProperty('change');
    const emittedChange = wrapper.emitted('change');
    expect(emittedChange[0]).toEqual([{ list: list, checked: true }]);
  });

  it('binds the checked value to the v-model', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: { list: { name: 'test', value: 'testValue' } }
    });

    const inputElement = wrapper.find('input[type="checkbox"]');
    await inputElement.setChecked();

    expect(wrapper.vm.checked).toBe(true);
  });
});
