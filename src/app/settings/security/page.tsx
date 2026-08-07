import { FiShield } from 'react-icons/fi';

import styles from './page.module.scss';

export default function SecurityPage() {
  return (
    <section className={styles.page}>
      <div className={styles.icon}>
        <FiShield />
      </div>

      <h1>Безопасность</h1>

      <p>
        Управление безопасностью аккаунта пока находится в разработке. Здесь
        появятся настройки пароля, двухфакторной аутентификации и активных
        сессий.
      </p>

      <span className={styles.badge}>В разработке</span>
    </section>
  );
}
