'use client';

import { useAccounts, type Account } from './accounts.store';

export const useHydrated = (): boolean => useAccounts((s) => s.hydrated);

export const useActiveAccount = (): Account | null =>
  useAccounts((s) => {
    if (!s.activeId) return null;
    const account = s.accounts[s.activeId];
    return account && !account.expired ? account : null;
  });
