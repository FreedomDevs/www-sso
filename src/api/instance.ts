import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiConfig } from '@/src/config/api.config';
import { ErrorResponse } from '@/src/api/data';
import { AccessManager } from '@/src/lib/accessManager';
import { SessionManager } from '@/src/lib/sessionManager';
import { refresh } from '@/src/api/request';

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

// TODO: ПЕРЕПИСАТЬ ЭТО ГОВНО НАХУЙ

const createError = (
  message: string,
  code: ErrorResponse['error']['code']
): ErrorResponse => ({
  error: {
    message,
    code,
  },
  meta: {
    traceId: '',
    timestamp: new Date().toISOString(),
  },
});

const onError = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return Promise.reject(
      createError('Сессия истекла. Требуется повторный вход', 'AUTH_EXPIRED')
    );
  }

  const status = error.response?.status;

  if (status !== undefined && status >= 500 && status <= 599) {
    return Promise.reject(
      createError('Внутренняя ошибка сервера', 'SERVER_ERROR')
    );
  }

  if (error.response?.data) {
    return Promise.reject(error.response.data);
  }

  return Promise.reject(
    createError('Не удалось подключиться к серверу', 'NETWORK_ERROR')
  );
};

const authExpired = () =>
  Promise.reject(
    createError('Сессия истекла. Требуется повторный вход', 'AUTH_EXPIRED')
  );

const clearSession = () => {
  AccessManager.remove();
  SessionManager.removeAll(); // TODO: Исправить в ближайшем времени
};

export const ssoApi = axios.create({
  baseURL: apiConfig.baseURL,
});

export const api = axios.create({
  baseURL: apiConfig.baseURL,
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

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
    .catch((error) => {
      clearSession();
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

const setAuthorization = (
  config: InternalAxiosRequestConfig,
  token: string
) => {
  config.headers.Authorization = `Bearer ${token}`;
};

api.interceptors.request.use(async (config) => {
  const token = AccessManager.get();

  if (token) {
    setAuthorization(config, token);
    return config;
  }

  try {
    const accessToken = await refreshAccessToken();

    setAuthorization(config, accessToken);

    return config;
  } catch {
    clearSession();

    return authExpired();
  }
});

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
      const accessToken = await refreshAccessToken();

      setAuthorization(originalRequest, accessToken);

      return api(originalRequest);
    } catch {
      clearSession();

      return authExpired();
    }
  }
);
