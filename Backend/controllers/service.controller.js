const Service = require('../models/service.model')

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) return res.status(404).json({ msg: "Service not found" })
    res.status(200).json(service)
  } catch (error) {
    res.status(400).json({ msg: "Error fetching service", error: error.message })
  }
}

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
    res.status(200).json(services)
  } catch (error) {
    res.status(400).json({ msg: "Error fetching services", error })
  }
}

const addService = async (req, res) => {
  try {
    const service = await Service.create(req.body)
    res.status(201).json({ msg: "Service added", service })
  } catch (error) {
    res.status(400).json({ msg: "Error adding service", error })
  }
}

const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!service) return res.status(404).json({ msg: "Service not found" })
    res.status(200).json({ msg: "Service updated", service })
  } catch (error) {
    res.status(400).json({ msg: "Error updating service", error })
  }
}

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id)
    if (!service) return res.status(404).json({ msg: "Service not found" })
    res.status(200).json({ msg: "Service deleted" })
  } catch (error) {
    res.status(400).json({ msg: "Error deleting service", error })
  }
}

module.exports = { getAllServices, addService, updateService, deleteService, getServiceById }
