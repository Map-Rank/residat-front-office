import { makeApiGetCall } from '@/api/api' 
import {  API_ENDPOINTS,LOCAL_STORAGE_KEYS } from '@/constants/index.js'

const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

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
const getSpecificMapZones = async (parent_id, name, size, level_id, token) => {
  let defaulWithVector = 1;
  let params = new URLSearchParams();

  // Check each parameter and only set if not null or undefined
  if (parent_id != null) params.append('parent_id', parent_id.toString());
  if (name != null) params.append('name', name.toString());
  if (size != null) params.append('size', size.toString());
  if (defaulWithVector != null) params.append('with_vector', defaulWithVector.toString());

  try {
    const response = await makeApiGetCall(
      `${API_ENDPOINTS.zone}?${params.toString()}`,
      token || authToken
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching zones:', error);
    throw error;
  }
};

  


  export {getZones,getSpecificZones,getSpecificMapZones}