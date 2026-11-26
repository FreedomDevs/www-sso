import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Card } from '../Card/Card';
import styles from './SettingsRow.module.scss';

export type SettingsSectionProps = Omit<ComponentPropsWithRef<'section'>, 'title'> & {
  title: ReactNode;
  description?: ReactNode;
  variant?: 'default' | 'danger';
  headerAction?: ReactNode;
};

export function SettingsSection({
  title,
  description,
  variant = 'default',
  headerAction,
  className,
  children,
  ...rest
}: SettingsSectionProps) {
  return (
    <section className={className} {...rest}>
      <Card padding="none" variant={variant}>
        <header className={styles.sectionHeader}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {description && <p className={styles.sectionDescription}>{description}</p>}
          </div>
          {headerAction}
        </header>
        <div className={styles.list}>{children}</div>
      </Card>
    </section>
  );
}

export type SettingsRowProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
};

export function SettingsRow({
  title,
  description,
  icon,
  badge,
  className,
  children,
  ...rest
}: SettingsRowProps) {
  return (
    <div className={clsx(styles.row, className)} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.content}>
        <div className={styles.titleLine}>
          <span className={styles.title}>{title}</span>
          {badge}
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children && <div className={styles.control}>{children}</div>}
    </div>
  );
}
