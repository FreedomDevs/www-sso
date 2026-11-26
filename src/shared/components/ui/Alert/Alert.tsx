import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { LuCircleAlert, LuCircleCheck, LuInfo, LuTriangleAlert, LuX } from 'react-icons/lu';
import styles from './Alert.module.scss';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: <LuInfo />,
  success: <LuCircleCheck />,
  warning: <LuTriangleAlert />,
  danger: <LuCircleAlert />,
};

export type AlertProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
  variant?: AlertVariant;
  title?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
};

export function Alert({
  variant = 'info',
  title,
  icon,
  action,
  onDismiss,
  dismissLabel = 'Закрыть',
  className,
  children,
  ...rest
}: AlertProps) {
  const iconNode = icon === false ? null : (icon ?? defaultIcons[variant]);

  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={clsx(styles.alert, styles[variant], className)}
      {...rest}
    >
      {iconNode && <span className={styles.icon}>{iconNode}</span>}
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.message}>{children}</div>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
      {onDismiss && (
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label={dismissLabel}>
          <LuX />
        </button>
      )}
    </div>
  );
}
