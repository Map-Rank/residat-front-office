import { makeApiPostCall ,makeApiDeleteCall, makeApiGetCall,makeApiPutCall} from '@/api/api'
import { API_ENDPOINTS } from '@/constants/index.js'
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'

const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
// const user = localStorage.getItem(LOCAL_STORAGE_KEYS.userInfo)

const createEvent = async (eventData, authStore, onSuccess, onError) => {

  try {
    const formData = new FormData()

    // Append user data to formData
    formData.append('title', eventData.title)
    formData.append('description', eventData.description)
    formData.append('location', eventData.location)
    formData.append('organized_by', eventData.organized_by)
    formData.append('date_debut', eventData.date_debut)
    formData.append('published_at', eventData.date_debut)
    formData.append('date_fin', eventData.date_fin)
      formData.append('user_id', authStore.user.id)
    // formData.append('user_id', '1')
    formData.append('sector_id', eventData.sector_id)
    formData.append('zone_id', eventData.zone_id)
    formData.append('media', eventData.media)

    const response = await makeApiPostCall(API_ENDPOINTS.event, formData, authToken, true)

    onSuccess()

    return response
  } catch (error) {
    onError(error.response.data.errors)
    throw error
  }
}


const UpdateEvent = async (eventId,eventData, authStore, onSuccess, onError) => {

  try {
    const formData = new FormData()

    // Append user data to formData
    formData.append('title', eventData.title)
    formData.append('description', eventData.description)
    formData.append('location', eventData.location)
    formData.append('organized_by', eventData.organized_by)
    formData.append('date_debut', eventData.date_debut)
    formData.append('published_at', eventData.date_debut)
    formData.append('date_fin', eventData.date_fin)
      formData.append('user_id', authStore.user.id)
    // formData.append('user_id', '1')
    formData.append('sector_id', eventData.sector_id)
    formData.append('zone_id', eventData.zone_id)
    formData.append('media', eventData.media)

    const response = await makeApiPutCall(`${API_ENDPOINTS.event}/${eventId}`, formData, authToken, true)

    onSuccess()

    return response
  } catch (error) {
    onError(error.response.data.errors)
    throw error
  }
}



const getEvents = async (page, size, token) => {
  let defaultSize = 10
  let defaultPage = 0

  size = size || defaultSize
  page = page || defaultPage

  let params = new URLSearchParams({
    size: size.toString(),
    page: page.toString()
  })


  try {
    const response = await makeApiGetCall(
      `${API_ENDPOINTS.getEvents}?${params.toString()}`,
      token ? token : authToken
    )

    return response.data.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}


const getSpecificEvent = async (id) => {
  try {
    const response = await makeApiGetCall(
      `${API_ENDPOINTS.event}/${id.toString()}`,
      authToken
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching event:', error)
    throw error
  }
}


const deleteEvent = async (eventId) => {
  try {
    const response = await makeApiDeleteCall(`${API_ENDPOINTS.event}/${eventId}`, authToken)
    console.log('delete event sucess 1!!!  ' + response.data)
  } catch (error) {
    console.error('Error deleting event:', error)
    throw error
  }
}

export { createEvent ,getEvents,deleteEvent,getSpecificEvent,UpdateEvent}
