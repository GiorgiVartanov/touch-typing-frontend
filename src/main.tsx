import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.scss"

import App from "./App.tsx"

import AuthProvider from "./store/context/authContext.tsx"
import AppSettingsProvider from "./store/context/appSettingsContext.tsx"
import TypingSettingsProvider from "./store/context/typingSettingsContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppSettingsProvider>
        <TypingSettingsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TypingSettingsProvider>
      </AppSettingsProvider>
    </AuthProvider>
  </React.StrictMode>
)
