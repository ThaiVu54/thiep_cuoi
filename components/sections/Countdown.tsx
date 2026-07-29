"use client";

import { siteConfig } from "@/config/site.config";
import { useCountdown } from "@/hooks/useCountdown";

export function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(siteConfig.weddingDate);

  return (
    <section className="section-card">
      <h2 className="font-serif text-2xl text-rose-700">Đếm ngược tới giờ G</h2>
      {isExpired ? (
        <p className="mt-2 text-sm">Hôn lễ đã diễn ra. Cảm ơn bạn đã đồng hành cùng chúng mình 💖</p>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          {[
            ["Ngày", days],
            ["Giờ", hours],
            ["Phút", minutes],
            ["Giây", seconds],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-rose-50 p-3">
              <p className="text-lg font-semibold text-rose-700">{value}</p>
              <p className="text-xs text-rose-500">{label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
