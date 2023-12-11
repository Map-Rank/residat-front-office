import { makeApiCall } from '@/api'; // Import the makeApiCall function
import {  LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js';


const currentDate = new Date().toISOString().split('T')[0];


const createPost = async (postData, onSuccess, onError) => {
  try {
    const formData = new FormData();
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken);

    // Append user data to formData
    formData.append('content', postData.content);
    formData.append('published_at', currentDate);
    formData.append('zone_id', 1);

    // Use makeApiCall for the API request
    const response = await makeApiCall(API_ENDPOINTS.createPost, formData,authToken);
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    onError("Server Error: Internal server error");
    console.error('Post Creation error:', error);
    throw error;
  }
};





export { createPost };
