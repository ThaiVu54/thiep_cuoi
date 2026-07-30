"use client";

import { useFireworks } from "@/hooks/useFireworks";
import { useCountdown } from "@/hooks/useCountdown";
import { useEffect, useRef } from "react";

// Ngày xa trong tương lai dùng khi không truyền countdownDate
const FAR_FUTURE_DATE = "2099-01-01T00:00:00";

interface FireworksProps {
  trigger: boolean;
  burstCount?: number;
  showButton?: boolean;
  countdownDate?: string;
}

export function Fireworks({
  trigger,
  burstCount,
  showButton,
  countdownDate,
}: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { launch } = useFireworks(canvasRef);

  // Luôn gọi useCountdown (không được gọi hook có điều kiện)
  // Nếu không truyền countdownDate thì dùng ngày xa tương lai
  const { isExpired } = useCountdown(countdownDate ?? FAR_FUTURE_DATE);

  // Ref theo dõi đã bắn pháo hoa khi countdown hết chưa
  const hasCountdownFiredRef = useRef(false);

  // Resize canvas khi mount và khi window thay đổi kích thước
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Trigger khi prop `trigger` chuyển false → true
  useEffect(() => {
    if (trigger) {
      launch(burstCount ?? 4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // Trigger khi countdown hết hạn (chỉ một lần)
  useEffect(() => {
    if (countdownDate && isExpired && !hasCountdownFiredRef.current) {
      hasCountdownFiredRef.current = true;
      launch(6);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpired, countdownDate]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none"
      />

      {showButton !== false && (
        <button
          type="button"
          onClick={() => launch(burstCount ?? 4)}
          aria-label="Bắn pháo hoa"
          title="Bắn pháo hoa"
          className="fixed bottom-20 right-4 z-50 bg-primary text-cream rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
        >
          🎆
        </button>
      )}
    </>
  );
}
