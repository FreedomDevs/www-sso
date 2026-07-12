import { Fragment, useRef } from 'react';
import clsx from 'clsx';

import styles from './OtpInput.module.css';
import { OtpInputProps } from './OtpInput.types';

export const OtpInput = ({
  value,
  onChange,
  length = 6,
  disabled,
  error,
}: OtpInputProps) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const values = Array.from({ length }, (_, i) => value[i] ?? '');

  const handleChange = (index: number, inputValue: string) => {
    const digit = inputValue.replace(/\D/g, '').slice(-1);

    const next = [...values];
    next[index] = digit;

    onChange(next.join(''));

    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== 'Backspace') return;

    if (values[index]) {
      const next = [...values];
      next[index] = '';
      onChange(next.join(''));
      return;
    }

    if (index > 0) {
      refs.current[index - 1]?.focus();

      const next = [...values];
      next[index - 1] = '';
      onChange(next.join(''));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length);

    const next = Array.from({ length }, (_, i) => pasted[i] ?? '');

    onChange(next.join(''));

    const lastIndex = Math.min(pasted.length, length) - 1;

    if (lastIndex >= 0) {
      refs.current[lastIndex]?.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.container, error && styles.error)}>
        {values.map((digit, index) => (
          <Fragment key={index}>
            {index === 3 && <span className={styles.separator}>-</span>}

            <input
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="text"
              value={digit}
              disabled={disabled}
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              className={styles.input}
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </Fragment>
        ))}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
