'use client';

import React from 'react';
import styles from './ServerError.module.scss';

interface ServerErrorProps {
  onRetry?: () => void;
}

export default function ServerError({ onRetry }: ServerErrorProps) {
  return (
    <main className={styles.container}>
      <div className={styles.glow} />

      <div className={styles.content}>
        <div className={styles.icon}>
          <span>!</span>
        </div>

        <span className={styles.code}>500</span>

        <h1>Внутренняя ошибка</h1>

        <p>
          Не удалось проверить авторизацию.
          <br />
          Сервер временно недоступен.
        </p>

        <div className={styles.actions}>
          {onRetry && (
            <button type="button" className={styles.retry} onClick={onRetry}>
              Повторить попытку
            </button>
          )}

          <button
            type="button"
            className={styles.reload}
            onClick={() => window.location.reload()}
          >
            Обновить страницу
          </button>
        </div>

        <span className={styles.hint}>
          Если ошибка сохраняется, попробуйте зайти позже.
        </span>
      </div>
    </main>
  );
}
