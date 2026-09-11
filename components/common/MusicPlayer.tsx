"use client";

import { useAudio } from "@/hooks/useAudio";
import { useEffect, useRef } from "react";

type MusicPlayerProps = {
  src: string;
  shouldPlay: boolean;
};

export function MusicPlayer({ src, shouldPlay }: MusicPlayerProps) {
  const { isPlaying, play, toggle } = useAudio(src);
  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
    if (!shouldPlay || hasAutoPlayedRef.current) return;
    hasAutoPlayedRef.current = true;
    void play();
  }, [shouldPlay, play]);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isPlaying ? (
        // Đang phát: nút tròn với icon sóng nhạc động, bấm để tắt
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label="Tắt nhạc nền"
          aria-pressed={true}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-sage shadow-soft transition-colors hover:bg-sage-deep"
        >
          <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 9v6m-3-3v0" />
          </svg>

          {/* Tooltip */}
          <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full bg-ink px-2 py-1 text-xs text-canvas opacity-0 transition-opacity pointer-events-none group-hover:opacity-100">
            Tắt nhạc
          </span>
        </button>
      ) : (
        // Chưa phát: pill "CLICK PLAY" thu hút bấm, kiểu Canva
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label="Bật nhạc nền"
          aria-pressed={false}
          className="flex items-center gap-2 rounded-full bg-sage px-4 py-3 shadow-soft transition-colors hover:bg-sage-deep"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white">Click Play</span>
        </button>
      )}
    </div>
  );
}
