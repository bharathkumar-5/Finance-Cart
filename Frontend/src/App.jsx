// src/App.jsx
import React from "react"
import { BrowserRouter } from "react-router-dom"
import RoutesComponent from "./routes"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <RoutesComponent />
    </BrowserRouter>
  </AuthProvider>
)

export default App
