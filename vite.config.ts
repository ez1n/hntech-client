import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

//export default defineConfig({
//  plugins: [react()],
//  server: {
//    proxy: {
//      '/api': {
//        target: 'http://13.124.84.147',
//        changeOrigin: true,
//        rewrite: (path) => path.replace(/^\/api/, '')
//      }
//    }
//  }
//});

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': {
        target: 'http://13.124.84.147',
        changeOrigin: true
      }
    }
  }
});