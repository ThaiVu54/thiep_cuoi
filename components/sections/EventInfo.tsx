import { siteConfig } from "@/config/site.config";
import { formatDateVN } from "@/lib/utils";

export function EventInfo() {
  return (
    <section className="section-card">
      <h2 className="section-title">Thông Tin Hôn Lễ</h2>
      <div className="gold-divider" />

      <div className="mt-4 space-y-4">
        {siteConfig.events.map((event, index) => (
          <article 
            key={event.title} 
            className={`p-5 border-2 ${index === 0 ? "border-primary bg-cream-dark" : "border-gold/30 bg-cream"}`}
          >
            {/* Event icon */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-cream flex items-center justify-center">
                {index === 0 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-serif text-lg text-primary">{event.title}</h3>
                <p className="text-sm text-ink/80 mt-1">
                  {formatDateVN(event.date)}
                </p>
                <p className="text-sm text-ink/70 mt-2 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.address}
                </p>
                {event.dressCode && (
                  <p className="text-xs text-primary/70 mt-2">
                    Dress code: {event.dressCode}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
