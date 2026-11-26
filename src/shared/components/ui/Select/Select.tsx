'use client';

import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { useFieldControl } from '../Field/Field';
import styles from './Select.module.scss';

export type SelectProps = Omit<ComponentPropsWithRef<'select'>, 'size'> & {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  wrapperClassName?: string;
};

export function Select({
  size = 'md',
  invalid,
  className,
  wrapperClassName,
  id,
  disabled,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  children,
  ref,
  ...rest
}: SelectProps) {
  const control = useFieldControl({ id, disabled, invalid, ariaInvalid, ariaDescribedBy });

  return (
    <div
      className={clsx(styles.wrapper, styles[size], wrapperClassName)}
      data-invalid={control.invalid || undefined}
      data-disabled={control.props.disabled || undefined}
    >
      <select ref={ref} className={clsx(styles.select, className)} {...control.props} {...rest}>
        {children}
      </select>
      <LuChevronDown className={styles.chevron} aria-hidden="true" />
    </div>
  );
}
