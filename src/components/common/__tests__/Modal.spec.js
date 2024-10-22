import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Modal from '@/components/common/Modal/Modal.vue'; // Adjust the path as needed
import { ChartItemData } from '@/constants/chartData.js';

describe('Modal.vue', () => {
  let wrapper;

  const createComponent = (propsData = {}) => {
    return shallowMount(Modal, {
      props: {
        label: '',
        component: {},
        ...propsData
      }
    });
  };

  beforeEach(() => {
    wrapper = createComponent();
  });

  it('renders correctly when health label is passed', async () => {
    wrapper.setProps({ label: ChartItemData.health });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'Health' }).exists()).toBe(true);
  });

  it('renders correctly when agriculture label is passed', async () => {
    wrapper.setProps({ label: ChartItemData.agriculture });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'agricultural' }).exists()).toBe(true);
  });

  it('renders correctly when infrastructure label is passed', async () => {
    wrapper.setProps({ label: ChartItemData.infrastructure });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'infrastructure' }).exists()).toBe(true);
  });

  it('renders correctly when social label is passed', async () => {
    wrapper.setProps({ label: ChartItemData.social });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'social' }).exists()).toBe(true);
  });

  it('renders correctly when foodSecurity label is passed', async () => {
    wrapper.setProps({ label: ChartItemData.foodSecurity });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'foodSecurity' }).exists()).toBe(true);
  });

  it('renders correctly when migration label is passed', async () => {
    wrapper.setProps({ label: ChartItemData.migration });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'migration' }).exists()).toBe(true);
  });

  it('renders correctly when waterStress label is passed', async () => {
    wrapper.setProps({ label: ChartItemData.waterStress });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'waterStress' }).exists()).toBe(true);
  });

  it('closes the modal when the close button is clicked', async () => {
    wrapper = createComponent();
    await wrapper.vm.$nextTick();
    const closeButton = wrapper.find('.btn-close');
    closeButton.trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
