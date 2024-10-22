import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import EmailVerification from '@/features/Auth/components/EmailVerification.vue';

// Mocking localStorage
const mockLocalStorage = {};
vi.stubGlobal('localStorage', {
  getItem: vi.fn((key) => mockLocalStorage[key]),
  setItem: vi.fn((key, value) => {
    mockLocalStorage[key] = value;
  }),
});

// Mocking fetch API
vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    status: 200,
  })
));

describe('EmailVerification Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(EmailVerification);
    expect(wrapper.text()).toContain('Email Verification');
    expect(wrapper.find('button').text()).toContain('Resend Verification link');
  });

  it('calls reSend method on button click', async () => {
    const wrapper = mount(EmailVerification);
    await wrapper.find('button').trigger('click');
    expect(fetch).toHaveBeenCalled();
  });

  it('disables the resend button after clicking', async () => {
    const wrapper = mount(EmailVerification);
    expect(wrapper.vm.resetLink).toBe(false);
    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.resetLink).toBe(true);
  });

});
