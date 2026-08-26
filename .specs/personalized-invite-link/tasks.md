# Tasks: Tạo link thiệp cá nhân hoá cho khách mời

> Tiến độ: 7/7 ✅

## Danh sách task

- [x] Task 1: Tạo `lib/invite-code.ts` — sinh mã ngẫu nhiên bằng CSPRNG
- [x] Task 2: Thêm `inviteLinkSchema` vào `lib/validations.ts`
- [x] Task 3: Tạo `POST /api/invite` — rate limit, validate, tạo Guest với retry chống trùng mã
- [x] Task 4: Tạo `components/common/CopyLinkButton.tsx` — copy clipboard + fallback
- [x] Task 5: Tạo `components/common/InviteLinkGenerator.tsx` — form 1 ô tên + danh sách link đã tạo
- [x] Task 6: Tạo trang công khai `app/tao-thiep/page.tsx` (noindex)
- [x] Task 7: Cập nhật `app/admin/guests/page.tsx` — cột Link + Trạng thái RSVP

## Ghi chú khi thực thi

- Phát sinh thêm `components/common/GuestLinkCell.tsx` (client) vì bảng admin là Server Component
  nhưng cần `window.location.origin` để ghép link đầy đủ cho nút Copy.
- `formatDateVN` nhận `string` nên không dùng cho `createdAt` (kiểu `Date`); bỏ cột Ngày tạo,
  giữ cột Số ghế như bảng cũ.
- Kiểm thử thủ công đã pass: tạo link OK, tên < 2 ký tự bị chặn, honeypot bị chặn,
  `/{mã}` render đúng tên, slug sai trả HTTP 200 (thiệp chung), `/admin` vẫn 401.
- `npm run lint` sạch.

### Cập nhật sau phản hồi (chuyển vào admin)

- [x] Task 8: Chuyển trang tạo link từ `/tao-thiep` (công khai) sang `/admin/tao-thiep`.
- [x] Task 9: Thay `POST /api/invite` bằng **Server Action** `app/admin/tao-thiep/actions.ts`.
- [x] Task 10: Nav admin bôi màu mục đang xem (`components/common/AdminNav.tsx`).

Lý do dùng Server Action thay vì API route: trình duyệt không chắc chắn gửi kèm header
Basic Auth cho `/api/*` (nằm ngoài cây `/admin`). Server Action POST thẳng vào
`/admin/tao-thiep` nên luôn đi qua middleware auth. Đồng thời bỏ luôn rate limit +
honeypot vì endpoint không còn công khai.
