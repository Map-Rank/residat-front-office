import { makeApiGetCall } from '@/api' // Import the makeApiPostCall function
import {  API_ENDPOINTS } from '@/constants/index.js'



const getZones = async () => {
    try {
      const response = await makeApiGetCall(API_ENDPOINTS.zone)
      return response.data.data
    } catch (error) {
      console.error('Error fetching all Zones:', error)
      throw error
    }
  }


  export {getZones}