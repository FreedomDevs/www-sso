import { InputProps } from '@/src/components/ui/Input/Input.types';
import styles from './Input.module.css';
import clsx from 'clsx';

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  variant = 'default',
  id,
  ...props
}: InputProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {id}
        </label>
      )}

      <div
        className={clsx(
          styles.container,
          styles[variant],
          error && styles.error
        )}
      >
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}

        <input id={id} className={clsx(styles.input, className)} {...props} />

        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
