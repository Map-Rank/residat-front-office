import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DegreeImpactDoughnutChart from '@/components/base/Charts/DegreeImpactDoughnutChart.vue';
import Chart from 'chart.js/auto';

vi.mock('chart.js/auto', () => {
  const ChartMock = vi.fn().mockImplementation(() => ({
    update: vi.fn(),
    destroy: vi.fn(),
  }));

  return {
    default: ChartMock,
  };
});

describe('DegreeImpactDoughnutChart.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DegreeImpactDoughnutChart, {
      props: {
        canvasId: 'test-canvas',
        label: 'Test Degree Impact',
        percentage: 60,
      },
    });
  });

  it('renders the canvas and label correctly', () => {
    expect(wrapper.find('canvas#test-canvas').exists()).toBe(true);
    expect(wrapper.find('.barTitle').text()).toBe('Test Degree Impact');
  });

  it('sets the correct percentages based on the given percentage', () => {
    expect(wrapper.vm.mildPercentage).toBe(0);
    expect(wrapper.vm.strongPercentage).toBe(0);
    expect(wrapper.vm.severePercentage).toBe(60);
    expect(wrapper.vm.verySeverePercentage).toBe(0);
  });

  it('calls Chart.js with correct parameters', () => {
    expect(Chart).toHaveBeenCalledTimes(3);

    const chartData = Chart.mock.calls[0][1].data;
    expect(chartData.labels).toEqual(['Mild', 'Strong', 'Severe', 'Very Severe']);
    expect(chartData.datasets[0].data).toEqual([0, 0, 60, 0, 40]);
    expect(chartData.datasets[0].backgroundColor).toEqual([
      '#41B9D4',
      '#7AA64E',
      '#FFD700',
      '#DD0303',
      'rgba(211, 211, 211, 0.5)'
    ]);
  });
});
