"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";
import { formatDateVN } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

type EnvelopeCoverProps = {
  opened: boolean;
  onOpen: () => void;
  onRevealed?: () => void;
};

export function EnvelopeCover({ opened, onOpen, onRevealed }: EnvelopeCoverProps) {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0.2 : 0.9;

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
          className="fixed inset-0 z-50 overflow-hidden bg-primary"
          role="dialog"
          aria-modal="true"
          aria-label="Bìa thiệp cưới"
        >
          {/* Background pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Envelope flaps */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 origin-bottom"
            style={{
              background: "linear-gradient(to bottom, #5a252c 0%, #722F37 100%)",
            }}
            exit={{ rotateX: -180 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Inner border decoration */}
            <div className="absolute inset-4 border border-gold/30" />
            
            {/* Floral corners */}
            <Image
              src="/images/decorations/floral-corner.svg"
              alt=""
              width={120}
              height={120}
              className="absolute top-4 left-4 opacity-40"
            />
            <Image
              src="/images/decorations/floral-corner.svg"
              alt=""
              width={120}
              height={120}
              className="absolute top-4 right-4 opacity-40 -scale-x-100"
            />
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 origin-top"
            style={{
              background: "linear-gradient(to top, #5a252c 0%, #722F37 100%)",
            }}
            exit={{ rotateX: 180 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Inner border decoration */}
            <div className="absolute inset-4 border border-gold/30" />
            
            {/* Floral corners */}
            <Image
              src="/images/decorations/floral-corner.svg"
              alt=""
              width={120}
              height={120}
              className="absolute bottom-4 left-4 opacity-40 -scale-y-100"
            />
            <Image
              src="/images/decorations/floral-corner.svg"
              alt=""
              width={120}
              height={120}
              className="absolute bottom-4 right-4 opacity-40 scale-[-1]"
            />
          </motion.div>

          {/* Center content */}
          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          >
            {/* Decorative text */}
            <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Thiệp Mời</p>
            
            {/* Names with script font */}
            <h1 className="mt-4 font-script text-5xl text-cream sm:text-6xl">
              {siteConfig.groom.name.split(" ").pop()}
            </h1>
            <p className="my-2 font-serif text-2xl text-gold">&</p>
            <h1 className="font-script text-5xl text-cream sm:text-6xl">
              {siteConfig.bride.name.split(" ").pop()}
            </h1>
            
            {/* Date */}
            <div className="mt-6 flex items-center gap-4">
              <div className="h-px w-12 bg-gold/50" />
              <p className="font-serif text-sm text-cream/90">{formatDateVN(siteConfig.weddingDate)}</p>
              <div className="h-px w-12 bg-gold/50" />
            </div>

            {/* Wax seal button */}
            <motion.button
              onClick={onOpen}
              className="mt-8 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              autoFocus
            >
              {/* Seal circle */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-light to-primary-dark border-4 border-gold/50 flex items-center justify-center shadow-lg group-hover:shadow-gold/30 transition-shadow">
                <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center">
                  <span className="font-script text-3xl text-gold">Mở</span>
                </div>
              </div>
              
              {/* Hover hint */}
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-cream/60 whitespace-nowrap">
                Nhấn để mở thiệp
              </p>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
