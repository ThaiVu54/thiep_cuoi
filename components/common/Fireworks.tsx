"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
  gravity: number;
  decay: number;
};

type Rocket = {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
};

const COLORS = [
  "#D4AF37", // gold
  "#FDF8F3", // cream
  "#E8D5A3", // gold light
  "#FFD700", // yellow gold
  "#F5F5DC", // beige
  "#FFFACD", // lemon chiffon
  "#FFF8DC", // cornsilk
  "#FF6B6B", // soft red
  "#FFB3BA", // light pink
  "#FFDFBA", // light orange
];

type FireworksProps = {
  trigger?: boolean;
  burstCount?: number;
  showButton?: boolean;
  countdownDate?: string;
};

export function Fireworks({ trigger = true, burstCount = 3 }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    let animId: number;
    let lastLaunch = 0;

    // Tạo rocket mới
    const launchRocket = () => {
      const x = canvas.width * (0.1 + Math.random() * 0.8);
      const targetY = canvas.height * (0.1 + Math.random() * 0.35);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      rockets.push({
        x,
        y: canvas.height,
        vy: -(canvas.height - targetY) / 45,
        targetY,
        color,
        trail: [],
      });
    };

    // Phát nổ tạo particles
    const explode = (x: number, y: number, color: string) => {
      const count = 80 + Math.floor(Math.random() * 60);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 1.5 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          radius: 1.5 + Math.random() * 2,
          gravity: 0.06,
          decay: 0.012 + Math.random() * 0.008,
        });
      }

      // Thêm vài tia sáng lớn
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const speed = 5 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: "#FFFFFF",
          radius: 2.5,
          gravity: 0.05,
          decay: 0.02,
        });
      }
    };

    const animate = (timestamp: number) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Launch rockets liên tục
      if (timestamp - lastLaunch > 600 + Math.random() * 800) {
        launchRocket();
        lastLaunch = timestamp;
      }

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];

        // Trail
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 12) r.trail.shift();

        r.trail.forEach((t, idx) => {
          t.alpha -= 0.08;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(r.color)},${Math.max(0, t.alpha * (idx / r.trail.length))})`;
          ctx.fill();
        });

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        r.y += r.vy;

        // Explode when reaching target
        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    // Launch vài quả đầu ngay lập tức
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => launchRocket(), i * 400);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [trigger, burstCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// Helper: "#D4AF37" -> "212,175,55"
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255,255,255";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
