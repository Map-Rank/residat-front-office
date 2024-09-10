import { mount } from '@vue/test-utils';
import { describe, it, expect, vi,beforeEach } from 'vitest';
import SecuritySetting from '@/features/Setting/Pages/SecuritySetting/SecuritySetting.vue';
import SettingsSection from '@/features/Setting/components/SettingsSection.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('SecuritySetting.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SecuritySetting, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the translation function
        },
      },
    });
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('passes the correct props to the SettingsSection component', () => {
    const settingsSection = wrapper.findComponent(SettingsSection);
    
    expect(settingsSection.exists()).toBe(true);
    expect(settingsSection.props('title')).toBe('security');
    expect(settingsSection.props('items')).toEqual([
      { name: 'password_management', route: 'update-password' },
      { name: 'phone_number', route: 'security-setting' },
    ]);
  });

  it('contains the correct settings items', () => {
    const profileItems = wrapper.vm.profileItems;
    expect(profileItems).toEqual([
      { name: 'password_management', route: 'update-password' },
      { name: 'phone_number', route: 'security-setting' },
    ]);
  });
});
