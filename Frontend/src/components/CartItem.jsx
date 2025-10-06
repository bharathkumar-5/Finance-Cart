import React from "react"

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <p className="font-bold">{item.service.name}</p>
        <p>Plan: {item.plan}</p>
        <p>Add-ons: {item.addOns.join(", ") || "None"}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <div>
        <button
          onClick={() => onRemove(item._id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
