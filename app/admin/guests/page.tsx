import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminGuestsPage() {
  const guests = await db.guest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold">Danh sách khách mời</h1>
      <p className="text-sm text-slate-500">Thêm khách mời mới qua endpoint POST /api/guests (Basic Auth).</p>
      <div className="overflow-auto rounded-2xl border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Tên</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Số ghế</th>
              <th className="px-3 py-2">Lượt xem</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className="border-t">
                <td className="px-3 py-2">{guest.name}</td>
                <td className="px-3 py-2">/{guest.slug}</td>
                <td className="px-3 py-2">{guest.maxSeats}</td>
                <td className="px-3 py-2">{guest.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
