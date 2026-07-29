"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";
import { formatDateVN } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type EnvelopeCoverProps = {
  /** true khi khách đã bấm "Mở thiệp" */
  opened: boolean;
  onOpen: () => void;
  /** Gọi sau khi hiệu ứng mở màn phủ chạy xong (dùng để cuộn xuống nội dung) */
  onRevealed?: () => void;
};

/**
 * Màn phủ toàn màn hình đóng vai trò "bìa thiệp".
 * Khi khách bấm "Mở thiệp", màn phủ tách làm hai nửa trượt ra như mở phong bì.
 */
export function EnvelopeCover({ opened, onOpen, onRevealed }: EnvelopeCoverProps) {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0.2 : 0.9;

  // Khóa cuộn trang khi màn phủ còn hiển thị để khách không lướt qua bìa thiệp
  useEffect(() => {
    if (opened) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [opened]);

  return (
    <AnimatePresence onExitComplete={onRevealed}>
      {!opened && (
        <motion.div
          key="envelope-cover"
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Bìa thiệp cưới"
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-rose-200 to-rose-100"
            exit={{ y: "-100%" }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-rose-200 to-rose-100"
            exit={{ y: "100%" }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-rose-600">Save the Date</p>
            <h1 className="mt-3 font-serif text-3xl text-rose-700 sm:text-4xl">
              {siteConfig.groom.name} &amp; {siteConfig.bride.name}
            </h1>
            <p className="mt-3 text-sm text-rose-800">{formatDateVN(siteConfig.weddingDate)}</p>
            <p className="mt-6 max-w-sm text-sm text-ink">{siteConfig.invitationTitle}</p>
            <Button className="mt-6" type="button" onClick={onOpen} autoFocus>
              Mở thiệp
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
