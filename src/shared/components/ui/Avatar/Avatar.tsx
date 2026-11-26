'use client';

import clsx from 'clsx';
import { useState, type ComponentPropsWithRef } from 'react';
import { LuUser } from 'react-icons/lu';
import styles from './Avatar.module.scss';

export type AvatarProps = ComponentPropsWithRef<'span'> & {
  src?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

function getInitials(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (parts.length === 0) return '';
  const first = Array.from(parts[0])[0] ?? '';
  const last = parts.length > 1 ? (Array.from(parts[parts.length - 1])[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export function Avatar({ src, name, size = 'md', className, ...rest }: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;
  const initials = getInitials(name);

  return (
    <span
      role={name ? 'img' : undefined}
      aria-label={name}
      className={clsx(styles.avatar, styles[size], className)}
      {...rest}
    >
      {showImage ? (
        <img src={src ?? undefined} alt="" className={styles.image} onError={() => setFailedSrc(src ?? null)} />
      ) : (
        initials || <LuUser aria-hidden="true" />
      )}
    </span>
  );
}
