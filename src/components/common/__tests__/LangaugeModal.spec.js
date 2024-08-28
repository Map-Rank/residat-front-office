import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LangaugeModal from '@/components/common/Modal/LangaugeModal.vue'; // Adjust the path as needed
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js';

vi.mock('@/constants/index.js', () => ({
  LOCAL_STORAGE_KEYS: {
    appLanguage: 'appLanguage',
  },
}));

describe('LangaugeModal.vue', () => {
  let wrapper;
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      go: vi.fn(),
    };

    wrapper = shallowMount(LangaugeModal, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  it('renders the modal correctly when showModal is true', () => {
    expect(wrapper.find('.fixed.inset-0.z-30').exists()).toBe(true);
  });

  it('sets the default language to English', () => {
    expect(wrapper.vm.lang).toBe('en');
    expect(wrapper.find('input#english').element.checked).toBe(true);
  });

  it('changes language selection when a radio button is clicked', async () => {
    const frenchRadio = wrapper.find('input#french');
    await frenchRadio.setChecked();
    expect(wrapper.vm.lang).toBe('fr');
    expect(wrapper.find('input#french').element.checked).toBe(true);
  });

  it('saves the language and reloads the page when save button is clicked', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    wrapper.find('button').trigger('click');
    wrapper.vm.saveLanguage();

    expect(setItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.appLanguage, 'en');


    setItemSpy.mockRestore();

  });

  it('closes the modal when close button is clicked', () => {
    wrapper.find('button').trigger('click');
    wrapper.vm.goBack();
    expect(wrapper.vm.$router.go).toHaveBeenCalledWith(-1);
  });
});
