const express = require('express')
require('dotenv').config()
const { signup, login } = require("../controllers/user.controller")

const router = express.Router()
const saltRounds = 10

router.post("/signup", signup)
router.post("/login", login)

module.exports = router
