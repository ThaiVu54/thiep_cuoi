import { siteConfig } from "@/config/site.config";
import Image from "next/image";

type InvitationProps = {
  guestName?: string;
};

export function Invitation({ guestName }: InvitationProps) {
  return (
    <section className="section-card relative">
      {/* Floral decorations */}
      <div className="floral-top-left" />
      <div className="floral-top-right" />
      
      <div className="relative z-10 text-center">
        <h2 className="section-title">{siteConfig.invitationTitle}</h2>
        <div className="gold-divider" />
        
        <p className="text-sm text-ink/80 leading-relaxed max-w-sm mx-auto">
          {siteConfig.invitationMessage}
        </p>

        {/* Guest name highlight */}
        <div className="mt-6 py-4 px-6 border-2 border-primary/30 bg-cream-dark inline-block">
          <p className="text-xs uppercase tracking-wider text-primary/60 mb-1">Kính mời</p>
          <p className="font-serif text-xl text-primary">
            {guestName || "Quý Khách"}
          </p>
        </div>

        {/* Parents info */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-gold mb-2">Nhà Trai</p>
            <p className="text-ink/80">{siteConfig.groom.father}</p>
            <p className="text-ink/80">{siteConfig.groom.mother}</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-gold mb-2">Nhà Gái</p>
            <p className="text-ink/80">{siteConfig.bride.father}</p>
            <p className="text-ink/80">{siteConfig.bride.mother}</p>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink/50 italic">
          Vui lòng xác nhận tham dự trước ngày 15/11/2026
        </p>
      </div>

      <div className="floral-bottom-left" />
      <div className="floral-bottom-right" />
    </section>
  );
}
