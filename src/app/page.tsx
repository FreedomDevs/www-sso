'use client'

import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Counter: {count}</h2>

      <Button onClick={() => setCount(count + 1)} variant={'primary'} size={'sm'}>PIPISKA</Button>
    </>
  );
}
