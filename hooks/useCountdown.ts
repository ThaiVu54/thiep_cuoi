"use client";

import { useEffect, useMemo, useState } from "react";

export function useCountdown(targetDate: string) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  // Khởi tạo với null để tránh hydration mismatch (server vs client có Date.now() khác nhau)
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    // Set ngay lần đầu để tránh flicker
    setDiff(target - Date.now());

    const id = setInterval(() => {
      setDiff(target - Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  // Khi chưa mount ở client, trả về 0 để không gây hydration mismatch
  const safe = Math.max(diff ?? 0, 0);
  const days = Math.floor(safe / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safe / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safe / (1000 * 60)) % 60);
  const seconds = Math.floor((safe / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: diff !== null && diff <= 0 };
}
