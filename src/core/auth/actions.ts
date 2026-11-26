import { ElysiaClient } from '@elysiac/sdk';
import { getBaseURL } from '../elysia/client';
import { dropSession } from '../elysia/sessions';
import { useAccounts } from './accounts.store';
import { setAccessTokenFor } from './token-storage';

/**
 * Вызывать после login / confirmEmail. SDK refresh-токен не сохраняет,
 * а id и ник узнаём через users.me() одноразовым клиентом.
 * В сторе аккаунт появляется только после успешного ответа.
 */
export async function adoptRefreshToken(refreshToken: string): Promise<string> {
  const probe = { access: null as string | null };

  const client = new ElysiaClient({
    baseURL: getBaseURL(),
    tokenStorage: {
      getAccessToken: () => probe.access,
      setAccessToken: (t) => {
        probe.access = t;
      },
      getRefreshToken: () => refreshToken,
      clearAccessToken: () => {
        probe.access = null;
      },
    },
  });

  // Первый запрос сам получит access-токен через refresh.
  const me = await client.users.me();

  // Повторный вход в известный аккаунт: сбрасываем старую сессию,
  // SDK старый access-токен сам не очистит.
  dropSession(me.id);

  const { upsert, setActive } = useAccounts.getState();
  upsert({ id: me.id, name: me.name, refreshToken, expired: false });

  if (probe.access) setAccessTokenFor(me.id, probe.access);
  setActive(me.id);

  return me.id;
}

export function switchAccount(id: string): void {
  useAccounts.getState().setActive(id);
}

// В SDK нет logout и серверной отзывки токена: чистим только клиент.
export function signOut(id: string): void {
  dropSession(id);
  useAccounts.getState().remove(id);
}
