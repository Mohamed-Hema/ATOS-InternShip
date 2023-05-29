import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signUp = async (username, password, confirmPassword, userType) => {
  if (!username || !password || !confirmPassword || !userType) {
    throw new Error('Username, password, confirmPassword, and userType are required');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    const response = await axios.post(`${BASE_URL}/signup`, { username, password, userType });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};



