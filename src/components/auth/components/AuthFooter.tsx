'use client';

import Link from 'next/link';

import styles from '../Auth.module.scss';
import { useSearchParams } from 'next/navigation';

type Props = {
  text: string;
  linkText: string;
  href: string;
};

export function AuthFooter({ text, linkText, href }: Props) {
  const searchParams = useSearchParams();

  return (
    <div className={styles.footer}>
      <span>{text}</span>

      <Link
        href={{
          pathname: href,
          query: Object.fromEntries(searchParams.entries()),
        }}
      >
        {linkText}
      </Link>
    </div>
  );
}
