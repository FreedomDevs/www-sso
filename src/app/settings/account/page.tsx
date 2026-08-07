import { FiUser } from 'react-icons/fi';

import styles from './page.module.scss';

export default function AccountPage() {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div className={styles.icon}>
          <FiUser />
        </div>

        <div>
          <h1>Аккаунт</h1>
          <p>Управление данными вашего аккаунта ElysiaID</p>
        </div>
      </header>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Основная информация</h2>
          <span>Профиль</span>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <span className={styles.label}>Имя пользователя</span>
            <span className={styles.value}>—</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>—</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Дата регистрации</span>
            <span className={styles.value}>—</span>
          </div>
        </div>
      </div>
    </section>
  );
}
