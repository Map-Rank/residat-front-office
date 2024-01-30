import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchResult from '@/features/Search/SearchResult.vue';
import LoadingIndicator from '@/components/base/LoadingIndicator.vue';
import PostComponent from '@/features/Post/index.vue';
import NoSearchResult from '@/components/common/Pages/NoSearchResult.vue';
import SectionTitle from '@/components/base/SectionTitle.vue';
import { getPostsByZone } from '@/features/Post/services/postService.js';

// Mocking the getPostsByZone function
vi.mock('../Post/services/postService', () => ({
  getPostsByZone: vi.fn().mockResolvedValue([
    // Mocked posts data
  ])
}));

describe('SearchResult Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchResult, {
      props: { id: 'some-id' }
    });
  });

  it('renders loading indicator initially', () => {
    expect(wrapper.findComponent(LoadingIndicator).exists()).toBe(true);
  });

  it('fetches posts on creation', async () => {
    expect(getPostsByZone).toHaveBeenCalledWith('some-id');
    await vi.nextTick();
    expect(wrapper.vm.filteredPosts.length).toBeGreaterThan(0);
    expect(wrapper.findComponent(NoSearchResult).exists()).toBe(false);
  });

  it('renders NoSearchResult when no posts are found', async () => {
    // Update the mock to return an empty array
    getPostsByZone.mockResolvedValueOnce([]);
    await wrapper.vm.fetchPosts();
    await vi.nextTick();
    expect(wrapper.findComponent(NoSearchResult).exists()).toBe(true);
  });

  it('renders SectionTitle', () => {
    expect(wrapper.findComponent(SectionTitle).exists()).toBe(true);
  });

  it('renders PostComponent for each post', async () => {
    // Assume getPostsByZone returns 2 posts
    getPostsByZone.mockResolvedValueOnce([{ id: 1 }, { id: 2 }]);
    await wrapper.vm.fetchPosts();
    await vi.nextTick();
    expect(wrapper.findAllComponents(PostComponent).length).toBe(2);
  });

  // Additional tests...
});
