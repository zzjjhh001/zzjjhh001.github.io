import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../../',
  },
  plugins: [
    vue(),
    vueJsx(),
    resolveExternalsPlugin({
      "cos-js-sdk-v5": "COS"
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
