'use client';

import styles from '@/src/app/auth/confirm/page.module.css';
import Image from 'next/image';
import { Button } from '@/src/components/ui/Button';
import { useEffect, useState } from 'react';
import { useGetClientInfo } from '@/src/api/hooks';
import { ClientInfoResponse, ErrorResponse } from '@/src/api/data';
import { toast } from 'sonner';

type Props = {
  client_id: string;
};

export function PageCtx({ client_id }: Props) {
  const client = {
    name: 'Dashboard',
    description: 'Крутая админ панель очень крутая',
  };

  const [clientData, setClientData] = useState<ClientInfoResponse | null>(null)

  const getClientInfo = useGetClientInfo({
    onSuccess(data: ClientInfoResponse): void {
      setClientData(data)
    },
    onError(error: ErrorResponse): void {
      if (error.error) toast.error(error.error.message);
    },
  });

  useEffect(() => {
    getClientInfo.mutate({ client_id });
  }, [client_id, getClientInfo]);

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
            <h3>{client.name}</h3>
            <p>{client.description}</p>
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
          <Button variant="integrations" fullWidth size={'sm'}>
            Отмена
          </Button>

          <Button variant="primary" fullWidth size={'sm'}>
            Разрешить
          </Button>
        </div>
      </div>
    </main>
  );
}
