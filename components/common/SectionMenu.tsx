"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

export type MenuItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

// Danh sách các mục hiển thị trong menu tổng quan (dùng chung cho toàn app)
export const MENU_ITEMS: MenuItem[] = [
  {
    id: "hero",
    label: "Trang chủ",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
    ),
  },
  {
    id: "calendar",
    label: "Lịch",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
  },
  {
    id: "countdown",
    label: "Đếm ngược",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    id: "invitation",
    label: "Thiệp mời",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    id: "program",
    label: "Chương trình",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    ),
  },
  {
    id: "event",
    label: "Thông tin lễ",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    id: "gallery",
    label: "Album ảnh",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
  },
  {
    id: "location",
    label: "Bản đồ",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
  },
  {
    id: "rsvp",
    label: "Xác nhận & Lời chúc",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    ),
  },
];

type SectionMenuProps = {
  open: boolean;
  onClose: () => void;
  /** slug khách để giữ cá nhân hoá khi sang trang riêng */
  guestSlug?: string;
};

export function SectionMenu({ open, onClose, guestSlug }: SectionMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  // Gắn slug khách vào link để trang riêng vẫn cá nhân hoá được
  const buildHref = (id: string) => (guestSlug ? `/${id}?g=${guestSlug}` : `/${id}`);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas/95 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu các mục"
        >
          {/* Nút đóng menu */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-sage/20 hover:text-ink"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="mb-2 font-script text-3xl text-ink">Mục lục</p>
          <div className="divider max-w-[8rem]" />
          <p className="mb-8 mt-2 text-xs uppercase tracking-[0.3em] text-ink-muted">
            Chọn mục để xem
          </p>

          <div className="grid w-full max-w-md grid-cols-3 gap-4 sm:gap-6">
            {/* Mục đặc biệt: xem toàn bộ thiệp (đóng menu, cuộn như trang chủ) */}
            <motion.button
              type="button"
              onClick={onClose}
              className="group flex flex-col items-center gap-2 rounded-2xl p-3 transition-colors hover:bg-sage/15"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage text-white shadow-soft transition-colors group-hover:bg-sage-deep">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h10M4 18h10" />
                </svg>
              </span>
              <span className="text-center text-[11px] font-medium leading-tight text-ink group-hover:text-ink">
                Xem toàn bộ
              </span>
            </motion.button>

            {MENU_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: prefersReducedMotion ? 0 : (index + 1) * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={buildHref(item.id)}
                  onClick={onClose}
                  className="group flex flex-col items-center gap-2 rounded-2xl p-3 transition-colors hover:bg-sage/15"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 text-sage-deep transition-colors group-hover:bg-sage group-hover:text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </span>
                  <span className="text-center text-[11px] font-medium leading-tight text-ink-muted group-hover:text-ink">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
