"use client";

import { EnvelopeCover } from "@/components/common/EnvelopeCover";
import { FallingPetals } from "@/components/common/FallingPetals";
import { Fireworks } from "@/components/common/Fireworks";
import { MusicPlayer } from "@/components/common/MusicPlayer";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { Calendar } from "@/components/sections/Calendar";
import { Countdown } from "@/components/sections/Countdown";
import { DressCode } from "@/components/sections/DressCode";
import { EventInfo } from "@/components/sections/EventInfo";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { GiftBox } from "@/components/sections/GiftBox";
import { Hero } from "@/components/sections/Hero";
import { Invitation } from "@/components/sections/Invitation";
import { LocationMap } from "@/components/sections/LocationMap";
import { LoveStory } from "@/components/sections/LoveStory";
import { Program } from "@/components/sections/Program";
import { RsvpForm } from "@/components/sections/RsvpForm";
import { Wishes } from "@/components/sections/Wishes";
import { siteConfig } from "@/config/site.config";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

type InvitationPageClientProps = {
  guestName?: string;
  guestSlug?: string;
};

export function InvitationPageClient({ guestName, guestSlug }: InvitationPageClientProps) {
  const [opened, setOpened] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { start: startAutoScroll } = useAutoScroll();

  const handleRevealed = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Chỉ tự động cuộn giúp nếu khách không bật "giảm chuyển động"
    if (!prefersReducedMotion) {
      startAutoScroll();
    }
  };

  return (
    <main className="relative mx-auto min-h-screen max-w-xl bg-canvas">
      <EnvelopeCover opened={opened} onOpen={() => setOpened(true)} onRevealed={handleRevealed} />
      <Fireworks />
      <FallingPetals />
      <Fireworks trigger={opened} burstCount={4} showButton countdownDate={siteConfig.weddingDate} />
      <MusicPlayer src={siteConfig.music} shouldPlay={opened} />
      
      <div ref={contentRef}>
        {/* Hero Section - No animation delay */}
        <Hero />
        
        {/* Calendar Section */}
        <RevealOnScroll>
          <Calendar />
        </RevealOnScroll>

        {/* Countdown */}
        <RevealOnScroll>
          <Countdown />
        </RevealOnScroll>

        {/* Invitation */}
        <RevealOnScroll>
          <Invitation guestName={guestName} />
        </RevealOnScroll>

        {/* Program / Timeline */}
        <RevealOnScroll>
          <Program />
        </RevealOnScroll>

        {/* Event Info */}
        <RevealOnScroll>
          <EventInfo />
        </RevealOnScroll>

        {/* Location Map */}
        <RevealOnScroll>
          <LocationMap />
        </RevealOnScroll>

        {/* Dress Code */}
        {/* <RevealOnScroll>
          <DressCode />
        </RevealOnScroll> */}

        {/* Love Story */}
        <RevealOnScroll>
          <LoveStory />
        </RevealOnScroll>

        {/* Gallery */}
        <RevealOnScroll>
          <Gallery />
        </RevealOnScroll>

        {/* RSVP Form */}
        <RevealOnScroll>
          <RsvpForm guestName={guestName} guestSlug={guestSlug} />
        </RevealOnScroll>

        {/* Wishes */}
        <RevealOnScroll>
          <Wishes />
        </RevealOnScroll>

        {/* Gift Box */}
        <RevealOnScroll>
          <GiftBox />
        </RevealOnScroll>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
