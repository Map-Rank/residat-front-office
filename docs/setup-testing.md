

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




## Project Structure 🏗️

```sh
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


## Testing 🧪

Testing is a crucial aspect of the development process, ensuring that the code is robust and behaves as expected. In the Residat project, we employ Vitest for our testing framework, providing an efficient and feature-rich environment for both unit and integration testing. Below is a summary of the current test coverage and details about the testing setup and examples.

### Test Coverage Summary

<!-- <img src="public\assets\images\Documentation\couverageView.jpeg"></img> -->

The test coverage report provides valuable insight into the robustness of our test suite. Here's a brief overview:

- **Overall Coverage**: Approximately 58.67% of statements and 69.58% of branches are covered by tests.
- **Components**: Some components like `EventAlertBox` and `IconWithLabel` have 100% statement coverage, which is excellent. However, other areas like the `src/assets` and `src/plugins` have 0% coverage, indicating potential areas for improvement.
- **Features**: The `SocialProfile` feature has substantial testing with over 96% coverage in some parts, but the `Report` feature has no tests yet.
- **Services and Stores**: The services have about 33% coverage, while the stores are at 26.31%, suggesting that state management testing could be enhanced.

### Test Configuration

Our `vitest.config.js` is set up to generate coverage reports in the 'html/ui' directory and uses V8 as the coverage provider. We have excluded end-to-end test files (`e2e/*`) from our test paths to focus on unit and integration testing. CSS modules are included in the testing environment, which is set to 'jsdom', mimicking a browser environment.

### Testing Scripts

In `package.json`, we've defined scripts to facilitate different testing actions:

- `test:unit`: Runs unit tests in a simulated browser environment.
- `test:coverage`: Generates a coverage report to assess how much of the codebase the tests cover.

### Test Implementations

We have several test cases implemented, such as:

- **BaseCheckbox**: Tests to ensure it accepts props, binds the checked value to `v-model`, and emits the correct payload on changes.
- **BottomNavigationApp**: Verifies rendering of `IconWithLabel` components and the active navigation item identification.
- **SocialProfile**: Mocks service calls and ensures the user profile is fetched and rendered components like `TopProfileInfo` and `AboutUserInfo`.

### Actionable Steps

Based on the test coverage report, we will take the following steps:

- **Increase Test Coverage**: We will write tests for components and features with low or no coverage, focusing particularly on critical paths in the application.
- **Refine Existing Tests**: We will review our current tests to cover more edge cases and ensure they effectively validate the logic, not just pass.
- **Implement Continuous Integration**: We will integrate the test suite into a CI/CD pipeline to run tests with every commit or pull request, maintaining code quality throughout the development lifecycle.

Testing is an ongoing process that evolves with our project. It's essential to maintain high test coverage that reflects the critical functionalities of our application for a stable and reliable platform.


