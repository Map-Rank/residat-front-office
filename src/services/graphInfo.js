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
    
    // // Transform the response to match your chart's expected format
    // const predictions = response.data.predictions;
    // return {
    //   zoneName: response.data.zone,
    //   date: response.data.date,
    //   waterStressData: [
    //     { Date: response.data.date, WaterStressLevel: predictions.day_1.risk * 100 },
    //     { Date: addDays(new Date(response.data.date), 1), WaterStressLevel: predictions.day_2.risk * 100 },
    //     { Date: addDays(new Date(response.data.date), 2), WaterStressLevel: predictions.day_3.risk * 100 },
    //     { Date: addDays(new Date(response.data.date), 3), WaterStressLevel: predictions.day_4.risk * 100 },
    //     { Date: addDays(new Date(response.data.date), 4), WaterStressLevel: predictions.day_5.risk * 100 }
    //   ]
    // };

  } catch (error) {
    console.error('Error fetching water stress data:', error);
    throw error;
  }
};

export { fetchWaterStressData };
