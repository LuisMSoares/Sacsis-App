import axios from 'axios';

import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  validateStatus: function (status) {
    return status < 1000;
  }
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('@UserJWT:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    console.error(err);
  }
});

export default api;