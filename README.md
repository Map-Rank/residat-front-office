# residat-front-office

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Residat Project Structure
```sh
    Residat-Front-Office
    ├─ .vscode/              # Editor configuration files
    ├─ dist/                 # Compiled files ready for deployment
    ├─ node_modules/         # npm packages
    ├─ public/               # Public assets like index.html
    ├─ src/                  # Source code for the application
    │  ├─ assets/            # Global assets (images, fonts, etc.)
    │  ├─ components/        # Reusable Vue components
    │  │  ├─ base/           # Base components (e.g., BaseButton)
    │  │  ├─ common/         # Common components (Header, Footer)
    │  │  └─ ui/             # UI components (e.g., Modal, Dropdown)
    │  ├─ features/          # Feature-specific components and logic
    │  │  ├─ ChatRoom/       # Chatroom components and services
    │  │  └─ Community/      # Community components and services
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


