import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect, afterEach } from 'vitest';
import { API_ENDPOINTS } from '@/constants/index.js';

import { makeApiPostCall, makeApiGetCall, makeApiDeleteCall, makeApiPutCall } from '@/api/api';

// Initialize Axios Mock Adapter
const mock = new MockAdapter(axios);

function toStructure(obj) {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    typeof value === 'object' && value !== null ? Object.keys(value).sort() : typeof value
  ));
}

describe('API Service', () => {
  const authToken = 'fake-token';
  const responseData = { data: 'some data' };
  const sectorData = {
    status: true,
    data: [
      {
        id: 1,
        name: 'Agriculture',
        created_at: '2024-06-09T16:37:00.000000Z',
      },
    ],
    message: 'Values found',
  };

  afterEach(() => {
    // Reset the mock after each test to avoid interference
    mock.reset();
  });

//   it('should make a GET request', async () => {
//     mock.onGet(API_ENDPOINTS.sector).reply(200, sectorData);

//     const response = await makeApiGetCall(API_ENDPOINTS.sector, authToken);

//     expect(response.status).toBe(200);
//     expect(toStructure(response.data)).toEqual(toStructure(sectorData));
//   });

//   it('should make a POST request with JSON data', async () => {
//     const postData = { key: 'value' };
//     mock.onPost(API_ENDPOINTS.getPostsGuest).reply(200, responseData);

//     const response = await makeApiPostCall(API_ENDPOINTS.getPostsGuest, postData, authToken, false);

//     expect(response.status).toBe(200);
//     expect(response.data).toEqual(responseData);
//     expect(mock.history.post[0].headers.Authorization).toBe(`Bearer ${authToken}`);
//     expect(mock.history.post[0].headers['Content-Type']).toBe('application/json');
//   });

//   it('should make a POST request with form-data', async () => {
//     const formData = new FormData();
//     formData.append('file', 'fake-file');
//     mock.onPost(API_ENDPOINTS.uploadFile).reply(200, responseData);

//     const response = await makeApiPostCall(API_ENDPOINTS.uploadFile, formData, authToken, true);

//     expect(response.status).toBe(200);
//     expect(response.data).toEqual(responseData);
//     expect(mock.history.post[0].headers.Authorization).toBe(`Bearer ${authToken}`);
//     expect(mock.history.post[0].headers['Content-Type']).toBe('multipart/form-data');
//   });

//   it('should make a PUT request', async () => {
//     const putData = { key: 'value' };
//     mock.onPut(API_ENDPOINTS.updateResource).reply(200, responseData);

//     const response = await makeApiPutCall(API_ENDPOINTS.updateResource, putData, authToken, false);

//     expect(response.status).toBe(200);
//     expect(response.data).toEqual(responseData);
//     expect(mock.history.put[0].headers.Authorization).toBe(`Bearer ${authToken}`);
//     expect(mock.history.put[0].headers['Content-Type']).toBe('application/json');
//   });

//   it('should make a DELETE request', async () => {
//     mock.onDelete(API_ENDPOINTS.deleteResource).reply(200, responseData);

//     const response = await makeApiDeleteCall(API_ENDPOINTS.deleteResource, authToken);

//     expect(response.status).toBe(200);
//     expect(response.data).toEqual(responseData);
//     expect(mock.history.delete[0].headers.Authorization).toBe(`Bearer ${authToken}`);
//   });

  it('should handle network error correctly', async () => {
    mock.onGet(API_ENDPOINTS.sector).networkError();

    try {
      await makeApiGetCall(API_ENDPOINTS.sector, authToken);
    } catch (error) {
      expect(error.message).toBe('Network Error');
    }
  });

  it('should handle timeout error correctly', async () => {
    mock.onGet(API_ENDPOINTS.sector).timeout();

    try {
      await makeApiGetCall(API_ENDPOINTS.sector, authToken);
    } catch (error) {
      expect(error.code).toBe('ERR_NETWORK');
    }
  });
});
