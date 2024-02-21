import axios from "axios";

const BASE_URL = "http://localhost:7200/api";

export const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(
  (config: any) => {
    if (config.authorization !== false) {
      const token = localStorage.getItem('nurly-token');
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    if (error.response?.data.httpStatusCode === 401) {
      localStorage.removeItem('nurly-token')
      window.location.replace("login");
    }
    return error;
  },
);
