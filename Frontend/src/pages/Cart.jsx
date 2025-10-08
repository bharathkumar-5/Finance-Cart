import React, { useEffect, useState, useContext, useCallback } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import apiClient from "../api/apiClient"
import emptyCartImg from "../assets/empty-cart.png"

const Cart = () => {
  const { token } = useContext(AuthContext)
  const [cart, setCart] = useState(null)
  const navigate = useNavigate()

  const fetchCart = useCallback(async () => {
    try {
      const res = await apiClient.get("/cart", { headers: { Authorization: `Bearer ${token}` } })
      setCart(res.data)
    } catch {
      alert("Failed to fetch cart")
    }
  }, [token])

  const removeItem = async id => {
    try {
      await apiClient.delete(`/cart/remove/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      fetchCart()
    } catch {
      alert("Failed to remove item")
    }
  }

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    try {
      await apiClient.patch(`/cart/update/${itemId}`, { quantity: newQuantity }, { headers: { Authorization: `Bearer ${token}` } })
      fetchCart()
    } catch {
      alert("Failed to update quantity")
    }
  }

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  if (!cart || !cart.items?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
        <img src={emptyCartImg} alt="Empty Cart" className="w-64 h-64 mb-6 object-contain" />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Your cart is empty!</h2>
        <p className="text-gray-500 mb-4">Looks like you haven't added any services yet.</p>
        <button onClick={() => navigate("/services")} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
          Browse Services
        </button>
      </div>
    )
  }

  const groupedItems = cart.items.reduce((acc, item) => {
    const key = `${item.service._id}_${item.plan}`
    if (!acc[key]) acc[key] = { ...item, quantity: item.quantity }
    else acc[key].quantity += item.quantity
    return acc
  }, {})

  const itemsToRender = Object.values(groupedItems)
  const totalFee = itemsToRender.reduce((sum, item) => sum + item.service.fee * item.quantity, 0)

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Your Cart</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {itemsToRender.map(item => (
            <div key={`${item._id}_${item.plan}`} className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row justify-between items-center">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.service.name}</h3>
                <p className="text-gray-600">{item.plan || "Default Plan"}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="bg-gray-300 px-2 rounded hover:bg-gray-400 disabled:opacity-50" disabled={item.quantity === 1}>-</button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="bg-gray-300 px-2 rounded hover:bg-gray-400">+</button>
                </div>
                <p className="font-bold">${item.service.fee * item.quantity}</p>
                <button onClick={() => removeItem(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-1/3 bg-green-100 p-6 rounded-xl shadow-lg flex flex-col items-center sticky top-20">
          <h3 className="text-xl font-semibold mb-4 text-green-800">Total Fee</h3>
          <p className="text-3xl font-bold text-green-900 mb-6">${totalFee}</p>
          <button onClick={() => navigate("/checkout")} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
