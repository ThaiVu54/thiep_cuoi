# Requirements: Xoá bản ghi trong trang admin

> Trạng thái: ✅ Đã duyệt (2026-08-25)

## Quyết định đã chốt

| # | Vấn đề | Quyết định |
|---|--------|-----------|
| 1 | Xoá khách mời đang có RSVP | **(a) Xoá kèm luôn RSVP** của khách đó |
| 2 | Cách xác nhận | Popup 2 nút **Có / Không**, không bắt gõ lại tên |
| 3 | Cột ID ở bảng RSVP | **Có** |
| 4 | Toast thông báo thành công | **Có** |

## Mục tiêu

Thêm cột "Thao tác → Xoá" vào các bảng trong trang admin để chủ thiệp tự dọn dữ liệu sai/trùng/spam mà không cần vào database. Mỗi lần xoá phải có popup xác nhận để tránh bấm nhầm.

## Bối cảnh hiện tại

Có 3 bảng trong admin, hiện **không bảng nào xoá được**:

| Trang | Bảng | Thao tác hiện có |
|-------|------|------------------|
| [app/admin/guests/page.tsx](app/admin/guests/page.tsx) | `Guest` (khách mời + link) | Chỉ xem, có nút Copy link |
| [app/admin/rsvp/page.tsx](app/admin/rsvp/page.tsx) | `Rsvp` (xác nhận tham dự) | Chỉ xem, có Export CSV |
| [app/admin/wishes/page.tsx](app/admin/wishes/page.tsx) | `Wish` (lời chúc) | Có nút Duyệt/Ẩn (Server Action `toggleWish`) |

Ràng buộc quan trọng trong [prisma/schema.prisma](prisma/schema.prisma): `Rsvp.guestId` là khoá ngoại trỏ tới `Guest` và **không khai báo `onDelete`**, nên xoá một `Guest` đang có `Rsvp` sẽ lỗi ràng buộc (`P2003`). Đây là điểm cần chốt cách xử lý (xem câu hỏi 1).

## User Stories

- Là chủ thiệp, tôi muốn xoá một khách mời tạo nhầm, để danh sách không bị rác.
- Là chủ thiệp, tôi muốn xoá một RSVP trùng/thử nghiệm, để số liệu tổng hợp chính xác.
- Là chủ thiệp, tôi muốn xoá một lời chúc spam/xúc phạm, để không hiển thị trên thiệp.
- Là chủ thiệp, tôi muốn thấy popup xác nhận kèm tên bản ghi trước khi xoá, để chắc chắn không xoá nhầm người.
- Là chủ thiệp, tôi muốn huỷ được popup xác nhận, để thoát an toàn khi bấm nhầm nút Xoá.
- Là chủ thiệp, tôi muốn bảng tự cập nhật ngay sau khi xoá, để biết thao tác đã thành công.

## Acceptance Criteria

### Nút xoá

- [ ] Cả 3 bảng (`Guest`, `Rsvp`, `Wish`) đều có cột **Thao tác** chứa nút **Xoá**.
- [ ] Bảng lời chúc giữ nguyên nút Duyệt/Ẩn hiện có, nút Xoá đặt cạnh bên.
- [ ] Nút Xoá có màu cảnh báo (đỏ) để phân biệt với các thao tác khác.

### Popup xác nhận

- [ ] Bấm Xoá **không** xoá ngay mà mở popup xác nhận.
- [ ] Popup hiển thị: tiêu đề, **tên/nội dung của bản ghi sắp xoá**, cảnh báo không thể hoàn tác.
- [ ] Popup có đúng 2 nút: **Không** (đóng popup, không làm gì) và **Có** (thực hiện xoá).
- [ ] Bấm ra ngoài popup hoặc nhấn phím `Esc` → đóng popup, không xoá.
- [ ] Trong lúc đang xoá, nút "Có" bị disable và hiển thị "Đang xoá..." để tránh bấm 2 lần.
- [ ] Popup dùng tông màu admin (slate), thống nhất với giao diện admin hiện tại.

### Kết quả xoá

- [ ] Xoá thành công → popup đóng, dòng biến mất khỏi bảng **không cần reload thủ công**, kèm **toast "Đã xoá"**.
- [ ] Xoá thất bại → toast lỗi tiếng Việt, dòng vẫn còn nguyên.
- [ ] Xoá `Wish` → lời chúc biến mất khỏi section Lời chúc trên trang thiệp công khai.
- [ ] Xoá `Guest` → xoá luôn RSVP của khách đó (nếu có); link `/{mã}` trở thành thiệp chung (HTTP 200, không lỗi 500).
- [ ] Popup xoá khách mời có ghi chú "RSVP của khách này (nếu có) cũng sẽ bị xoá".
- [ ] Xoá `Guest` và RSVP diễn ra trong một transaction — lỗi giữa chừng thì không bản ghi nào bị xoá.
- [ ] Xoá một bản ghi **không** ảnh hưởng tới các bản ghi khác.

### Bảng RSVP

- [ ] Bảng RSVP hiển thị thêm cột **ID** (font mono, cỡ nhỏ) như bảng Lời chúc.

### Bảo mật

- [ ] Chức năng xoá chỉ chạy được khi đã qua Basic Auth của `/admin` ([middleware.ts](middleware.ts)).
- [ ] Dùng **Server Action** (giống `toggleWish` và `createInviteLink` hiện có), không tạo API route công khai.
- [ ] Server luôn kiểm tra `id` hợp lệ trước khi gọi Prisma; `id` rỗng/sai → không xoá, trả lỗi.
- [ ] Xoá bản ghi không tồn tại (đã bị xoá ở tab khác) → thông báo lỗi thân thiện, không crash trang.

## Ngoài phạm vi (Out of scope)

- Xoá hàng loạt (chọn nhiều dòng bằng checkbox).
- Hoàn tác (undo) sau khi xoá.
- Thùng rác / soft delete (`deletedAt`).
- Sửa nội dung bản ghi.
- Nhật ký thao tác (audit log).

## Giả định

- **Hard delete**: xoá hẳn khỏi database, không có cách khôi phục — nên popup phải cảnh báo rõ.
- Tái sử dụng pattern Server Action + `revalidatePath` đã dùng ở [app/admin/wishes/page.tsx](app/admin/wishes/page.tsx).
- Popup dựng mới cho admin, **không** dùng [components/ui/Modal.tsx](components/ui/Modal.tsx) vì component đó mang tông thiệp cưới (cream/gold, viền trang trí) không hợp trang admin.
- Không dùng `window.confirm()` mặc định của trình duyệt vì không tuỳ biến được nội dung tiếng Việt và trông thiếu chuyên nghiệp.
- Không đổi `prisma/schema.prisma` — xoá RSVP thủ công trong transaction thay vì thêm `onDelete: Cascade`.
- Không cần test tự động (dự án chưa cấu hình test framework).

---

✅ **Requirements đã được duyệt. Chuyển sang Pha 2 — Design.**
