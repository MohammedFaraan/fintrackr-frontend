import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // 1. Keep your Tailwind v4 plugin
import path from 'path'                    // 2. Add this line to handle shortcuts

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()                         // 3. Keep Tailwind active in the plugins array
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'), // 4. Add this map so shadcn knows where /src is
    },
  },
})
