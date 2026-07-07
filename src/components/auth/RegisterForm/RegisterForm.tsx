'use client';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import Link from 'next/link';

import styles from './RegisterForm.module.css';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export function RegisterForm() {
  return (
    <form className={styles.form}>
      <Input
        id="email"
        placeholder="Email"
        variant={'default'}
        label={'email'}
      />

      <Input
        id="login"
        placeholder="Логин"
        variant={'default'}
        label={'Логин'}
      />

      <Input
        id="password"
        type={'password'}
        placeholder="Пароль"
        variant={'default'}
        label={'Пароль'}
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

      <div className={styles.register}>
        <span>Уже есть аккаунт?</span>
        <Link href="/auth/login">Войти</Link>
      </div>
    </form>
  );
}
