"use client";

import { StaggerGroup, StaggerItem } from "@/components/common/Stagger";
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
    <section className="section">
      <div className="card">
        <StaggerGroup stagger={0.1}>
          <StaggerItem>
            <h2 className="section-title">Xác Nhận Tham Dự</h2>
            <div className="divider" />
          </StaggerItem>

          <StaggerItem>
            <p className="text-center text-sm text-ink-muted mb-6">
              Vui lòng điền thông tin bên dưới để xác nhận
            </p>
          </StaggerItem>
        </StaggerGroup>

        <form
          className="space-y-4"
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
              setMessage({ text: "Đã gửi xác nhận thành công. Cảm ơn bạn!", type: "success" });
              form.reset();
            } else {
              const data = (await response.json().catch(() => null)) as { error?: string } | null;
              setMessage({ text: data?.error ?? "Gửi xác nhận thất bại", type: "error" });
            }
            setLoading(false);
          }}
        >
          <div>
            <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
              Họ và tên
            </label>
            <Input name="name" placeholder="Nhập họ và tên" defaultValue={guestName} required />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
              Bạn có thể tham dự?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center justify-center gap-2 py-3 rounded-xl border border-line cursor-pointer transition-colors hover:border-sage has-[:checked]:border-sage has-[:checked]:bg-sage-soft">
                <input 
                  type="radio" 
                  name="attending" 
                  value="yes" 
                  defaultChecked 
                  className="sr-only" 
                />
                <svg className="w-5 h-5 text-sage-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-ink">Tôi sẽ đến</span>
              </label>
              <label className="flex items-center justify-center gap-2 py-3 rounded-xl border border-line cursor-pointer transition-colors hover:border-sage has-[:checked]:border-sage has-[:checked]:bg-sage-soft">
                <input 
                  type="radio" 
                  name="attending" 
                  value="no" 
                  className="sr-only" 
                />
                <svg className="w-5 h-5 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm text-ink">Rất tiếc không thể</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
              Số người tham dự
            </label>
            <Input name="seats" type="number" min={1} max={10} defaultValue={1} />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
              Lời nhắn (tuỳ chọn)
            </label>
            <Input name="message" placeholder="Gửi lời nhắn đến cô dâu chú rể..." />
          </div>

          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Đang gửi..." : "Gửi Xác Nhận"}
          </Button>
        </form>
        <StaggerItem>
          <p className="mt-6 text-xs italic text-ink-muted">
            Vui lòng xác nhận tham dự trước ngày 15/11/2026
          </p>
        </StaggerItem>
      </div>

      {message && <Toast message={message.text} type={message.type} />}
    </section>
  );
}
