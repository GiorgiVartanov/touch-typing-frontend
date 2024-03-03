import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "./index.scss"
import "react-toastify/dist/ReactToastify.css"

import App from "./App.tsx"

import AuthProvider from "./store/context/authContext.tsx"
import AppSettingsProvider from "./store/context/appSettingsContext.tsx"
import TypingSettingsProvider from "./store/context/typingSettingsContext.tsx"
import PlayProvider from "./store/context/playContext.tsx"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppSettingsProvider>
        <TypingSettingsProvider>
          <PlayProvider>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </BrowserRouter>
            </QueryClientProvider>
          </PlayProvider>
        </TypingSettingsProvider>
      </AppSettingsProvider>
    </AuthProvider>
  </React.StrictMode>
)
