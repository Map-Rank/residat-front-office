import { makeApiPostCall } from '@/api'; // Import the makeApiPostCall function


const registerEndpoint = '/register';
const loginEndpoint = '/login'

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
    const response = await makeApiPostCall(registerEndpoint, formData);
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
    const response = await makeApiPostCall(loginEndpoint, formData);

    console.log(response.data.data)
    const user = response.data.data
    const token = response.data.data.token;

    //storing user in the store and also the token in localStorage
    authStore.setUser(user)
    localStorage.setItem('authToken', token);


    onSuccess();
  } catch (error) {
    onError("Login Error: Unable to log in with the provided credentials");
    console.error('Login error:', error);
    throw error;
  }
};


export { registerUser, loginUser };
