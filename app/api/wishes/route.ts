import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { wishSchema } from "@/lib/validations";

function getIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function GET(request: Request) {
  const isAdmin = new URL(request.url).searchParams.get("admin") === "1";
  if (isAdmin && !isAdminAuthorized(request)) {
    return unauthorizedResponse();
  }

  const wishes = await db.wish.findMany({
    where: isAdmin ? undefined : { approved: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return Response.json({ wishes });
}

export async function POST(request: Request) {
  const ip = getIp(request);
  if (!checkRateLimit(`wish:${ip}`)) {
    return Response.json({ error: "Bạn thao tác quá nhanh" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = wishSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return Response.json({ error: "Spam detected" }, { status: 400 });
  }

  await db.wish.create({
    data: {
      name: parsed.data.name,
      content: parsed.data.content,
      approved: false,
    },
  });

  return Response.json({ ok: true });
}

export async function PATCH(request: Request) {
  if (!isAdminAuthorized(request)) {
    return unauthorizedResponse();
  }

  const body = (await request.json()) as { id?: string; approved?: boolean };
  if (!body.id || typeof body.approved !== "boolean") {
    return Response.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  await db.wish.update({
    where: { id: body.id },
    data: { approved: body.approved },
  });

  return Response.json({ ok: true });
}
