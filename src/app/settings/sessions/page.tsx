import { FiKey } from 'react-icons/fi';

import styles from './page.module.scss';

export default function SessionPage() {
  return (
    <section className={styles.page}>
      <div className={styles.icon}>
        <FiKey />
      </div>

      <h1>Сессии</h1>

      <p>
        Управление активными сессиями пока находится в разработке. Здесь вы
        сможете просматривать устройства, на которых выполнен вход в аккаунт, и
        завершать ненужные сессии.
      </p>

      <span className={styles.badge}>В разработке</span>
    </section>
  );
}
