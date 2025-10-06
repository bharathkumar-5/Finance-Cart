const mongoose = require("mongoose")

const CartItemSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  addOns: [{
    type: String
  }],
  quantity: {
    type: Number,
    default: 1,
    min: 1
  }
})

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  items: [CartItemSchema]
}, { timestamps: true })

module.exports = mongoose.model("Cart", CartSchema)
