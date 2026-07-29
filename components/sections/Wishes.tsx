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
      <h2 className="font-serif text-2xl text-rose-700">Sổ lưu bút</h2>
      <form
        className="mt-3 space-y-2"
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
        <Input name="content" placeholder="Lời chúc" required />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
        <Button type="submit">Gửi lời chúc</Button>
      </form>
      <div className="mt-4 space-y-2">
        {wishes.map((wish) => (
          <article key={wish.id} className="rounded-2xl bg-rose-50 p-3">
            <p className="text-xs font-semibold text-rose-500">{wish.name}</p>
            <p className="text-sm">{wish.content}</p>
          </article>
        ))}
      </div>
      {toast ? <Toast message={toast.text} type={toast.type} /> : null}
    </section>
  );
}
