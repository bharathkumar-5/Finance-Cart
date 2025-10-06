const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    plan: String,
    addOns: [String],
    quantity: { type: Number, default: 1 },
    price: Number
  }],
  totalFee: Number,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }
}, { timestamps: true })

module.exports = mongoose.model("Order", OrderSchema)
