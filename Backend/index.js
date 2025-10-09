const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.config')
require('dotenv').config()

const userRoutes = require('./routes/user.routes')
const serviceRoutes = require('./routes/service.routes')
const cartRoutes = require('./routes/cart.routes')
const orderRoutes = require('./routes/order.routes')
const checkoutRoutes = require('./routes/checkout.routes')

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5175',
    'https://finance-cart-le1u.vercel.app'
  ],
  credentials: true
}))

app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/checkout", checkoutRoutes)

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server running on port ${PORT}`)
})
