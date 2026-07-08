import axios from 'axios';
import { apiConfig } from '@/src/config/api.config';

// Для работы с SSO
export const ssoApi = axios.create({
  baseURL: apiConfig.baseURL,
});

// Для API приложения
export const api = axios.create({
  baseURL: apiConfig.baseURL,
});