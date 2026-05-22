import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      // ── PWA Plugin: genera SW con Workbox + manifest automático ──────────
      VitePWA({
        registerType: 'autoUpdate', // SW se actualiza automáticamente sin intervención
        includeAssets: ['icon-192.png', 'icon-512.png'], // Assets estáticos a precachear
        devOptions: {
          enabled: true
        },

        // ── Manifest (reemplaza public/manifest.json) ─────────────────────
        manifest: {
          name: 'Salud Conecta IA',
          short_name: 'SaludConecta',
          description: 'Ecosistema de salud pública inteligente con triaje por IA, mapas de stock y pasaporte digital de salud.',
          start_url: '/',
          display: 'standalone',
          background_color: '#001c3b',
          theme_color: '#005fb0',
          orientation: 'portrait-primary',
          categories: ['health', 'medical'],
          lang: 'es',
          dir: 'ltr',
          icons: [
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },

        // ── Workbox: estrategia de caché ───────────────────────────────────
        workbox: {
          // Precachear todos los assets generados por el build
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf}'],

          // Caché en runtime para recursos externos (CDN)
          runtimeCaching: [
            {
              // Leaflet CSS y JS desde unpkg CDN
              urlPattern: /^https:\/\/unpkg\.com\/leaflet/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'leaflet-cdn-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              // Google Fonts CSS y archivos de fuentes
              urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              // Firebase API calls — NetworkFirst para tener datos frescos cuando hay red
              urlPattern: /^https:\/\/firestore\.googleapis\.com/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'firebase-api-cache',
                networkTimeoutSeconds: 10,
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 24 * 60 * 60, // 1 día
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],

          // Fallback a index.html para navegación SPA
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api/],

          // No precachear archivos demasiado grandes
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        },
      }),
    ],
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
      proxy: {
        // Redirigir peticiones /api/* al servidor Express backend
        // para que el frontend pueda acceder a Healthcare API de forma transparente
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    build: {
      // Optimizar el output para Vercel
      outDir: 'dist',
      emptyOutDir: true,
      minify: 'terser',
      target: 'esnext',
      // Configurar code splitting explícitamente
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Chunks para lazy-loaded components
            if (id.includes('PremiumHealthMap')) {
              return 'PremiumHealthMap';
            }
            if (id.includes('HealthMap')) {
              return 'HealthMap';
            }
            if (id.includes('TriageChecker')) {
              return 'TriageChecker';
            }
            // Vendor chunks
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) {
                return 'firebase';
              }
              if (id.includes('motion')) {
                return 'motion';
              }
              if (id.includes('react')) {
                return 'react-vendor';
              }
            }
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      // Reducir tamaño de chunks
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
    },
  };
});
