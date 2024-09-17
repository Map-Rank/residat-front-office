import { mount, shallowMount } from '@vue/test-utils';
import DashBoardView from '@/features/DashBaord/DashBoardView.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSpecificZones, getReport } from '@/services/zoneService';
import { Chart } from 'chart.js';

// Mocking external services
vi.mock('@/services/zoneService', () => ({
  getSpecificZones: vi.fn(),
  getReport: vi.fn(),
}));

// Mocking Chart.js
vi.mock('chart.js', () => ({
  Chart: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
  })),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('DashBoardView.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Mock initial data to avoid undefined access to zone properties
    wrapper = shallowMount(DashBoardView, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the translation function
          $i18n: { locale: 'en' }, // Mocking i18n
        },
      },

      props: {
        zoneId: 1,
        parentId: 1,
        zoneName: 'Test Zone',
        mapSize: 1,
      },
      data() {
        return {
          zone: { name: 'Test Zone', level_id: 1 }, // Mocking initial zone data
          isLoadingMap: true,
          isWaterStressGraphHidden: true,
        };
      },
    });
  });
  

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('calls getSpecificZones on mount', async () => {
    await wrapper.vm.$nextTick();
    expect(getSpecificZones).toHaveBeenCalledWith(1);
  });

  it('displays the correct zone name in the go-back button', async () => {
    // Set zone data to simulate the correct rendering condition
    wrapper.setData({ zone: { name: 'Test Zone', level_id: 2 }, isLoadingMap: false });
    await wrapper.vm.$nextTick();
    
    const goBackElement = wrapper.find('.goback p'); // Finding the <p> inside the goback class
    expect(goBackElement.exists()).toBe(true); // Ensure the element exists
    expect(goBackElement.text()).toBe('Test Zone'); // Ensure the correct text is rendered
  });
  

  // it('renders charts correctly', async () => {
  //   // Ensure that the charts are being rendered by setting proper conditions
  //   wrapper.setData({ isLoadingMap: false, inSubDivision: true });
  //   await wrapper.vm.$nextTick();
    
  //   expect(Chart).toHaveBeenCalled(); // Ensure Chart has been called
  // });
  

  // it('toggles Water Stress Graph visibility on button click', async () => {
  //   wrapper.setData({ inSubDivision: true, isLoadingMap: false, displayStatistics: true });
  //   await wrapper.vm.$nextTick();
  
  //   const button = wrapper.find('button-ui'); // Find the button
  //   expect(button.exists()).toBe(true); // Ensure button exists before triggering it
  //   await button.trigger('click');
    
  //   expect(wrapper.vm.isWaterStressGraphHidden).toBe(false); // Check the visibility change
  // });
  

  // it('handles vector key click and navigates correctly', async () => {
  //   wrapper.setData({ vectorKeys: [{ name: 'Test Key' }], presentMapId: 1 });
  //   await wrapper.vm.$nextTick();
  
  //   wrapper.vm.handleVectorClick({ name: 'Test Key' });
  //   expect(wrapper.vm.selectedZone).toBe('Test Key'); // Verify the selected zone is updated
  //   expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
  //     name: 'dashboard',
  //     params: { zoneId: 0, parentId: 1, zoneName: 'Test Key', mapSize: 1 }
  //   }); // Ensure correct routing
  // });

  // it('shows tooltip on hover and hides it on leave', async () => {
  //   // Manually insert tooltip in the test DOM
  //   document.body.innerHTML = '<div id="tooltip"></div>';
    
  //   const event = { target: { tagName: 'path', dataset: { name: 'Test Area' } } };
  //   wrapper.vm.handleStateHover(event);
  //   const tooltip = document.getElementById('tooltip');
  //   expect(tooltip.innerHTML).toBe('Test Area'); // Check if tooltip shows the correct text
    
  //   wrapper.vm.handleStateLeave(event);
  //   expect(tooltip.style.display).toBe('none'); // Check if tooltip is hidden
  // });

  // it('fetches the report based on zone ID', async () => {
  //   wrapper.setData({ zone: { id: 1, level_id: 4 }, inSubDivision: true });
  //   await wrapper.vm.getReport(1); // Call the method directly
  //   await wrapper.vm.$nextTick(); // Ensure the DOM and state have updated
    
  //   expect(getReport).toHaveBeenCalledWith(1, null); // Check if getReport was called with correct arguments
  // });
  
});
