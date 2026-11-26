import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import styles from './Spinner.module.scss';

export type SpinnerProps = ComponentPropsWithRef<'span'> & {
  size?: number | string;
  label?: string;
};

export function Spinner({ size = '1em', label, className, style, ...rest }: SpinnerProps) {
  const a11y = label ? { role: 'status', 'aria-label': label } : { 'aria-hidden': true };

  return (
    <span
      className={clsx(styles.spinner, className)}
      style={{ width: size, height: size, ...style }}
      {...a11y}
      {...rest}
    />
  );
}
