import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Badge.module.scss';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export type BadgeProps = ComponentPropsWithRef<'span'> & {
  variant?: BadgeVariant;
  icon?: ReactNode;
};

export function Badge({ variant = 'neutral', icon, className, children, ...rest }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant], className)} {...rest}>
      {icon}
      {children}
    </span>
  );
}
