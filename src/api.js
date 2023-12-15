import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
  // baseURL: 'http://localhost:8000/api/',

})

const makeApiPostCall = async (endpoint, postData, authToken, ismedia ,id) => {
  let contentType

  if (ismedia) {
    contentType = 'multipart/form-data'
  } else {
    contentType = 'application/json'
  }
  let url = id ? `${endpoint}/${id}` : endpoint
  
  const response = await api.post(url, postData, {

    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${authToken}`
    }
  })

  return response
}



const makeApiGetCall = async (endpoint, authToken, id) => {
  let url = id ? `${endpoint}/${id}` : endpoint
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`

    }
  })
  return response
}

const makeApiDeleteCall = async (endpoint, authToken) => {


  const response = await api.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  return response
}

export { api, makeApiPostCall, makeApiGetCall ,makeApiDeleteCall}

