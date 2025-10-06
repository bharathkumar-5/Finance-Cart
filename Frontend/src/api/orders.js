import apiClient from './apiClient';

export const checkout = () => apiClient.post('/orders/checkout');
export const getUserOrders = () => apiClient.get('/orders');
export const getAllOrders = () => apiClient.get('/orders/all');
