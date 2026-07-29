import { siteConfig } from "@/config/site.config";

function toUtcString(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function createGoogleCalendarLink() {
  const start = new Date(siteConfig.weddingDate);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Lễ cưới ${siteConfig.groom.name} & ${siteConfig.bride.name}`,
    dates: `${toUtcString(start)}/${toUtcString(end)}`,
    details: siteConfig.invitationMessage,
    location: siteConfig.venueName,
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function createIcsContent() {
  const start = new Date(siteConfig.weddingDate);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${toUtcString(start)}`,
    `DTEND:${toUtcString(end)}`,
    `SUMMARY:Lễ cưới ${siteConfig.groom.name} & ${siteConfig.bride.name}`,
    `LOCATION:${siteConfig.venueName}`,
    `DESCRIPTION:${siteConfig.invitationMessage}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
}
