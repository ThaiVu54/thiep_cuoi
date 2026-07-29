import { createIcsContent } from "@/lib/calendar";

export async function GET() {
  return new Response(createIcsContent(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=wedding.ics",
    },
  });
}
