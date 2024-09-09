import {
    createPost,
    getPosts,
    getSpecificPost,
    updatePost,
    deletePost,
    likePost,
    sharePost,
  } from '@/features/Post/services/postService.js'; // Assuming postService.js as file
  import { makeApiPostCall, makeApiGetCall, makeApiDeleteCall } from '@/api/api';
  import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js';
  import { describe, it, expect, vi, beforeEach } from 'vitest';
  import { createPinia, setActivePinia } from 'pinia';
  
  // Mock API calls
  vi.mock('@/api/api', () => ({
    makeApiPostCall: vi.fn(),
    makeApiGetCall: vi.fn(),
    makeApiDeleteCall: vi.fn(),
  }));
  
  describe('Post Service', () => {
    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
      localStorage.clear();
        localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, 'testAuthToken'); // Mock token
      vi.clearAllMocks();
    });
  
    describe('createPost', () => {
        beforeEach(() => {
          localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, 'testAuthToken'); // Mock token
          vi.clearAllMocks();
        });
      
        it('should create a post successfully', async () => {
          // Mock API response
          makeApiPostCall.mockResolvedValueOnce({
            data: { id: 1, content: 'Test content' },
          });
      
          const postData = {
            content: 'Test content',
            zoneId: 1,
            images: [new File([''], 'test-image.png', { type: 'image/png' })],
            sectorId: [1, 2],
          };
      
          const mockSuccessCallback = vi.fn();
          const mockErrorCallback = vi.fn();
      
          const response = await createPost(postData, mockSuccessCallback, mockErrorCallback);
      
          // Adjust the expectation here to match the actual call
          expect(makeApiPostCall).toHaveBeenCalledWith(
            API_ENDPOINTS.createPost,
            expect.any(FormData),
            'testAuthToken', // Ensure the token is passed correctly
            true
          );
      
          expect(mockSuccessCallback).toHaveBeenCalledWith({ id: 1, content: 'Test content' });
          expect(response).toEqual({ id: 1, content: 'Test content' });
        });
      });
      
  
    describe('getPosts', () => {
      it('should fetch posts successfully', async () => {
        const mockPosts = [{ id: 1, content: 'Post 1' }, { id: 2, content: 'Post 2' }];
        makeApiGetCall.mockResolvedValueOnce({ data: { data: mockPosts } });
  
        const response = await getPosts(0, 10, 'authToken');
        expect(makeApiGetCall).toHaveBeenCalledWith(`${API_ENDPOINTS.getPosts}?size=10&page=0`, 'authToken');
        expect(response).toEqual(mockPosts);
      });
  
      it('should handle error during fetching posts', async () => {
        makeApiGetCall.mockRejectedValueOnce(new Error('Error fetching posts'));
  
        await expect(getPosts(0, 10, 'authToken')).rejects.toThrow('Error fetching posts');
      });
    });
  
    // describe('getSpecificPost', () => {
    //   it('should fetch a specific post successfully', async () => {
    //     const mockPost = { id: 1, content: 'Specific Post' };
    //     makeApiGetCall.mockResolvedValueOnce({ data: { data: mockPost } });
  
    //     const response = await getSpecificPost(1);
    //     expect(makeApiGetCall).toHaveBeenCalledWith(`${API_ENDPOINTS.post}/1`, expect.any(String));
    //     expect(response).toEqual(mockPost);
    //   });
  
    //   it('should handle error during fetching specific post', async () => {
    //     makeApiGetCall.mockRejectedValueOnce(new Error('Error fetching post'));
  
    //     await expect(getSpecificPost(1)).rejects.toThrow('Error fetching post');
    //   });
    // });
  
    describe('updatePost', () => {
      const postData = {
        id: 1,
        content: 'Updated content',
        zoneId: 1,
        images: [
          new File([''], 'updated-image.png', { type: 'image/png' }),
        ],
        sectorId: [1, 2],
      };
  
      it('should update a post successfully', async () => {
        makeApiPostCall.mockResolvedValueOnce({
          data: { id: 1, content: 'Updated content' },
        });
  
        const response = await updatePost(postData);
        expect(makeApiPostCall).toHaveBeenCalledWith(
          `${API_ENDPOINTS.post}/${postData.id}`,
          expect.any(FormData),
          expect.any(String),
          true,
        );
        expect(response).toEqual({ id: 1, content: 'Updated content' });
      });
  
      it('should handle error during post update', async () => {
        makeApiPostCall.mockRejectedValueOnce(new Error('Error updating post'));
  
        await expect(updatePost(postData)).rejects.toThrow('Error updating post');
      });
    });
  
    describe('deletePost', () => {
      it('should delete a post successfully', async () => {
        makeApiDeleteCall.mockResolvedValueOnce({ data: {} });
  
        await deletePost(1);
        expect(makeApiDeleteCall).toHaveBeenCalledWith(`${API_ENDPOINTS.post}/1`, expect.any(String));
      });
  
      it('should handle error during post deletion', async () => {
        makeApiDeleteCall.mockRejectedValueOnce(new Error('Error deleting post'));
  
        await expect(deletePost(1)).rejects.toThrow('Error deleting post');
      });
    });
  
    describe('likePost', () => {
      it('should like a post successfully', async () => {
        makeApiPostCall.mockResolvedValueOnce({});
  
        await likePost(1);
        expect(makeApiPostCall).toHaveBeenCalledWith(`${API_ENDPOINTS.likePost}/1`, null, expect.any(String));
      });
  
      it('should handle error during liking post', async () => {
        makeApiPostCall.mockRejectedValueOnce(new Error('Error liking post'));
  
        await expect(likePost(1)).rejects.toThrow('Error liking post');
      });
    });
  
    // describe('sharePost', () => {
    //   it('should share a post successfully', async () => {
    //     makeApiPostCall.mockResolvedValueOnce({});
  
    //     await sharePost(1);
    //     expect(makeApiPostCall).toHaveBeenCalledWith(`${API_ENDPOINTS.sharePost}/1`, null, expect.any(String));
    //   });
  
    //   it('should handle error during sharing post', async () => {
    //     makeApiPostCall.mockRejectedValueOnce(new Error('Error sharing post'));
  
    //     await expect(sharePost(1)).rejects.toThrow('Error sharing post');
    //   });
    // });
  });
  