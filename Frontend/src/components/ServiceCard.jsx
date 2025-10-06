import React from "react"

export default function ServiceCard({ service, onAddToCart }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{service.name}</h2>
      <p>{service.description}</p>
      <p className="font-semibold">Fee: ${service.fee}</p>
      <p>Plan: {service.plan || "N/A"}</p>
      {service.addOns?.length > 0 && <p>Add-ons: {service.addOns.join(", ")}</p>}
      <button
        onClick={() => onAddToCart(service)}
        className="bg-teal-600 text-white px-3 py-1 mt-2 rounded hover:bg-teal-700"
      >
        Add to Cart
      </button>
    </div>
  )
}
