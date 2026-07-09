import styles from '../Auth.module.scss';

export function AuthDivider() {
  return (
    <div className={styles.divider}>
      <span />
      <p>или продолжите с</p>
      <span />
    </div>
  );
}
