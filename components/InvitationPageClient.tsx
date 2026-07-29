"use client";

import { FallingPetals } from "@/components/common/FallingPetals";
import { MusicPlayer } from "@/components/common/MusicPlayer";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { Countdown } from "@/components/sections/Countdown";
import { EventInfo } from "@/components/sections/EventInfo";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { GiftBox } from "@/components/sections/GiftBox";
import { Hero } from "@/components/sections/Hero";
import { Invitation } from "@/components/sections/Invitation";
import { LocationMap } from "@/components/sections/LocationMap";
import { LoveStory } from "@/components/sections/LoveStory";
import { RsvpForm } from "@/components/sections/RsvpForm";
import { Wishes } from "@/components/sections/Wishes";
import { siteConfig } from "@/config/site.config";
import { useState } from "react";

type InvitationPageClientProps = {
  guestName?: string;
  guestSlug?: string;
};

export function InvitationPageClient({ guestName, guestSlug }: InvitationPageClientProps) {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative mx-auto min-h-screen max-w-xl space-y-4 bg-gradient-to-b from-white via-rose-50 to-white px-4 py-5">
      <FallingPetals />
      <Hero onOpen={() => setOpened(true)} />
      <MusicPlayer src={siteConfig.music} shouldPlay={opened} />
      <RevealOnScroll>
        <Countdown />
      </RevealOnScroll>
      <RevealOnScroll>
        <Invitation guestName={guestName} />
      </RevealOnScroll>
      <RevealOnScroll>
        <LoveStory />
      </RevealOnScroll>
      <RevealOnScroll>
        <Gallery />
      </RevealOnScroll>
      <RevealOnScroll>
        <EventInfo />
      </RevealOnScroll>
      <RevealOnScroll>
        <LocationMap />
      </RevealOnScroll>
      <RevealOnScroll>
        <RsvpForm guestName={guestName} guestSlug={guestSlug} />
      </RevealOnScroll>
      <RevealOnScroll>
        <Wishes />
      </RevealOnScroll>
      <RevealOnScroll>
        <GiftBox />
      </RevealOnScroll>
      <Footer />
    </main>
  );
}
