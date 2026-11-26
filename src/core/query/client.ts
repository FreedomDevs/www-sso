import { QueryClient } from '@tanstack/react-query';
import { ElysiaError } from '@elysiac/sdk';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // При мёртвой сессии каждый повтор запускает новый refresh.
        retry: (count, error) =>
          !(error instanceof ElysiaError && error.status === 401) && count < 2,
      },
    },
  });
}
