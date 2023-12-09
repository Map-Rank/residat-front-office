import { makeApiCall } from '@/api'; // Import the makeApiCall function
import { API_ENDPOINTS } from '../../../constants';


const createPost = async (postData)=>{
  const token = localStorage.getItem('authToken');
  const currentDate = new Date().toISOString();
  
  const formData = new FormData();

  // Append user data to formData
  formData.append('content', postData.post_content);
  formData.append('zone_id', 1);
  formData.append('published_at', currentDate);

  const response = await makeApiCall(API_ENDPOINTS.createPost, formData,token);
  console.log(response)
}


export {createPost}