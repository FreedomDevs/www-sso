'use client';

import { useSearchParams } from 'next/navigation';
import { useAuthorize } from '@/src/hooks/useAuthorize';

export default function AuthorizePage() {
  const searchParams = useSearchParams();

  const clientId: string | null = searchParams.get('client_id');

  const auth = useAuthorize({ clientId });

  return (
    <div>
      <h1>SSO Authorize</h1>

      <p>Client: {clientId}</p>
      <hr />

      <p>Current step: {auth.step}</p>
    </div>
  );
}
