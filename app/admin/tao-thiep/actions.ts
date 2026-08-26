"use server";

import { db } from "@/lib/db";
import { createInviteCode } from "@/lib/invite-code";
import { inviteLinkSchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const MAX_SLUG_RETRIES = 5;

export type CreateInviteResult = { ok: true; slug: string } | { ok: false; error: string };

export async function createInviteLink(name: string): Promise<CreateInviteResult> {
  const parsed = inviteLinkSchema.safeParse({ name });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Tên khách mời không hợp lệ" };
  }

  for (let attempt = 0; attempt < MAX_SLUG_RETRIES; attempt += 1) {
    try {
      const guest = await db.guest.create({
        data: { name: parsed.data.name, slug: createInviteCode() },
      });
      revalidatePath("/admin/guests");
      return { ok: true, slug: guest.slug };
    } catch (error) {
      // P2002 = trùng slug, thử lại với mã khác
      const isDuplicateSlug =
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
      if (!isDuplicateSlug) {
        return { ok: false, error: "Không tạo được link, vui lòng thử lại" };
      }
    }
  }

  return { ok: false, error: "Không tạo được link, vui lòng thử lại" };
}
