import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconOnly?: boolean;
};

export function buttonClassName(
  { variant = 'primary', size = 'md', fullWidth, iconOnly }: ButtonStyleOptions = {},
  className?: string,
) {
  return clsx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.full,
    iconOnly && styles.iconOnly,
    className,
  );
}

export type ButtonProps = ComponentPropsWithRef<'button'> &
  ButtonStyleOptions & {
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

export function Button({
  variant,
  size,
  fullWidth,
  iconOnly,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, fullWidth, iconOnly }, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && leftIcon}
      {!(loading && iconOnly) && children}
      {!loading && rightIcon}
    </button>
  );
}
