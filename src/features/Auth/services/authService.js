import { makeApiCall } from '@/api'; // Import the makeApiCall function

const registerEndpoint = '/register';
const loginEndpoint='/login'

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

    // Use makeApiCall for the API request
    const response = await makeApiCall(registerEndpoint, formData);
    return response;
  }
  catch (error) {
    onError("Server Error: Internal server error");
    console.error('Registration error:', error);
    throw error;
  }
};




const loginUser = async (userCredentials, onSuccess, onError) => {

  console.log(userCredentials)
  try {
    const formData = new FormData();

    // Append email and password to formData
    formData.append('email', userCredentials.email);
    formData.append('password', userCredentials.password);

    // Use makeApiCall for the API request
    const response = await makeApiCall(loginEndpoint, formData);
    
    // Assuming the API call returns a token upon successful login
    const token = response.data.token;
    
    // Handle successful login
    onSuccess(token);
  } catch (error) {
    onError("Login Error: Unable to log in with the provided credentials");
    console.error('Login error:', error);
    throw error;
  }
};


export { registerUser , loginUser };
