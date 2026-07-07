import { Metadata } from 'next';
import styles from './page.module.css';
import { LoginForm } from '@/src/components/auth/LoginForm/LoginForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ElysiaID | Вход',
};

export default function LoginPage() {
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
          <h2>Добро пожаловать</h2>
          <p>Войдите в свой аккаунт</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
