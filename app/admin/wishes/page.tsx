import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function toggleWish(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  const approved = String(formData.get("approved") || "false") === "true";

  if (!id) return;

  await db.wish.update({
    where: { id },
    data: { approved: !approved },
  });

  revalidatePath("/admin/wishes");
}

export default async function AdminWishesPage() {
  const wishes = await db.wish.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold">Duyệt lời chúc</h1>
      {wishes.map((wish) => (
        <article key={wish.id} className="rounded-2xl border bg-white p-3">
          <p className="text-xs text-slate-500">{wish.name}</p>
          <p className="text-sm">{wish.content}</p>
          <form action={toggleWish} className="mt-2">
            <input type="hidden" name="id" value={wish.id} />
            <input type="hidden" name="approved" value={String(wish.approved)} />
            <button className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white" type="submit">
              {wish.approved ? "Ẩn" : "Duyệt"}
            </button>
          </form>
        </article>
      ))}
    </section>
  );
}
