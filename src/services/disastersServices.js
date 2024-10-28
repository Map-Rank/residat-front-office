import { makeApiGetCall } from '@/api/api'
import { API_ENDPOINTS, LOCAL_STORAGE_KEYS } from '@/constants/index.js'


const getDisasters = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
    try {
    const response = await makeApiGetCall('/disasters',token)

    return response.data.data
  } catch (error) {
    console.error('Error fetching Disasters:', error)
    throw error
  }
}

const getSpecificDisasters = async (id) => {
  try {
    const response = await makeApiGetCall(`${API_ENDPOINTS.disasters}/${id}`)

    return response.data.data
  } catch (error) {
    console.error('Error fetching Disasters:', error)
    throw error
  }
}

export { getDisasters, getSpecificDisasters }