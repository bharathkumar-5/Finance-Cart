var jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET_KEY = process.env.JWT_SECRET

const AuthMiddleware = (role) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
      if (!token) return res.status(401).json({ msg: "Unauthorized" })

      var decoded = jwt.verify(token, JWT_SECRET_KEY)
      req.userId = decoded.userId
      req.role = decoded.role

      if(role.length > 0 && !role.includes(decoded.role))
        return res.status(403).json({ msg: "Forbidden: insufficient rights" })

      next()
    } catch (error) {
      res.status(401).json({ msg: "Token Invalid", error })
    }
  }
}

module.exports = AuthMiddleware
