import { ElysiaClient, ElysiaError } from '@elysiac/sdk';
import { useAccounts } from '../auth/accounts.store';
import { storageFor } from '../auth/token-storage';

export function getBaseURL(): string {
  const baseURL = process.env.NEXT_PUBLIC_ELYSIA_URL;
  if (!baseURL) throw new Error('NEXT_PUBLIC_ELYSIA_URL is not set');
  return baseURL;
}

export function createElysiaClient(accountId: string): ElysiaClient {
  const client = new ElysiaClient({
    baseURL: getBaseURL(),
    tokenStorage: storageFor(accountId),
  });

  // SDK сам не сообщает о потере сессии, ловим сами. Этот interceptor
  // стоит после SDK-шных и видит уже нормализованный ElysiaError.
  client.http.api.interceptors.response.use(undefined, (error: unknown) => {
    if (
      error instanceof ElysiaError &&
      (error.status === 401 || error.message === 'REFRESH_TOKEN_MISSING') &&
      useAccounts.getState().accounts[accountId]
    ) {
      useAccounts.getState().markExpired(accountId);
    }
    return Promise.reject(error);
  });

  return client;
}
