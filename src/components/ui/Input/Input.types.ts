import { InputHTMLAttributes, ReactNode } from 'react';

export type InputVariant = 'default' | 'error';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant: InputVariant;
}
