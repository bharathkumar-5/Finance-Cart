const express = require('express')
const mongoose = require('mongoose')
const Order = require('../models/order.model')
const Cart = require('../models/cart.model')
const authMiddleware = require('../middleware/auth.middleware')
const { checkout, getUserOrders, getAllOrders } = require("../controllers/order.controller")

const router = express.Router()

router.post("/checkout", authMiddleware(["user", "admin"]), checkout)
router.get("/", authMiddleware(["user", "admin"]), getUserOrders)
router.get("/all", authMiddleware(["admin"]), getAllOrders)

module.exports = router
