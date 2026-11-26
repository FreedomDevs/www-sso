'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Account = {
  id: string;
  name: string;
  refreshToken: string;
  expired: boolean;
};

type State = {
  accounts: Record<string, Account>;
  activeId: string | null;
  hydrated: boolean;
  upsert: (account: Account) => void;
  updateProfile: (id: string, patch: { name: string }) => void;
  remove: (id: string) => void;
  setActive: (id: string | null) => void;
  markExpired: (id: string) => void;
};

export const useAccounts = create<State>()(
  persist(
    (set) => ({
      accounts: {},
      activeId: null,
      hydrated: false,

      upsert: (account) =>
        set((s) => ({ accounts: { ...s.accounts, [account.id]: account } })),

      updateProfile: (id, patch) =>
        set((s) => {
          const current = s.accounts[id];
          if (!current || current.name === patch.name) return s;
          return {
            accounts: { ...s.accounts, [id]: { ...current, ...patch } },
          };
        }),

      remove: (id) =>
        set((s) => {
          const accounts = { ...s.accounts };
          delete accounts[id];
          return { accounts, activeId: s.activeId === id ? null : s.activeId };
        }),

      setActive: (activeId) => set({ activeId }),

      markExpired: (id) =>
        set((s) => {
          const current = s.accounts[id];
          if (!current || current.expired) return s;
          return {
            accounts: { ...s.accounts, [id]: { ...current, expired: true } },
          };
        }),
    }),
    {
      name: 'elysia-accounts',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Гидратируем вручную в useEffect, иначе первый клиентский рендер
      // не совпадёт с серверным (hydration mismatch).
      skipHydration: true,
      partialize: (s) => ({ accounts: s.accounts, activeId: s.activeId }),
      onRehydrateStorage: () => () => {
        useAccounts.setState({ hydrated: true });
      },
    }
  )
);
