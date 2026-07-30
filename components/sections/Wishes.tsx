"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";
import { useEffect, useState } from "react";

type Wish = {
  id: string;
  name: string;
  content: string;
};

export function Wishes() {
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
    <section className="section-card">
      <h2 className="section-title">Sổ Lưu Bút</h2>
      <div className="gold-divider" />
      
      <p className="text-center text-sm text-ink/70 mb-6">
        Gửi lời chúc phúc đến cô dâu và chú rể
      </p>

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
            setToast({ text: "Đã gửi lời chúc, admin sẽ duyệt sớm 💌", type: "success" });
            form.reset();
          } else {
            setToast({ text: "Gửi lời chúc thất bại", type: "error" });
          }
        }}
      >
        <Input name="name" placeholder="Tên của bạn" required />
        <textarea
          name="content"
          placeholder="Viết lời chúc của bạn..."
          required
          rows={3}
          className="w-full border-2 border-primary/30 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20 placeholder:text-ink/40 resize-none"
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
              className="p-4 border border-primary/20 bg-cream-dark relative"
            >
              {/* Quote decoration */}
              <span className="absolute -top-2 -left-1 text-4xl text-primary/20 font-serif">&ldquo;</span>
              
              <p className="text-sm text-ink/80 italic pl-4">{wish.content}</p>
              <p className="mt-2 text-xs text-primary font-medium text-right">— {wish.name}</p>
            </article>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.text} type={toast.type} />}
    </section>
  );
}
