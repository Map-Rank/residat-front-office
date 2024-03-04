import { describe, it, expect, vi } from 'vitest';
import { makeApiPostCall } from '../api';
import  axios  from 'axios';

// Mock axios
vi.mock('axios', () => {
  const mockPost = vi.fn(() => Promise.resolve({ data: 'mocked response' }));
  const mockGet = vi.fn(() => Promise.resolve({ data: 'mocked response' }));
  const mockDelete = vi.fn(() => Promise.resolve({ data: 'mocked response' }));

  return {
    default: {
      create: () => ({
        post: mockPost,
        get: mockGet,
        delete: mockDelete,
      })
    },
    mockPost, // Expose mockPost for assertions
    mockGet,
    mockDelete,
  };
});

describe('API Service', () => {
  it('successfully makes a POST call', async () => {
    const endpoint = '/test';
    const postData = { key: 'value' };
    const authToken = 'fake-token';
    const isMedia = false;
    const id = undefined;

    const response = await makeApiPostCall(endpoint, postData, authToken, isMedia, id);

    // Access the mocked post function directly from the module mock
    expect(vi.mocked(axios.mockPost)).toHaveBeenCalledWith(
      endpoint,
      postData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    expect(response.data).toBe('mocked response');
  });

  // Additional tests...
});
