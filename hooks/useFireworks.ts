"use client";

import { useCallback, useRef, useState } from "react";
import type { RefObject } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

export const FIREWORKS_COLORS: string[] = [
  "#93A98F", // sage
  "#6D8570", // sage deep
  "#EDC9C3", // blush
  "#FAEDEA", // blush light
  "#FBF9F6", // canvas
  "#FFFFFF", // white
];

export const GRAVITY = 0.05;
export const PARTICLE_COUNT = 80;
export const BURST_INTERVAL = 400; // ms

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
  decay: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Tạo một mảng particles nổ từ điểm (x, y). */
export function createBurst(x: number, y: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2; // toàn bộ 360°
    const speed = Math.random() * 6 + 1; // 1–7 px/frame
    const color =
      FIREWORKS_COLORS[Math.floor(Math.random() * FIREWORKS_COLORS.length)];

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color,
      radius: Math.random() * 2 + 1, // 1–3 px
      decay: Math.random() * 0.015 + 0.01, // 0.010–0.025 mỗi frame
    });
  }

  return particles;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFireworks(canvasRef: RefObject<HTMLCanvasElement>) {
  const [isActive, setIsActive] = useState(false);

  // Dùng ref để tránh stale-closure trong RAF loop
  const particlesRef = useRef<Particle[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  /** Vòng lặp animation – chạy cho đến khi không còn particle nào. */
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Xóa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cập nhật & vẽ từng particle
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += GRAVITY;
      p.alpha -= p.decay;

      if (p.alpha <= 0) return false; // loại bỏ particle đã tắt

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return true;
    });

    if (particlesRef.current.length > 0) {
      rafIdRef.current = requestAnimationFrame(animate);
    } else {
      // Không còn particle → dừng loop
      rafIdRef.current = null;
      setIsActive(false);
    }
  }, [canvasRef]);

  /**
   * Bắn `count` loạt pháo hoa, mỗi loạt cách nhau BURST_INTERVAL ms.
   * Mỗi loạt nổ tại một vị trí ngẫu nhiên trong 60% trên cùng của viewport.
   */
  const launch = useCallback(
    (count: number = 4) => {
      // Kiểm tra prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Huỷ các timeout cũ (nếu có)
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];

      setIsActive(true);

      for (let i = 0; i < count; i++) {
        const id = setTimeout(() => {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height * 0.6;
          const newParticles = createBurst(x, y);
          particlesRef.current = [...particlesRef.current, ...newParticles];

          // Khởi động RAF loop nếu chưa chạy
          if (rafIdRef.current === null) {
            rafIdRef.current = requestAnimationFrame(animate);
          }
        }, i * BURST_INTERVAL);

        timeoutsRef.current.push(id);
      }
    },
    [canvasRef, animate],
  );

  return { launch, isActive };
}
