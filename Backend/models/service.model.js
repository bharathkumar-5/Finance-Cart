const mongoose = require("mongoose")

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["Account", "FX", "Treasury", "Tools", "FX/Tools", "Treasury/Tools"],
    required: true
  },
  plan: { type: String },
  description: { type: String },
  fee: { type: Number, required: true },
  addOns: [String]
}, { timestamps: true })

module.exports = mongoose.model("Service", ServiceSchema)
