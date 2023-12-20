import { makeApiPostCall } from '@/api' 
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'

const registerUser = async (userData, onSuccess, onError) => {
  try {
    const formData = new FormData()

    // Append user data to formData
    formData.append('first_name', userData.first_name)
    formData.append('last_name', userData.last_name)
    formData.append('email', userData.email)
    formData.append('phone', userData.phone)
    formData.append('date_of_birth', userData.date_of_birth)
    formData.append('password', userData.password)
    formData.append('gender', userData.gender)
    formData.append('zone_id', 1)

    const response = await makeApiPostCall(API_ENDPOINTS.register, formData)
    const token = response.data.data.token
    console.log('register successfull !!!!')
    localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, token)
    onSuccess()

    return response
  } catch (error) {
    onError(error.response.data.errors)
    throw error
  }
}

const loginUser = async (userCredentials, authStore, onSuccess, onError) => {
  try {
    const formData = new FormData()

    formData.append('email', userCredentials.email)
    formData.append('password', userCredentials.password)

    const response = await makeApiPostCall(API_ENDPOINTS.login, formData)

    const user = response.data.data
    const token = response.data.data.token

    localStorage.removeItem(LOCAL_STORAGE_KEYS.authToken) //TODO remove this and but it in logout function later

    authStore.setUser(user)
    localStorage.setItem(LOCAL_STORAGE_KEYS.userInfo, JSON.stringify(user))
    localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, token)
    localStorage.setItem(LOCAL_STORAGE_KEYS.isloggedIn, true)

    onSuccess()
  } catch (error) {
    onError(error.response.data.errors)
    throw error
  }
}

const logOut = async (authStore) => {
  authStore.logOut()
}

export { registerUser, loginUser, logOut }
