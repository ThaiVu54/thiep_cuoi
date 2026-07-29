import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";
import { createGoogleCalendarLink } from "@/lib/calendar";

export function LocationMap() {
  const mapUrl = siteConfig.events[1]?.mapUrl ?? siteConfig.events[0]?.mapUrl ?? "";

  return (
    <section className="section-card">
      <h2 className="font-serif text-2xl text-rose-700">Bản đồ</h2>
      <iframe
        src={`${mapUrl}&output=embed`}
        className="mt-3 h-64 w-full rounded-2xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <a href={mapUrl} target="_blank" rel="noreferrer">
          <Button type="button">Chỉ đường</Button>
        </a>
        <a href={createGoogleCalendarLink()} target="_blank" rel="noreferrer">
          <Button type="button" className="bg-ink">
            Thêm Google Calendar
          </Button>
        </a>
      </div>
    </section>
  );
}
