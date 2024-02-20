<h1 align="center">Welcome to residat-front-platform 👋</h1>

[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)](#)
[![License: agpl](https://img.shields.io/badge/License-agpl-yellow.svg)](#)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)


RESIDAT is a digital platform for sharing place-based information on climate risks from spatial data and citizen science reports .This platform shall have five main components 
- Visualization of place-based climate risks
- information through dashboards 
- Hosting of published reports by community stakeholders 
- Chatroom for community climate realities
- Sending out mobile notifications by local and regional climate authoritative bodies.


## Table of Contents 📚
1. [Introduction](#introduction-)
2. [Context](#motivation-)
3. [Features](#features-)
4. [Project Structure](#project-structure-)
4. [Project Setup](#project-structure-)
9. [API Integration](#api-integration-)
5. [Services](#services-)
6. [State Management](#state-management-)
7. [Components](#components-)
8. [Routing and Navigation](#routing-and-navigation-)
10. [Testing](#testing-)
11. [Build and Deployment](#build-and-deployment-)
12. [Local Development](#local-development-)
13. [Contributing](#contributing-)
14. [FAQs](#faqs-)
15. [Code of Conduct](#code-of-conduct-)
16. [License](#license-)
17. [Acknowledgments](#acknowledgments-)
18. [Change Log](#change-log-)

## Introduction 🌟

Residat is a digital platform designed to enhance community resilience by providing access to climate risk information in Cameroon. It leverages spatial data and citizen science reports to visualize climate risks through interactive GIS dashboards. The platform offers a suite of features including:

- Visualization Dashboards: Interactive maps and graphs for understanding local climate risks and stakeholder activities.
- Community Intelligence: A repository for stakeholders to publish, manage, and interact with climate adaptation reports.
- Community Chat Rooms: Spaces for real-time discussion and exchange of climate-related information and services.

Residat serves as a critical tool for local and regional climate authoritative bodies to send out mobile notifications and engage communities in proactive climate risk management.

## Context 💡

Residat was born from the necessity to mitigate climate risks for communities in Cameroon. It targets the heart of climate vulnerability by providing critical, actionable data through GIS visualizations and real-time reports. The platform's goal is to empower communities and authorities to make informed decisions, enabling proactive and collaborative efforts towards climate resilience. In the face of increasing climate challenges, Residat stands as a beacon of innovation and solidarity.

## Features ✨

Residat offers a powerful suite of features designed to provide stakeholders with comprehensive climate risk data and facilitate community engagement in climate resilience:

- Interactive GIS Dashboards: Leveraging cutting-edge GIS technology, Residat provides dynamic maps and graphs that allow users to visualize and interact with climate risk data specific to their local communities.

- Community Intelligence Reports: A dedicated space for stakeholders to publish, manage, and interact with reports on climate adaptation efforts. These reports provide valuable insights into local initiatives and challenges.

- Real-Time Community Chat Rooms: These forums offer a space for stakeholders to discuss climate realities, share observations, and promote climate services, fostering a community-driven approach to climate resilience.

- Mobile Notifications: Integration with mobile platforms ensures that stakeholders receive timely updates and warnings about climate hazards, enabling swift and informed responses to emerging risks.

- Citizen Science Contributions: Encouraging local community members to contribute data and reports, Residat amplifies the reach and accuracy of climate risk information through citizen science.

- Data-Driven Insights: By analyzing spatial data and user-contributed reports, Residat provides actionable insights that support climate risk management and decision-making processes.

- Stakeholder Engagement Tools: Features designed to enhance collaboration among various actors, including local authorities, NGOs, businesses, and academia, to drive collective action in climate adaptation.

## Project Structure 🏗️

```sh
    Residat-Front-Office/
    ├─ .vscode/              # Editor configuration files
    ├─ dist/                 # Compiled files ready for deployment
    ├─ node_modules/         # npm packages
    ├─ public/               # Public assets like index.html
    ├─ src/                  # Source code for the application
    │  ├─ assets/            # Global assets (images, fonts, etc.)
    │  ├─ components/        # Reusable Vue components
    │  │  ├─ base/           # Base components (e.g., BaseButton)
    │  │  │  └─ tests/       # Test suite for Base components
    │  │  ├─ common/         # Common components (Header, Footer)
    │  │  │  └─ tests/       # Test suite for Common components
    │  │  └─ ui/             # UI components (e.g., Modal, Dropdown)
    │  │     └─ tests/       # Test suite for UI components
    │  ├─ features/          # Feature-specific components and logic
    │  │  ├─ ChatRoom/       # Chatroom components and services
    │  │  │  └─ tests/       # Test suite for Chatroom feature
    │  │  └─ Community/      # Community components and services
    │  │     └─ tests/       # Test suite for Community feature
    │  ├─ router/            # Vue-router configuration
    │  ├─ stores/            # Vuex store modules
    │  ├─ App.vue            # Root Vue component
    │  └─ main.js            # Entry point for the Vue app
    ├─ tests/                # Test suite
    │  ├─ e2e/               # End-to-end tests
    │  └─ unit/              # Unit tests
    ├─ .dockerignore         # Files to exclude from Docker context
    ├─ .eslintrc.js          # ESLint configuration
    ├─ .gitignore            # Files excluded from git
    ├─ .prettierrc.json      # Prettier configuration
    ├─ Dockerfile            # Docker configuration for builds
    ├─ index.html            # Entry HTML file
    ├─ package-lock.json     # Auto-generated package lock for npm
    ├─ package.json          # Project metadata and dependencies
    ├─ postcss.config.js     # PostCSS configuration
    ├─ README.md             # Project documentation
    ├─ tailwind.config.js    # Tailwind CSS configuration
    ├─ vite.config.js        # Vite configuration
    └─ vitest.config.js      # Vitest configuration

```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
### Tests Couverage [Vitest](https://vitest.dev/)

#### Run Tests Couverage [Vitest](https://vitest.dev/)
```sh
npm run test:coverage --coverage.enabled=true
```

#### Preview Tests Couverage [Vitest](https://vitest.dev/)
```sh
npx vite preview --outDir html
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```



## API Integration 🤝

Residat leverages Axios for seamless interaction with backend services, encapsulated within a structured approach to handle different types of API requests. The core functionality revolves around three custom functions designed to streamline the process of making API calls:

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
Through these tailored functions, Residat ensures secure, efficient, and clear API interactions, supporting the platform's functionality from content management to user engagement.



## Services 📡

Based on the service examples you've provided, the "Services" section of your README can highlight the structure and functionality of your service layer within the Residat project. This section will explain how services are organized, their roles, and how they interact with the API to perform various operations like fetching zones, creating posts, managing user profiles, and more.

---

## Services 📡

In Residat, services are crucial for abstracting the logic required to communicate with the backend API. They encapsulate the Axios API calls, providing a clean and reusable interface for the rest of the application to interact with the backend. Here's an overview of how services are structured and utilized:

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

This section provides a comprehensive view of how services function within Residat, highlighting their importance in the application architecture. If you have specific aspects of the services you'd like to dive deeper into or any other parts of the project documentation you want to explore next, please let me know!

Based on the state management code snippets you've provided, we can document how state management is implemented in the Residat project using Pinia. This will cover the structure and functionality of different stores, including `alert`, `auth`, and `sector` stores, and how they are used to manage application state.

---



## State Management with Pinia 🔄

Residat utilizes Pinia, a state management library for Vue.js, to manage and centralize application state efficiently. Pinia offers a more flexible and straightforward approach to managing state compared to Vuex, making it an excellent choice for Vue 3 applications. Below, we detail the implementation and usage of several key stores within Residat.

### Alert Store

The `alert` store manages notification messages across the application. It allows setting alerts with dynamic content, variant, and timeout duration.

- **State**: Holds the message, variant (e.g., info, success, error), timeout, and visibility of the alert.
- **Actions**: Includes `setAlert`, which sets the alert's content and makes it visible for a specified duration before automatically hiding it.

```javascript
// src/stores/alertStore.js
import { defineStore } from 'pinia';
import { AlertStates } from '../components';

export default defineStore('alert', { /* State and actions */ });
```

### Auth Store

The `auth` store manages user authentication data, including the user object, authentication token, login status, and email verification status.

- **State**: Contains user data, authentication token, login status, and email verification status.
- **Getters**: Offers computed properties like `hiddenClass` to dynamically control UI elements based on the user's authentication status.
- **Actions**: Handles user login, logout, and state initialization based on local storage data.

```javascript
// src/stores/authStore.js
import { defineStore } from 'pinia';
import { LOCAL_STORAGE_KEYS } from '../constants';

export default defineStore('auth', { /* State, getters, and actions */ });
```

### Sector Store

The `sector` store is responsible for managing sector-related data, crucial for categorizing posts and user interests.

- **State**: Stores sector data fetched from the backend.
- **Getters**: Provides access to all sectors.
- **Actions**: Includes an `initializeStore` action that fetches and caches sector data in local storage for quick access.

```javascript
// src/stores/sectorStore.js
import { defineStore } from 'pinia';
import { getSectors } from '../services/sectorService';

export default defineStore('sector', { /* State, getters, and actions */ });
```

### Best Practices

- **Modularity**: Each store is dedicated to a specific aspect of the application's state, promoting modularity and ease of maintenance.
- **Reactivity**: Pinia stores are reactive out of the box, allowing components to automatically update when the state changes.
- **Persistence**: Critical states, like authentication information and user preferences, are persisted in local storage to enhance the user experience across sessions.

---

This documentation provides an overview of how state management is handled within Residat, highlighting the use of Pinia stores to manage different aspects of the application's state efficiently. If there are specific details or additional stores you would like to include, please let me know!



## Components 🧩

In Residat, components are the building blocks of the application's user interface. We use Vue.js components to encapsulate and manage the behavior of different parts of the user interface. This section documents the base components that are frequently used throughout the application.

### Base Components

Base components are designed to be reusable and serve as the foundation for the user interface. Here's a look at some of the base components in Residat:

#### BaseCheckbox

`BaseCheckbox` is a customizable checkbox component that can be used in forms across the application.

- **Props**:
  - `list`: An object that contains the checkbox properties like name and value.
- **Data**:
  - `checked`: A boolean to track whether the checkbox is checked.
- **Methods**:
  - `updateCheckedItems`: Emits a custom event with the checkbox state.
- **Usage**:

```vue
<BaseCheckbox
  :list="{ name: 'Example', value: 'example' }"
  @change="handleCheckboxChange"
/>
```

#### ButtonUi

`ButtonUi` is a flexible button component with customizable styles and icons.

- **Props**:
  - `label`: The text to be displayed on the button.
  - `leftIcon`: The icon displayed on the left side of the button.
  - `rightIcon`: The icon displayed on the right side of the button.
  - `type`: The type attribute of the button element.
  - `...`: Additional styling and behavior props.
- **Methods**:
  - `handleClick`: Handles click events and emits a custom event if the button is not disabled or loading.
- **Usage**:

```vue
<ButtonUi
  label="Click Me"
  :leftIcon="leftIconPath"
  :rightIcon="rightIconPath"
  @clickButton="handleButtonClick"
/>
```

#### SearchBar

`SearchBar` is a search input component that allows users to search through zones by name.

- **Data**:
  - `searchQuery`: The model for the search input.
  - `zones`: The list of all zones.
  - `filteredZones`: The list of zones filtered by the search query.
- **Methods**:
  - `filterZones`: Filters the `zones` list based on the search query.
  - `searchZone`: Navigates to the search result page with the selected zone.
  - `getAllZones`: Fetches all zones from the backend on component creation.
- **Usage**:

```vue
<SearchBar />
```
Based on the component examples provided, here's a brief technical documentation section for the base components that you can add to your `README.md` file:

#### TitleSubtitle

Displays a title and a subtitle or message.

- **Props**:
  - `label`: The title text.
  - `message`: The message or subtitle text.
- **Example Usage**:

```vue
<TitleSubtitle label="Primary Title" message="Supporting message goes here." />
```

#### BaseDropdown

A dropdown component that allows users to select from a list of options.

- **Props**:
  - `options`: An array of objects representing the dropdown options.
- **Data**:
  - `selectedOption`: The currently selected option.
- **Methods**:
  - `updateSelectedOption`: Updates the selected option and emits selection events.
- **Example Usage**:

```vue
<BaseDropdown :options="[{ name: 'Option1', id: 1 }, { name: 'Option2', id: 2 }]" />
```


#### BaseImagePicker

An image file input component styled as a button.

- **Props**:
  - `accept`: File types that the input accepts.
  - `iconImg`: (Optional) Icon to display on the button.
  - `label`: Text to display on the button.
- **Methods**:
  - `handleFileChange`: Emits the selected files when changed.
- **Example Usage**:

```vue
<BaseImagePicker label="Upload Image" @handleFileChange="handleFiles" />
```

---

To document the common components based on the provided Vue component examples, let's create succinct descriptions that include their purposes and highlight key properties and events.



### Common Components 

#### ShowPost

A component for displaying detailed post information, including media, comments, and interactions.

- **Props**:
  - `id` (post ID for fetching details).
- **Methods**:
  - `commentPost`: commenting on a post.
- **Example Usage**:

```vue
<ShowPost :id="postId" />
```


#### ShareModal

A modal for sharing a post's link to various social media platforms with copy-to-clipboard functionality.

- **Props**:
  - `showModal` (controls visibility).
  - `postLink` (URL of the post)
  - `message` (share message)
- **Methods**:
  - `close`: close the modal when emited.
- **Example Usage**:

```vue
<ShareModal :showModal="isShown" :postLink="postUrl" :message="message" />
```

#### PostInput

An input component for creating a new post or event with quick action buttons.

- **Methods**:
  - `navigateCreatePost`:  Emits content to the parent when the post is ready to be created.
- **Example Usage**:

```vue
<PostInput />
```

#### IconWithLabel

A versatile component for displaying an icon with optional top, bottom, left, or right labels.

- **Props**:
  - `svgContent` 
  - `svgContent`
  - `svgContentHover`
  - `labelTextTop`
  - `labelTextTop`
  - `labelTextRight`
  - `labelTextLeft`
  - `isActive`
  - `iconDesktopSize`
  - `iconMobileSize`

- **Methods**:
  - `clickIcon`: clickIcon t emmit and event 
  - `customFunction`
- **Example Usage**:

```vue
<IconWithLabel svgContent="/path/to/icon.svg" labelTextBottom="Label" />
```


#### EventAlertBox

Displays upcoming event alerts with details like title, date, location, and organizer.

- **Props**:
  - `title` 
  - `organizer`
  - `date`
  - `location`
  - `eventImage`
  - `sectionTitle`

- **Example Usage**:

```vue
<EventAlertBox title="Event Title" organizer="Organizer Name" />
```

#### BottomNavigationApp

Provides bottom navigation functionality, typically for mobile views.

- **Props**:
  - `navItems` (for navigation).
- **Methods**:
  - `isActive`: To check if the navigation item corresponds to the current route.
- **Example Usage**:

```vue
<BottomNavigationApp />
```

#### AlertForm

Shows alert messages with different levels of severity determined by the type of alert state.

- **Props**:
  - `store` to access the store.
  - `useAlertStore` to manage alert messages.
- **Methods**:
  - `isActive`: To check if the navigation item corresponds to the current route.
- **Example Usage**:

```vue
<AlertForm />
```

---


## Routing and Navigation 🚏

// Details on Vue Router setup and navigation structure.


## Testing 🧪

// Approach to testing, including frameworks and libraries.


## Contributing 🤲

// Guidelines for contributing to the project.

## FAQs ❓

// Answers to frequently asked questions.

## Code of Conduct 📜

// The expectations for community conduct.

## License ⚖️

// Open-source license information.

## Acknowledgments 🙏

// Credits to contributors and special mentions.

## Change Log 📝

// Log of changes and version history.




