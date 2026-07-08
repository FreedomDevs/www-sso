'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthorize } from '@/src/hooks/useAuthorize';
import { useEffect } from 'react';

export default function AuthorizeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const clientId = searchParams.get('client_id');

  const { step } = useAuthorize({ clientId });

  useEffect(() => {
    switch (step) {
      case 'login':
        router.push(`/auth/login?client_id=${clientId}`);
        break;
      case 'select':
        router.replace(`/auth/select?${query}`);
        break;
      case 'confirm':
        router.replace(`/auth/confirm?${query}`);
        break;
    }
  }, [step, query, clientId, router]);

  return null;
}
