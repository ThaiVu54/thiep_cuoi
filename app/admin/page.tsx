import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const [guestCount, rsvpCount, attendingCount, wishPending] = await Promise.all([
    db.guest.count(),
    db.rsvp.count(),
    db.rsvp.count({ where: { attending: true } }),
    db.wish.count({ where: { approved: false } }),
  ]);

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {["Tổng khách mời", guestCount, "Tổng RSVP", rsvpCount, "Sẽ tham dự", attendingCount, "Lời chúc chờ duyệt", wishPending]
        .reduce<Array<{ title: string; value: number }>>((acc, cur, idx, arr) => {
          if (idx % 2 === 0) acc.push({ title: String(cur), value: Number(arr[idx + 1]) });
          return acc;
        }, [])
        .map((item) => (
          <article key={item.title} className="rounded-2xl bg-white p-4 shadow">
            <p className="text-sm text-slate-500">{item.title}</p>
            <p className="text-3xl font-bold">{item.value}</p>
          </article>
        ))}
    </section>
  );
}
