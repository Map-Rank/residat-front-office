import { makeApiPostCall, makeApiGetCall } from '@/api' // Import the makeApiPostCall function
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'

const currentDate = new Date().toISOString().split('T')[0]
const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

const createPost = async (postData, onSuccess, onError) => {
  try {
    const formData = new FormData()
    const authToken = localStorage.getItem('authToken')

    formData.append('content', postData.content)
    formData.append('published_at', currentDate) // Ensure this is a valid date
    formData.append('zone_id', postData.zone_id) // Ensure this is a valid zone ID

    // Append media files
    postData.images.forEach((image, index) => {
      if (
        [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/gif',
          'application/pdf',
          'video/mp4',
          'video/mov',
          'video/avi',
          'video/wmv',
          'audio/mp3'
        ].includes(image.type)
      ) {
        formData.append(`media[${index}]`, image, image.name)
      } else {
        console.log('not correct format')
      }
    })

    const response = await makeApiPostCall(API_ENDPOINTS.createPost, formData, authToken)
    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess(response.data)
    }
    return response.data
  } catch (error) {
    if (onError && typeof onError === 'function') {
      onError('Server Error: Internal server error')
    }
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
