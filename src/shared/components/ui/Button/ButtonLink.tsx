import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { buttonClassName, type ButtonStyleOptions } from './Button';

export type ButtonLinkProps = ComponentProps<typeof Link> &
  ButtonStyleOptions & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

export function ButtonLink({
  variant,
  size,
  fullWidth,
  iconOnly,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName({ variant, size, fullWidth, iconOnly }, className)} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  );
}
