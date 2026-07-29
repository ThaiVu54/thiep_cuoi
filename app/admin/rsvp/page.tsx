import { db } from "@/lib/db";

export default async function AdminRsvpPage() {
  const list = await db.rsvp.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Danh sách RSVP</h1>
        <a href="/api/rsvp?format=csv&admin=1" className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
          Export CSV
        </a>
      </div>
      <div className="overflow-auto rounded-2xl border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Tên</th>
              <th className="px-3 py-2">Tham dự</th>
              <th className="px-3 py-2">Số người</th>
              <th className="px-3 py-2">Lời nhắn</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.attending ? "Có" : "Không"}</td>
                <td className="px-3 py-2">{item.seats}</td>
                <td className="px-3 py-2">{item.message ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
