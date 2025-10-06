import React, { createContext, useState, useEffect } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  useEffect(() => {
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem("user"))
        setUser(userData || null)
      } catch {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [token])

  const login = (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", jwtToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
