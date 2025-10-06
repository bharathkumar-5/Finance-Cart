export const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validatePassword = password => password && password.length >= 6

export const validateService = service => service.name && service.category && service.fee

export const validateCartItem = item => item.serviceId && item.quantity

export const validateOrder = order => order.items && Array.isArray(order.items) && order.items.length > 0
