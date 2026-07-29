import { siteConfig } from "@/config/site.config";

export function Footer() {
  return (
    <footer className="pb-24 pt-2 text-center text-xs text-slate-500">
      <p>Cảm ơn bạn đã dành thời gian chung vui cùng {siteConfig.groom.name} & {siteConfig.bride.name}.</p>
      <p className="mt-1">Liên hệ: {siteConfig.contact.phone}</p>
    </footer>
  );
}
