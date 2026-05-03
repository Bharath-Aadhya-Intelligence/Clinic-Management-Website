import client from './client';

export const getMedicines = async () => {
  const response = await client.get('/medicines/');
  return response.data;
};

export const createMedicine = async (formData) => {
  const response = await client.post('/medicines/admin', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateMedicine = async (id, formData) => {
  const response = await client.put(`/medicines/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await client.delete(`/medicines/admin/${id}`);
  return response.data;
};
