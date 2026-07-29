"use client";

import { useEffect, useMemo, useState } from "react";

export function useCountdown(targetDate: string) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [diff, setDiff] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setDiff(target - Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  const safe = Math.max(diff, 0);
  const days = Math.floor(safe / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safe / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safe / (1000 * 60)) % 60);
  const seconds = Math.floor((safe / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: diff <= 0 };
}
