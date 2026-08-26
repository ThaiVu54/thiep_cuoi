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
      <button
        type="button"
        onClick={() => void toggle()}
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        aria-pressed={isPlaying}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-sage shadow-soft transition-colors hover:bg-sage-deep"
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 9v6m-3-3v0" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )}
        
        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full bg-ink px-2 py-1 text-xs text-canvas opacity-0 transition-opacity pointer-events-none group-hover:opacity-100">
          {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        </span>
      </button>
    </div>
  );
}
