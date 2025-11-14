import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // Allow access from network (mobile devices)
    port: 5173,
    strictPort: false,
    // Optimize server performance
    hmr: {
      overlay: false, // Disable error overlay for faster HMR
      clientPort: 5173, // Explicit port for HMR
    },
    // Optimize file watching
    watch: {
      usePolling: false, // Use native file system events (faster)
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
    },
    // Reduce latency
    fs: {
      strict: false, // Allow serving files outside root for faster dev
    },
  },
  // Optimize build performance
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n-vendor': ['react-i18next', 'i18next'],
        },
      },
    },
    // Enable source maps only in development
    sourcemap: mode === 'development',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-i18next',
      'i18next',
      'framer-motion',
      'lucide-react',
    ],
    // Exclude large dependencies from pre-bundling if needed
    exclude: [],
  },
}));
