"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealOnScrollProps = {
  children: ReactNode;
  /** Độ trễ (giây) — dùng để các phần tử hiện lần lượt */
  delay?: number;
  duration?: number;
  /** Quãng đường trượt (px) trước khi về vị trí gốc */
  distance?: number;
  direction?: Direction;
  /** Tỉ lệ phần tử lọt vào viewport thì kích hoạt (0 - 1) */
  amount?: number;
  /** Phóng nhẹ từ nhỏ lên — hợp với ảnh */
  scale?: boolean;
  className?: string;
};

function getOffset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export function RevealOnScroll({
  children,
  delay = 0,
  duration = 1,
  distance = 28,
  direction = "up",
  amount = 0.15,
  scale = false,
  className,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  // Người dùng bật "giảm chuyển động": chỉ mờ dần, không trượt/zoom
  if (prefersReducedMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount }}
        transition={{ duration: 0.9, delay }}
      >
        {children}
      </motion.div>
    );
  }

  const offset = getOffset(direction, distance);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, scale: scale ? 0.94 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
