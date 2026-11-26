import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { adoptRefreshToken } from '@/core/auth/actions';
import { readNextFromLocation } from '@/core/auth/redirect';

export function useCompleteAuth() {
  const router = useRouter();

  return useCallback(
    async (refreshToken: string, options?: { onAdopted?: () => void }) => {
      await adoptRefreshToken(refreshToken);
      options?.onAdopted?.();
      router.replace(readNextFromLocation());
    },
    [router]
  );
}
