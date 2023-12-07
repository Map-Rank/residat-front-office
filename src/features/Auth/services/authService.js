import { makeApiCall } from '@/api'; // Import the makeApiCall function

const registerEndpoint = '/register';

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

export { registerUser };
