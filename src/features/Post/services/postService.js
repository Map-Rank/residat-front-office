import { makeApiPostCall, makeApiGetCall } from '@/api' // Import the makeApiPostCall function
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'

const currentDate = new Date().toISOString().split('T')[0]
const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

const createPost = async (postData, onSuccess, onError) => {
  try {
    const formData = new FormData()

    // Append text data to formData
    formData.append('content', postData.content)
    formData.append('published_at', currentDate)
    formData.append('zone_id', 1)
    // Append images
    postData.images.forEach((image, index) => {
      const imageUrl = URL.createObjectURL(image)
      formData.append(`images[${index}]`, imageUrl)
    })


    // Use makeApiPostCall for the API request
    const response = await makeApiPostCall(API_ENDPOINTS.createPost, formData, authToken)
    return response.data
  } catch (error) {
    onError('Server Error: Internal server error')
    console.error('Post Creation error:', error)
    throw error
  }
}

const getPosts = async () => {
  try {
    const response = await makeApiGetCall(API_ENDPOINTS.getPosts, authToken)
    return response.data.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

const likePost = async (postId) => {
  try {
    await makeApiPostCall(`${API_ENDPOINTS.likePost}/${postId}`, null, authToken)
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

const commentPost = async (postId, commentData) => {
  try {

    
    const response = await makeApiPostCall(
      `${API_ENDPOINTS.commentPost}/${postId}`,
      //here we are force to convert to string since the backend only accept stringify object 
      JSON.stringify({ text: commentData.text }),
      authToken
    )
    console.log('Comment successfullty send!!!' + response.data.data)

  } catch (error) {
    console.error('Error Commenting Post:', error)
    throw error
  }
}

export { createPost, getPosts, likePost, commentPost }
