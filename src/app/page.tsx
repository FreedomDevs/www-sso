'use client'

import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { OtpInput } from '@/src/components/ui/OtpInput';

export default function Home() {
  const [code, setCode] = useState('');

  return (
    <>
      <h1>code: {code}</h1>
      <OtpInput value={code} onChange={setCode}/>
    </>
  );
}
