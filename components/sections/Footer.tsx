import { siteConfig } from "@/config/site.config";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative py-12 text-center">
      {/* Decorative floral */}
      <Image
        src="/images/decorations/floral-corner.svg"
        alt=""
        width={80}
        height={80}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 opacity-40"
      />
      
      <div className="gold-divider max-w-xs mx-auto" />
      
      <p className="mt-6 font-script text-3xl text-primary">
        Thank You
      </p>
      
      <p className="mt-4 text-sm text-ink/70">
        Cảm ơn bạn đã dành thời gian đọc thiệp mời
      </p>
      
      <p className="mt-2 font-serif text-lg text-primary">
        {siteConfig.groom.name} & {siteConfig.bride.name}
      </p>

      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-ink/50">
        <a 
          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
          className="hover:text-primary transition-colors"
        >
          {siteConfig.contact.phone}
        </a>
        <span>•</span>
        <a 
          href={`mailto:${siteConfig.contact.email}`}
          className="hover:text-primary transition-colors"
        >
          {siteConfig.contact.email}
        </a>
      </div>

      {/* Bottom padding for music player */}
      <div className="h-16" />
    </footer>
  );
}
