"use client";

import { Modal } from "@/components/ui/Modal";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import { useState } from "react";

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="card-burgundy">
      <h2 className="font-serif text-2xl text-center text-gold">Khoảnh Khắc</h2>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent my-4" />
      
      <p className="text-center text-sm text-cream/70 mb-6">
        Những kỷ niệm đẹp của chúng mình
      </p>

      <div className="grid grid-cols-2 gap-3">
        {siteConfig.gallery.map((src, index) => (
          <button 
            key={src} 
            className="group relative overflow-hidden border-2 border-gold/30 hover:border-gold transition-colors"
            onClick={() => setActive(src)}
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
          </button>
        ))}
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
