import api from './axios';

export const getDeliveries = async () => {
  const response = await api.get('/deliveries');
  return response.data;
};