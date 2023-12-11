import { makeApiPostCall , makeApiGetCall} from '@/api'; // Import the makeApiPostCall function
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js';


const currentDate = new Date().toISOString().split('T')[0];
const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)


const createPost = async (postData, onSuccess, onError) => {
  try {
    const formData = new FormData();
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken);

    // Append user data to formData
    formData.append('content', postData.content);
    formData.append('published_at', currentDate);
    formData.append('zone_id', 1);

    // Use makeApiPostCall for the API request
    const response = await makeApiPostCall(API_ENDPOINTS.createPost, formData, authToken);
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    onError("Server Error: Internal server error");
    console.error('Post Creation error:', error);
    throw error;
  }
};


const getPosts = async () => {
  try {
    const response = await makeApiGetCall(API_ENDPOINTS.getPosts,authToken);
    console.log(response.data)
    return response.data; // Assuming the data is directly in response.data
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throw the error for handling it in the component
  }
};









export { createPost ,getPosts};
