"use client";

import { siteConfig } from "@/config/site.config";
import { formatDateVN } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-center py-12 px-6">
      {/* Decorative border */}
      <div className="absolute inset-3 border border-gold/30 pointer-events-none" />
      
      {/* Floral decorations */}
      <Image
        src="/images/decorations/floral-corner.svg"
        alt=""
        width={100}
        height={100}
        className="absolute top-0 left-0 opacity-50"
      />
      <Image
        src="/images/decorations/floral-corner.svg"
        alt=""
        width={100}
        height={100}
        className="absolute top-0 right-0 opacity-50 -scale-x-100"
      />
      <Image
        src="/images/decorations/floral-corner.svg"
        alt=""
        width={100}
        height={100}
        className="absolute bottom-0 left-0 opacity-50 -scale-y-100"
      />
      <Image
        src="/images/decorations/floral-corner.svg"
        alt=""
        width={100}
        height={100}
        className="absolute bottom-0 right-0 opacity-50 scale-[-1]"
      />

      <div className="relative z-10">
        {/* Hero image placeholder */}
        <div className="mx-auto w-32 h-32 rounded-full border-4 border-gold/50 overflow-hidden mb-6 shadow-lg">
          <Image
            src="/images/hero/hero.svg"
            alt="Ảnh cô dâu chú rể"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Save the Date</p>
        
        {/* Names */}
        <h1 className="mt-4 font-script text-4xl text-cream sm:text-5xl">
          {siteConfig.groom.name}
        </h1>
        <p className="my-2 font-serif text-xl text-gold">&</p>
        <h1 className="font-script text-4xl text-cream sm:text-5xl">
          {siteConfig.bride.name}
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px w-16 bg-gold/50" />
          <div className="w-3 h-3 rotate-45 border border-gold/50" />
          <div className="h-px w-16 bg-gold/50" />
        </div>

        {/* Date */}
        <p className="font-serif text-lg text-cream/90">{formatDateVN(siteConfig.weddingDate)}</p>
        
        {/* Message */}
        <p className="mt-4 text-sm text-cream/70 max-w-xs mx-auto">
          {siteConfig.invitationMessage}
        </p>
      </div>
    </section>
  );
}
