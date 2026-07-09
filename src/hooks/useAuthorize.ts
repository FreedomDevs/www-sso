import { useEffect, useState } from 'react';
import { Session, SessionManager } from '@/src/lib/sessionManager';

type AuthorizeStep =
  'loading' | 'login' | 'select' | 'confirm' | 'redirect' | 'register';
type AuthorizeIntent = 'login' | 'register';
type UseAuthorizeProps = {
  clientId: string | null;
  intent: AuthorizeIntent;
};

export function useAuthorize({ clientId, intent }: UseAuthorizeProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessions(SessionManager.getAll());
    setLoading(false);
  }, []);

  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const step: AuthorizeStep = loading
    ? 'loading'
    : sessions.length === 0
      ? intent
      : currentSession
        ? 'confirm'
        : 'select';

  return {
    sessions,
    currentSession,
    setCurrentSession,
    step,
    loading,
  };
}
