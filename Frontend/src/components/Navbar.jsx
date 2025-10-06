import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { FiShoppingCart, FiMenu, FiX, FiChevronDown } from "react-icons/fi"

export default function Navbar() {
  const { user, token, logout } = useContext(AuthContext)
  const [cartCount, setCartCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      if (!token || user?.role === "admin") {
        setCartCount(0)
        return
      }
      try {
        const res = await axios.get("/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCartCount(res.data?.items?.length || 0)
      } catch {
        setCartCount(0)
      }
    }
    fetchCart()
  }, [token, user?.role])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-teal-600 to-blue-600 shadow-xl">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-wider hover:text-yellow-300 transition-all duration-300"
        >
          VertoFX
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-white font-medium">
          <Link className="hover:text-yellow-300 transition-all duration-300" to="/">Home</Link>
          <Link className="hover:text-yellow-300 transition-all duration-300" to="/services">Services</Link>

          {user && user?.role !== "admin" && (
            <Link className="hover:text-yellow-300 transition-all duration-300" to="/orders">Orders</Link>
          )}

          {user?.role === "admin" && (
            <div className="relative">
              <button
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className="flex items-center gap-1 hover:text-yellow-300 transition-all duration-300"
              >
                Admin 
                <FiChevronDown className={`transition-transform ${adminDropdownOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-44 animate-slide-down">
                  <Link
                    to="/admin"
                    onClick={() => setAdminDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-teal-100 transition-colors duration-200 rounded"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          )}

          {user && user?.role !== "admin" && (
            <button
              onClick={() => navigate("/cart")}
              className="relative hover:text-yellow-300 transition-all duration-300"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-all duration-300 text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="hover:text-yellow-300 transition-all duration-300" to="/login">Login</Link>
              <Link className="hover:text-yellow-300 transition-all duration-300" to="/signup">Signup</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-teal-600 text-white p-4 space-y-4 animate-slide-down">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block hover:text-yellow-300 transition-all duration-300">Home</Link>
          <Link to="/services" onClick={() => setMobileOpen(false)} className="block hover:text-yellow-300 transition-all duration-300">Services</Link>
          {user && user?.role !== "admin" && (
            <Link to="/orders" onClick={() => setMobileOpen(false)} className="block hover:text-yellow-300 transition-all duration-300">Orders</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="block hover:text-yellow-300 transition-all duration-300">Admin Dashboard</Link>
          )}
          {user ? (
            <button
              onClick={() => { handleLogout(); setMobileOpen(false) }}
              className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block hover:text-yellow-300 transition-all duration-300">Login</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="block hover:text-yellow-300 transition-all duration-300">Signup</Link>
            </>
          )}
        </div>
      )}

      <style>
        {`
          @keyframes slide-down {
            0% { opacity: 0; transform: translateY(-10px) }
            100% { opacity: 1; transform: translateY(0) }
          }
          .animate-slide-down {
            animation: slide-down 0.3s ease-out forwards
          }
        `}
      </style>
    </nav>
  )
}
