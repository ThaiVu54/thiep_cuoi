"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type DeleteResult = { ok: true } | { ok: false; error: string };

function toErrorResult(error: unknown): DeleteResult {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    return { ok: false, error: "Bản ghi không còn tồn tại" };
  }
  return { ok: false, error: "Không xoá được, vui lòng thử lại" };
}

export async function deleteGuest(id: string): Promise<DeleteResult> {
  if (!id) {
    return { ok: false, error: "Thiếu ID bản ghi" };
  }

  try {
    // Xoá RSVP liên kết trước để không vi phạm khoá ngoại Rsvp.guestId
    await db.$transaction([
      db.rsvp.deleteMany({ where: { guestId: id } }),
      db.guest.delete({ where: { id } }),
    ]);

    revalidatePath("/admin/guests");
    revalidatePath("/admin/rsvp");
    revalidatePath("/admin/wishes");
    return { ok: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function deleteRsvp(id: string): Promise<DeleteResult> {
  if (!id) {
    return { ok: false, error: "Thiếu ID bản ghi" };
  }

  try {
    await db.rsvp.delete({ where: { id } });
    // Bảng Lời chúc ghép RSVP theo tên, bảng Khách mời hiển thị trạng thái RSVP
    revalidatePath("/admin/rsvp");
    revalidatePath("/admin/wishes");
    revalidatePath("/admin/guests");
    return { ok: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function deleteWish(id: string): Promise<DeleteResult> {
  if (!id) {
    return { ok: false, error: "Thiếu ID bản ghi" };
  }

  try {
    await db.wish.delete({ where: { id } });
    revalidatePath("/admin/wishes");
    return { ok: true };
  } catch (error) {
    return toErrorResult(error);
  }
}
