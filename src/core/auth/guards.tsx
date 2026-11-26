'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useActiveAccount, useHydrated } from './session';
import { LOGIN_PATH, isAddAccountMode, readNextFromLocation } from './redirect';

/** Страницы только для вошедших. Нет аккаунта → на /login. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const account = useActiveAccount();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hydrated || account) return;
    const current = pathname + window.location.search;
    // С главной (и после явного выхода) next не добавляем.
    const target =
      current === '/'
        ? LOGIN_PATH
        : `${LOGIN_PATH}?next=${encodeURIComponent(current)}`;
    router.replace(target);
  }, [hydrated, account, pathname, router]);

  if (!hydrated || !account) return null;
  return <>{children}</>;
}

/**
 * Страницы входа/регистрации. Уже вошёл → на next или на главную.
 * Исключение: /login?add=1 нужен для «Добавить аккаунт».
 */
export function GuestOnly({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated || !account || isAddAccountMode()) return;
    router.replace(readNextFromLocation());
  }, [hydrated, account, router]);

  if (!hydrated) return null;

  if (account && !isAddAccountMode()) return null;
  return <>{children}</>;
}
