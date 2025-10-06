const express = require('express')
const Cart = require('../models/cart.model')
const authMiddleware = require('../middleware/auth.middleware')
const { addToCart, getCart, removeFromCart, updateQuantity } = require('../controllers/cart.controller')

const router = express.Router()

router.get("/", authMiddleware(["user", "admin"]), getCart)
router.post("/add", authMiddleware(["user", "admin"]), addToCart)
router.delete("/remove/:id", authMiddleware(["user", "admin"]), removeFromCart)
router.patch("/update/:id", authMiddleware(["user", "admin"]), updateQuantity)

module.exports = router
