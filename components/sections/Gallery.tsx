"use client";

import { StaggerGroup, StaggerItem } from "@/components/common/Stagger";
import { Modal } from "@/components/ui/Modal";
import { siteConfig } from "@/config/site.config";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section">
      <StaggerGroup stagger={0.1}>
        <StaggerItem>
          <h2 className="section-title">Khoảnh Khắc</h2>
          <div className="divider" />
        </StaggerItem>

        <StaggerItem>
          <p className="text-center text-sm text-ink-muted mb-6">
            Ảnh của chúng mình
          </p>
        </StaggerItem>
      </StaggerGroup>

      {/* overflow-hidden: chặn scroll ngang khi ảnh trượt vào từ 2 bên */}
      <div className="grid grid-cols-2 gap-3 overflow-hidden">
        {siteConfig.gallery.map((src, index) => {
          // Cột trái bay vào từ trái, cột phải bay vào từ phải
          const fromLeft = index % 2 === 0;

          return (
            <motion.button 
              key={`${src}-${index}`} 
              className="group relative overflow-hidden rounded-xl shadow-soft"
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
              <Image 
                src={src} 
                alt={`Ảnh kỷ niệm ${index + 1}`}
                width={400} 
                height={300} 
                loading="lazy" 
                // 2 ảnh đầu canh lên trên để thấy rõ khuôn mặt
                className={`h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  index < 2 ? "object-top" : "object-center"
                }`}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-sm transition-opacity">
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
            className="w-full rounded-xl"
          />
        )}
      </Modal>
    </section>
  );
}
