"use client";

import { siteConfig } from "@/config/site.config";
import { formatDateVN } from "@/lib/utils";

export function Hero() {
  return (
    <section className="section-card relative overflow-hidden bg-gradient-to-br from-rose-100 to-pink-50 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-rose-600">Save the Date</p>
      <h1 className="mt-2 font-serif text-4xl text-rose-700">
        {siteConfig.groom.name} & {siteConfig.bride.name}
      </h1>
      <p className="mt-3 text-sm text-rose-800">{formatDateVN(siteConfig.weddingDate)}</p>
      <p className="mt-4 text-sm">{siteConfig.invitationMessage}</p>
    </section>
  );
}
