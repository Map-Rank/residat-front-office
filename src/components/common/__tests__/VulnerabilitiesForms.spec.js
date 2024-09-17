import { shallowMount } from '@vue/test-utils';
import { describe, it, expect ,beforeEach } from 'vitest';
import VulnerabilitiesForms from '@/components/common/Pages/VulnerabilitiesForms.vue';
import fishing from '@/components/vulnerabilities/fishing.vue';
import waterStress from '@/components/vulnerabilities/waterStress.vue';
import social from '@/components/vulnerabilities/social.vue';
import migration from '@/components/vulnerabilities/migration.vue';
import health from '@/components/vulnerabilities/health.vue';

describe('VulnerabilitiesForms.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VulnerabilitiesForms, {
      props: {
        errorMessage: 'This section is still under construction. Check back soon!',
      },
    });
  });

  it('renders the correct title', () => {
    expect(wrapper.find('h1').text()).toBe('fishing');
  });

  it('renders all child components', () => {
    expect(wrapper.findComponent(fishing).exists()).toBe(true);
    expect(wrapper.findComponent(waterStress).exists()).toBe(true);
    expect(wrapper.findComponent(social).exists()).toBe(true);
    expect(wrapper.findComponent(migration).exists()).toBe(true);
    expect(wrapper.findComponent(health).exists()).toBe(true);
  });

  it('accepts and displays the errorMessage prop correctly', () => {
    expect(wrapper.props().errorMessage).toBe('This section is still under construction. Check back soon!');
  });
});
