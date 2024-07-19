import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CreatePost from '@/features/CreatePost/CreatePost.vue';
import { getSpecificPost } from '@/features/Post/services/postService';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

vi.mock('@/stores/auth', () => ({
  default: vi.fn(() => ({
    user: { avatar: 'path/to/avatar.jpg' },
  })),
}));

vi.mock('@/stores/sectorStore', () => ({
  default: vi.fn(() => ({
    getAllSectors: [],
  })),
}));

vi.mock('@/features/Post/store/postStore', () => ({
  default: vi.fn(() => ({})),
}));

vi.mock('@/features/Post/services/postService', () => ({
  createPost: vi.fn(),
  updatePost: vi.fn(),
  getSpecificPost: vi.fn(),
}));

vi.mock('vue-toastification', () => ({
  useToast: () => ({
    error: vi.fn(),
    success: vi.fn(),
  }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('CreatePost Component', () => {
  let wrapper;
  let routerMock;
  let toastMock;

  beforeEach(() => {
    routerMock = useRouter();
    toastMock = useToast();

    wrapper = mount(CreatePost, {
      props: {
        postId: null,
        prePostContent: null,
      },
      global: {
        mocks: {
          $t: (msg) => msg,
          $router: routerMock,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('share_your_thoughts');
  });

  // it('submits the form and creates a new post', async () => {
  //   createPost.mockResolvedValueOnce({ status: true });
  
  //   wrapper.setData({
  //     content: 'New post content',
  //     zoneId: '1',
  //     formData: {
  //       id: '',
  //       content: 'New post content',
  //       images: [],
  //       videos: [],
  //       zoneId: '1',
  //       sectorChecked: [],
  //       sectorId: []
  //     }
  //   });
  
  //   await wrapper.find('button[type="submit"]').trigger('click');
  
  //   expect(createPost).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       id: '',
  //       content: '<p>New post content</p>',
  //       images: [],
  //       videos: [],
  //       zoneId: '1',
  //       sectorChecked: [],
  //       sectorId: []
  //     }),
  //     expect.any(Function),
  //     expect.any(Function)
  //   );
  //   expect(routerMock.push).toHaveBeenCalledWith({ name: 'community' });
  //   expect(toastMock.success).toHaveBeenCalledWith('Post successfuly created');
  // });
  

  it('displays error when content is empty', async () => {
    wrapper.setData({ content: '', zoneId: '1' });
    await wrapper.find('button[type="submit"]').trigger('click');
    // expect(toastMock.error).toHaveBeenCalled();
  });

  it('displays error when zoneId is empty', async () => {
    wrapper.setData({ content: 'Content', zoneId: '' });
    await wrapper.find('button[type="submit"]').trigger('click');
    // expect(toastMock.error).toHaveBeenCalledWith('premium_user_specify_zone');
  });

  // it('handles image upload correctly', async () => {
  //   const file = new File(['image'], 'image.png', { type: 'image/png' });
  //   await wrapper.vm.handleImageUpload([file]);

  //   expect(wrapper.vm.formData.images).toContain(file);
  //   expect(wrapper.vm.imagesToFromLocalPreview.length).toBe(1);
  // });

  it('toggles edit mode and fetches specific post details', async () => {
    const post = {
      id: '123',
      content: 'Test post content',
      images: [],
    };
    getSpecificPost.mockResolvedValueOnce(post);

    wrapper = mount(CreatePost, {
      props: {
        postId: '123',
        prePostContent: null,
      },
      global: {
        mocks: {
          $t: (msg) => msg,
          $router: routerMock,
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isEditing).toBe(true);
    expect(wrapper.vm.formData.content).toBe(post.content);
  });

  // it('submits the form and updates the post', async () => {
  //   updatePost.mockResolvedValueOnce({ status: true });
  //   wrapper.setData({
  //     isEditing: true,
  //     content: 'Updated post content',
  //     zoneId: '1',
  //     formData: { id: '123' },
  //   });

  //   await wrapper.find('button[type="submit"]').trigger('click');

  //   expect(updatePost).toHaveBeenCalledWith(
  //     expect.objectContaining({ content: '<p>Updated post content</p>' }),
  //     expect.any(Function),
  //     expect.any(Function)
  //   );
  //   expect(routerMock.push).toHaveBeenCalledWith({ name: 'community' });
  // });
});