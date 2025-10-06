const mongoose = require("mongoose")
const Cart = require("../models/cart.model")
const Service = require("../models/service.model")

const addToCart = async (req, res) => {
  const { serviceId, plan, addOns, quantity } = req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(serviceId)) 
      return res.status(400).json({ msg: "Invalid serviceId" })

    const service = await Service.findById(serviceId)
    if (!service) 
      return res.status(404).json({ msg: "Service not found. Please create the service first." })

    let cart = await Cart.findOne({ user: req.userId })
    if (!cart) cart = await Cart.create({ user: req.userId, items: [] })

    cart.items.push({ service: service._id, plan, addOns, quantity })
    await cart.save()

    res.status(200).json({ msg: "Item added to cart", cart })
  } catch (error) {
    console.log("Add to cart error", error)
    res.status(400).json({ msg: "Error adding item", error: error.message || error })
  }
}

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.service")
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({ msg: "Error fetching cart", error: error.message || error })
  }
}

const removeFromCart = async (req, res) => {
  const itemId = req.params.id
  try {
    const cart = await Cart.findOne({ user: req.userId })
    if (!cart) return res.status(400).json({ msg: "Cart not found" })

    cart.items = cart.items.filter(item => item._id.toString() !== itemId)
    await cart.save()
    res.status(200).json({ msg: "Item removed", cart })
  } catch (error) {
    res.status(400).json({ msg: "Error removing item", error: error.message || error })
  }
}

const updateQuantity = async (req, res) => {
  const id = req.params.id
  const { quantity } = req.body

  if (quantity < 1) return res.status(400).json({ msg: "Quantity must be at least 1" })

  try {
    const cart = await Cart.findOne({ user: req.userId })
    if (!cart) return res.status(404).json({ msg: "Cart not found" })

    const item = cart.items.id(id)
    if (!item) return res.status(404).json({ msg: "Item not found" })

    item.quantity = quantity
    await cart.save()
    res.status(200).json({ msg: "Quantity updated", cart })
  } catch (error) {
    console.log("Error updating quantity", error)
    res.status(400).json({ msg: "Error updating quantity", error: error.message })
  }
}

module.exports = { addToCart, getCart, removeFromCart, updateQuantity }
