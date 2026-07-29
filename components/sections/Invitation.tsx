import { siteConfig } from "@/config/site.config";

type InvitationProps = {
  guestName?: string;
};

export function Invitation({ guestName }: InvitationProps) {
  return (
    <section className="section-card">
      <h2 className="font-serif text-2xl text-rose-700">{siteConfig.invitationTitle}</h2>
      <p className="mt-2 text-sm">{siteConfig.invitationMessage}</p>
      <p className="mt-3 rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">
        {guestName ? `Kính mời: ${guestName}` : "Kính mời: Quý khách"}
      </p>
      <p className="mt-3 text-xs text-slate-500">
        {/* Có thể chỉnh nội dung mời tại config/site.config.ts */}
        Vui lòng xác nhận trước ngày 15/11/2026.
      </p>
    </section>
  );
}
