import type { ReactNode } from 'react';
import { RequireAuth } from '@/core/auth/guards';

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}
