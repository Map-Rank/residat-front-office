import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PostInput from '@/components/common/PostInput/PostInput.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({ path: '/some-path' })),
  useRouter: vi.fn(() => ({ push: vi.fn() }))
}));

// vi.mock('@/features/Post/store/postStore', () => ({
//   usePostStore: vi.fn(() => ({
//     setContentFromPostInput: vi.fn()
//   }))
// }));
vi.mock('@/features/Post/store/postStore', () => ({
    default:vi.fn(()=>({
      state:{
        shoePostDetails:false,
        contentFromPostInput:''
      },

      setContentFromPostInput:vi.fn(),
      togglePostDetails:vi.fn()
    }))
}));

describe('PostInput Component', () => {
  let wrapper;
  const useRouterMock = { push: vi.fn() };
  const postStoreMock = {
    setContentFromPostInput: vi.fn()
  };

  beforeEach(() => {
    wrapper = mount(PostInput, {
      global: {
        stubs: { ButtonUi },
        mocks: {
          $router: useRouterMock,
          usePostStore: postStoreMock
        }
      }
    });
  });

  it('renders input and buttons', () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.findAllComponents(ButtonUi)).toHaveLength(2);
  });

  it('updates content on input', async () => {
    const input = wrapper.find('input[type="text"]');
    await input.setValue('New post content');
    expect(input.element.value).toBe('New post content');
  });


  //TODO correct the problem in this test 
  // it('calls navigateCreatePost and updates store on post button click', async () => {
  //   wrapper.vm.navigateCreatePost = vi.fn()
  //   await wrapper.vm.$nextTick();

  //   // Assuming the first ButtonUi is the "Post" button
  //     // Find the "Post" ButtonUi component and trigger the click event
  // const postButton = wrapper.findAllComponents(ButtonUi).at(0); // Assuming the first button is the "Post" button
  // await postButton.vm.$emit('clickButton');
  // await wrapper.vm.$nextTick();
  
  //   expect(wrapper.vm.navigateCreatePost).toHaveBeenCalledTimes(1);

  //   expect(postStoreMock.setContentFromPostInput).toHaveBeenCalledTimes(1);
  //   expect(postStoreMock.setContentFromPostInput).toHaveBeenCalledWith('New post content');
  //   expect(useRouterMock.push).toHaveBeenCalledWith({ name: 'create-post' });
  // });

  // Add more tests as necessary
});
