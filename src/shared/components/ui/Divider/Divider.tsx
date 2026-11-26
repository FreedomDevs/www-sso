import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import styles from './Divider.module.scss';

export function Divider({ className, children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      role="separator"
      className={clsx(children ? styles.labeled : styles.line, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
