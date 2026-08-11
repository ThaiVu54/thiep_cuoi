import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

type WishRow = {
  id: string;
  name: string;
  content: string;
  approved: boolean;
  createdAt: Date;
};

type RsvpRow = {
  id: string;
  name: string;
  attending: boolean;
  seats: number;
  message: string | null;
  createdAt: Date;
};

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
  const [wishes, rsvps] = await Promise.all([
    db.wish.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
    db.rsvp.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
  ]);

  const rsvpByName = new Map(rsvps.map((rsvp) => [rsvp.name.trim().toLowerCase(), rsvp]));

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold">Duyệt lời chúc kèm khách tham dự</h1>
      <div className="overflow-auto rounded-2xl border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Tên</th>
              <th className="px-3 py-2">Khách tham dự</th>
              <th className="px-3 py-2">Số ghế</th>
              <th className="px-3 py-2">Lời nhắn RSVP</th>
              <th className="px-3 py-2">Lời chúc</th>
              <th className="px-3 py-2">Trạng thái</th>
              <th className="px-3 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {wishes.map((wish: WishRow) => {
              const rsvp = rsvpByName.get(wish.name.trim().toLowerCase());

              return (
              <tr key={wish.id} className="border-t align-top">
                <td className="px-3 py-2 font-mono text-xs text-slate-500">{wish.id}</td>
                <td className="px-3 py-2 font-medium">{wish.name}</td>
                <td className="px-3 py-2">{rsvp ? (rsvp.attending ? "Có" : "Không") : "-"}</td>
                <td className="px-3 py-2">{rsvp ? rsvp.seats : "-"}</td>
                <td className="px-3 py-2">{rsvp?.message ?? "-"}</td>
                <td className="px-3 py-2">{wish.content}</td>
                <td className="px-3 py-2">
                  <span className={wish.approved ? "text-emerald-600" : "text-amber-600"}>
                    {wish.approved ? "Đã duyệt" : "Chờ duyệt"}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <form action={toggleWish}>
                    <input type="hidden" name="id" value={wish.id} />
                    <input type="hidden" name="approved" value={String(wish.approved)} />
                    <button className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white" type="submit">
                      {wish.approved ? "Ẩn" : "Duyệt"}
                    </button>
                  </form>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
