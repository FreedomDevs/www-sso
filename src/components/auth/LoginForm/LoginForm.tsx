'use client';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import Link from 'next/link';

import styles from './LoginForm.module.css';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export function LoginForm() {
  return (
    <form className={styles.form}>
      <Input
        id="email"
        placeholder="Email или имя пользователя"
        variant={'default'}
        label={"Email"}
      />

      <Input
        id="password"
        placeholder="Пароль"
        type={'password'}
        variant={'default'}
        label={"Password"}
      />

      <Button fullWidth={true} variant={'primary'} size={'sm'}>
        Продолжить
      </Button>

      <div className={styles.divider}>
        <span />
        <p>или продолжите с</p>
        <span />
      </div>

      <div className={styles.socials}>
        <Button
          size={'sm'}
          variant="integrations"
          leftIcon={<FaGoogle />}
          fullWidth
        >
          Google
        </Button>

        <Button
          size={'sm'}
          variant="integrations"
          leftIcon={<FaGithub />}
          fullWidth
        >
          GitHub
        </Button>
      </div>

      <div className={styles.links}>
        <Link href="/passwordless">Войти с Passkey</Link>
        <Link href="/forgot-password">Забыли пароль?</Link>
      </div>

      <div className={styles.register}>
        <span>Нет аккаунта?</span>
        <Link href="/auth/register">Зарегистрироваться</Link>
      </div>
    </form>
  );
}
