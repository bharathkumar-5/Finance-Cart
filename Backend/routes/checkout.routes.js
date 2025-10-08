const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const { checkoutOrder } = require("../controllers/checkout.controller")

const router = express.Router()

router.post("/checkout", authMiddleware(["user", "admin"]), checkoutOrder)

module.exports = router
