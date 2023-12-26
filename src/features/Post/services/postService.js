import { makeApiPostCall, makeApiGetCall,makeApiDeleteCall } from '@/api' 
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'


const currentDate = new Date().toISOString().split('T')[0]
const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

const createPost = async (postData, onSuccess, onError) => {
  try {
    const formData = new FormData()

    formData.append('content', postData.content)
    formData.append('published_at', currentDate) 
    formData.append('zone_id', 1) 

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
    
    postData.sectorId.forEach((id, index, ) => {
      formData.append(`sectors[${index}]`, id)

    })

    const response = await makeApiPostCall(API_ENDPOINTS.createPost, formData, authToken, true)
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


const updatePost = async (postData, onSuccess, onError) => {
  try {
    const formData = new FormData()
    const authToken = localStorage.getItem('authToken')

    formData.append('content', postData.content)
    formData.append('published_at', currentDate) 
    formData.append('zone_id', '1') 
    formData.append('_method', 'PUT') 

    console.log('form data:', formData)
    console.log('post id' + postData.id)


    const response = await makeApiPostCall(
      API_ENDPOINTS.updatePost,
      formData,
      authToken,
      true,
      postData.id,
    )
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

const getPostsBySectors = async (sectorId) => {
  try {

    let params = new URLSearchParams({
      // size: size.toString(),
      // page: page.toString(),
      sectors: JSON.stringify(sectorId) 
    });

    const response = await makeApiGetCall(`${API_ENDPOINTS.getPosts}?${params.toString()}`, authToken)
   console.log('post filtered!!')
    return response.data.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

const getUserPosts = async () => {
  try {
    const response = await makeApiGetCall(API_ENDPOINTS.getUserPosts, authToken)
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

const sharePost = async (postId) => {
  try {
    await makeApiPostCall(`${API_ENDPOINTS.sharePost}/${postId}`, null, authToken)
    console.log('share compplet!!')
  } catch (error) {
    console.error('Error sharing posts:', error)
    throw error
  }
}

const deletePost = async (postId) => {
  try {
    const response = await makeApiDeleteCall(`${API_ENDPOINTS.deletePost}/${postId}`, authToken)
    console.log('delete post sucess 1!!!  '+response.data)
  } catch (error) {
    console.error('Error deleting posts:', error)
    throw error
  }
}

const commentPost = async (postId, commentData) => {
  try {

    const response = await makeApiPostCall(
      `${API_ENDPOINTS.commentPost}/${postId}`,
      JSON.stringify({ text: commentData.text }),
      authToken
    )
    console.log('Comment successfullty send!!!' + response.data.data)

  } catch (error) {
    console.error('Error Commenting Post:', error)
    throw error
  }
}

export { createPost, getPosts , getPostsBySectors, likePost, commentPost, updatePost ,deletePost , sharePost ,getUserPosts}

