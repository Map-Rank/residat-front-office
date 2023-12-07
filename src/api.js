import axios from 'axios';

// Create an instance of Axios with default properties

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Function to make API calls
const makeApiCall = async (endpoint, formData) => {

    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;

}

export { api, makeApiCall };
