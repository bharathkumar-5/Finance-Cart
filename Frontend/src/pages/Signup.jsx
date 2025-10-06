import React, { useState } from "react"
import axios from "axios"
import { validateEmail, validatePassword } from "../utils/validators"
import { useNavigate, Link } from "react-router-dom"
import heroImg from "../assets/finance-hero.jpg"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateEmail(email)) {
      alert("Invalid email")
      return
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters")
      return
    }
    try {
      await axios.post("/api/users/signup", { name, email, password })
      alert("Signup successful")
      navigate("/login")
    } catch {
      alert("Signup failed")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side Hero Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10"></div>
        <div className="absolute bottom-16 left-16 text-white max-w-xs space-y-4">
          <h1 className="text-4xl font-bold">Welcome to VertoFX</h1>
          <p className="text-lg">Manage your subscriptions and finances with smart tools</p>
        </div>
      </div>

      {/* Right Side Signup Card */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create Your Account</h2>
          <p className="text-gray-600 text-center mb-8">Start managing your finances effortlessly</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-500 hover:text-green-700 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button className="bg-green-500 text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg transform transition hover:-translate-y-0.5">
              Signup
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Signup
