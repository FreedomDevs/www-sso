'use client';

import Image from 'next/image';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import styles from './page.module.scss';
import { useForm } from 'react-hook-form';
import { useRefreshPassword } from '@/src/api/hooks/useRefreshPassword';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

interface ForgotPasswordForm {
  login_or_email: string;
  password: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ForgotPasswordForm>();
  const refreshPasswordMutation = useRefreshPassword({
    onSuccess: (data) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('emailToken', data.email_verefication_token);
      params.set('email', form.getValues('login_or_email'));
      params.set('login', form.getValues('login_or_email'));

      router.replace(`/auth/confirm_email?${params.toString()}`);
    },

    onError: (error) => {
      toast.error(error.error.message);
      form.setError('root', {
        type: 'server',
        message: error.error.message,
      });
    }
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    console.log(data);
    refreshPasswordMutation.mutate(data);
  };

  return (
    <main className={styles.page}>
      <form className={styles.card} onSubmit={form.handleSubmit(onSubmit)}>
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
          <h2>Смена пароля</h2>
          <p>Введите пожалуйста EMail вашего аккаунта а также новый пароль</p>
        </div>

        <Input
          label="Логин или email"
          variant="default"
          {...form.register('login_or_email')}
        />

        <Input
          label="Новый пароль"
          variant="default"
          type="password"
          {...form.register('password')}
        />

        <div className={styles.actions}>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="md"
            loading={refreshPasswordMutation.isPending}
          >
            Отправить подтверждение
          </Button>
        </div>
      </form>
    </main>
  );
}
