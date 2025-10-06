import apiClient from './apiClient';

export const signup = (data) => apiClient.post('/users/signup', data);
export const login = (data) => apiClient.post('/users/login', data);
