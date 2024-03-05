import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { makeApiGetCall,makeApiPostCall ,makeApiDeleteCall} from '../api';

describe('API Service', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('makes a GET call successfully', async () => {
    const endpoint = '/post';
    const authToken = '206|f31ccRuu2LfnvTOPa7xQMQVpfnPUCXUxTEOpuRtdb5ca3c32';
    const mockData = {
      "data": [
        {
          "id": 1884,
          "content": "testing post creation",
        }
      ]
    };

    // Mock any GET request to '/test-endpoint' to return 'mockData' as a response
    mock.onGet(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`).reply(200, mockData);

    const response = await makeApiGetCall(endpoint, authToken);

    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
    
    if (response.data.data.length > 0) {
      const firstItem = response.data.data[0];
      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('content');
      expect(typeof firstItem.id).toBe('number');
      expect(typeof firstItem.content).toBe('string');
    }
  });

  it('makes a GET Post successfully', async () => {
    const endpoint = '/post';
    const authToken = '206|f31ccRuu2LfnvTOPa7xQMQVpfnPUCXUxTEOpuRtdb5ca3c32';
    const postData = {content:"New Post",published_at:"2024-03-05T09:30:05.229451Z",zone_id:1,sectors:1};


    const response = await makeApiPostCall(endpoint,postData, authToken);

    expect(response.data).toHaveProperty('data');
    expect(response.data).toHaveProperty('message');
  expect(typeof response.data.data).toBe('object');
  
    
    if (response.data.data) {
      const firstItem = response.data.data;
      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('content');
    }
  });

  it('makes a DELETE call successfully', async () => {
    const endpoint = 'post/123';
    const authToken = '206|f31ccRuu2LfnvTOPa7xQMQVpfnPUCXUxTEOpuRtdb5ca3c32';
    // const mockResponse = { success: true };

    const response = await makeApiDeleteCall(endpoint, authToken);

    // Verify DELETE request was sent with the correct headers
    expect(response.status).toBe(200);
    // expect(response.data).toEqual(mockResponse);
  });
});
