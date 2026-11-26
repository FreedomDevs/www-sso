'use client';

import { useEffect, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ElysiaProvider } from '@elysiac/sdk-react';
import { useAccounts } from './auth/accounts.store';
import { ProfileSync } from './auth/ProfileSync';
import { useActiveAccount, useHydrated } from './auth/session';
import { GUEST_ID, getSession } from './elysia/sessions';

export function Providers({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const account = useActiveAccount();

  useEffect(() => {
    void useAccounts.persist.rehydrate();
  }, []);

  // До гидратации токенов нет. Сервер и первый клиентский рендер отдают null,
  // поэтому mismatch не возникает и сессии на сервере не создаются.
  if (!hydrated) return null;

  // Нет аккаунта (или он протух) → гостевая сессия.
  const id = account?.id ?? GUEST_ID;
  const { elysia, queryClient } = getSession(id);

  // key нужен: хуки TanStack Query привязываются к QueryClient при монтировании,
  // без key смена клиента не подействует.
  return (
    <QueryClientProvider client={queryClient} key={id}>
      <ElysiaProvider client={elysia}>
        {account && <ProfileSync accountId={account.id} />}
        {children}
      </ElysiaProvider>
    </QueryClientProvider>
  );
}
