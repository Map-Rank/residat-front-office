// import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PostInput from '@/components/common/PostInput/PostInput.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';
// import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import PostInput from '@/components/path/to/PostInput.vue';
// import ButtonUi from '@/components/base/ButtonUi.vue';
import { useRoute, useRouter } from 'vue-router';
import usePostStore from '@/features/Post/store/postStore';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
}));
vi.mock('@/features/Post/store/postStore', () => ({
  default: vi.fn(),
}));

describe('PostInput.vue', () => {
  let wrapper;
  let routerMock;
  let postStoreMock;

  beforeEach(() => {
    routerMock = {
      push: vi.fn(),
    };
    postStoreMock = {
      setContentFromPostInput: vi.fn(),
    };

    useRouter.mockReturnValue(routerMock);
    useRoute.mockReturnValue({});
    usePostStore.mockReturnValue(postStoreMock);

    wrapper = mount(PostInput, {
      global: {
        mocks: {
          $t: (msg) => msg, // Mocking the $t function for localization
        },
        components: {
          ButtonUi,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe('\\assets\\images\\smile.png');
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.findComponent(ButtonUi).exists()).toBe(true);
  });

  it('displays the correct placeholder in the input field', () => {
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('input_placeholder');
  });

  it('updates the v-model when input is changed', async () => {
    const input = wrapper.find('input');
    await input.setValue('Test content');
    expect(wrapper.vm.content).toBe('Test content');
  });
});
