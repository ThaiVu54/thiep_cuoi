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
    <section className="section-card text-center">
      <h2 className="section-title">Mừng Cưới</h2>
      <div className="gold-divider" />
      
      <p className="text-sm text-ink/70 mb-6">
        Sự hiện diện của bạn là niềm vui lớn nhất với chúng mình. 
        Nếu bạn muốn gửi quà mừng, xin hãy sử dụng thông tin bên dưới.
      </p>

      <div className="inline-block p-6 border-2 border-primary/30 bg-cream-dark">
        {/* QR Code */}
        <div className="mx-auto w-40 h-40 border-4 border-primary/20 p-2 mb-4">
          <Image 
            src={bank.qr} 
            alt="QR thanh toán" 
            width={160} 
            height={160} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bank info */}
        <div className="space-y-1 text-sm">
          <p className="font-serif text-lg text-primary">{bank.owner}</p>
          <p className="text-ink/70">{bank.bank}</p>
          <p className="font-mono text-ink">{bank.number}</p>
        </div>

        {/* Copy button */}
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={async () => {
            await navigator.clipboard.writeText(bank.number);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Đã sao chép
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Sao chép STK
            </span>
          )}
        </Button>
      </div>

      <p className="mt-6 text-xs text-ink/50 italic">
        Cảm ơn bạn rất nhiều 💕
      </p>
    </section>
  );
}
