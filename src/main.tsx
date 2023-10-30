import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.scss"

import App from "./App.tsx"

import AuthContext from "./store/context/authContext.tsx"
import TypingSettingsContext from "./store/context/typingSettingsContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContext>
      <TypingSettingsContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TypingSettingsContext>
    </AuthContext>
  </React.StrictMode>
)
