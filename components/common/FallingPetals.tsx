"use client";

import Image from "next/image";

export function FallingPetals() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div
          key={idx}
          className="absolute falling-leaf"
          style={{
            left: `${(idx + 1) * 8}%`,
            top: `-30px`,
            animationDuration: `${12 + idx * 1.5}s`,
            animationDelay: `${idx * 0.8}s`,
          }}
        >
          <Image
            src="/images/decorations/leaf.svg"
            alt=""
            width={24}
            height={24}
            className="opacity-40"
            style={{
              transform: `rotate(${idx * 30}deg) scale(${0.6 + (idx % 3) * 0.2})`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
