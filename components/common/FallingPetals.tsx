"use client";

export function FallingPetals() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 14 }).map((_, idx) => (
        <span
          key={idx}
          className="absolute h-2.5 w-2.5 animate-[petal_12s_linear_infinite] rounded-full bg-pink-200/60"
          style={{
            left: `${(idx + 1) * 7}%`,
            top: `-${idx * 20}px`,
            animationDelay: `${idx * 0.9}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes petal {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) translateX(20px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
