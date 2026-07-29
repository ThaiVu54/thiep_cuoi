"use client";

import { Button } from "@/components/ui/Button";
import { useAudio } from "@/hooks/useAudio";

type MusicPlayerProps = {
  src: string;
  shouldPlay: boolean;
};

export function MusicPlayer({ src, shouldPlay }: MusicPlayerProps) {
  const { isPlaying, play, toggle } = useAudio(src);

  if (shouldPlay && !isPlaying) {
    void play();
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button type="button" className="bg-ink" onClick={() => void toggle()}>
        {isPlaying ? "🔈 Tắt nhạc" : "🎵 Bật nhạc"}
      </Button>
    </div>
  );
}
