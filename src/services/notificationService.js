import { makeApiPostCall, makeApiDeleteCall, makeApiGetCall, makeApiPutCall } from '@/api/api'
import { API_ENDPOINTS } from '../constants/apiEndpoints'
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'

const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
// const user = localStorage.getItem(LOCAL_STORAGE_KEYS.userInfo)

const createNotification = async (notificationData, authStore, onSuccess, onError) => {

    try {
        const formData = new FormData()

        // Append user data to formData
        formData.append('titre_en', notificationData.title)
        formData.append('titre_fr', notificationData.title)
        formData.append('content_en', notificationData.content)
        formData.append('content_fr', notificationData.content)
        // formData.append('firebase_id', authStore.user.id)
        formData.append('user_id', authStore.user.id)
        formData.append('zone_id', notificationData.zone_id)

      if (notificationData.media) {
        formData.append('image', notificationData.media);
      }
      

      const localToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
        console.log("this is the api" + API_ENDPOINTS.notifications)

        const response = await makeApiPostCall("/notifications", formData, localToken, true)

        onSuccess()

        return response
    } catch (error) {
        onError(error.response)
        throw error
    }
}


const UpdateNotification = async (notificationId, notificationData, authStore, onSuccess, onError) => {

    try {
        const formData = new FormData()

         // Append user data to formData
         formData.append('titre_en', notificationData.title)
         formData.append('titre_fr', notificationData.title)
         formData.append('content_en', notificationData.content)
         formData.append('content_fr', notificationData.content)
         formData.append('firebase_id', authStore.user.id)
         formData.append('user_id', authStore.user.id)
         formData.append('zone_id', notificationData.zone_id)
         formData.append('image', notificationData.media)

        const response = await makeApiPutCall(`${API_ENDPOINTS.notifications}/${notificationId}`, formData, authToken, true)

        onSuccess()

        return response
    } catch (error) {
        onError(error.response.data.errors)
        throw error
    }
}


const filterNotification = async (params) => {
    try {
        const response = await makeApiGetCall(`${API_ENDPOINTS.notifications}?${params.toString()}`, authToken)
        console.log('post filtered!!')
        return response.data.data
    } catch (error) {
        console.error('Error fetching posts:', error)
        throw error
    }
}

const getFilterNotifications = async (zoneId, sectorId, size, page) => {
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

    return await filterNotification(params)
}


const getNotifications = async (page, size, token) => {
    let defaultSize = 10
    let defaultPage = 0

    size = size || defaultSize
    page = page || defaultPage

    let params = new URLSearchParams({
        size: size.toString(),
        page: page.toString()
    })
// Add the lastNotificationId to the parameters if it is provided


    try {
        const response = await makeApiGetCall(
            `${API_ENDPOINTS.getNotifications}?${params.toString()}`,
            token ? token : authToken
        )

        return response.data.data
    } 
    catch (error) {
        console.error('Error fetching posts:', error)
        throw error
    }
};


const getSpecificNotification = async (id) => {
    try {
        const response = await makeApiGetCall(
            `${API_ENDPOINTS.notifications}/${id.toString()}`,
            authToken
        )
        return response.data.data
    } catch (error) {
        console.error('Error fetching notification:', error)
        throw error
    }
}


const deleteNotification = async (notificationId) => {
    try {
        const response = await makeApiDeleteCall(`${API_ENDPOINTS.notifications}/${notificationId}`, authToken)
        console.log('delete notification sucess !!!  ' + response.data)
    } catch (error) {
        console.error('Error deleting notification:', error)
        throw error
    }
}

export { createNotification, getNotifications, getFilterNotifications, deleteNotification, getSpecificNotification, UpdateNotification }
