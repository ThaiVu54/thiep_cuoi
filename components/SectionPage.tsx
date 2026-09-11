import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionShell } from "@/components/SectionShell";
import { Calendar } from "@/components/sections/Calendar";
import { Countdown } from "@/components/sections/Countdown";
import { EventInfo } from "@/components/sections/EventInfo";
import { Gallery } from "@/components/sections/Gallery";
import { GiftBox } from "@/components/sections/GiftBox";
import { Hero } from "@/components/sections/Hero";
import { Invitation } from "@/components/sections/Invitation";
import { LocationMap } from "@/components/sections/LocationMap";
import { Program } from "@/components/sections/Program";
import { RsvpForm } from "@/components/sections/RsvpForm";
import { Wishes } from "@/components/sections/Wishes";
import { db } from "@/lib/db";
import type { ReactNode } from "react";

export type SectionId =
  | "hero"
  | "calendar"
  | "countdown"
  | "invitation"
  | "program"
  | "event"
  | "gallery"
  | "location"
  | "rsvp";

type RenderArgs = {
  guestName?: string;
  guestSlug?: string;
};

// Map mỗi id sang nội dung section tương ứng (tái sử dụng component có sẵn)
const SECTION_RENDERERS: Record<SectionId, (args: RenderArgs) => ReactNode> = {
  hero: () => <Hero />,
  calendar: () => <Calendar />,
  countdown: () => <Countdown />,
  invitation: ({ guestName }) => <Invitation guestName={guestName} />,
  program: () => <Program />,
  event: () => <EventInfo />,
  gallery: () => <Gallery />,
  location: () => <LocationMap />,
  rsvp: ({ guestName, guestSlug }) => (
    <>
      <RsvpForm guestName={guestName} guestSlug={guestSlug} />
      <RevealOnScroll>
        <Wishes guestName={guestName} />
      </RevealOnScroll>
      <RevealOnScroll>
        <GiftBox />
      </RevealOnScroll>
    </>
  ),
};

type SectionPageProps = {
  id: SectionId;
  guestSlug?: string;
};

export async function SectionPage({ id, guestSlug }: SectionPageProps) {
  let guestName: string | undefined;

  if (guestSlug) {
    const guest = await db.guest.findUnique({ where: { slug: guestSlug } });
    guestName = guest?.name;
  }

  const backHref = guestSlug ? `/${guestSlug}?menu=1` : "/?menu=1";
  const render = SECTION_RENDERERS[id];

  return <SectionShell backHref={backHref}>{render({ guestName, guestSlug })}</SectionShell>;
}
