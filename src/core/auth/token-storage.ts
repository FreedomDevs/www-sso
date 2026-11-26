import type { TokenStorage } from '@elysiac/sdk';
import { useAccounts } from './accounts.store';

const accessTokens = new Map<string, string>();

export const storageFor = (accountId: string): TokenStorage => ({
  getAccessToken: () => accessTokens.get(accountId) ?? null,
  setAccessToken: (token) => {
    accessTokens.set(accountId, token);
  },
  getRefreshToken: () =>
    useAccounts.getState().accounts[accountId]?.refreshToken ?? null,
  clearAccessToken: () => {
    accessTokens.delete(accountId);
  },
});

export const setAccessTokenFor = (id: string, token: string) => {
  accessTokens.set(id, token);
};

export const forgetTokens = (id: string) => {
  accessTokens.delete(id);
};
