# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Project Setup:
#### Initialize React App with Vite (Recommended for speed)
```bash
npm create vite@latest to_do_app -- --template react
cd to_do_app
npm install
```

#### Install and Initialise Tailwind CSS
```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

#### Configure Tailwind
- Update `tailwind.config.js`:
```bash
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
]
```

- Add Tailwind directives to `src/index.css`:
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Install Dependencies
```bash
npm install uuid
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```
- Add any missing properties of scripts to `package.json`:
```bash
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
}
```
### Convert to TypeScript
- Using Vitest:
```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom @types/jest
```
- For `uuid` library
```bash
npm install uuid
npm install --save-dev @types/uuid
```

#### Run the application locally
```bash
npm run dev
```

#### Build the application
```bash
npm run build
```