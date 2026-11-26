import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import styles from './Card.module.scss';

export type CardProps = ComponentPropsWithRef<'div'> & {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'muted' | 'danger';
};

export function Card({ padding = 'md', variant = 'default', className, ...rest }: CardProps) {
  return (
    <div
      className={clsx(styles.card, styles[padding], variant !== 'default' && styles[variant], className)}
      {...rest}
    />
  );
}

export function CardHeader({ className, ...rest }: ComponentPropsWithRef<'div'>) {
  return <div className={clsx(styles.header, className)} {...rest} />;
}

export type CardTitleProps = ComponentPropsWithRef<'h2'> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
};

export function CardTitle({ as: Tag = 'h2', className, ...rest }: CardTitleProps) {
  return <Tag className={clsx(styles.title, className)} {...rest} />;
}

export function CardDescription({ className, ...rest }: ComponentPropsWithRef<'p'>) {
  return <p className={clsx(styles.description, className)} {...rest} />;
}

export function CardBody({ className, ...rest }: ComponentPropsWithRef<'div'>) {
  return <div className={clsx(styles.body, className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: ComponentPropsWithRef<'div'>) {
  return <div className={clsx(styles.footer, className)} {...rest} />;
}
