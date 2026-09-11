import { siteConfig } from "@/config/site.config";

export function Footer() {
  return (
    <footer className="relative py-12 text-center">
      <div className="divider max-w-xs" />

      <p className="mt-6 font-script text-3xl text-ink">
        Thank You
      </p>

      <p className="mt-4 text-sm text-ink-muted">
        Cảm ơn bạn đã dành thời gian đọc thiệp mời
      </p>

      <p className="mt-2 font-serif text-lg text-ink">
        {siteConfig.groom.name} & {siteConfig.bride.name}
      </p>

      {/* Liên hệ: nếu có thắc mắc trước ngày cưới */}
      <p className="mx-auto mt-8 max-w-xs text-xs uppercase tracking-[0.2em] text-ink-muted">
        Nếu có thắc mắc trước ngày cưới, đừng ngần ngại liên hệ với chúng mình
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink">
        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center transition-colors hover:text-sage-deep"
        >
          <span className="text-[11px] uppercase tracking-wider text-ink-muted">
            {siteConfig.contact.email}
          </span>
          <span className="font-serif">{siteConfig.contact.phone}</span>
        </a>
        <a
          href={`tel:${siteConfig.contact1.phone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center transition-colors hover:text-sage-deep"
        >
          <span className="text-[11px] uppercase tracking-wider text-ink-muted">
            {siteConfig.contact1.email}
          </span>
          <span className="font-serif">{siteConfig.contact1.phone}</span>
        </a>
      </div>

      {/* Bottom padding for music player */}
      <div className="h-16" />
    </footer>
  );
}
