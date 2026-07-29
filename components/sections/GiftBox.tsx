"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import { useState } from "react";

export function GiftBox() {
  const [copied, setCopied] = useState(false);
  const bank = siteConfig.bank[0];

  if (!bank) return null;

  return (
    <section className="section-card">
      <h2 className="font-serif text-2xl text-rose-700">Mừng cưới</h2>
      <div className="mt-3 grid grid-cols-[96px_1fr] gap-3">
        <Image src={bank.qr} alt="QR ngân hàng" width={96} height={96} className="rounded-xl border" />
        <div>
          <p className="text-sm font-semibold">{bank.owner}</p>
          <p className="text-sm">{bank.bank}</p>
          <p className="text-sm">STK: {bank.number}</p>
          <Button
            type="button"
            className="mt-2 bg-ink"
            onClick={async () => {
              await navigator.clipboard.writeText(bank.number);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "Đã copy" : "Copy số tài khoản"}
          </Button>
        </div>
      </div>
    </section>
  );
}
