import Link from "next/link";
import type { ReactNode } from "react";

type SectionShellProps = {
  /** URL quay về menu (đã kèm ?menu=1) */
  backHref: string;
  children: ReactNode;
};

// Khung cho trang từng mục riêng: nền + nút "Về mục lục", không có phong bì
export function SectionShell({ backHref, children }: SectionShellProps) {
  return (
    <main className="relative mx-auto min-h-screen max-w-xl bg-canvas">
      <div className="sticky top-0 z-30 flex items-center bg-canvas/80 px-4 py-3 backdrop-blur-sm">
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-sage-deep"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs font-medium uppercase tracking-[0.2em]">Về mục lục</span>
        </Link>
      </div>

      {children}
    </main>
  );
}
