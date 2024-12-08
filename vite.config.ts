import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export const aliases = {
  '@shared': path.resolve(__dirname, './src/shared'),
  '@entities': path.resolve(__dirname, './src/entities'),
  '@features': path.resolve(__dirname, './src/features'),
  '@pages': path.resolve(__dirname, './src/pages'),
  '@app': path.resolve(__dirname, './src/app'),
  '@widgets': path.resolve(__dirname, './src/widgets'),
}

export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: aliases,
  },

  define: {
    'process.env': {},
  },
})
