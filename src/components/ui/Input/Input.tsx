import clsx from 'clsx';
import styles from './Input.module.css';
import { InputProps } from './Input.types';

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
      <div
        className={clsx(
          styles.container,
          styles[variant],
          error && styles.error
        )}
      >
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}

        <div className={styles.inputWrapper}>
          <input
            id={id}
            className={clsx(styles.input, className)}
            placeholder=" "
            {...props}
          />

          {label && (
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          )}
        </div>

        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
