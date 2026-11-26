'use client';

import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { useFieldControl } from '../Field/Field';
import styles from './Input.module.scss';

export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'size'> & {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  wrapperClassName?: string;
};

export function Input({
  size = 'md',
  invalid,
  startAdornment,
  endAdornment,
  className,
  wrapperClassName,
  id,
  disabled,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ref,
  ...rest
}: InputProps) {
  const control = useFieldControl({ id, disabled, invalid, ariaInvalid, ariaDescribedBy });

  return (
    <div
      className={clsx(styles.wrapper, styles[size], wrapperClassName)}
      data-invalid={control.invalid || undefined}
      data-disabled={control.props.disabled || undefined}
    >
      {startAdornment && <span className={styles.adornment}>{startAdornment}</span>}
      <input ref={ref} className={clsx(styles.input, className)} {...control.props} {...rest} />
      {endAdornment && <span className={styles.adornment}>{endAdornment}</span>}
    </div>
  );
}
