<div style="">
  <a href="https://map-rank.github.io/residat-front-office/" 
     style="color: #7AA64E;text-align: center;padding: 14px 16px;text-decoration: none ; font-size: 17px;">
     Home Page</a>
  <a href="https://map-rank.github.io/residat-front-office/setup-testing" 
     style="color: #7AA64E;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 17px;">
     Project Setup and Testing </a>
  <a href="https://map-rank.github.io/residat-front-office/state-component" 
     style="color: #7AA64E;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 17px;">
     State and Components</a>
  <a href="https://map-rank.github.io/residat-front-office/api-examples" 
     style="color: #7AA64E;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 17px; font-weight: bold;">
     API Examples</a>
</div>



## API Integration 🤝

 <a href="https://dev.residat.com/community">RESIDAT</a> leverages Axios for seamless interaction with backend services, encapsulated within a structured approach to handle different types of API requests. The core functionality revolves around three custom functions designed to streamline the process of making API calls:

### Configuring Axios

The Axios instance is configured with a base URL, sourced from an environment variable, ensuring all API requests are directed to the correct server endpoint. This configuration is essential for both development and production environments.

### API Call Functions

- **`makeApiPostCall`**: Used for creating or updating resources. It supports JSON and multipart/form-data, making it versatile for submissions including text and media.
- **`makeApiGetCall`**: Retrieves data from the server. It's used extensively across the application to fetch posts, user profiles, and climate data.
- **`makeApiDeleteCall`**: Removes resources identified by a specific endpoint, essential for deleting posts or other user-generated content.

### Authentication and Headers

All requests are authenticated using Bearer tokens, with the `Authorization` header carrying the token. The `Content-Type` header is dynamically set based on the request content.

### Detailed Use Cases

#### Creating a Post

To create a post, especially with media, `makeApiPostCall` is used:

- **Code Snippet File  Path**: `src/features/Post/services/postService.js`
```javascript
    const createPost = async (postData) => {
    const authToken = localStorage.getItem('authToken');
    const formData = new FormData();

    // Append post details to formData
    formData.append('content', postData.content);
    formData.append('published_at', new Date().toISOString());
    postData.images.forEach((image, index) => {
        formData.append(`media[${index}]`, image, image.name);
    });

    // Make API call
    const response = await makeApiPostCall(API_ENDPOINTS.createPost, formData, authToken, true);
    return response.data;
    };
```

#### Fetching Posts

Retrieving posts utilizes, `makeApiGetCall` is used:


- **Code Snippet File  Path**: `src/features/Post/services/postService.js`
```javascript
  const getPosts = async () => {
      const authToken = localStorage.getItem('authToken');
  const response = await makeApiGetCall(API_ENDPOINTS.getPosts, authToken);
  return response.data.posts;
};
```

#### Deleting Posts

To delet a specific post , `makeApiDeleteCall` is used:

- **Code Snippet File  Path**: `src/features/Post/services/postService.js`
```javascript
const deletePost = async (postId) => {
    const authToken = localStorage.getItem('authToken');
  await makeApiDeleteCall(`${API_ENDPOINTS.deletePost}/${postId}`, authToken);
};

```

### Conclusion
Through these tailored functions,  <a href="https://dev.residat.com/community">RESIDAT</a> ensures secure, efficient, and clear API interactions, supporting the platform's functionality from content management to user engagement.



## Services 📡

In  <a href="https://dev.residat.com/community">RESIDAT</a>, services are crucial for abstracting the logic required to communicate with the backend API. They encapsulate the Axios API calls, providing a clean and reusable interface for the rest of the application to interact with the backend. Here's an overview of how services are structured and utilized:

### Structure

Services are organized under the `src/services` directory, with each service module corresponding to a specific domain or functionality within the application, such as posts, users, sectors, and zones. This modular approach ensures clear separation of concerns and enhances maintainability.

### Key Services

- **Zone Service**: Manages operations related to geographic zones, such as retrieving zone information based on specific criteria.

```javascript
// src/services/zoneService.js
import { makeApiGetCall } from '@/api';
import { API_ENDPOINTS } from '@/constants';

const getZones = async (level_id, parent_id) => { /* Implementation */ };
export { getZones };
```

- **Post Service**: Handles creating, fetching, updating, and deleting posts. It utilizes multipart form data for posts that include media.

```javascript
// src/services/postService.js
import { makeApiPostCall, makeApiGetCall, makeApiDeleteCall } from '@/api';
import { API_ENDPOINTS } from '@/constants';

const createPost = async (postData) => { /* Implementation */ };
const getPosts = async () => { /* Implementation */ };
// Additional post-related functions...
export { createPost, getPosts, /* other exports */ };
```

- **Sector Service**: Retrieves sector information, crucial for categorizing posts and user interests.

```javascript
// src/services/sectorService.js
import { makeApiGetCall } from '@/api';
import { API_ENDPOINTS } from '@/constants';

const getSectors = async () => { /* Implementation */ };
export { getSectors };
```

### Usage

Services are invoked from Vue components or store actions to perform data operations. By centralizing API calls within services, we achieve a DRY codebase and simplify the process of updating or extending API interactions.

### Authentication

Most service functions require an authentication token, which is managed globally and passed as a parameter to ensure secure access to user-specific data and operations.

### Error Handling

Services are designed to handle errors gracefully, either logging them for developers or throwing them to be caught by calling components, allowing for user-friendly error messages.

---

This section provides a comprehensive view of how services function within  <a href="https://dev.residat.com/community">RESIDAT</a>, highlighting their importance in the application architecture. If you have specific aspects of the services you'd like to dive deeper into or any other parts of the project documentation you want to explore next, please let me know!

Based on the state management code snippets you've provided, we can document how state management is implemented in the  <a href="https://dev.residat.com/community">RESIDAT</a> project using Pinia. This will cover the structure and functionality of different stores, including `alert`, `auth`, and `sector` stores, and how they are used to manage application state.

---

