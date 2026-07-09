'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthorize } from '@/src/hooks/useAuthorize';
import { useEffect } from 'react';

export default function AuthorizeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const clientId = searchParams.get('client_id');

  const intent =
    (searchParams.get('intent') as 'login' | 'register' | null) ?? 'login';

  const { step } = useAuthorize({
    clientId,
    intent,
  });

  useEffect(() => {
    switch (step) {
      case 'login':
        router.replace(`/auth/login${query ? `?${query}` : ''}`);
        break;

      case 'register':
        router.replace(`/auth/register${query ? `?${query}` : ''}`);
        break;

      case 'select':
        router.replace(`/auth/select${query ? `?${query}` : ''}`);
        break;

      case 'confirm':
        router.replace(`/auth/confirm${query ? `?${query}` : ''}`);
        break;
    }
  }, [step, query, router]);

  return null;
}
