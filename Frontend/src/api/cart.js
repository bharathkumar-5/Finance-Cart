import apiClient from './apiClient';

export const getCart = () => apiClient.get('/cart');
export const addToCart = (data) => apiClient.post('/cart/add', data);
export const removeFromCart = (id) => apiClient.delete(`/cart/remove/${id}`);
