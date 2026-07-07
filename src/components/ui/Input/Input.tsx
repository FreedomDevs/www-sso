import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './Input.module.css';
import { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      className,
      variant = 'default',
      id,
      ...props
    },
    ref
  ) => {
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
              ref={ref}
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
);

Input.displayName = 'Input';
