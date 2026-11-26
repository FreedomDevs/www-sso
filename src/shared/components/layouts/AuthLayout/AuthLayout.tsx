import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Card } from '../../ui/Card/Card';
import styles from './AuthLayout.module.scss';

export type AuthLayoutProps = {
  title?: ReactNode;
  description?: ReactNode;
  logo?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AuthLayout({ title, description, logo, footer, children, className }: AuthLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <Card padding="lg" className={clsx(styles.card, className)}>
          {(title || description) && (
            <header className={styles.header}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {description && <p className={styles.description}>{description}</p>}
            </header>
          )}
          {children}
        </Card>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </main>
  );
}
