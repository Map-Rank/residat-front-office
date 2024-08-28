import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WaterStressChart from '@/components/base/Charts/WaterStressChart.vue';
import { Chart } from 'chart.js';

vi.mock('chart.js', () => {
  const ChartMock = vi.fn().mockImplementation(() => ({
    update: vi.fn(),
    destroy: vi.fn(),
    tooltip: {
      setActiveElements: vi.fn(),
    },
  }));

  ChartMock.register = vi.fn(); // Mock the register function

  return {
    Chart: ChartMock,
  };
});

vi.mock('chartjs-plugin-annotation', () => ({
  default: {} // Mocking the default export
}));

describe('WaterStressChart.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(WaterStressChart, {
      props: {
        data: [
          { Date: new Date('2023-01-01'), WaterStressLevel: 20 },
          { Date: new Date('2023-01-02'), WaterStressLevel: 60 },
          { Date: new Date('2023-01-03'), WaterStressLevel: 80 },
        ],
      },
    });
  });

  it('renders the canvas correctly', () => {
    expect(wrapper.find('canvas').exists()).toBe(true);
  });

  it('calls Chart.js with correct parameters', () => {
    expect(Chart).toHaveBeenCalledTimes(2);

    const chartData = Chart.mock.calls[0][1].data;
    // expect(chartData.labels).toEqual(wrapper.vm.chartData.map(d => d.Date));
    expect(chartData.datasets[0].label).toBe('Water Risk Level');
    // expect(chartData.datasets[0].data).toEqual(
    //   wrapper.vm.chartData.map(d => ({ x: d.Date, y: d.WaterStressLevel })
    // )
    // );
  });

  it('sets up chart data correctly', () => {
    const chartData = wrapper.vm.chartData;
    expect(chartData.length).toBe(6); // 3 days before + today + 2 days after
    expect(chartData[0]).toHaveProperty('Date');
    // expect(chartData[0]).toHaveProperty('WaterStressLevel');
  });

  it('generates random water level values', () => {
    const randomLevel = wrapper.vm.getRandomWaterLevel();
    expect(randomLevel).toBeGreaterThanOrEqual(0);
    expect(randomLevel).toBeLessThanOrEqual(100);
  });

  it('calls the renderChart method on mount', () => {
    const renderChartSpy = vi.spyOn(WaterStressChart.methods, 'renderChart');
    shallowMount(WaterStressChart, {
      props: {
        data: [
          { Date: new Date('2023-01-01'), WaterStressLevel: 20 },
          { Date: new Date('2023-01-02'), WaterStressLevel: 60 },
          { Date: new Date('2023-01-03'), WaterStressLevel: 80 },
        ],
      },
    });
    expect(renderChartSpy).toHaveBeenCalled();
  });
});
