import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import resourceCompetition from '@/components/vulnerabilities/resourceCompetition.vue'; // Adjust the import path as needed
import { Chart } from 'chart.js';

vi.mock('chart.js', () => ({
  Chart: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
  })),
}));

describe('resourceCompetition.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(resourceCompetition);
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes the chart with the correct data and options', () => {
    expect(Chart).toHaveBeenCalledWith(expect.anything(), {
      type: 'bar',
      data: {
        labels: [
          'Farmer-Grazer conflicts',
          'Water conflicts',
          'Human-Wildlife conflicts',
          'Land conflicts'
        ],
        datasets: [
          {
            label: 'Current',
            data: [10, 6, 4, 2],
            backgroundColor: 'rgb(54, 162, 235)'
          },
          {
            label: 'Project',
            data: [35, 29, 21, 16],
            backgroundColor: 'rgb(208,47,47)'
          }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
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
