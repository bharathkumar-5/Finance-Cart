const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { validateEmail, validatePassword } = require('../utils/validators')
const saltRounds = 10

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!validateEmail(email)) return res.status(400).json({ msg: "Invalid Email" })
    if (!validatePassword(password)) return res.status(400).json({ msg: "Password must be at least 6 characters" })

    const hash = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ name, email, password: hash, role })

    res.status(200).json({ 
      msg: "User Created", 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(400).json({ msg: "User not created", error })
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ msg: "User not registered" })

    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) return res.status(401).json({ msg: "Password incorrect" })

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.status(200).json({
      msg: "Login success",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(400).json({ msg: "Login failed", error })
  }
}

module.exports = { signup, login }