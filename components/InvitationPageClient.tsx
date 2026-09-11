"use client";

import { EnvelopeCover } from "@/components/common/EnvelopeCover";
import { FallingPetals } from "@/components/common/FallingPetals";
import { Fireworks } from "@/components/common/Fireworks";
import { MenuButton } from "@/components/common/MenuButton";
import { MusicPlayer } from "@/components/common/MusicPlayer";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionMenu } from "@/components/common/SectionMenu";
import { Calendar } from "@/components/sections/Calendar";
import { Countdown } from "@/components/sections/Countdown";
import { EventInfo } from "@/components/sections/EventInfo";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { GiftBox } from "@/components/sections/GiftBox";
import { Hero } from "@/components/sections/Hero";
import { Invitation } from "@/components/sections/Invitation";
import { LocationMap } from "@/components/sections/LocationMap";
import { Program } from "@/components/sections/Program";
import { RsvpForm } from "@/components/sections/RsvpForm";
import { Wishes } from "@/components/sections/Wishes";
import { siteConfig } from "@/config/site.config";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type InvitationPageClientProps = {
  guestName?: string;
  guestSlug?: string;
};

export function InvitationPageClient({ guestName, guestSlug }: InvitationPageClientProps) {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Quay lại từ trang riêng (?menu=1): bỏ qua phong bì, mở thẳng mục lục
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("menu") === "1") {
      setOpened(true);
      setMenuOpen(true);
    }
  }, []);

  // Cuộn tới section theo id và cập nhật hash trên URL
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const handleRevealed = () => {
    // Nếu link có sẵn hash (vd /#gallery) thì tới thẳng mục đó, ngược lại mở menu tổng quan
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (hash && document.getElementById(hash)) {
      scrollToSection(hash);
    } else {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(true);
    }
  };

  return (
    <main className="relative mx-auto min-h-screen max-w-xl bg-canvas">
      <EnvelopeCover opened={opened} onOpen={() => setOpened(true)} onRevealed={handleRevealed} />
      <Fireworks />
      <FallingPetals />
      <Fireworks trigger={opened} burstCount={4} showButton countdownDate={siteConfig.weddingDate} />
      <MusicPlayer src={siteConfig.music} shouldPlay={opened} />

      {/* Menu tổng quan + nút mở lại menu (chỉ hiện sau khi đã mở thiệp) */}
      {opened && <MenuButton onClick={() => setMenuOpen(true)} />}
      <SectionMenu open={menuOpen} onClose={() => setMenuOpen(false)} guestSlug={guestSlug} />

      <div ref={contentRef}>
        {/* Hero Section - No animation delay */}
        <section id="hero">
          <Hero />
        </section>

        {/* Calendar Section */}
        <section id="calendar">
          <RevealOnScroll>
            <Calendar />
          </RevealOnScroll>
        </section>

        {/* Countdown */}
        <section id="countdown">
          <RevealOnScroll>
            <Countdown />
          </RevealOnScroll>
        </section>

        {/* Invitation */}
        <section id="invitation">
          <RevealOnScroll>
            <Invitation guestName={guestName} />
          </RevealOnScroll>
        </section>

        {/* Program / Timeline */}
        <section id="program">
          <RevealOnScroll>
            <Program />
          </RevealOnScroll>
        </section>

        {/* Event Info */}
        <section id="event">
          <RevealOnScroll>
            <EventInfo />
          </RevealOnScroll>
        </section>

        {/* Gallery */}
        <section id="gallery">
          <RevealOnScroll>
            <Gallery />
          </RevealOnScroll>
        </section>

        {/* Location Map */}
        <section id="location">
          <RevealOnScroll>
            <LocationMap />
          </RevealOnScroll>
        </section>

        {/* RSVP Form */}
        <section id="rsvp">
          <RevealOnScroll>
            <RsvpForm guestName={guestName} guestSlug={guestSlug} />
          </RevealOnScroll>
        </section>

        {/* Wishes */}
        <section id="wishes">
          <RevealOnScroll>
            <Wishes guestName={guestName} />
          </RevealOnScroll>
        </section>

        {/* Gift Box */}
        <section id="gift">
          <RevealOnScroll>
            <GiftBox />
          </RevealOnScroll>
        </section>

        {/* Footer */}
        <section id="footer">
          <Footer />
        </section>
      </div>
    </main>
  );
}
