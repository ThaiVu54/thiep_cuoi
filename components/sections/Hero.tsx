"use client";

import { siteConfig } from "@/config/site.config";
import { formatDateVN } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden text-center">
      {/* Ảnh cưới full-bleed */}
      <div className="relative aspect-[4/5] w-full">
        <Image
          src="/images/hero/hero.svg"
          alt="Ảnh cô dâu chú rể"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 640px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
      </div>

      <div className="relative -mt-16 px-6 pb-10">
        <p className="section-eyebrow">Save the Date</p>

        {/* Names */}
        <h1 className="mt-3 font-script text-4xl text-ink sm:text-5xl">{siteConfig.groom.name}</h1>
        <p className="my-1 font-serif text-lg text-sage-deep">&</p>
        <h1 className="font-script text-4xl text-ink sm:text-5xl">{siteConfig.bride.name}</h1>

        <div className="divider" />

        {/* Date */}
        <p className="font-serif text-base text-ink">{formatDateVN(siteConfig.weddingDate)}</p>

        {/* Message */}
        <p className="mx-auto mt-4 max-w-xs text-sm text-ink-muted">{siteConfig.invitationMessage}</p>
      </div>
    </section>
  );
}
