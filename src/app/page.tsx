'use client';

import { Button } from '@/src/components/ui/Button';
import { toast } from 'sonner';
import { Input } from '@/src/components/ui/Input';

export default function Home() {
  return (
    <>
      {/*<Button*/}
      {/*  variant={'primary'}*/}
      {/*  size={'md'}*/}
      {/*  onClick={() => toast.warning('Успешно сохранено!')}*/}
      {/*>*/}
      {/*  Войти*/}
      {/*</Button>*/}

      <Input placeholder="Введите email" variant={'default'} />
    </>
  );
}
