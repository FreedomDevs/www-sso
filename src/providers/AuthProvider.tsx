'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useMe } from '@/src/api/hooks/useMe';
import ServerError from '@/src/components/errors/ServerError';

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  const meMutation = useMe();

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        await meMutation.mutateAsync(null);

        if (cancelled) {
          return;
        }

        setIsAuthenticated(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
      } catch (error: never) {
        if (cancelled) {
          return;
        }

        setIsAuthenticated(false);
        console.log("Error: "+error)

        if (error?.error?.code === 'AUTH_EXPIRED') {
          router.replace('/auth');
          return;
        }

        if (error?.error?.code === 'SERVER_ERROR') {
          setServerError(true);
          return;
        }

        console.error('Auth check failed:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (isLoading) {
    return null;
  }

  if (serverError) {
    return <ServerError />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
