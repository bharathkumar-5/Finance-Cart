const Order = require("../models/order.model")

const checkoutOrder = async (req, res) => {
  try {
    const { paymentMethod, email, cartItems } = req.body

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" })
    }

    const total = cartItems.reduce(
      (sum, item) => sum + (item.service?.fee || 0) * (item.quantity || 1),
      0
    )

    const newOrder = new Order({
      userId: req.user.id,
      services: cartItems,
      totalCost: total,
      email,
      paymentMethod,
      status: "Paid",
      createdAt: new Date()
    })

    await newOrder.save()

    return res.status(200).json({ msg: "Payment successful! Order placed", order: newOrder })
  } catch (error) {
    console.error("Checkout Error:", error)
    return res.status(500).json({ msg: "Payment failed. Please try again" })
  }
}

module.exports = { checkoutOrder }
