"use client";

import { Modal } from "@/components/ui/Modal";
import { siteConfig } from "@/config/site.config";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="card-burgundy">
      <h2 className="font-serif text-2xl text-center text-gold">Khoảnh Khắc</h2>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent my-4" />
      
      <p className="text-center text-sm text-cream/70 mb-6">
        Những kỷ niệm đẹp của chúng mình
      </p>

      {/* overflow-hidden: chặn scroll ngang khi ảnh trượt vào từ 2 bên */}
      <div className="grid grid-cols-2 gap-3 overflow-hidden">
        {siteConfig.gallery.map((src, index) => {
          // Cột trái bay vào từ trái, cột phải bay vào từ phải
          const fromLeft = index % 2 === 0;

          return (
            <motion.button 
              key={src} 
              className="group relative overflow-hidden border-2 border-gold/30 hover:border-gold transition-colors"
              onClick={() => setActive(src)}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: fromLeft ? -60 : 60, scale: 0.94 }
              }
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.7,
                // Mỗi hàng ảnh hiện trễ hơn hàng trước
                delay: prefersReducedMotion ? 0 : Math.floor(index / 2) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Frame decoration */}
              <div className="absolute inset-1 border border-cream/20 pointer-events-none z-10" />
              
              <Image 
                src={src} 
                alt={`Ảnh kỷ niệm ${index + 1}`}
                width={400} 
                height={300} 
                loading="lazy" 
                className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-cream text-sm transition-opacity">
                  Xem ảnh
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)}>
        {active && (
          <Image 
            src={active} 
            alt="Ảnh phóng to" 
            width={900} 
            height={700} 
            className="w-full"
          />
        )}
      </Modal>
    </section>
  );
}
