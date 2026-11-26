'use client';

import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { Input, type InputProps } from '../Input/Input';
import styles from './PasswordInput.module.scss';

export type PasswordInputProps = Omit<InputProps, 'type' | 'endAdornment'> & {
  showLabel?: string;
  hideLabel?: string;
};

export function PasswordInput({
  showLabel = 'Показать пароль',
  hideLabel = 'Скрыть пароль',
  autoComplete = 'current-password',
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...rest}
      autoComplete={autoComplete}
      type={visible ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
        >
          {visible ? <LuEyeOff /> : <LuEye />}
        </button>
      }
    />
  );
}
