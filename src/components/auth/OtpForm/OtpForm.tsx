'use client';

import { OtpInput } from '@/src/components/ui/OtpInput';
import { useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import styles from './OtpForm.module.scss';
import { useConfirmEmail } from '@/src/api/hooks';
import {
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  ErrorResponse,
} from '@/src/api/data';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Session, SessionManager } from '@/src/lib/sessionManager';

type Props = {
  emailToken: string;
  login: string;
  client_id?: string;
};

export function OtpForm({ emailToken, login, client_id }: Props) {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();

  const sendData = useConfirmEmail({
    onSuccess(data: ConfirmEmailResponse): void {
      const session: Session = {
        username: login,
        masterToken: data.refresh_token,
      };
      SessionManager.setCurrent(session);

      if (client_id) {
        router.replace(`/auth/confirm?client_id=${client_id}&login=${login}`);
        return
      }
      router.replace(`/auth`);
    },
    onError(error: ErrorResponse): void {
      toast.error(error.error.message);
      setError(error.error.message);
    },
  });

  function send() {
    if (code.length !== 6) {
      setError('Неверный формат кода');
      return;
    }
    setError('');
    setSeconds(20);

    const request: ConfirmEmailRequest = {
      email_verification_token: emailToken,
      code: code,
    };

    sendData.mutate(request);
  }

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div className={styles.form}>
      <OtpInput
        value={code}
        onChange={(value) => {
          setCode(value);
          setError('');
        }}
        error={error}
      />

      {seconds > 0 && (
        <p>
          Отправить код повторно через <span>{seconds}s</span>
        </p>
      )}

      <Button
        variant={'primary'}
        size={'sm'}
        fullWidth={true}
        onClick={send}
        disabled={seconds > 0}
      >
        Отправить
      </Button>
    </div>
  );
}
