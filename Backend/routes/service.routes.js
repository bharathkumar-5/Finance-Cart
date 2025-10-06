const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const { getAllServices, addService, updateService, deleteService, getServiceById } = require("../controllers/service.controller.js")

const router = express.Router()

router.get("/", getAllServices)
router.get("/:id", getServiceById)

router.post("/add", authMiddleware(["admin"]), addService)
router.patch("/update/:id", updateService)
router.delete("/delete/:id", deleteService)

module.exports = router
