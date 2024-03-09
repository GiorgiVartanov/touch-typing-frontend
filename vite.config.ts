import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import svgr from "vite-plugin-svgr"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        icons: [
          {
            // icon of a website, is used as an app icon when user downloads this app
            src: "/icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
        name: "Touch Typing Learning Platform",
        short_name: "Touch Typing",
        display: "minimal-ui",
        background_color: "#817dd8",
        theme_color: "#817dd8",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              // it will cache data from every request that starts with /api
              return url.pathname.startsWith("/api")
            },
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                // it will only cache responses with the positive status codes
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
})
