import { makeApiGetCall } from '@/api/api' // Import the makeApiPostCall function
import {  API_ENDPOINTS } from '@/constants/index.js'



  const getZones = async (level_id, parent_id) => {
    let params = new URLSearchParams();
  
    // Add level_id to the params if it is not null
    if (level_id !== null && level_id !== undefined) {
      params.append('level_id', level_id);
    }
  
    // Add parent_id to the params if it is not null
    if (parent_id !== null && parent_id !== undefined) {
      params.append('parent_id', parent_id);
    }
  
    try {
      const response = await makeApiGetCall(
        `${API_ENDPOINTS.zone}?${params.toString()}`
      )
  
      return response.data.data;
    } catch (error) {
      console.error('Error fetching zones:', error);
      throw error;
    }
  }

  const getSpecificZones = async (id) => {

    try {
      const response = await makeApiGetCall(
        `${API_ENDPOINTS.zone}/${id}`
      )
  
      return response.data.data;
    } catch (error) {
      console.error('Error fetching zones:', error);
      throw error;
    }
  }

  


  export {getZones,getSpecificZones}