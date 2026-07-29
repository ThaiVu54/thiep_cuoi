"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";
import { useState } from "react";

type RsvpFormProps = {
  guestName?: string;
  guestSlug?: string;
};

export function RsvpForm({ guestName, guestSlug }: RsvpFormProps) {
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <section className="section-card">
      <h2 className="font-serif text-2xl text-rose-700">Xác nhận tham dự</h2>
      <form
        className="mt-3 space-y-3"
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          const form = event.currentTarget;
          const formData = new FormData(form);

          const payload = {
            guestSlug,
            name: String(formData.get("name") || ""),
            attending: formData.get("attending") === "yes",
            seats: Number(formData.get("seats") || 1),
            message: String(formData.get("message") || ""),
            honeypot: String(formData.get("website") || ""),
          };

          const response = await fetch("/api/rsvp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            setMessage({ text: "Đã gửi RSVP thành công. Cảm ơn bạn!", type: "success" });
            form.reset();
          } else {
            const data = (await response.json().catch(() => null)) as { error?: string } | null;
            setMessage({ text: data?.error ?? "Gửi RSVP thất bại", type: "error" });
          }
          setLoading(false);
        }}
      >
        <Input name="name" placeholder="Họ và tên" defaultValue={guestName} required />
        <div className="grid grid-cols-2 gap-2">
          <label className="rounded-2xl border border-rose-200 p-2 text-sm">
            <input type="radio" name="attending" value="yes" defaultChecked className="mr-2" />
            Sẽ tham dự
          </label>
          <label className="rounded-2xl border border-rose-200 p-2 text-sm">
            <input type="radio" name="attending" value="no" className="mr-2" />
            Không tham dự
          </label>
        </div>
        <Input name="seats" type="number" min={1} max={10} defaultValue={1} />
        <Input name="message" placeholder="Lời nhắn" />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
        <Button type="submit" disabled={loading}>
          {loading ? "Đang gửi..." : "Gửi xác nhận"}
        </Button>
      </form>
      {message ? <Toast message={message.text} type={message.type} /> : null}
    </section>
  );
}
