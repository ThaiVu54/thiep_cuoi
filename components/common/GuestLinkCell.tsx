"use client";

import { CopyLinkButton } from "@/components/common/CopyLinkButton";
import { useEffect, useState } from "react";

export function GuestLinkCell({ slug }: { slug: string }) {
  const [origin, setOrigin] = useState("");

  // Lấy origin ở client để link luôn đúng domain, tránh lệch hydration
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <a
        href={`/${slug}`}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-xs text-slate-700 underline"
      >
        /{slug}
      </a>
      <CopyLinkButton
        value={`${origin}/${slug}`}
        className="px-3 py-1 text-xs normal-case tracking-normal"
      />
    </div>
  );
}
