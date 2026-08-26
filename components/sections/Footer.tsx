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

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-ink-muted">
        {siteConfig.contact.phone}
        <span>•</span>
        {siteConfig.contact.email}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-ink-muted">
        {siteConfig.contact1.phone}
        <span>•</span>
        {siteConfig.contact1.email}
      </div>

      {/* Bottom padding for music player */}
      <div className="h-16" />
    </footer>
  );
}
