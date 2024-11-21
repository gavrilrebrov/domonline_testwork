import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev.moydomonline.ru',
});

api.interceptors.request.use(
  (config) => {
    if (!config.url.endsWith('/')) {
      config.url = config.url + '/';
    }

    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Неавторизован!');
    }
    return Promise.reject(error);
  }
);

export default api;
