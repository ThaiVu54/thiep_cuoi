"use client";

import { siteConfig } from "@/config/site.config";
import { formatDateVN } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type EnvelopeCoverProps = {
  /** true khi khách đã bấm "Mở thiệp" */
  opened: boolean;
  onOpen: () => void;
  /** Gọi sau khi hiệu ứng mở thiệp chạy xong (dùng để cuộn xuống nội dung) */
  onRevealed?: () => void;
};

const BURST_EMOJIS = ["💗", "🌸", "💖", "🌷", "❤️", "🌺"];
const BURST_PARTICLES = Array.from({ length: 16 }, (_, i) => {
  // Rải theo hình quạt hướng lên trên (-165° đến -15°)
  const angle = ((-165 + (150 * i) / 15) * Math.PI) / 180;
  const distance = 130 + ((i * 37) % 120);
  return {
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance),
    delay: (i % 6) * 0.05,
    size: 16 + ((i * 13) % 16),
    rotate: ((i * 47) % 140) - 70,
    emoji: BURST_EMOJIS[i % BURST_EMOJIS.length],
  };
});
/**
 * Màn phủ toàn màn hình mô phỏng một chiếc phong bì thiệp cưới.
 * Khi khách bấm dấu niêm phong "Mở":
 *   1. Dấu sáp thu nhỏ và biến mất
 *   2. Nắp phong bì lật lên (hiệu ứng 3D)
 *   3. Tấm thiệp bên trong trồi lên
 *   4. Toàn bộ màn phủ mờ dần để lộ nội dung
 */
export function EnvelopeCover({ opened, onOpen, onRevealed }: EnvelopeCoverProps) {
  const prefersReducedMotion = useReducedMotion();

  // Khóa cuộn trang khi màn phủ còn hiển thị
  useEffect(() => {
    if (opened) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [opened]);

  // Lấy tên gọi ngắn (từ cuối cùng) cho gọn trên thiệp
  const groomShort = siteConfig.groom.name.split(" ").pop() ?? siteConfig.groom.name;
  const brideShort = siteConfig.bride.name.split(" ").pop() ?? siteConfig.bride.name;
  const monogram = `${groomShort.charAt(0)} & ${brideShort.charAt(0)}`;

  // Clip-path cho các mảnh phong bì
  const flapClip = "polygon(0 0, 100% 0, 50% 62%)"; // nắp trên hình tam giác
  const pocketClip = "polygon(0 100%, 100% 100%, 100% 42%, 50% 78%, 0 42%)"; // túi trước

  return (
    <AnimatePresence onExitComplete={onRevealed}>
      {!opened && (
        <motion.div
          key="envelope-cover"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light"
          role="dialog"
          aria-modal="true"
          aria-label="Bìa thiệp cưới"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 1.25 }}
        >
          {/* Họa tiết chấm vàng mờ ở nền */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />

          {/* Sân khấu 3D cho phong bì */}
          <div className="relative" style={{ perspective: 1200, WebkitPerspective: 1200 }}>
            <motion.div
              className="relative h-[260px] w-[86vw] max-w-[380px] sm:h-[280px]"
              // Phong bì đung đưa nhẹ khi đóng
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
              }
            >
              {/* Đáy phong bì (lớp sau cùng) */}
              <div className="absolute inset-0 rounded-lg bg-primary-dark shadow-2xl shadow-black/40" />

              {/* Tấm thiệp bên trong — trồi lên khi mở */}
              <motion.div
                className="absolute inset-x-4 top-3 z-10 flex flex-col items-center justify-center rounded-md bg-cream px-4 py-6 text-center shadow-lg"
                style={{ height: "78%" }}
                exit={prefersReducedMotion ? { opacity: 0 } : { y: "-118%", opacity: [1, 1, 0] }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.9,
                  delay: prefersReducedMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-2 h-px w-10 bg-gold/50" />
                <p className="font-script text-3xl text-primary sm:text-4xl">{groomShort}</p>
                <p className="my-0.5 font-serif text-lg text-gold">&amp;</p>
                <p className="font-script text-3xl text-primary sm:text-4xl">{brideShort}</p>
                <p className="mt-3 font-serif text-[11px] uppercase tracking-[0.2em] text-ink-light">
                  {formatDateVN(siteConfig.weddingDate)}
                </p>
                <div className="mt-2 h-px w-10 bg-gold/50" />
              </motion.div>

              {/* Túi trước của phong bì (che nửa dưới tấm thiệp) */}
              <div
                className="absolute inset-0 z-20 bg-gradient-to-t from-primary-dark to-primary"
                style={{ clipPath: pocketClip, WebkitClipPath: pocketClip }}
              />

              {/* Nắp phong bì — lật lên khi mở */}
              <motion.div
                className="absolute inset-x-0 top-0 z-30 h-full origin-top bg-gradient-to-b from-primary-light to-primary"
                style={{
                  clipPath: flapClip,
                  WebkitClipPath: flapClip,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                exit={prefersReducedMotion ? { opacity: 0 } : { rotateX: -180 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.75,
                  delay: prefersReducedMotion ? 0 : 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {/* Viền vàng chạy theo mép nắp */}
                <div className="absolute left-0 right-0 top-0 h-px bg-gold/40" />
                {/* Chữ lồng (monogram) trên nắp */}
                <p className="absolute left-1/2 top-6 -translate-x-1/2 font-script text-xl text-gold/80">
                  {monogram}
                </p>
              </motion.div>

              {/* Dấu niêm phong (nút mở) — nằm ở đỉnh nắp */}
              <motion.button
                type="button"
                onClick={onOpen}
                autoFocus
                aria-label="Mở thiệp cưới"
                className="group absolute left-1/2 top-[46%] z-40 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "backIn" }}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/60 bg-gradient-to-br from-primary-light to-primary-dark shadow-lg ring-1 ring-black/10 transition-shadow group-hover:shadow-gold/40 sm:h-20 sm:w-20">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 sm:h-16 sm:w-16">
                    <span className="font-script text-2xl text-gold sm:text-3xl">Mở</span>
                  </span>
                </span>
              </motion.button>

              {/* Tim & cánh hoa bung ra đúng lúc nắp phong bì mở */}
              {!prefersReducedMotion &&
                BURST_PARTICLES.map((p, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-[34%] z-40 -translate-x-1/2 -translate-y-1/2 select-none"
                    style={{ fontSize: p.size }}
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0.7],
                      x: p.x,
                      y: p.y,
                      rotate: p.rotate,
                    }}
                    transition={{ duration: 1.1, delay: 0.3 + p.delay, ease: "easeOut" }}
                  >
                    {p.emoji}
                  </motion.span>
                ))}
            </motion.div>
          </div>

          {/* Gợi ý thao tác */}
          <motion.p
            className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-cream/70"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: [0.4, 1, 0.4],
                    y: 0,
                    transition: { opacity: { duration: 2.4, repeat: Infinity }, y: { duration: 0.6 } },
                  }
            }
            exit={{ opacity: 0 }}
          >
            Nhấn dấu niêm phong để mở thiệp
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
