import { createContext, useContext } from "react"
import useLocalStorage from "@/hooks/useLocalStorage"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [userName, setUserName] = useLocalStorage("jobtrail-user", null)

  function login(name) {
    setUserName(name)
  }

  function logout() {
    setUserName(null)
  }

  const value = {
    userName,
    isLoggedIn: userName !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}