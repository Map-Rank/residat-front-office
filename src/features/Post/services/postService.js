
import { makeApiPostCall , makeApiGetCall} from '@/api'; // Import the makeApiPostCall function
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js';


const currentDate = new Date().toISOString().split('T')[0];
const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)


const createPost = async (postData, onSuccess, onError) => {
  try {
    const formData = new FormData();
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken);

    // Append text data to formData
    formData.append('content', postData.content);
    formData.append('published_at', currentDate);
    formData.append('zone_id', 1);
    // Append images
    postData.images.forEach((image, index) => {
      const imageUrl= URL.createObjectURL(image)
      // console.log('the image url are :'+imageUrl)

      formData.append(`images[${index}]`, imageUrl);
    });

    console.log('form data:', formData.forEach((data)=>{ //TODO remove this later
      console.log(data)
    }))

    // Use makeApiPostCall for the API request
    const response = await makeApiPostCall(API_ENDPOINTS.createPost, formData, authToken);
    console.log(response.data);
    return response.data;
  } catch (error) {
    onError("Server Error: Internal server error");
    console.error('Post Creation error:', error);
    throw error;
  }
};



const getPosts = async () => {
  try {
    console.log(authToken)
    const response = await makeApiGetCall(API_ENDPOINTS.getPosts,authToken);
    console.log('this are all the post '+response.data.data)
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; 
  }
};



export { createPost ,getPosts};

