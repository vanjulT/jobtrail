import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import "./animations.css"
import App from "./App.jsx"
import { ApplicationsProvider } from "@/context/ApplicationsContext"
import { AuthProvider } from "@/context/AuthContext"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApplicationsProvider>
          <App />
        </ApplicationsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)