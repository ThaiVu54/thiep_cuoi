"use client";

import { createInviteLink } from "@/app/admin/tao-thiep/actions";
import { CopyLinkButton } from "@/components/common/CopyLinkButton";
import { Toast } from "@/components/ui/Toast";
import { useEffect, useState } from "react";

type CreatedLink = {
  name: string;
  url: string;
};

type ToastState = {
  id: number;
  message: string;
  type: "success" | "error";
};

export function InviteLinkGenerator() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [links, setLinks] = useState<CreatedLink[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Lấy origin ở client để link luôn đúng domain, tránh lệch hydration
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError("Tên cần ít nhất 2 ký tự");
      return;
    }
    if (trimmedName.length > 80) {
      setError("Tên quá dài (tối đa 80 ký tự)");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const result = await createInviteLink(trimmedName);

      if (!result.ok) {
        setToast({ id: Date.now(), message: result.error, type: "error" });
        return;
      }

      setLinks((current) => [{ name: trimmedName, url: `${origin}/${result.slug}` }, ...current]);
      setName("");
      setToast({ id: Date.now(), message: "Đã tạo link thành công", type: "success" });
    } catch {
      setToast({ id: Date.now(), message: "Lỗi kết nối, vui lòng thử lại", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border bg-white p-4">
        <label htmlFor="guest-name" className="block text-sm font-medium text-slate-700">
          Tên khách mời
        </label>
        <input
          id="guest-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ví dụ: Nguyễn Văn A"
          maxLength={80}
          autoComplete="off"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Đang tạo..." : "Tạo link"}
        </button>
      </form>

      {links.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700">Link đã tạo</h2>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.url} className="space-y-2 rounded-2xl border bg-white p-4">
                <p className="text-sm font-medium text-slate-900">{link.name}</p>
                <input
                  readOnly
                  value={link.url}
                  onFocus={(event) => event.target.select()}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700"
                />
                <div className="flex gap-2">
                  <CopyLinkButton value={link.url} />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    Xem trước
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {toast ? <Toast key={toast.id} message={toast.message} type={toast.type} /> : null}
    </div>
  );
}
