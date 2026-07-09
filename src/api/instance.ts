import axios, { AxiosError } from 'axios';
import { apiConfig } from '@/src/config/api.config';
import { ErrorResponse } from '@/src/api/data';
import { AccessManager } from '@/src/lib/accessManager';
import { SessionManager } from '@/src/lib/sessionManager';
import { refresh } from '@/src/api/request';

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean
  }
}

const onError = (error: unknown) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      error: {
        message: 'Не удалось подключиться к серверу',
        code: 'NETWORK_ERROR',
      },
      meta: {
        traceId: '',
        timestamp: new Date().toISOString(),
      },
    } satisfies ErrorResponse);
  }

  return Promise.reject({
    error: {
      message: 'Неизвестная ошибка',
      code: 'UNKNOWN',
    },
    meta: {
      traceId: '',
      timestamp: new Date().toISOString(),
    },
  } satisfies ErrorResponse);
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

api.interceptors.request.use((config) => {
  const token = AccessManager.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return onError(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        const session = SessionManager.getCurrent();

        if (!session) {
          throw new Error('NO_SESSION');
        }

        refreshPromise = refresh({
          method: 'Web',
          refresh_token: session.masterToken,
        })
          .then((response) => {
            AccessManager.set(response.token);

            return response.token;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const accessToken = await refreshPromise;

      originalRequest.headers.setAuthorization(`Bearer ${accessToken}`);

      return api(originalRequest);
    } catch {
      return Promise.reject({
        error: {
          message: 'Сессия истекла. Требуется повторный вход',
          code: 'AUTH_EXPIRED',
        },
        meta: {
          traceId: '',
          timestamp: new Date().toISOString(),
        },
      } satisfies ErrorResponse);
    }
  }
);