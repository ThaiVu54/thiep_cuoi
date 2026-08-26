"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  /** Khoảng cách (giây) giữa các StaggerItem con */
  stagger?: number;
  amount?: number;
};

/** Bọc quanh nhiều StaggerItem để chúng hiện ra lần lượt khi cuộn tới */
export function StaggerGroup({ children, className, stagger = 0.12, amount = 0.2 }: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

/** Một phần tử con của StaggerGroup — tự nhận trạng thái hiện/ẩn từ component cha */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
