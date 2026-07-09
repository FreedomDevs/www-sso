import Link from 'next/link';

import styles from '../Auth.module.scss';

type Props = {
  text: string;
  linkText: string;
  href: string;
};

export function AuthFooter({ text, linkText, href }: Props) {
  return (
    <div className={styles.footer}>
      <span>{text}</span>

      <Link href={href}>{linkText}</Link>
    </div>
  );
}
