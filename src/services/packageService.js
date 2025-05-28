import { makeApiGetCall, makeApiPostCall, makeApiPutCall, makeApiDeleteCall } from '@/api/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

// Fetch all packages
const getPackages = async() =>{
    try{
        const response = await makeApiGetCall(API_ENDPOINTS.packages
);
        
        return response.data;
    } catch (error){
        console.error('Error fetching packages:', error);
        throw error;
    }
};
// Fetch multiple packages by their IDs

const getPackagesByIds = async (packageIds)=>{
    try{
    const requests = packageIds.map((id)=>makeApiGetCall(API_ENDPOINTS.packageDetails(id)));
const responses= await Promise.all(requests);
return responses.map((response) => response.data);

}catch (error) {
    console.error('Error fetching packages by IDs:', error);
    throw error;
}
}

const getPackageById = async (id) => {
    try {
      const response = await makeApiGetCall(API_ENDPOINTS.packageDetails(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching package with id ${id}:`, error);
      throw error;
    }
  };


export{
    getPackages, getPackagesByIds, getPackageById};
