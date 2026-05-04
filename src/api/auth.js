import client from './client';

export const loginAdmin = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('password', password);

  const response = await client.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const refreshAccessToken = async (refreshToken) => {
  const formData = new URLSearchParams();
  formData.append('refresh_token', refreshToken);

  const response = await client.post('/auth/refresh', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};
