import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import styles from './Skeleton.module.scss';

export type SkeletonProps = ComponentPropsWithRef<'span'> & {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
};

export function Skeleton({ width, height = '1em', radius, className, style, ...rest }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(styles.skeleton, className)}
      style={{ width, height, borderRadius: radius, ...style }}
      {...rest}
    />
  );
}
