'use client';

import {
  useSearchParams,
  useRouter,
  ReadonlyURLSearchParams,
} from 'next/navigation';
import { useAuthorize } from '@/src/hooks/useAuthorize';
import { useEffect } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type RedirectStep = 'login' | 'register' | 'select' | 'confirm';

const ROUTES: Record<RedirectStep, string> = {
  login: '/auth/login',
  register: '/auth/register',
  select: '/auth/select',
  confirm: '/auth/confirm',
};

export default function AuthorizeContent(): null {
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const clientId: string | null = searchParams.get('client_id');

  const intent: 'login' | 'register' =
    (searchParams.get('intent') as 'login' | 'register' | null) ?? 'login';

  const { step, redirectTo, loading } = useAuthorize({
    clientId,
    intent,
  });

  useEffect((): void => {
    if (loading) {
      return;
    }

    if(redirectTo) {
      router.replace(redirectTo);
      return;
    }

    if (step === 'loading') {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('intent');

    const suffix = params.toString() ? `?${params.toString()}` : '';

    router.replace(`${ROUTES[step]}${suffix}`);

  }, [step, router, searchParams, loading, redirectTo]);

  return null;
}
