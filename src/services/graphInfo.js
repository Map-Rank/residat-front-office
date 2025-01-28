import { makeApiGetCall } from '@/api/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { format } from 'date-fns';

const fetchWaterStressData = async (zoneId, date) => {
  try {
    // Format date to match Laravel's expected format (YYYY-MM-DD)
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    
    // Construct URL with query parameters as expected by Laravel
    const response = await makeApiGetCall(API_ENDPOINTS.predictions, {
      params: {
        zone_id: zoneId,
        date: formattedDate
      }
    });

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
