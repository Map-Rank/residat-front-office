import { makeApiGetCall } from '@/api/api' 
import {  API_ENDPOINTS,LOCAL_STORAGE_KEYS } from '@/constants/index.js'

const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)



  const getReport = async (zoneId,reportType) => {

    const params = new URLSearchParams({ 
        zone_id: zoneId.toString(),
    });
    
 
    if (reportType !== null && reportType !== undefined) {
        params.set('type', reportType.toString());
    }

    try {
      const response = await makeApiGetCall(
        `${API_ENDPOINTS.report}?${params.toString()}`,authToken
      )

      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching zones:', error);
      throw error;
    }
  }
  export {getReport}