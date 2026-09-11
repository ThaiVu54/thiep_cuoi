"use client";

type MenuButtonProps = {
  onClick: () => void;
};

// Nút nổi mở lại menu tổng quan (nút "về menu")
export function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Mở menu các mục"
      className="group fixed bottom-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-sage shadow-soft transition-colors hover:bg-sage-deep"
    >
      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>

      {/* Tooltip */}
      <span className="absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-full bg-ink px-2 py-1 text-xs text-canvas opacity-0 transition-opacity pointer-events-none group-hover:opacity-100">
        Mục lục
      </span>
    </button>
  );
}
