import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import styles from './AuthFooter.module.scss';

export function AuthFooter({ className, ...rest }: ComponentPropsWithRef<'footer'>) {
  return <footer className={clsx(styles.footer, className)} {...rest} />;
}
