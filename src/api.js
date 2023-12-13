import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


const makeApiPostCall = async (endpoint, postData, authToken) => {
  const response = await api.post(endpoint, postData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  });
  return response;
};


const makeApiGetCall = async (endpoint, authToken,id) => {
  let url = id ? `${endpoint}/${id}` : endpoint;
  const response = await api.get(url, {
    headers: {
      'Authorization': `Bearer ${authToken}`

    }
  });
  return response;
}


export { api, makeApiPostCall, makeApiGetCall };

