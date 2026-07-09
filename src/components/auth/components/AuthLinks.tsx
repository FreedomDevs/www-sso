import Link from 'next/link';

import styles from '../Auth.module.scss';

export function AuthLinks() {
  return (
    <div className={styles.links}>
      <Link href="/passwordless">Войти с Passkey</Link>

      <Link href="/forgot-password">Забыли пароль?</Link>
    </div>
  );
}
