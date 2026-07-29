import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { rsvpSchema } from "@/lib/validations";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";

function getIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isCsv = url.searchParams.get("format") === "csv";
  const isAdmin = url.searchParams.get("admin") === "1";

  if (isAdmin && !isAdminAuthorized(request)) {
    return unauthorizedResponse();
  }

  const list = await db.rsvp.findMany({
    orderBy: { createdAt: "desc" },
    select: { name: true, attending: true, seats: true, message: true, createdAt: true },
  });

  if (!isCsv) {
    return Response.json({ data: list });
  }

  const header = "name,attending,seats,message,createdAt";
  const rows = list.map((item) =>
    [item.name, item.attending ? "yes" : "no", item.seats, item.message ?? "", item.createdAt.toISOString()]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(","),
  );

  return new Response([header, ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=rsvp.csv",
    },
  });
}

export async function POST(request: Request) {
  const ip = getIp(request);
  if (!checkRateLimit(`rsvp:${ip}`)) {
    return Response.json({ error: "Bạn thao tác quá nhanh, vui lòng thử lại sau" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return Response.json({ error: "Spam detected" }, { status: 400 });
  }

  const guest = parsed.data.guestSlug
    ? await db.guest.findUnique({ where: { slug: parsed.data.guestSlug } })
    : null;

  await db.rsvp.upsert({
    where: { guestId: guest?.id ?? "" },
    create: {
      guestId: guest?.id,
      name: parsed.data.name,
      attending: parsed.data.attending,
      seats: parsed.data.seats,
      message: parsed.data.message,
    },
    update: {
      name: parsed.data.name,
      attending: parsed.data.attending,
      seats: parsed.data.seats,
      message: parsed.data.message,
    },
  }).catch(async () => {
    await db.rsvp.create({
      data: {
        guestId: guest?.id,
        name: parsed.data.name,
        attending: parsed.data.attending,
        seats: parsed.data.seats,
        message: parsed.data.message,
      },
    });
  });

  return Response.json({ ok: true });
}
