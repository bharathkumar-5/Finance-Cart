import React, { useContext, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const paymentMethods = [
  { id: "upi", name: "UPI" },
  { id: "gpay", name: "Google Pay" },
  { id: "phonepe", name: "PhonePe" }
]

const Checkout = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [email, setEmail] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")

  const handlePayment = async () => {
    if (!selectedPayment || !email) {
      alert("Select payment method and enter email")
      return
    }
    setPaymentStatus(`Processing ${selectedPayment} payment...`)
    setTimeout(async () => {
      try {
        const res = await axios.post(
          "/api/orders/checkout",
          { paymentMethod: selectedPayment, email },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setPaymentStatus(res.data.msg || "Payment successful, order placed!")
        setTimeout(() => navigate("/orders"), 1500)
      } catch (error) {
        setPaymentStatus("Payment failed",error)
        alert("Checkout failed")
      }
    }, 1500)
  }

  return (
    <div className="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-2xl border">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Checkout</h2>
      <p className="mb-6 text-gray-600 text-center">Choose payment method and enter your email</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        {paymentMethods.map(method => (
          <label key={method.id} className="flex items-center mb-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition">
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              onChange={e => setSelectedPayment(e.target.value)}
              className="mr-3 accent-blue-500"
            />
            <span>{method.name}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block font-semibold mb-2">Order Confirmation Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
      >
        Pay & Place Order
      </button>

      {paymentStatus && <p className="mt-6 text-center text-blue-600 font-semibold">{paymentStatus}</p>}
    </div>
  )
}

export default Checkout
