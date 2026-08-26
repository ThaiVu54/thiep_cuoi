"use client";

import { StaggerGroup, StaggerItem } from "@/components/common/Stagger";
import { siteConfig } from "@/config/site.config";
import { useCountdown } from "@/hooks/useCountdown";

export function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(siteConfig.weddingDate);

  return (
    <section className="section text-center">
      <h2 className="section-title">Đếm Ngược</h2>
      <div className="divider" />

      {isExpired ? (
        <p className="text-sm text-ink-muted">
          Hôn lễ đã diễn ra. Cảm ơn bạn đã đồng hành cùng chúng mình 💖
        </p>
      ) : (
        <StaggerGroup stagger={0.1}>
          <StaggerItem>
            <p className="mb-4 text-sm text-ink-muted">Còn bao lâu nữa đến ngày trọng đại</p>
          </StaggerItem>
          <div className="grid grid-cols-4 gap-3">
            {[
              ["Ngày", days],
              ["Giờ", hours],
              ["Phút", minutes],
              ["Giây", seconds],
            ].map(([label, value]) => (
              <StaggerItem key={label as string}>
                <div className="rounded-2xl bg-sage-soft py-4 px-2">
                  <p className="font-serif text-3xl text-sage-deep">{value}</p>
                </div>
                <p className="mt-2 text-xs uppercase tracking-wider text-ink-muted">{label}</p>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      )}
    </section>
  );
}
