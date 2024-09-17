

## State Management with Pinia 🔄

 <a href="https://dev.residat.com/community">RESIDAT</a> utilizes Pinia, a state management library for Vue.js, to manage and centralize application state efficiently. Pinia offers a more flexible and straightforward approach to managing state compared to Vuex, making it an excellent choice for Vue 3 applications. Below, we detail the implementation and usage of several key stores within  <a href="https://dev.residat.com/community">RESIDAT</a>.

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

This documentation provides an overview of how state management is handled within  <a href="https://dev.residat.com/community">RESIDAT</a>, highlighting the use of Pinia stores to manage different aspects of the application's state efficiently. If there are specific details or additional stores you would like to include, please let me know!



## Components 🧩

In  <a href="https://dev.residat.com/community">RESIDAT</a>, components are the building blocks of the application's user interface. We use Vue.js components to encapsulate and manage the behavior of different parts of the user interface. This section documents the base components that are frequently used throughout the application.

### Base Components

Base components are designed to be reusable and serve as the foundation for the user interface. Here's a look at some of the base components in  <a href="https://dev.residat.com/community">RESIDAT</a>:

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


### Common Components 

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
