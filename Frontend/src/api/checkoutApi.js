import apiClient from './apiClient'

export const checkout = data => apiClient.post('/orders/checkout', data)
export const getUserOrders = () => apiClient.get('/orders')
export const getAllOrders = () => apiClient.get('/orders/all')
