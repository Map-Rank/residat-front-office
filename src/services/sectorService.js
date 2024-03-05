import { makeApiGetCall } from '@/api' // Import the makeApiPostCall function
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'


const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

const getSectors = async () => {
    try {
      const response = await makeApiGetCall(API_ENDPOINTS.sector, authToken)
      return response.data.data
    } catch (error) {
      console.error('Error fetching all sectors:', error)
      throw error
    }
  }


  export {getSectors}