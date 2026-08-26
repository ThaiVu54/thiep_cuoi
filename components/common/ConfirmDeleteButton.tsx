"use client";

import type { DeleteResult } from "@/app/admin/actions";
import { useAdminToast } from "@/components/common/AdminToastProvider";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useState } from "react";

const MAX_LABEL_LENGTH = 60;

type ConfirmDeleteButtonProps = {
  id: string;
  label: string;
  action: (id: string) => Promise<DeleteResult>;
  note?: string;
};

export function ConfirmDeleteButton({ id, label, action, note }: ConfirmDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { showToast } = useAdminToast();

  const shortLabel =
    label.length > MAX_LABEL_LENGTH ? `${label.slice(0, MAX_LABEL_LENGTH)}…` : label;

  async function handleConfirm() {
    setIsPending(true);
    try {
      const result = await action(id);
      if (result.ok) {
        showToast("Đã xoá", "success");
        setOpen(false);
      } else {
        showToast(result.error, "error");
      }
    } catch {
      showToast("Không xoá được, vui lòng thử lại", "error");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-red-300 px-3 py-1 text-xs text-red-600 transition-colors hover:bg-red-50"
      >
        Xoá
      </button>
      <ConfirmDialog
        open={open}
        title="Xác nhận xoá"
        description={
          <>
            Bạn có chắc muốn xoá <span className="font-medium text-slate-900">{shortLabel}</span>?
            {note ? <span className="mt-1 block text-slate-500">{note}</span> : null}
          </>
        }
        isPending={isPending}
        onConfirm={handleConfirm}
        onCancel={() => {
          if (!isPending) setOpen(false);
        }}
      />
    </>
  );
}
