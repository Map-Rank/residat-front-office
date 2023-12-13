
import { makeApiPostCall } from '@/api'; // Import the makeApiPostCall function
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js';



const registerUser = async (userData, onSuccess, onError) => {
  try {
    const formData = new FormData();

    // Append user data to formData
    formData.append('first_name', userData.first_name);
    formData.append('last_name', userData.last_name);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('date_of_birth', userData.date_of_birth);
    formData.append('password', userData.password);
    formData.append('gender', userData.gender);
    formData.append('zone_id', 1);


    // Use makeApiPostCall for the API request
    const response = await makeApiPostCall(API_ENDPOINTS.register, formData);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.authToken);   //TODO remove this and but it in logout function later
   
    const token = response.data.data.token;
    console.log('register successfull !!!!')
    localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, token);


    return response;
  }
  catch (error) {
    onError("Server Error: Internal server error");
    console.error('Registration error:', error);
    throw error;
  }
};




const loginUser = async (userCredentials, authStore, onSuccess, onError) => {


  try {
    const formData = new FormData();

    formData.append('email', userCredentials.email);
    formData.append('password', userCredentials.password);


    // Use makeApiPostCall for the API request
    const response = await makeApiPostCall(API_ENDPOINTS.login, formData);


    console.log(response.data.data)
    const user = response.data.data
    const token = response.data.data.token;

    localStorage.removeItem(LOCAL_STORAGE_KEYS.authToken);  //TODO remove this and but it in logout function later


    authStore.setUser(user)
    localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, token);


    onSuccess();
  } catch (error) {
    onError("Login Error: Unable to log in with the provided credentials");
    console.error('Login error:', error);
    throw error;
  }
};

// const logOut = async (authStore)=>{
//   authStore.logOut()
// }




export { registerUser, loginUser };
