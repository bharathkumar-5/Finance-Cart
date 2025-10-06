const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePassword = (password) => {
  return password && password.length >= 6
}

const validateService = (service) => {
  if (!service.name || !service.category || !service.fee) return false
  return true
}

const validateCartItem = (item) => {
  if (!item.serviceId || !item.quantity) return false
  return true
}

module.exports = { validateEmail, validatePassword, validateService, validateCartItem }
