import client from './client';

export const getMedicines = async () => {
  const response = await client.get('/medicines/');
  return response.data;
};

export const createMedicine = async (medicineData) => {
  const response = await client.post('/medicines/admin', medicineData);
  return response.data;
};

export const updateMedicine = async (id, medicineData) => {
  const response = await client.put(`/medicines/admin/${id}`, medicineData);
  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await client.delete(`/medicines/admin/${id}`);
  return response.data;
};
