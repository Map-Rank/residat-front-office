import { makeApiPostCall } from '@/api/api'
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'
import { getFcmToken } from '@/firebaseConfig.js'
// import convertToDate from '../../../utils/dateFormat.js'
// import { getFcmToken } from '@/firebaseConfig';


const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)

const registerUser = async (userData, authStore, onSuccess, onError) => {

  try {
    const formData = new FormData()

    formData.append('first_name', userData.first_name)
    formData.append('last_name', userData.last_name)
    formData.append('email', userData.email)
    formData.append('phone', userData.phone)
    formData.append('password', userData.password)
    formData.append('gender', userData.gender)
    formData.append('zone_id', userData.zone)
    // formData.append('avatar', userData.avatar)

    //since i get date as a string here am converting to  a date type
    // const dateOfBirth = convertToDate(userData.date_of_birth)
    // formData.append('date_of_birth', dateOfBirth)

    const fcmToken = await getFcmToken()
    if (fcmToken) {
      formData.append('fcm_token', fcmToken)
    }


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
    if (error.response?.data?.errors) {
      onError(error.response.data.errors);
    } else {
      console.log('No errors found in the response.' + error);
    }

    throw error
  }
}


const institutionalRequest = async (institutionData, authStore, onSuccess, onError) => {

  try {
    const formData = new FormData()

    formData.append('company_name', institutionData.company_name)
    formData.append('owner_name', institutionData.owner_name)
    formData.append('description', institutionData.description)
    formData.append('email', institutionData.email)
    formData.append('phone', institutionData.phone)
    formData.append('password', institutionData.password)
    formData.append('gender', institutionData.gender)
    formData.append('zone_id', institutionData.zone)
    formData.append('profile_picture', institutionData.profile_picture)
    // formData.append('official_document', institutionData.documents[0])

    // institutionData.documents.forEach((doc, index) => {

    //     formData.append(`official_document[${index}]`, doc, doc.name)

    // })
    const response = await makeApiPostCall('/create/request', formData, null, true)
    console.log('request send  successfull !!!!')
    onSuccess()

    return response
  } catch (error) {
    if (error.response?.data?.errors) {
      onError(error.response.data.errors);
    } else {
      console.log('No errors found in the response.' + error);
    }

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
    // formData.append('email', userData.email)
    formData.append('phone', userData.phone)
    formData.append('date_of_birth', userData.date_of_birth)
    formData.append('gender', userData.gender)
    // formData.append('zone_id', userData.zone)
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

    const fcmToken = await getFcmToken()
    if (fcmToken) {
      formData.append('fcm_token', fcmToken)
    }

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

      // Get FCM token
      const fcmToken = await getFcmToken()
      if (fcmToken) {
        // const updateTokenResponse = await makeApiPostCall(API_ENDPOINTS.updateFcmToken, { fcmToken }, token);
        console.log('FCM token updated successfully.')
      }

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
    const formData = {
      old_password: userData.old_password,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
      _method: 'PUT'
    }

    const response = await makeApiPostCall(
      `${API_ENDPOINTS.UpdatePassword}`,
      formData,
      authToken,
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

const ForgotPassword = async (userData, onSuccess, onError) => {
  // console.log(userData.email);
  const formData = new FormData()
  formData.append('email', userData.email)

  try {
    const endpoint = `/forgot-password`;
    const response = await makeApiPostCall(endpoint, formData, true);
    // console.log(response.status == 200);
    // return response.data.data;
    if (response.status == 200) {
      onSuccess();
    }
  } catch (error) {
    onError(error.response.data.errors)
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const ResetPassword = async (emailFromUrl, userData, token, onSuccess, onError) => {

  // console.log(userData.email);
  const formData = new FormData()
  formData.append('email', emailFromUrl)
  formData.append('password', userData.password)
  formData.append('password_confirmation', userData.password_confirmation)
  formData.append('token', token)

  try {
    const endpoint = `/reset-password`;
    const response = await makeApiPostCall(endpoint, formData, true);
    // console.log(response.status == 200);
    // return response.data.data;
    if (response.status == 200) {
      onSuccess();
    }
  } catch (error) {
    onError(error.response.data.errors)
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export { registerUser, institutionalRequest, loginUser, logOut, UpdateUser, UpdatePassword, ForgotPassword, ResetPassword }
