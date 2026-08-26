import { deleteGuest } from "@/app/admin/actions";
import { ConfirmDeleteButton } from "@/components/common/ConfirmDeleteButton";
import { GuestLinkCell } from "@/components/common/GuestLinkCell";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function RsvpStatus({ rsvp }: { rsvp: { attending: boolean; seats: number } | null }) {
  if (!rsvp) {
    return <span className="text-slate-400">Chưa phản hồi</span>;
  }
  if (!rsvp.attending) {
    return <span className="text-red-600">Không tham dự</span>;
  }
  return <span className="text-emerald-600">Sẽ tham dự ({rsvp.seats} ghế)</span>;
}

export default async function AdminGuestsPage() {
  const guests = await db.guest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { rsvp: true },
  });

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold">Danh sách khách mời</h1>
      <p className="text-sm text-slate-500">
        Tạo link thiệp mới tại trang <span className="font-mono">/tao-thiep</span>.
      </p>
      <div className="overflow-auto rounded-2xl border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">STT</th>
              <th className="px-3 py-2">Tên</th>
              <th className="px-3 py-2">Link</th>
              <th className="px-3 py-2">Số ghế</th>
              <th className="px-3 py-2">Lượt xem</th>
              <th className="px-3 py-2">Trạng thái RSVP</th>
              <th className="px-3 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => (
              <tr key={guest.id} className="border-t">
                <td className="px-3 py-2 text-slate-500">{index + 1}</td>
                <td className="px-3 py-2">{guest.name}</td>
                <td className="px-3 py-2">
                  <GuestLinkCell slug={guest.slug} />
                </td>
                <td className="px-3 py-2">{guest.maxSeats}</td>
                <td className="px-3 py-2">{guest.viewCount}</td>
                <td className="px-3 py-2">
                  <RsvpStatus rsvp={guest.rsvp} />
                </td>
                <td className="px-3 py-2">
                  <ConfirmDeleteButton
                    id={guest.id}
                    label={guest.name}
                    action={deleteGuest}
                    note="RSVP của khách này (nếu có) cũng sẽ bị xoá."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
