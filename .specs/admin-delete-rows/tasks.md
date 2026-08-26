# Tasks: Xoá bản ghi trong trang admin

> Tiến độ: 7/7 ✅

## Danh sách task

- [x] Task 1: Tạo `app/admin/actions.ts` — 3 Server Action xoá + kiểm tra ràng buộc
- [x] Task 2: Tạo `components/common/AdminToastProvider.tsx` — context toast cho admin
- [x] Task 3: Tạo `components/common/ConfirmDialog.tsx` — popup Có/Không, Esc + click backdrop
- [x] Task 4: Tạo `components/common/ConfirmDeleteButton.tsx` — nút Xoá + dialog + toast
- [x] Task 5: Bọc `AdminToastProvider` trong `app/admin/layout.tsx`
- [x] Task 6: Thêm cột Thao tác vào bảng Khách mời và Lời chúc
- [x] Task 7: Thêm cột ID + Thao tác vào bảng RSVP

## Ghi chú khi thực thi

- `AdminToastProvider` bọc `{children}` **bên trong** `<main>` nhưng sau `<AdminNav />`,
  nên toast không bị unmount khi dòng bảng biến mất.
- Sửa thêm [lib/invite-code.ts](lib/invite-code.ts): `for...of` trên `Uint8Array` lỗi TS2802
  (tsconfig `target` thấp hơn ES2015) → đổi sang vòng lặp theo index.
- `npm run build` không chạy được khi dev server đang bật (`prisma generate` bị EPERM
  do file `query_engine-windows.dll.node` đang bị khoá). Dùng `npx tsc --noEmit` thay thế.
- Kiểm thử: `npx tsc --noEmit` OK, `npm run lint` sạch, 4 trang admin trả HTTP 200,
  cột Thao tác và nút Xoá render đúng.

### Cập nhật sau phản hồi (đổi (c) → (a))

- [x] Task 8: `deleteGuest` xoá kèm RSVP của khách trong `db.$transaction`, bỏ logic chặn.
- [x] Task 9: Thêm prop `note` cho `ConfirmDeleteButton` để popup báo trước
  "RSVP của khách này (nếu có) cũng sẽ bị xoá."
