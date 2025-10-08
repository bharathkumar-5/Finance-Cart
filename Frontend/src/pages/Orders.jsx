import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import apiClient from "../api/apiClient"

const Orders = () => {
  const { token } = useContext(AuthContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiClient.get("/orders") // <- apiClient handles baseURL and token
        setOrders(res.data)
      } catch {
        alert("Failed to fetch orders")
      }
    }
    fetchOrders()
  }, [token])

  if (!orders.length) {
    return <p className="p-6 text-center text-gray-500 text-lg">No orders found.</p>
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map(order => {
          const groupedItems = order.items.reduce((acc, item) => {
            const key = `${item.service._id}_${item.plan}`
            if (!acc[key]) acc[key] = { ...item, quantity: item.quantity }
            else acc[key].quantity += item.quantity
            return acc
          }, {})
          const itemsToRender = Object.values(groupedItems)
          const totalFee = itemsToRender.reduce(
            (sum, item) => sum + item.service.fee * item.quantity,
            0
          )
          return (
            <div key={order._id} className="border rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition">
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Order ID: {order._id.slice(-6).toUpperCase()}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <ul className="mb-3 space-y-1">
                {itemsToRender.map(item => (
                  <li key={`${item.service._id}_${item.plan}`} className="text-gray-700">
                    <span className="font-medium">{item.service.name}</span> - Plan: {item.plan || "Default"} - Qty: {item.quantity}
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold text-lg text-teal-600">Total: ${totalFee}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
