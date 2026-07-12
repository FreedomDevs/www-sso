import styles from './page.module.scss';
import Image from 'next/image';
import { maskEmail } from '@/src/lib/maskEmail';
import { OtpForm } from '@/src/components/auth/OtpForm/OtpForm';

type Props = {
  email: string;
  emailToken: string;
  login: string;
  client_id?: string;
};

export default function PageCtx({ email, emailToken, login, client_id }: Props) {
  const maskedEmail = maskEmail(email);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoWrapper}>
            <Image
              src="/logo.svg"
              alt="ElysiaID"
              width={48}
              height={48}
              priority
            />
          </div>

          <h1>ElysiaID</h1>
        </div>

        <div className={styles.header}>
          <h2>Проверьте E-MAIL</h2>
          <p>
            Мы отправили 6-значный код на <span>{maskedEmail}</span>
          </p>
          <p>
            Если письма нет, проверьте <strong>«Спам»</strong>.
          </p>
        </div>

        <OtpForm
          emailToken={emailToken}
          login={login}
          client_id={client_id}
        />
      </div>
    </main>
  );
}
