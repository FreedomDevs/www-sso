'use client';

import styles from './page.module.scss';
import { Button } from '@/src/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Elysia<span>Cloud</span>
        </h1>

        <p className={styles.subtitle}>
          Облачная платформа для Minecraft проектов в экосистеме Elysia
        </p>

        <div className={styles.card}>
          <h2>
            Elysia<span>ID</span>
          </h2>

          <p>
            ElysiaID — единая система аутентификации, которая позволяет
            безопасно входить во все сервисы ElysiaCloud с помощью одного
            аккаунта.
          </p>

          <ul>
            <li>Единый аккаунт для всех сервисов.</li>
            <li>Безопастная авториция</li>
            <li>Управление подключенными приложениями.</li>
            <li>Контроль доступа и активных сессий.</li>
          </ul>

          <Button
            variant={'primary'}
            size={'sm'}
            fullWidth
            onClick={() => {
              router.replace('/auth');
            }}
          >
            Войти
          </Button>
        </div>
      </section>
    </main>
  );
}
