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
        className="group relative w-12 h-12 bg-primary border-2 border-gold/50 flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
      >
        {/* Decorative corner */}
        <div className="absolute inset-1 border border-gold/30 pointer-events-none" />
        
        {isPlaying ? (
          <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 9v6m-3-3v0" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )}
        
        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-ink text-cream text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        </span>
      </button>
    </div>
  );
}
