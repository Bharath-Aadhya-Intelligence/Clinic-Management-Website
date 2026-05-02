import client from './client';

export const getTodayStats = async () => {
  const response = await client.get('/analytics/today');
  return response.data;
};

export const getMonthlyStats = async () => {
  const response = await client.get('/analytics/monthly');
  return response.data;
};

export const getReminders = async () => {
  const response = await client.get('/analytics/reminders');
  return response.data;
};
