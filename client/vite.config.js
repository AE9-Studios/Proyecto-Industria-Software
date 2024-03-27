import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
// import mkcert from 'vite-plugin-mkcert'

const manifestForPluginPWA = {
  registerType: 'autoUpdate',
  devOptions: {
    enabled: true
  },
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: 'Óptica Classic Vision',
    short_name: 'ClassicVision',
    description: 'öptica Classic Vision: Visión y Estilo a tu alcance',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPluginPWA), 
    // mkcert()
  ],
  preview: {
    host: true,
    port: 4173, //when not running preview in docker compose, para dev si ejecuta fuera de docker descomentar cuando no se este corriendo en docker compose
    // https: {
    //   key: 'ssl/classic-vision-privateKey.key',
    //   cert: '/ssl/classic-vision.crt'
    // }
  },
  server: {
    host: true,
    port: 5173, //When not running with docker compose, this is the port which will be used in docker (descomentar cuando no se este corriendo en docker compose)
    // https: {
    //   key: 'ssl/classic-vision-privateKey.key',
    //   cert: '/ssl/classic-vision.crt'
    // }
  },
})
