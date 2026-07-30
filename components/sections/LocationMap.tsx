import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";
import { createGoogleCalendarLink } from "@/lib/calendar";

export function LocationMap() {
  const mapUrl = siteConfig.events[1]?.mapUrl ?? siteConfig.events[0]?.mapUrl ?? "";

  return (
    <section className="section-card">
      <h2 className="section-title">Địa Điểm</h2>
      <div className="gold-divider" />
      
      <p className="text-center text-sm text-ink/70 mb-4">
        {siteConfig.venueName}
      </p>

      {/* Map container with vintage frame */}
      <div className="relative border-4 border-primary/30">
        <div className="absolute inset-1 border border-primary/20 pointer-events-none z-10" />
        <iframe
          src={`${mapUrl}&output=embed`}
          className="h-64 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        />
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <a href={mapUrl} target="_blank" rel="noreferrer">
          <Button variant="primary" className="w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Chỉ đường
            </span>
          </Button>
        </a>
        <a href={createGoogleCalendarLink()} target="_blank" rel="noreferrer">
          <Button variant="outline" className="w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Thêm vào lịch
            </span>
          </Button>
        </a>
      </div>
    </section>
  );
}
