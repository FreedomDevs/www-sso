import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { LuCheck } from 'react-icons/lu';
import styles from './Checkbox.module.scss';

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'> & {
  label?: ReactNode;
  description?: ReactNode;
  invalid?: boolean;
  wrapperClassName?: string;
};

export function Checkbox({
  label,
  description,
  invalid,
  className,
  wrapperClassName,
  ref,
  ...rest
}: CheckboxProps) {
  return (
    <label className={clsx(styles.root, wrapperClassName)}>
      <input
        ref={ref}
        type="checkbox"
        className={clsx(styles.input, className)}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className={styles.box} aria-hidden="true">
        <LuCheck />
      </span>
      {(label || description) && (
        <span className={styles.text}>
          {label}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  );
}
