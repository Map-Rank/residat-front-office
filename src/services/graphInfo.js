import { makeApiGetCall } from '@/api/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { format } from 'date-fns';

const fetchWaterStressData = async (zoneId) => {
    try {
        // Format date to match Laravel's expected format (YYYY-MM-DD)
        const formattedDate = format(new Date(), 'yyyy-MM-dd');
        
        // Construct the full URL with query parameters
        const url = `${API_ENDPOINTS.predictions}?zone_id=${zoneId}&date=${formattedDate}`;
        
        // Make the API call with the constructed URL
        const response = await makeApiGetCall(url);
    
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
    
  

  } catch (error) {
    console.error('Error fetching water stress data:', error);
    throw error;
  }
};

export { fetchWaterStressData };
