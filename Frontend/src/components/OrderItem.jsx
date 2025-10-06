import React from "react"

export default function OrderItem({ item }) {
  return (
    <div className="border rounded p-4 mb-3 shadow hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{item.service.name}</h2>
      <p>Plan: {item.plan || "N/A"}</p>
      <p>Add-ons: {item.addOns?.length ? item.addOns.join(", ") : "None"}</p>
      <p>Quantity: {item.quantity}</p>
      {item.price && <p className="font-semibold">Price: ${item.price}</p>}
    </div>
  )
}
