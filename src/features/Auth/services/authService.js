import { makeApiPostCall } from '@/api/api'
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'

const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

const registerUser = async (userData, authStore, onSuccess, onError) => {
  try {
    const formData = new FormData()
    console.log(userData)

    // Append user data to formData
    formData.append('first_name', userData.first_name)
    formData.append('last_name', userData.last_name)
    formData.append('email', userData.email)
    formData.append('phone', userData.phone)
    formData.append('date_of_birth', userData.date_of_birth)
    formData.append('password', userData.password)
    formData.append('gender', userData.gender)
    formData.append('zone_id', userData.zone)
    formData.append('avatar', userData.avatar)

    const response = await makeApiPostCall(API_ENDPOINTS.register, formData, null, true)
    const user = response.data.data
    const token = response.data.data.token
    console.log('register successfull !!!!')

    authStore.setUser(user)
    localStorage.setItem(LOCAL_STORAGE_KEYS.userInfo, JSON.stringify(user))
    localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, token)
    localStorage.setItem(LOCAL_STORAGE_KEYS.isloggedIn, true)
    onSuccess()
    // }

    return response
  } catch (error) {
    onError(error.response.data.errors)
    throw error
  }
}

const UpdateUser = async (userData, authStore, onSuccess, onError) => {
  try {
    const formData = new FormData()
    const userId = userData.id
    // console.log(userData)
    console.log('==============> this is the token' + userData.token)

    // Append user data to formData
    formData.append('first_name', userData.first_name)
    formData.append('last_name', userData.last_name)
    formData.append('email', userData.email)
    formData.append('phone', userData.phone)
    formData.append('date_of_birth', userData.date_of_birth)
    formData.append('gender', userData.gender)
    formData.append('zone_id', userData.zone)
    // formData.append('avatar', userData.avatar)
    formData.append('_method', 'PUT')
    if (userData.avatar !== null) {
      formData.append('avatar', userData.avatar)
    }

    const response = await makeApiPostCall(
      `${API_ENDPOINTS.UpdateUser}/${userId}`,
      formData,
      userData.token,
      true
    )
    const user = response.data.data
    console.log('============> register update user !!!!')

    authStore.setUser(user)
    localStorage.setItem(LOCAL_STORAGE_KEYS.userInfo, JSON.stringify(user))
    // localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, userData.token)
    localStorage.setItem(LOCAL_STORAGE_KEYS.isloggedIn, true)
    onSuccess()
    // }

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

    if (response.data) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.authToken) //TODO remove this and but it in logout function later

      authStore.setUser(user)
      authStore.settoken(token)
      localStorage.setItem(LOCAL_STORAGE_KEYS.userInfo, JSON.stringify(user))
      localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, token)
      localStorage.setItem(LOCAL_STORAGE_KEYS.isloggedIn, true)

      onSuccess()
    }
  } catch (error) {
    onError(error.response.data.errors)
    throw error
  }
}

const logOut = async (authStore) => {
  authStore.logOut()
}

const UpdatePassword = async (userData, onSuccess, onError) => {
  try {
    const formData = new FormData()
    console.log('==============> this is the token' + userData.token)

    // Append user data to formData
    formData.append('old_password', userData.old_password)
    formData.append('password', userData.password)
    formData.append('password_confirmation ', userData.password_confirmation)
    formData.append('_method', 'PUT')

    const response = await makeApiPostCall(
      `${API_ENDPOINTS.UpdatePassword}`,
      formData,
      userData.token,
      true
    )
    console.log('============>  updated password !!!!')

    onSuccess()
    // }

    return response
  } catch (error) {
    onError(error.response.data.errors)
    throw error
  }
}

export { registerUser, loginUser, logOut, UpdateUser, UpdatePassword }
