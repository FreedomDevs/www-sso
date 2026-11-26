import type { ElysiaClient } from '@elysiac/sdk';
import type { QueryClient } from '@tanstack/react-query';
import { forgetTokens } from '../auth/token-storage';
import { createQueryClient } from '../query/client';
import { createElysiaClient } from './client';

// Гостевая сессия: клиент без токенов для login, register, confirmEmail и т.п.
export const GUEST_ID = 'guest';

export type Session = { elysia: ElysiaClient; queryClient: QueryClient };

const sessions = new Map<string, Session>();

export function getSession(accountId: string): Session {
  let session = sessions.get(accountId);
  if (!session) {
    session = {
      elysia: createElysiaClient(accountId),
      queryClient: createQueryClient(),
    };
    sessions.set(accountId, session);
  }
  return session;
}

export function dropSession(accountId: string): void {
  sessions.get(accountId)?.queryClient.clear();
  sessions.delete(accountId);
  forgetTokens(accountId);
}
