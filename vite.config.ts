import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(
        [env.VITE_GEMINI_API_KEY, env.GEMINI_API_KEY, env.GOOGLE_API_KEY, env.VITE_GEMINI_API_KEY, env.GEMINI_KEY, env.GOOGLE_AI_KEY]
          .find(k => k && !['MY_GEMINI_API_KEY', 'YOUR_API_KEY', 'MISSING'].includes(k)) || 'MISSING'
      ),
      'import.meta.env.VITE_GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(
        [env.VITE_GOOGLE_MAPS_PLATFORM_KEY, env.GOOGLE_MAPS_PLATFORM_KEY, env.GOOGLE_MAP_API_KEY, env.GOOGLE_MAPS_API_KEY, env.MAPS_API_KEY]
          .find(k => k && !['MY_MAPS_API_KEY', 'YOUR_API_KEY', 'MISSING'].includes(k)) || 'MISSING'
      ),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
