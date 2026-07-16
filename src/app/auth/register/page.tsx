import { Metadata } from 'next';
import styles from './page.module.css';
import Image from 'next/image';
import { RegisterForm } from '@/src/components/auth/RegisterForm/RegisterForm';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'ElysiaID | Регистрация',
};

export default function RegisterPage() {
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
          <h2>Создайте аккаунт</h2>
          <p>Логин должен совпадать с игровым!</p>
        </div>

        <Suspense fallback={null}>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
