import { useCallback, useState } from 'react';
import { handleAuthError } from '@/core/auth/errors';

type Overrides = Parameters<typeof handleAuthError>[1];

export function useServerError() {
  const [serverError, setServerError] = useState<string | null>(null);

  const clearServerError = useCallback(() => setServerError(null), []);
  const failWith = useCallback(
    (error: unknown, overrides?: Overrides) =>
      setServerError(handleAuthError(error, overrides)),
    []
  );

  return { serverError, clearServerError, failWith };
}
