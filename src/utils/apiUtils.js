// utils/apiUtils.js

function handleApiResponse(response, onSuccess, onError) {
  if (response.status) {
    onSuccess("Success: " + response.data.message);
  } 
  else {
    onError("Unhandled Status Code: " + response.data.message);
  }
}

export { handleApiResponse };
