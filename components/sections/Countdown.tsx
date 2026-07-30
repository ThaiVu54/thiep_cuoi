"use client";

import { siteConfig } from "@/config/site.config";
import { useCountdown } from "@/hooks/useCountdown";

export function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(siteConfig.weddingDate);

  return (
    <section className="section-card text-center">
      <h2 className="section-title">Đếm Ngược</h2>
      <div className="gold-divider" />
      
      {isExpired ? (
        <p className="text-sm text-ink/80">
          Hôn lễ đã diễn ra. Cảm ơn bạn đã đồng hành cùng chúng mình 💖
        </p>
      ) : (
        <>
          <p className="text-sm text-ink/70 mb-4">Còn bao lâu nữa đến ngày trọng đại</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              ["Ngày", days],
              ["Giờ", hours],
              ["Phút", minutes],
              ["Giây", seconds],
            ].map(([label, value]) => (
              <div key={label as string} className="relative">
                <div className="bg-primary text-cream py-4 px-2">
                  <p className="font-serif text-3xl">{value}</p>
                </div>
                <p className="mt-2 text-xs uppercase tracking-wider text-primary/70">{label}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
