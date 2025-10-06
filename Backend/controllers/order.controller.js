const Order = require('../models/order.model')
const Cart = require('../models/cart.model')
const nodemailer = require("nodemailer")

const checkout = async (req, res) => {
  try {
    const { paymentMethod, email } = req.body
    if (!email) return res.status(400).json({ msg: "Email is required to place an order." })

    const cart = await Cart.findOne({ userId: req.userId }).populate("items.serviceId")
    if (!cart || cart.items.length === 0) return res.status(400).json({ msg: "Cart is empty" })

    const newOrder = new Order({
      user: req.userId,
      items: cart.items.map(i => ({
        service: i.serviceId,
        quantity: i.quantity
      })),
      totalFee: cart.items.reduce((sum, i) => sum + i.serviceId.fee * i.quantity, 0),
      paymentMethod,
      status: "Completed",
      createdAt: new Date()
    })

    await newOrder.save()
    await Cart.deleteOne({ _id: cart._id })

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.LOGIN_EMAIL,
        pass: process.env.LOGIN_EMAIL_PASSWORD
      }
    })

    const orderDetailsHtml = cart.items.map(item => 
      `<li>${item.serviceId.name} (${item.serviceId.plan || "N/A"}) - $${item.serviceId.fee} × ${item.quantity}</li>`
    ).join("")

    const info = await transporter.sendMail({
      from: `"Verto Support" <${process.env.LOGIN_EMAIL}>`,
      to: email,
      subject: "Your Order Confirmation - Verto",
      html: `
        <h2>Order placed successfully 🎉</h2>
        <p>Thank you for shopping with us, your order has been confirmed.</p>
        <p><strong>Total Paid:</strong> $${newOrder.totalFee}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <h3>Order Details:</h3>
        <ul>${orderDetailsHtml}</ul>
        <p>We’ll notify you once your order is processed.</p>
      `
    })

    console.log("Email sent", info.response)
    res.status(200).json({ msg: "Order placed successfully, confirmation email sent" })
  } catch (error) {
    console.log("Checkout error", error)
    res.status(500).json({ msg: "Checkout failed", error: error.message })
  }
}

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate("items.service")
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json({ msg: "Error fetching orders", error })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.service").populate("user", "name email")
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json({ msg: "Error fetching all orders", error })
  }
}

module.exports = { checkout, getUserOrders, getAllOrders }
