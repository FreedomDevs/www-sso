'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';

import styles from './LoginForm.module.css';
import { FaGithub, FaGoogle } from 'react-icons/fa';

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        placeholder="Email или имя пользователя"
        variant="default"
        label="Email или Login"
        error={errors.email?.message}
        {...register('email', {
          required: 'Введите email',
        })}
      />

      <Input
        id="password"
        placeholder="Пароль"
        type="password"
        variant="default"
        label="Password"
        error={errors.password?.message}
        {...register('password', {
          required: 'Введите пароль',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов',
          },
        })}
      />

      <Button type="submit" fullWidth variant="primary" size="sm">
        Продолжить
      </Button>

      <div className={styles.divider}>
        <span />
        <p>или продолжите с</p>
        <span />
      </div>

      <div className={styles.socials}>
        <Button
          size="sm"
          variant="integrations"
          leftIcon={<FaGoogle />}
          fullWidth
          type="button"
        >
          Google
        </Button>

        <Button
          size="sm"
          variant="integrations"
          leftIcon={<FaGithub />}
          fullWidth
          type="button"
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
