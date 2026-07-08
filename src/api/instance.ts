import axios from 'axios';
import { apiConfig } from '@/src/config/api.config';
import { ErrorResponse } from '@/src/api/data';

const onError = (error: unknown) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return Promise.reject(error.response?.data);
  }

  return Promise.reject(error);
};

// Для работы с SSO
export const ssoApi = axios.create({
  baseURL: apiConfig.baseURL,
});

// Для API приложения
export const api = axios.create({
  baseURL: apiConfig.baseURL,
});

ssoApi.interceptors.response.use((response) => response, onError);
api.interceptors.response.use((response) => response, onError);