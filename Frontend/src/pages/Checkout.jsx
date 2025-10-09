import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import apiClient from "../api/apiClient"
import { useNavigate } from "react-router-dom"

const paymentMethods = [
  { id: "upi", name: "UPI" },
  { id: "gpay", name: "Google Pay" },
  { id: "phonepe", name: "PhonePe" }
]

const Checkout = () => {
  const { token } = useContext(AuthContext)
  const { cartItems, setCartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")

  const handlePayment = async () => {
    if (!selectedPayment) {
      alert("Select a payment method")
      return
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!")
      return
    }

    setPaymentStatus(`Processing ${selectedPayment} payment...`)

    try {
      const res = await apiClient.post(
        "/orders/checkout",
        { paymentMethod: selectedPayment, cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setPaymentStatus(res.data.msg || "Payment successful, order placed!")
      setCartItems([])
      localStorage.removeItem("cart")

      setTimeout(() => navigate("/orders"), 1500)
    } catch (error) {
      console.error("Checkout Error:", error)
      setPaymentStatus("Payment failed")
      alert(error.response?.data?.msg || "Checkout failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border p-6">
        <h2 className="text-3xl font-extrabold mb-4 text-center">Checkout</h2>
        <p className="mb-6 text-gray-600 text-center">Choose payment method</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className="flex items-center mb-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="mr-3 accent-blue-500"
              />
              <span>{method.name}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Pay & Place Order
        </button>

        {paymentStatus && (
          <p className="mt-6 text-center text-blue-600 font-semibold">
            {paymentStatus}
          </p>
        )}
      </div>
    </div>
  )
}

export default Checkout






// import React, { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import apiClient from "../api/apiClient";
// import { useNavigate } from "react-router-dom";

// const paymentMethods = [
//   { id: "upi", name: "UPI" },
//   { id: "gpay", name: "Google Pay" },
//   { id: "phonepe", name: "PhonePe" },
// ];

// const Checkout = () => {
//   const { token } = useContext(AuthContext);
//   const { cartItems, setCartItems } = useContext(CartContext);
//   const navigate = useNavigate();
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [email, setEmail] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState("");

//   const handlePayment = async () => {
//     if (!selectedPayment || !email) {
//       alert("Select payment method and enter email");
//       return;
//     }

//     if (!cartItems || cartItems.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }

//     setPaymentStatus(`Processing ${selectedPayment} payment...`);

//     try {
//       const res = await apiClient.post(
//         "/orders/checkout",
//         { paymentMethod: selectedPayment, email, cartItems },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setPaymentStatus(res.data.msg || "Payment successful, order placed!");
//       setCartItems([]);
//       localStorage.removeItem("cart");

//       setTimeout(() => navigate("/orders"), 1500);
//     } catch (error) {
//       console.error("Checkout Error:", error);
//       setPaymentStatus("Payment failed");
//       alert(error.response?.data?.msg || "Checkout failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border p-6">
//         <h2 className="text-3xl font-extrabold mb-4 text-center">Checkout</h2>
//         <p className="mb-6 text-gray-600 text-center">
//           Choose payment method and enter your email
//         </p>

//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
//           {paymentMethods.map((method) => (
//             <label
//               key={method.id}
//               className="flex items-center mb-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value={method.id}
//                 onChange={(e) => setSelectedPayment(e.target.value)}
//                 className="mr-3 accent-blue-500"
//               />
//               <span>{method.name}</span>
//             </label>
//           ))}
//         </div>

//         <div className="mb-6">
//           <label htmlFor="email" className="block font-semibold mb-2">
//             Order Confirmation Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border px-4 py-2 rounded-lg"
//             required
//           />
//         </div>

//         <button
//           onClick={handlePayment}
//           className="w-full bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
//         >
//           Pay & Place Order
//         </button>

//         {paymentStatus && (
//           <p className="mt-6 text-center text-blue-600 font-semibold">
//             {paymentStatus}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkout;
