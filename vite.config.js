import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
// vite.config.js
// export default {
//   // other configurations...
//   assetsInclude: ['**/*.js', '**/*.JS'],  // Add support for both lowercase and uppercase JS
// };
