"use client";

import { useCallback, useEffect, useRef } from "react";

type UseAutoScrollOptions = {
  /** Tốc độ cuộn (px / giây) */
  speed?: number;
  /** Chờ bao lâu sau khi start() được gọi thì mới bắt đầu cuộn (ms) */
  startDelay?: number;
};

/**
 * Tự động cuộn trang xuống nếu khách không thao tác; dừng ngay khi khách tự lướt/chạm/gõ phím.
 */
export function useAutoScroll({ speed = 70, startDelay = 1500 }: UseAutoScrollOptions = {}) {
  const rafRef = useRef<number>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const stoppedRef = useRef(false);
  const scheduledRef = useRef(false);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const start = useCallback(() => {
    if (stoppedRef.current || scheduledRef.current) return;
    scheduledRef.current = true;

    timeoutRef.current = setTimeout(() => {
      if (stoppedRef.current) return;

      let lastTime: number | null = null;

      const step = (time: number) => {
        if (stoppedRef.current) return;
        if (lastTime === null) lastTime = time;
        const deltaSeconds = (time - lastTime) / 1000;
        lastTime = time;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY >= maxScroll - 2) {
          stop();
          return;
        }

        window.scrollBy(0, speed * deltaSeconds);
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    }, startDelay);
  }, [speed, startDelay, stop]);

  // Khách tự lướt/chạm/gõ phím thì huỷ auto-scroll ngay, không tranh chấp thao tác
  useEffect(() => {
    const cancel = () => stop();
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

    events.forEach((event) => window.addEventListener(event, cancel, { passive: true }));
    return () => {
      events.forEach((event) => window.removeEventListener(event, cancel));
      stop();
    };
  }, [stop]);

  return { start, stop };
}
