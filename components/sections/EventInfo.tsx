import { siteConfig } from "@/config/site.config";
import { formatDateVN } from "@/lib/utils";

export function EventInfo() {
  return (
    <section className="section-card">
      <h2 className="font-serif text-2xl text-rose-700">Thông tin hôn lễ</h2>
      <div className="mt-3 space-y-3">
        {siteConfig.events.map((event) => (
          <article key={event.title} className="rounded-2xl bg-rose-50 p-3">
            <h3 className="font-semibold text-rose-700">{event.title}</h3>
            <p className="text-sm">{formatDateVN(event.date)}</p>
            <p className="text-sm">{event.address}</p>
            {event.dressCode ? <p className="text-xs text-rose-500">Dress code: {event.dressCode}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
