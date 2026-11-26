import { useCallback, useEffect, useState } from 'react';

export function useCooldown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  const isActive = left > 0;

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setLeft((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [isActive]);

  const restart = useCallback(() => setLeft(seconds), [seconds]);

  return { left, isActive, restart };
}
