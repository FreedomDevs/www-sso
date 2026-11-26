'use client';

import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const style = {
  '--normal-bg': 'var(--color-surface)',
  '--normal-text': 'var(--color-text)',
  '--normal-border': 'var(--color-line)',
  '--border-radius': 'var(--radius-md)',
} as CSSProperties;

export function Toaster(props: ToasterProps) {
  return <Sonner theme="dark" position="top-center" style={style} {...props} />;
}
