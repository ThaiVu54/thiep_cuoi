import { InvitationPageClient } from "@/components/InvitationPageClient";
import { db } from "@/lib/db";

type GuestPageProps = {
  params: { guestSlug: string };
};

export default async function GuestPage({ params }: GuestPageProps) {
  const guest = await db.guest.findUnique({ where: { slug: params.guestSlug } });

  if (guest) {
    await db.guest.update({
      where: { id: guest.id },
      data: { viewCount: { increment: 1 } },
    });
  }

  return <InvitationPageClient guestName={guest?.name} guestSlug={guest?.slug} />;
}
