import React, { createContext, useState, useEffect } from "react"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("fintrackr_token"))
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("fintrackr_user")
    return saved ? JSON.parse(saved) : null
  })

  const setAuthData = (newToken, newUser) => {
    if (newToken) {
      localStorage.setItem("fintrackr_token", newToken)
      setToken(newToken)
    }
    if (newUser) {
      localStorage.setItem("fintrackr_user", JSON.stringify(newUser))
      setUser(newUser)
    }
  }

  const clearAuthData = () => {
    localStorage.removeItem("fintrackr_token")
    localStorage.removeItem("fintrackr_user")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        setAuthData,
        clearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
