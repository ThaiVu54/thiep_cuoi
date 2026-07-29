"use client";

import { Button } from "@/components/ui/Button";
import { useAudio } from "@/hooks/useAudio";
import { useEffect, useRef } from "react";

type MusicPlayerProps = {
  src: string;
  shouldPlay: boolean;
};

export function MusicPlayer({ src, shouldPlay }: MusicPlayerProps) {
  const { isPlaying, play, toggle } = useAudio(src);
  // Chỉ tự phát đúng một lần khi khách bấm "Mở thiệp"; sau đó để khách tự bật/tắt
  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
    if (!shouldPlay || hasAutoPlayedRef.current) return;
    hasAutoPlayedRef.current = true;
    void play();
    // play() được tạo lại mỗi lần render nên cố tình không đưa vào dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPlay]);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        type="button"
        className="bg-ink"
        onClick={() => void toggle()}
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        aria-pressed={isPlaying}
      >
        {isPlaying ? "🔈 Tắt nhạc" : "🎵 Bật nhạc"}
      </Button>
    </div>
  );
}
