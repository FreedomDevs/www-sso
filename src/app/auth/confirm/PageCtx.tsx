'use client';

import styles from '@/src/app/auth/confirm/page.module.css';
import Image from 'next/image';
import { Button } from '@/src/components/ui/Button';
import { useEffect, useState } from 'react';
import { useCreateChildToken, useGetClientInfo } from '@/src/api/hooks';
import {
  ClientInfoResponse,
  CreateChildTokenResponse,
  ErrorResponse,
} from '@/src/api/data';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SessionManager } from '@/src/lib/sessionManager';

type Props = {
  client_id: string;
};

export function PageCtx({ client_id }: Props) {
  const [clientData, setClientData] = useState<ClientInfoResponse | null>(null);
  const router = useRouter();

  const { mutate } = useGetClientInfo({
    onSuccess(data: ClientInfoResponse): void {
      setClientData(data);
    },
    onError(error: ErrorResponse): void {
      if (error.error) {
        toast.error(error.error.message);
      } else {
        toast.error('Возникла не предвиденная ошибка');
      }
    },
  });

  useEffect(() => {
    if (!client_id) {
      return;
    }

    mutate({ client_id });
  }, [client_id, mutate]);

  const createChildToken = useCreateChildToken({
    onSuccess(data: CreateChildTokenResponse) {
      if (!clientData?.redirect_url) {
        toast.error(
          'Нам удалось получить токен от ElysiaCloud но мы не смогли получить clientID'
        );
        return;
      }

      const uri = `${clientData.redirect_url}?token=${data.refresh_token}`;

      toast.success(`Вы успешно вошли в ${clientData.client_name}`);
      router.replace(uri);
    },
    onError(error: ErrorResponse) {
      if (error.error) {
        toast.error(error.error.message);
      } else {
        toast.error('Возникла не предвиденная ошибка');
      }
    },
  });

  function allow() {
    const refresh_token = SessionManager.getCurrent()?.masterToken;
    if (!refresh_token) {
      router.replace('/auth');
      return;
    }

    createChildToken.mutate({ refresh_token });
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoWrapper}>
            <Image
              src="/logo.svg"
              alt="ElysiaID"
              width={48}
              height={48}
              priority
            />
          </div>

          <h1>ElysiaID</h1>
        </div>

        <div className={styles.header}>
          <h2>Подтвердите вход</h2>

          <p>Приложение хочет получить доступ к вашему аккаунту</p>
        </div>

        <div className={styles.client}>
          <div className={styles.clientInfo}>
            <h3>{clientData ? clientData.client_name : 'Loading'}</h3>
            <p>{clientData ? clientData.description : 'Loading'}</p>
          </div>
        </div>

        <div className={styles.permissions}>
          <h4>Вы предоставляете доступ к:</h4>

          <ul>
            <li>✓ Вашему имени</li>
            <li>✓ Вашему Email</li>
            <li>✓ Вашей бессмертной душе</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Button
            variant="integrations"
            fullWidth
            size={'sm'}
            onClick={() => router.replace('/auth')}
          >
            Отмена
          </Button>

          <Button variant="primary" fullWidth size={'sm'} onClick={allow}>
            Разрешить
          </Button>
        </div>
      </div>
    </main>
  );
}
