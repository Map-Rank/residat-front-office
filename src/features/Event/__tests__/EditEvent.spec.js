import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import EditEvent from '@/features/Event/Components/EditEvent.vue';
import useAuthStore from '@/stores/auth';
import useSectorStore from '@/stores/sectorStore';
import useZoneStore from '@/stores/zoneStore';
import { getSpecificEvent, UpdateEvent } from '@/services/eventService';
import { getZones } from '@/services/zoneService';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { createTestingPinia } from '@pinia/testing';

vi.mock('@/stores/auth', () => ({
  default: vi.fn(() => ({
    user: null,
    token: null,
    isloggedIn: false,
  }))
}));

vi.mock('@/stores/sectorStore', () => ({
  default: vi.fn(() => ({
    getAllSectors: [],
  }))
}));

vi.mock('@/stores/zoneStore', () => ({
  default: vi.fn(() => ({
    getAllZones: [],
  }))
}));

vi.mock('@/services/zoneService', () => ({
  getZones: vi.fn(),
}));

vi.mock('@/services/eventService', () => ({
  getSpecificEvent: vi.fn(),
  UpdateEvent: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  }))
}));

vi.mock('vue-toastification', () => ({
  useToast: () => ({
    info: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  }),
}));

describe('EditEvent Component', () => {
  let wrapper;
  let authStoreMock;
  let routerMock;
  let toastMock;
  let sectorStoreMock;
  let zoneStoreMock;

  beforeEach(async () => {
    authStoreMock = useAuthStore();
    routerMock = useRouter();
    toastMock = useToast();
    sectorStoreMock = useSectorStore();
    zoneStoreMock = useZoneStore();

    getZones.mockResolvedValue([]);
    getSpecificEvent.mockResolvedValue({
      title: 'Test Event',
      description: 'Test Event Description',
      location: 'Test Location',
      organized_by: 'Test Organizer',
      date_debut: '2023-12-01',
      date_fin: '2023-12-05',
    });

    wrapper = mount(EditEvent, {
      global: {
        plugins: [
            createTestingPinia({
              createSpy: vi.fn, // Add the createSpy function here
            })
          ],
        mocks: {
          $t: (msg) => msg,
          $router: routerMock,
          $route: {
            params: {
              id: 1, // Mock route parameter
            },
          },
        },
      },
    });
    
    wrapper.vm.$refs.form = {
      validateField: vi.fn().mockResolvedValue({ valid: true })
    };

    await flushPromises();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('CREATE AN EVENT');
  });

  it('initializes form data with fetched event details', async () => {
    await flushPromises();
    expect(wrapper.vm.formData.title).toBe('Test Event');
    expect(wrapper.vm.formData.description).toBe('Test Event Description');
    expect(wrapper.vm.formData.location).toBe('Test Location');
    expect(wrapper.vm.formData.organized_by).toBe('Test Organizer');
    expect(wrapper.vm.formData.date_debut).toBe('2023-12-01');
    expect(wrapper.vm.formData.date_fin).toBe('2023-12-05');
  });

//   it('validates form fields before submitting', async () => {
//     wrapper.vm.formData.title = '';
//     wrapper.vm.formData.description = 'Updated description';
//     await wrapper.vm.updateEvent();
//     expect(wrapper.vm.$refs.form.validateField).toHaveBeenCalledWith('title');
//   });

//   it('shows error if fields are invalid', async () => {
//     wrapper.vm.$refs.form.validateField = vi.fn().mockResolvedValueOnce({ valid: false });
//     await wrapper.vm.updateEvent();
//     expect(toastMock.error).toHaveBeenCalled();
//   });

//   it('calls UpdateEvent service when form is valid', async () => {
//     wrapper.vm.formData.title = 'Updated Event';
//     wrapper.vm.formData.description = 'Updated description';
//     await wrapper.vm.updateEvent();
//     expect(UpdateEvent).toHaveBeenCalledWith(
//       wrapper.vm.id,
//       wrapper.vm.formData,
//       wrapper.vm.authStore,
//       wrapper.vm.handleSuccess,
//       wrapper.vm.handleError
//     );
//   });

//   it('displays success message when event is successfully updated', async () => {
//     UpdateEvent.mockResolvedValueOnce({ data: { success: true } });
//     await wrapper.vm.updateEvent();
//     expect(toastMock.success).toHaveBeenCalled();
//     expect(routerMock.push).toHaveBeenCalledWith({ name: 'community' });
//   });

//   it('displays error when event update fails', async () => {
//     UpdateEvent.mockRejectedValueOnce(new Error('Update failed'));
//     await wrapper.vm.updateEvent();
//     expect(toastMock.error).toHaveBeenCalled();
//     expect(wrapper.vm.isCreatingEvent).toBe(false);
//   });

  it('resets form after successful event update', async () => {
    wrapper.vm.resetForm();
    expect(wrapper.vm.formData.title).toBe('');
    expect(wrapper.vm.formData.description).toBe('');
    expect(wrapper.vm.formData.location).toBe('');
    expect(wrapper.vm.formData.organized_by).toBe('');
    expect(wrapper.vm.formData.date_debut).toBe('2023-12-06T13:10:59');
    expect(wrapper.vm.formData.date_fin).toBe('2023-12-06T13:10:59');
    expect(wrapper.vm.formData.media).toBe('');
  });
});
