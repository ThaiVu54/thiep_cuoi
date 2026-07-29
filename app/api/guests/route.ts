import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { createGuestSlug } from "@/lib/slug";
import { z } from "zod";

const guestSchema = z.object({
  name: z.string().min(2),
  side: z.enum(["GROOM", "BRIDE", "BOTH"]).default("BOTH"),
  phone: z.string().optional(),
  maxSeats: z.coerce.number().int().min(1).max(10).default(1),
});

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return unauthorizedResponse();
  }

  const guests = await db.guest.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return Response.json({ guests });
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return unauthorizedResponse();
  }

  const body = await request.json();
  const parsed = guestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const baseSlug = createGuestSlug(parsed.data.name);
  const count = await db.guest.count({ where: { slug: { startsWith: baseSlug } } });
  const slug = count ? `${baseSlug}-${count + 1}` : baseSlug;

  const guest = await db.guest.create({
    data: {
      ...parsed.data,
      slug,
    },
  });

  return Response.json({ guest }, { status: 201 });
}
