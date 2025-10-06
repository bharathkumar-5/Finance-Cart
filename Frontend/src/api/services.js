import apiClient from './apiClient';

export const getServices = () => apiClient.get('/services');
export const getServiceById = (id) => apiClient.get(`/services/${id}`);
export const addService = (data) => apiClient.post('/services/add', data);
export const updateService = (id, data) => apiClient.patch(`/services/update/${id}`, data);
export const deleteService = (id) => apiClient.delete(`/services/delete/${id}`);
