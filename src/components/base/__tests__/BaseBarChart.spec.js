import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BaseBarChart from '@/components/base/Charts/BaseBarChart.vue';
import Chart from 'chart.js/auto';

vi.mock('chart.js/auto', () => {
  const ChartMock = vi.fn().mockImplementation(() => ({
    update: vi.fn(),
    destroy: vi.fn(),
    tooltip: {
      setActiveElements: vi.fn(),
    },
  }));

  return {
    default: ChartMock,
  };
});

describe('BaseBarChart.vue', () => {
  let wrapper;

  const mockData = [
    { name: 'Category 1', percentage: 30 },
    { name: 'Category 2', percentage: 70 },
  ];

  beforeEach(() => {
    wrapper = shallowMount(BaseBarChart, {
      props: {
        canvasId: 'test-canvas',
        data: mockData,
        label: 'Test Label',
        chartOptions: {},
        isHorizontal: false,
        barThickness: 15,
        color: '#ff0000',
        labelAlignment: 'center',
        barSpacing: 10,
      },
    });
  });

  it('renders the canvas and label correctly', () => {
    expect(wrapper.find('canvas#test-canvas').exists()).toBe(true);
    expect(wrapper.find('.barTitle').text()).toBe('Test Label');
  });

  it('calls Chart.js with correct parameters', () => {
    expect(Chart).toHaveBeenCalledTimes(2);

    const chartData = Chart.mock.calls[0][1].data;
    expect(chartData.labels).toEqual(mockData.map((row) => row.name));
    expect(chartData.datasets[0].data).toEqual(mockData.map((row) => row.percentage));
    expect(chartData.datasets[0].label).toBe('Test Label');
    expect(chartData.datasets[0].backgroundColor).toBe('#ff0000');
  });

//   it('emits clickItem when a bar is clicked', () => {
//     const onClickMock = Chart.mock.calls[0][1].options.onClick;
//     const mockEvent = {
//       chart: {
//         data: {
//           datasets: [{ label: 'Test Label', data: [30, 70] }],
//           labels: ['Category 1', 'Category 2'],
//         },
//         tooltip: { setActiveElements: vi.fn() },
//         update: vi.fn(),
//       },
//     };
//     const mockActiveEls = [{ datasetIndex: 0, index: 1 }];

//     onClickMock(mockEvent, mockActiveEls);
//     expect(wrapper.emitted('clickItem')).toBeTruthy();
//     expect(wrapper.emitted('clickItem')[0]).toEqual(['Category 2']);
//   });
});
