import React, { useEffect, useState } from 'react';
import { Session, SessionManager } from '@/src/lib/sessionManager';

type AuthorizeStep =
  'loading' | 'login' | 'select' | 'confirm' | 'redirect' | 'register';
type AuthorizeIntent = 'login' | 'register';
type UseAuthorizeProps = {
  clientId: string | null;
  intent: AuthorizeIntent;
};
type UseAuthorizeResult = {
  step: Exclude<AuthorizeStep, 'redirect'>;
  redirectTo: string | null;
  sessions: Session[];
  currentSession: Session | null;
  setCurrentSession: React.Dispatch<React.SetStateAction<Session | null>>;
  loading: boolean;
};

export function useAuthorize({ clientId, intent }: UseAuthorizeProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const authorizeIntent: AuthorizeIntent =
    intent === 'register' ? 'register' : 'login';

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessions(SessionManager.getAll());
    setCurrentSession(SessionManager.getCurrent());
    setLoading(false);
  }, []);

  const redirectTo =
    !loading && sessions.length > 0 && !clientId ? '/settings/account' : null;

  const step: Exclude<AuthorizeStep, 'redirect'> = (() => {
    if (loading) {
      return 'loading';
    }

    if (sessions.length === 0) {
      return authorizeIntent;
    }

    if (currentSession) {
      return 'confirm';
    }

    return 'select';
  })();

  return {
    sessions,
    currentSession,
    setCurrentSession,
    step,
    redirectTo,
    loading,
  };
}
