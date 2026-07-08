import styles from './page.module.css'
import { Button } from '@/src/components/ui/Button';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ElysiaID | Подтверждение',
};

export default function ConfirmPage() {
  const client = {
    name: 'Dashboard',
    description: 'Крутая админ панель очень крутая'
  };

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
