import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

const makeApiPostCall = async (endpoint, Data, authToken, ismedia, id) => {
  let contentType

  if (ismedia) {
    contentType = 'multipart/form-data'
  } else {
    contentType = 'application/json'
  }
  let url = id ? `${endpoint}/${id}` : endpoint

  const response = await api.post(url, Data, {

    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${authToken}`
    }
  })

  return response
}

const makeApiPutCall = async (endpoint, Data , authToken, ismedia) => {
  let contentType

  if (ismedia) {
    contentType = 'multipart/form-data'
  } else {
    contentType = 'application/json'
  }
 

  const response = await api.put(endpoint, Data, {

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



export { api, makeApiPostCall, makeApiGetCall, makeApiDeleteCall,makeApiPutCall }
