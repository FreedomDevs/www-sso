import { ButtonProps } from '@/src/components/ui/Button/Button.types';
import styles from './Button.module.css';
import clsx from 'clsx';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}

      <span>{loading ? 'Loading...' : children}</span>

      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
}
