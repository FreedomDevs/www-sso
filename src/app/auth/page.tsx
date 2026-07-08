'use client';

import { useSearchParams } from 'next/navigation';
import { useAuthorize } from '@/src/hooks/useAuthorize';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthorizePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const clientId: string | null = searchParams.get('client_id');

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
  }, [step, query, router]);
}
