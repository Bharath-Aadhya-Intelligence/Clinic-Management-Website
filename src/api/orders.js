import client from './client';

export const placeOrder = async (orderData) => {
  const response = await client.post('/orders/', orderData);
  return response.data;
};

export const getAdminOrders = async () => {
  const response = await client.get('/orders/admin');
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await client.patch(`/orders/admin/${id}`, { status });
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await client.delete(`/orders/admin/${id}`);
  return response.data;
};

export const clearAllOrders = async () => {
  const response = await client.delete('/orders/admin/clear-all');
  return response.data;
};
