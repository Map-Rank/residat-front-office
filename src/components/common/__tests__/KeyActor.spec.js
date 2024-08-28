import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import KeyActors from '@/components/common/KeyActors/KeyActor.vue';;

describe('KeyActors.vue', () => {
  let wrapper;
  const actors = [
    { id: 1, name: 'Actor 1', logoUrl: '/img/actor1.jpg' },
    { id: 2, name: 'Actor 2', logoUrl: '/img/actor2.jpg' },
    { id: 3, name: 'Actor 3', logoUrl: '/img/actor3.jpg' },
    { id: 4, name: 'Actor 4', logoUrl: '/img/actor4.jpg' },
  ];

  beforeEach(() => {
    wrapper = shallowMount(KeyActors, {
      props: {
        actors,
        showAll: false,
      },
    });
  });

  it('renders the correct number of actors when showAll is false', () => {
    expect(wrapper.findAll('.text-lg').length).toBe(3);
  });

  it('renders all actors when showAll is true', async () => {
    await wrapper.setProps({ showAll: true });
    expect(wrapper.findAll('.text-lg').length).toBe(actors.length);
  });




  it('clears interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    wrapper.unmount();
    expect(clearIntervalSpy).toHaveBeenCalledWith(wrapper.vm.interval);
  });
});
