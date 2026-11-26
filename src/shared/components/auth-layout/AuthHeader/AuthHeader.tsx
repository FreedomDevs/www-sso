import clsx from 'clsx';
import Image from 'next/image';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './AuthHeader.module.scss';

export type AuthHeaderProps = Omit<ComponentPropsWithRef<'header'>, 'title'> & {
  title: ReactNode;
  description?: ReactNode;
  logo?: ReactNode | false;
  tone?: 'accent' | 'success' | 'danger';
};

export function AuthHeader({
  title,
  description,
  logo,
  tone = 'accent',
  className,
  ...rest
}: AuthHeaderProps) {
  const hasCustomLogo = logo !== undefined && logo !== false;

  return (
    <header
      className={clsx(
        styles.header,
        tone !== 'accent' && styles[tone],
        className
      )}
      {...rest}
    >
      <div className={styles.brand}>
        {hasCustomLogo && <span className={styles.icon}>{logo}</span>}
        {logo === undefined && (
          <Image src="/logo.svg" alt="" width={50} height={50} priority />
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>

      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}
