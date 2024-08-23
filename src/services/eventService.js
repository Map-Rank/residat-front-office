import { makeApiPostCall ,makeApiDeleteCall, makeApiGetCall,makeApiPutCall} from '@/api/api'
import { API_ENDPOINTS } from '@/constants/index.js'
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'
import { checkAuthentication } from '@/utils/authUtils.js';

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
    
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
    const response = await makeApiPostCall(API_ENDPOINTS.event, formData, token, true)

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


const filterEvent = async (params) => {
  try {
    const response = await makeApiGetCall(`${API_ENDPOINTS.event}?${params.toString()}`, authToken)
    console.log('post filtered!!')
    return response.data.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

const getFilterEvents = async (zoneId, sectorId, size, page) => {
  let defaultSize = 20
  let defaultPage = 0

  size = size || defaultSize
  page = page || defaultPage

  let params = new URLSearchParams({
    size: size.toString(),
    page: page.toString(),
    zone_id: zoneId,
  })

  if (sectorId && sectorId.length > 0) {
    params.append('sectors', JSON.stringify(sectorId));
  }

  return await filterEvent(params)
}


const getEvents = async (page, size, token,isConnected = true) => {
  let defaultSize = 10
  let defaultPage = 0

  size = size || defaultSize
  page = page || defaultPage

  let params = new URLSearchParams({
    size: size.toString(),
    page: page.toString()
  })


  try {
    let url;

    console.log('this is the usre state'+ isConnected)
    isConnected ? url = API_ENDPOINTS.getEvents : url = API_ENDPOINTS.getEventsGuest


    const response = await makeApiGetCall(
      `${url}?${params.toString()}`,
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
    let url;
    const isConnected = checkAuthentication()

    isConnected ? url = API_ENDPOINTS.event : url = API_ENDPOINTS.getSingleEventsGuest

    const response = await makeApiGetCall(
      `${url}/${id.toString()}`,
      authToken
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching event:', error)
    throw error
  }
}


const deleteEvent = async (eventId) => {

  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

  try {
    const response = await makeApiDeleteCall(`${API_ENDPOINTS.event}/${eventId}`, token)
    console.log('delete event sucess 1!!!  ' + response.data)
  } catch (error) {
    console.error('Error deleting event:', error)
    throw error
  }
}

export { createEvent ,getEvents, getFilterEvents,deleteEvent,getSpecificEvent,UpdateEvent}
