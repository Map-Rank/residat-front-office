import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import CreateEvent from '@/features/Event/Components/CreateEvent.vue';
import { getZones } from '@/services/zoneService';
import { useRouter } from 'vue-router';
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
    createEvent: vi.fn(),
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
  
  describe('CreateEvent Component', () => {
    let wrapper;
    let routerMock;

  
    beforeEach(async () => {
      routerMock = useRouter();
  
      getZones.mockResolvedValue([]);
      
      wrapper = mount(CreateEvent, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            })
          ],
          mocks: {
            $t: (msg) => msg,
            $router: routerMock,
          },
        },
      });
  
      // Mocking form reference
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
  
    it('initializes with correct default values', () => {
      expect(wrapper.vm.formData.title).toBe('');
      expect(wrapper.vm.formData.description).toBe('');
      expect(wrapper.vm.formData.location).toBe('');
    });
  
    // it('validates form fields before creating the event', async () => {
    //   wrapper.vm.formData.title = '';
    //   wrapper.vm.formData.description = 'Valid description';
    //   await wrapper.vm.createEvent();
    //   expect(wrapper.vm.$refs.form.validateField).toHaveBeenCalledWith('title');
    // });
  
    // it('shows error if a required field is invalid', async () => {
    //   wrapper.vm.$refs.form.validateField = vi.fn().mockResolvedValueOnce({ valid: false });
    //   await wrapper.vm.createEvent();
    //   expect(toastMock.error).toHaveBeenCalled();
    // });
  
    // it('calls createEvent service when form is valid', async () => {
    //   wrapper.vm.formData.title = 'Valid Event';
    //   wrapper.vm.formData.description = 'Valid description';
    //   wrapper.vm.formData.location = 'Valid location';
    //   await wrapper.vm.createEvent();
    //   expect(createEvent).toHaveBeenCalledWith(
    //     wrapper.vm.formData,
    //     wrapper.vm.authStore,
    //     wrapper.vm.handleSuccess,
    //     wrapper.vm.handleError
    //   );
    // });
  
    // it('displays success message when event is successfully created', async () => {
    //   createEvent.mockResolvedValueOnce({ data: { success: true } });
    //   await wrapper.vm.createEvent();
    //   expect(toastMock.info).toHaveBeenCalled();
    //   expect(routerMock.push).toHaveBeenCalledWith({ name: 'event' });
    // });
  
    // it('displays error when event creation fails', async () => {
    //   createEvent.mockRejectedValueOnce(new Error('Creation failed'));
    //   await wrapper.vm.createEvent();
    //   expect(toastMock.error).toHaveBeenCalled();
    //   expect(wrapper.vm.isLoadingBtn).toBe(false);
    // });
  
    // it('resets form after successful event creation', async () => {
    //   wrapper.vm.resetForm();
    //   expect(wrapper.vm.formData.title).toBe('');
    //   expect(wrapper.vm.formData.description).toBe('');
    //   expect(wrapper.vm.formData.location).toBe('');
    //   expect(wrapper.vm.formData.media).toBe(null); // Ensure media is reset to null
    // });
  });