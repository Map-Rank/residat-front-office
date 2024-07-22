import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatRoomView from '@/features/ChatRoom/ChatRoomView.vue';
import NotificationItem from '@/features/Notification/components/NotificationItem.vue';
import AvatarEventShimmer from '@/components/common/ShimmerLoading/AvatarPostShimmer.vue';
import { getNotifications } from '@/services/notificationService';
import useAuthStore from '@/stores/auth';

vi.mock('@/stores/auth', () => ({
  default: vi.fn(() => ({
    user: { token: 'mock-token' },
  })),
}));

vi.mock('@/services/notificationService', () => ({
  getNotifications: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('ChatRoomView Component', () => {
  let wrapper;
  let authStoreMock;
  let routerMock;

  beforeEach(() => {
    authStoreMock = useAuthStore();
    routerMock = {
      push: vi.fn(),
    };

    getNotifications.mockResolvedValue([]);

    wrapper = mount(ChatRoomView, {
      global: {
        mocks: {
          $t: (msg) => msg,
          $router: routerMock,
        },
        stubs: {
          NotificationItem,
          AvatarEventShimmer,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Inbox');
  });

  it('displays institutional notifications when activeTab is important', async () => {
    wrapper.setData({ isInstitution: false, activeTab: 'important' });
    await wrapper.vm.$nextTick();
    const institutionNames = wrapper.findAll('.flex.items-center.bg-white div');
    expect(institutionNames.at(0).text()).toBe('UNICEF');
  });

  it('toggles institution visibility', async () => {
    wrapper.setData({ isInstitution: false, activeTab: 'important' });
    await wrapper.vm.$nextTick();
    const institution = wrapper.findAll('.bg-white.shadow-md.rounded-lg.p-4.flex.justify-between.items-center.cursor-pointer').at(0);
    await institution.trigger('click');
    expect(wrapper.vm.institutionalNotifications[0].isVisible).toBe(true);
    await institution.trigger('click');
    expect(wrapper.vm.institutionalNotifications[0].isVisible).toBe(false);
  });

  it('navigates to broadcast-notification page when Send Mass Message is clicked', async () => {
    wrapper.setData({ isInstitution: true });
    await wrapper.vm.$nextTick();
    const button = wrapper.find('button.bg-primary-normal');
    await button.trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'broadcast-notification' });
  });

  it('displays no alerts message when there are no notifications', async () => {
    wrapper.setData({ isInstitution: false, activeTab: 'inbox', notifications: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.text-center.mt-3').text()).toBe('no_alert');
  });

  it('fetches notifications on component creation', async () => {
    expect(getNotifications).toHaveBeenCalledWith(0, 10, 'mock-token');
  });
});
