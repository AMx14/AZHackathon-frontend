import api from './api.js';

export const login = (credentials) => api.post('/user/login', credentials);
export const signup = (userData) => api.post('/user/signup', userData);
export const logout = () => api.post('/user/logout');
