'use client';

import { useEffect } from 'react';
import { useMe } from '@elysiac/sdk-react';
import { useAccounts } from './accounts.store';

export function ProfileSync({ accountId }: { accountId: string }) {
  const { data } = useMe({ staleTime: 60_000 });
  const name = data?.name;

  useEffect(() => {
    if (name) useAccounts.getState().updateProfile(accountId, { name });
  }, [accountId, name]);

  return null;
}
