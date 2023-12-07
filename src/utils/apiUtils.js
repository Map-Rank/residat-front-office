// utils/apiUtils.js

function handleApiResponse(response, onSuccess, onError) {
  if (response.status) {
    onSuccess("Success: " + response.data.message);
  } 
//   else if (response.status === 422) {
//     onError("Validation Error: " + response.data.errors);
//   } else if (response.status === 404) {
//     onError("Not Found Error: Resource not found");
//   } else if (response.status === 500) {
//     onError("Server Error: Internal server error");
//   } 
  else {
    onError("Unhandled Status Code: " + response.data.message);
  }
}

export { handleApiResponse };
