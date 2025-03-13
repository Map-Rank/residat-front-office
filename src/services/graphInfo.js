import { makeApiGetCall } from '@/api/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { format } from 'date-fns';

const fetchWaterStressData = async (zoneId) => {
  try {
    const formattedDate = format(new Date(), 'yyyy-MM-dd');
    const url = `${API_ENDPOINTS.predictions}?zone_id=${zoneId}&date=${formattedDate}`;

    const res = await makeApiGetCall(url);

    console.log('response', res.data.status);

    if (!res.data.status) {
      throw new Error(res.data.message);
    }

    const response = res.data.data;

    // Utilisation de Promise.all pour traiter les risques en parallèle
    const risks = await Promise.all(
      ['d1_risk', 'd2_risk', 'd3_risk', 'd4_risk', 'd5_risk'].map(async (riskKey) => {
        const riskData = response[riskKey];
        return {
          date: riskData.date,
          waterLevelIndex: riskData.waterLevelIndex,
          droughtRiskPercent: riskData.droughtRiskPercent,
          floodRiskPercent: riskData.floodRiskPercent,
        };
      })
    );

    console.log('risks', risks);

    return risks;
  } catch (error) {
    console.error('Error fetching water stress data:', error);
    throw error;
  }
};

export { fetchWaterStressData };
