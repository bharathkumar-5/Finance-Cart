import React, { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, useLocation, Link } from "react-router-dom"
import heroImg from "../assets/loginbackground.jpg"

const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || "/"

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/users/login", { email, password })
      login(res.data.user, res.data.token)
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard", { replace: true })
      } else {
        navigate(from, { replace: true })
      }
    } catch {
      alert("Login failed")
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative w-full max-w-md p-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white text-center">Login to VertoFX</h2>
        <p className="text-gray-200 text-center">Manage your finances and subscriptions easily</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/60 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/60 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white font-medium hover:text-blue-200 transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transform transition hover:-translate-y-0.5">
            Login
          </button>
        </form>
        <p className="text-gray-200">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 font-medium hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
