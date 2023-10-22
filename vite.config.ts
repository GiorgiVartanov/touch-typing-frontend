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
            // icon of a website, will be used as an icon when user download this app
            src: "/icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
        background_color: "#121212",
        theme_color: "#121212",
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
