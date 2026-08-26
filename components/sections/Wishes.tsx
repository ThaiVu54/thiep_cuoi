"use client";

import { StaggerGroup, StaggerItem } from "@/components/common/Stagger";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";
import { useEffect, useState } from "react";

type Wish = {
  id: string;
  name: string;
  content: string;
};

type WishesProps = {
  guestName?: string;
};

export function Wishes({ guestName }: WishesProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const run = async () => {
      const response = await fetch("/api/wishes");
      if (!response.ok) return;
      const data = (await response.json()) as { wishes: Wish[] };
      setWishes(data.wishes);
    };
    void run();
  }, []);

  return (
    <section className="section">
      <StaggerGroup stagger={0.1}>
        <StaggerItem>
          <h2 className="section-title">Sổ Lưu Bút</h2>
          <div className="divider" />
        </StaggerItem>

        <StaggerItem>
          <p className="text-center text-sm text-ink-muted mb-6">
            Gửi lời chúc phúc đến cô dâu và chú rể
          </p>
        </StaggerItem>
      </StaggerGroup>

      <form
        className="space-y-3 mb-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);
          const payload = {
            name: String(formData.get("name") || ""),
            content: String(formData.get("content") || ""),
            honeypot: String(formData.get("website") || ""),
          };

          const response = await fetch("/api/wishes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            setToast({ text: "Đã gửi lời chúc, Dâu Dể xin cảm ưn 💌", type: "success" });
            form.reset();
          } else {
            setToast({ text: "Gửi lời chúc thất bại", type: "error" });
          }
        }}
      >
        <Input name="name" placeholder="Tên của bạn" defaultValue={guestName} required />
        <textarea
          name="content"
          placeholder="Viết lời chúc của bạn..."
          required
          rows={3}
          className="field resize-none"
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
        <Button type="submit" variant="primary" className="w-full">
          Gửi Lời Chúc
        </Button>
      </form>

      {/* Wishes list */}
      {wishes.length > 0 && (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {wishes.map((wish) => (
            <article 
              key={wish.id} 
              className="card-sunk relative"
            >
              {/* Quote decoration */}
              <span className="absolute -top-2 -left-1 text-4xl text-sage/30 font-serif">&ldquo;</span>
              
              <p className="text-sm text-ink-muted italic pl-4">{wish.content}</p>
              <p className="mt-2 text-xs text-sage-deep font-medium text-right">— {wish.name}</p>
            </article>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.text} type={toast.type} />}
    </section>
  );
}
