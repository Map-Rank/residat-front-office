import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import migrationVulnerability from '@/components/vulnerabilities/migration.vue'; // Path to your component
import { Chart } from 'chart.js';

vi.mock('chart.js', () => ({
  Chart: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
  })),
}));

describe('migrationVulnerability.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(migrationVulnerability);
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes the chart with the correct data', () => {
    expect(Chart).toHaveBeenCalledWith(expect.anything(), {
      type: 'bar',
      data: {
        labels: ['Urban-to-Rural', 'Rural-to-Urban'],
        datasets: [
          {
            label: 'Adults(>35)',
            data: [1, 4],
            backgroundColor: 'rgb(31,63,110)',
          },
          {
            label: 'Youth(14-35)',
            data: [1, 10],
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            label: 'Children(0-13)',
            data: [4, 2],
            backgroundColor: 'rgb(208,47,47)',
          }
        ]
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  });

  it('displays the "Data coming here" label', () => {
    const label = wrapper.find('label');
    expect(label.text()).toBe('Data coming here');
  });

  it('displays the "additional data" link', () => {
    const link = wrapper.find('a');
    expect(link.text()).toBe('additional data');
  });
});
