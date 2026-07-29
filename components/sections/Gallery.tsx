"use client";

import { Modal } from "@/components/ui/Modal";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import { useState } from "react";

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="section-card">
      <h2 className="font-serif text-2xl text-rose-700">Album ảnh</h2>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {siteConfig.gallery.map((src) => (
          <button key={src} className="overflow-hidden rounded-2xl" onClick={() => setActive(src)}>
            <Image src={src} alt="Ảnh cưới" width={400} height={300} loading="lazy" className="h-28 w-full object-cover" />
          </button>
        ))}
      </div>
      <Modal open={Boolean(active)} onClose={() => setActive(null)}>
        {active ? <Image src={active} alt="Ảnh phóng to" width={900} height={700} className="rounded-2xl" /> : null}
      </Modal>
    </section>
  );
}
