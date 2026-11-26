'use client';

import clsx from 'clsx';
import { useState, type ComponentPropsWithRef } from 'react';
import { Spinner } from '../Spinner/Spinner';
import styles from './Switch.module.scss';

export type SwitchProps = Omit<ComponentPropsWithRef<'button'>, 'role' | 'value' | 'onChange'> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  loading?: boolean;
};

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  loading = false,
  disabled,
  className,
  onClick,
  ...rest
}: SwitchProps) {
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? innerChecked;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={clsx(styles.switch, className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const next = !checked;
        if (controlledChecked === undefined) setInnerChecked(next);
        onCheckedChange?.(next);
      }}
      {...rest}
    >
      <span className={styles.thumb}>{loading && <Spinner size="0.7rem" />}</span>
    </button>
  );
}
