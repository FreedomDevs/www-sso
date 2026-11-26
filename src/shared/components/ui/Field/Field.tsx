'use client';

import clsx from 'clsx';
import {
  createContext,
  useContext,
  useId,
  useMemo,
  type AriaAttributes,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import styles from './Field.module.scss';

type FieldContextValue = {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
  disabled?: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

type ControlOptions = {
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  ariaInvalid?: AriaAttributes['aria-invalid'];
  ariaDescribedBy?: string;
};

export function useFieldControl({ id, disabled, invalid, ariaInvalid, ariaDescribedBy }: ControlOptions) {
  const ctx = useContext(FieldContext);
  const ariaTrue = ariaInvalid === true || ariaInvalid === 'true' ? true : undefined;
  const isInvalid = Boolean(invalid ?? ariaTrue ?? ctx?.invalid);
  const describedBy = [ariaDescribedBy, ctx?.describedBy].filter(Boolean).join(' ') || undefined;

  return {
    invalid: isInvalid,
    props: {
      id: id ?? ctx?.id,
      disabled: disabled ?? ctx?.disabled,
      'aria-invalid': isInvalid || undefined,
      'aria-describedby': describedBy,
      'aria-required': ctx?.required || undefined,
    },
  };
}

export type FieldProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  labelAction?: ReactNode;
  children: ReactNode;
};

export function Field({
  label,
  hint,
  error,
  required,
  disabled,
  labelAction,
  id: idProp,
  className,
  children,
  ...rest
}: FieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);
  const describedBy = invalid ? errorId : hint ? hintId : undefined;

  const value = useMemo<FieldContextValue>(
    () => ({ id, describedBy, invalid, required: Boolean(required), disabled }),
    [id, describedBy, invalid, required, disabled],
  );

  return (
    <FieldContext.Provider value={value}>
      <div
        className={clsx(styles.field, className)}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        {...rest}
      >
        {(label || labelAction) && (
          <div className={styles.header}>
            {label && (
              <label htmlFor={id} className={styles.label}>
                {label}
                {required && (
                  <span className={styles.required} aria-hidden="true">
                    *
                  </span>
                )}
              </label>
            )}
            {labelAction && <span className={styles.action}>{labelAction}</span>}
          </div>
        )}
        {children}
        {invalid ? (
          <p id={errorId} role="alert" className={styles.error}>
            {error}
          </p>
        ) : (
          hint && (
            <p id={hintId} className={styles.hint}>
              {hint}
            </p>
          )
        )}
      </div>
    </FieldContext.Provider>
  );
}
