import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
import apiClient from "../api/apiClient" // use apiClient instead of axios

const Services = () => {
  const [services, setServices] = useState([])
  const { token, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiClient.get("/services") // ✅ use apiClient
        setServices(res.data)
      } catch {
        alert("Failed to fetch service")
      }
    }
    fetchServices()
  }, [])

  const addToCart = async service => {
    if (!token) {
      alert("Please login first")
      navigate("/login", { state: { from: location.pathname } })
      return
    }
    const payload = {
      serviceId: service._id,
      plan: service.plan || "Default",
      addOns: service.addOns || [],
      quantity: 1
    }
    try {
      await apiClient.post("/cart/add", payload, { headers: { Authorization: `Bearer ${token}` } }) // ✅ use apiClient
      alert("Added to cart")
    } catch (error) {
      if (error.response?.status === 401) {
        const reLogin = window.confirm("Unauthorized, log in again?")
        if (reLogin) navigate("/login", { state: { from: location.pathname } })
      } else {
        alert("Failed to add to cart")
      }
    }
  }

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.name]) acc[service.name] = []
    acc[service.name].push(service)
    return acc
  }, {})

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-700">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {Object.keys(groupedServices).length > 0 ? (
          Object.entries(groupedServices).map(([name, list]) => (
            <div key={name} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold mb-4">{name}</h3>
              {list.map(service => (
                <div key={service._id} className="border-t mt-2 pt-3">
                  <p className="text-gray-600">{service.description}</p>
                  <p className="mt-1 font-bold">Fee: ${service.fee}</p>
                  {service.plan && <p>Plan: {service.plan}</p>}
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => addToCart(service)}
                      className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No services available</p>
        )}
      </div>
    </div>
  )
}

export default Services
