import { makeApiGetCall } from '@/api/api'
import {  API_ENDPOINTS } from '@/constants/index.js'


  const getZones = async (level_id, parent_id) => {
    let params = new URLSearchParams();
  
    if (level_id !== null && level_id !== undefined) {
      params.append('level_id', level_id);
    }
  
    if (parent_id !== null && parent_id !== undefined) {
      params.append('parent_id', parent_id);
    }
  
    try {
      const response = await makeApiGetCall(
        `${API_ENDPOINTS.zone}?${params.toString()}`
      )
  
      console.log(response)
      return response.data.data;
    } catch (error) {
      console.error('Error fetching zones:', error);
      throw error;
    }
  }
  


  export {getZones}