import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import foodSecurity from '@/components/vulnerabilities/foodSecurity.vue'; // Path to your component
import { Chart } from 'chart.js'; // Import Chart to mock

// Mocking Chart.js
vi.mock('chart.js', () => ({
  Chart: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn()
  })),
}));

describe('foodSecurity.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(foodSecurity, {
      global: {
        mocks: {
          $t: (msg) => msg // Mocking translation function
        }
      }
    });
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes Chart.js correctly on mount', () => {
    expect(Chart).toHaveBeenCalledTimes(4); // Called twice for both charts
    expect(Chart).toHaveBeenCalledWith(
      wrapper.vm.$refs.canvas, 
      expect.objectContaining({ type: 'pie' })
    );
    expect(Chart).toHaveBeenCalledWith(
      wrapper.vm.$refs.canvas1, 
      expect.objectContaining({ type: 'pie' })
    );
  });
});
