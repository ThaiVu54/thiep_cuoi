import { StaggerGroup, StaggerItem } from "@/components/common/Stagger";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";
import { createGoogleCalendarLink } from "@/lib/calendar";

export function LocationMap() {
  const { groom, bride } = siteConfig.locations;

  return (
    <section className="section">
      <h2 className="section-title">Địa Điểm</h2>
      <div className="divider" />

      <StaggerGroup stagger={0.15}>
        <StaggerItem>
          <p className="text-center text-sm text-ink-muted mb-4">
            {siteConfig.venueName}
          </p>
        </StaggerItem>

        {[groom, bride].map((location) => (
          <StaggerItem key={location.label} className="mb-6 last:mb-0">
            <p className="text-center font-serif text-lg text-ink mb-1">{location.label}</p>
            <p className="text-center text-xs text-ink-muted mb-3">{location.address}</p>

            {/* Map container bo góc */}
            <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
              <iframe
                src={location.mapEmbedUrl ?? `${location.mapUrl}&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google Maps - ${location.label}`}
              />
            </div>

            <div className="mt-4 flex justify-center">
              <a href={location.mapUrl} target="_blank" rel="noreferrer">
                <Button variant="primary" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Chỉ đường {location.label}
                  </span>
                </Button>
              </a>
            </div>
          </StaggerItem>
        ))}

        {/* Action buttons */}
        <StaggerItem className="mt-2 flex flex-col sm:flex-row gap-3 justify-center">
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
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
