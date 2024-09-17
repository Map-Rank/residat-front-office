// AccountPreferences.spec.js
import { mount } from '@vue/test-utils';
import AccountPreferences from '@/features/Setting/Pages/AccountPreferences/AccountPreferences.vue';
import SettingsSection from '@/features/Setting/components/SettingsSection.vue';
import { describe, it, expect ,beforeEach} from 'vitest';

describe('AccountPreferences.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AccountPreferences, {
      global: {
        mocks: {
          $t: (msg) => msg,  // Mocking $t for translations
        },
      },
    });
  });

  it('renders correctly', () => {
    // Check if the component renders the div
    expect(wrapper.exists()).toBe(true);
  });

  it('passes profile items to SettingsSection component', () => {
    const settingsSections = wrapper.findAllComponents(SettingsSection);

    // Check if the first SettingsSection receives the correct profileItems
    const profileSection = settingsSections[0];
    expect(profileSection.props('title')).toBe('Profile Information');
    expect(profileSection.props('items')).toEqual([{ name: 'name_location_enterprise', route: 'update-profile' }]);
  });

  it('passes general items to SettingsSection component', () => {
    const settingsSections = wrapper.findAllComponents(SettingsSection);

    // Check if the second SettingsSection receives the correct generalItems
    const generalSection = settingsSections[1];
    expect(generalSection.props('title')).toBe('General Prefences');
    expect(generalSection.props('items')).toEqual([
      { name: 'language', route: 'change-langauge' },
      { name: 'close_account', route: 'account-preferences' }
    ]);
  });

  it('has the correct structure', () => {
    // Ensure the component contains the necessary structure
    const container = wrapper.find('.container');
    expect(container.exists()).toBe(true);

    const sections = wrapper.findAllComponents(SettingsSection);
    expect(sections.length).toBe(2);
  });
});
