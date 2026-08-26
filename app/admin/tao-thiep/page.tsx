import { InviteLinkGenerator } from "@/components/common/InviteLinkGenerator";

export default function CreateInvitePage() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Tạo link thiệp mời</h1>
        <p className="text-sm text-slate-500">
          Nhập tên khách mời để tạo link riêng, sau đó gửi link đó cho khách.
        </p>
      </div>
      <InviteLinkGenerator />
    </section>
  );
}
