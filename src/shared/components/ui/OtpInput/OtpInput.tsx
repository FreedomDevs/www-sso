'use client';

import clsx from 'clsx';
import { useRef, useState, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from 'react';
import styles from './OtpInput.module.scss';

export type OtpInputProps = {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  name?: string;
  invalid?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  label?: string;
  getDigitLabel?: (index: number, length: number) => string;
  className?: string;
};

const onlyDigits = (input: string) => input.replace(/\D/g, '');

export function OtpInput({
  length = 6,
  value: controlledValue,
  defaultValue = '',
  onChange,
  onComplete,
  name,
  invalid,
  disabled,
  autoFocus,
  label = 'Код подтверждения',
  getDigitLabel = (index, total) => `Цифра ${index + 1} из ${total}`,
  className,
}: OtpInputProps) {
  const [innerValue, setInnerValue] = useState(() => onlyDigits(defaultValue).slice(0, length));
  const cells = useRef<Array<HTMLInputElement | null>>([]);
  const value = controlledValue ?? innerValue;

  const focusCell = (index: number) => {
    const cell = cells.current[Math.max(0, Math.min(length - 1, index))];
    cell?.focus();
    cell?.select();
  };

  const commit = (next: string) => {
    const clean = onlyDigits(next).slice(0, length);
    if (controlledValue === undefined) setInnerValue(clean);
    onChange?.(clean);
    if (clean.length === length) onComplete?.(clean);
    return clean;
  };

  const insertAt = (index: number, raw: string) => {
    const incoming = onlyDigits(raw);
    if (!incoming) return;
    const next = commit(value.slice(0, index) + incoming + value.slice(index + 1));
    focusCell(Math.min(index + incoming.length, next.length, length - 1));
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    if (raw === '') {
      commit(value.slice(0, index) + value.slice(index + 1));
      return;
    }
    insertAt(index, raw);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      event.preventDefault();
      commit(value.slice(0, index - 1) + value.slice(index));
      focusCell(index - 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusCell(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusCell(index + 1);
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const text = onlyDigits(event.clipboardData.getData('text'));
    if (!text) return;
    if (text.length >= length) {
      commit(text);
      focusCell(length - 1);
      return;
    }
    insertAt(index, text);
  };

  const digits = Array.from({ length }, (_, index) => value[index] ?? '');

  return (
    <div role="group" aria-label={label} className={clsx(styles.group, className)}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            cells.current[index] = element;
          }}
          className={styles.cell}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          aria-label={getDigitLabel(index, length)}
          aria-invalid={invalid || undefined}
          value={digit}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
        />
      ))}
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
