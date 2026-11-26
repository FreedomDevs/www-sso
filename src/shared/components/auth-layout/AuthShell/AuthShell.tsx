import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import styles from '../../../../modules/auth/styles/auth.module.scss';

export function AuthShell({ className, children, ...rest }: ComponentPropsWithRef<'main'>) {
  return (
    <main className={clsx(styles.shell, className)} {...rest}>
      <div className={styles.container}>{children}</div>
    </main>
  );
}
