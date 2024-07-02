import { makeApiPostCall} from '@/api/api'
import { API_ENDPOINTS } from '../constants/apiEndpoints'
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'

const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

const createFeedback = async (feedbackData, authStore, onSuccess, onError) => {

    try {
        const formData = new FormData()

        // Append user data to formData
        formData.append('text', feedbackData.text)
        formData.append('page_link', feedbackData.page_link)
        formData.append('rating', feedbackData.rating)
        // formData.append('file', feedbackData.file)


        console.log("this is the api" + API_ENDPOINTS.createFeedback)

        const response = await makeApiPostCall(API_ENDPOINTS.createFeedback, formData, authToken, true)

        onSuccess()

        return response
    } catch (error) {
        onError(error.response)
        throw error
    }
}

export { createFeedback}
