// src/routes.jsx
import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"

import Home from "./pages/Home"
import Services from "./pages/Services"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AdminDashboard from "./pages/AdminDashboard"

const RoutesComponent = () => {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
      <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
      <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
      <Route path="/admin" element={user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
      <Route path="*" element={<p>Page Not Found</p>} />
    </Routes>
  )
}

export default RoutesComponent