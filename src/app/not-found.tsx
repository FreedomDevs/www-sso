'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiCompass, FiHome } from 'react-icons/fi';

import styles from './not-found.module.scss';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.glow} />

      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <FiCompass className={styles.icon} />
        </div>
        <span className={styles.code}>404</span>
        <h1>Страница не найдена</h1>
        <p>
          Похоже, такой страницы не существует
          <br />
          или она была перемещена.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            <FiHome />
            <span>На главную</span>
          </Link>

          <button
            type="button"
            className={styles.secondary}
            onClick={() => router.back()}
          >
            <FiArrowLeft />
            <span>Назад</span>
          </button>
        </div>

        <span className={styles.brand}>ElysiaID</span>
      </div>
    </main>
  );
}
