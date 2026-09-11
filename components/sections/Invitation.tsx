import { StaggerGroup, StaggerItem } from "@/components/common/Stagger";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";

type InvitationProps = {
  guestName?: string;
};

export function Invitation({ guestName }: InvitationProps) {
  return (
    <section className="section">
      <StaggerGroup className="text-center" stagger={0.12}>
        <StaggerItem>
          <h2 className="section-title">{siteConfig.invitationTitle}</h2>
          <div className="divider" />
        </StaggerItem>

        <StaggerItem>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-ink-muted">
            {siteConfig.invitationMessage}
          </p>
        </StaggerItem>

        {/* Guest name highlight */}
        <StaggerItem className="mt-6">
          <span className="chip">
            <span className="text-xs uppercase tracking-wider text-sage-deep/70">Kính mời</span>
            <span className="font-serif text-lg text-ink">{guestName || "Quý Khách"}</span>
          </span>
        </StaggerItem>

        {/* Parents info */}
        <StaggerItem className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <p className="mb-2 text-xs uppercase tracking-wider text-sage-deep">Nhà Trai</p>
            <p className="text-ink-muted">{siteConfig.groom.father}</p>
            <p className="text-ink-muted">{siteConfig.groom.mother}</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-xs uppercase tracking-wider text-sage-deep">Nhà Gái</p>
            <p className="text-ink-muted">{siteConfig.bride.father}</p>
            <p className="text-ink-muted">{siteConfig.bride.mother}</p>
          </div>
        </StaggerItem>

        {/* <StaggerItem>
          <p className="mt-6 text-xs italic text-ink-muted">
            Vui lòng xác nhận tham dự trước ngày 15/11/2026
          </p>
        </StaggerItem> */}
      </StaggerGroup>
    </section>
  );
}
