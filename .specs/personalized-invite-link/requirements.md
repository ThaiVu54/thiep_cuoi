# Requirements: Tạo link thiệp cá nhân hoá cho khách mời

> Trạng thái: ✅ Đã duyệt (2026-08-25)

## Quyết định đã chốt

| # | Vấn đề | Quyết định |
|---|--------|-----------|
| 1 | Nơi đặt form tạo link | **Trang công khai** (không cần đăng nhập) |
| 2 | Dạng link | **Mã ngẫu nhiên**, ví dụ `/k3f9x2ab` — khách không đoán được link người khác |
| 3 | Trường nhập | **Chỉ ô Tên khách mời** |
| 4 | Trùng tên | OK — mã ngẫu nhiên nên không bao giờ đụng nhau |
| 5 | Tạo hàng loạt | Không cần |
| 6 | Trạng thái RSVP trong bảng admin | **Cần hiển thị** |

## Mục tiêu

Cho phép chủ thiệp (cô dâu/chú rể) nhập tên một khách mời và nhận về một link thiệp riêng để gửi đi; khi khách bấm vào link, thiệp hiển thị đúng tên của họ. Lặp lại thao tác này cho nhiều khách mời khác nhau mà không cần thao tác database thủ công hay gọi API bằng curl.

## Bối cảnh hiện tại (từ `.specs/codebase-analysis.md`)

- Đã có route động [app/[guestSlug]/page.tsx](app/[guestSlug]/page.tsx) đọc `Guest` theo `slug`, tăng `viewCount` và truyền `guestName` vào `InvitationPageClient`.
- Đã có API [app/api/guests/route.ts](app/api/guests/route.ts) `POST` tạo khách mời (sinh slug qua [lib/slug.ts](lib/slug.ts)), nhưng **chỉ dùng được bằng Basic Auth + gọi thủ công**.
- Trang [app/admin/guests/page.tsx](app/admin/guests/page.tsx) hiện chỉ **hiển thị danh sách**, chưa có form thêm khách và chưa hiển thị link đầy đủ để copy.
- ➡️ Tính năng này chủ yếu là **bổ sung lớp UI + hoàn thiện luồng**, không phải xây từ đầu.

## User Stories

- Là chủ thiệp, tôi muốn vào một trang công khai, nhập tên khách mời và bấm một nút, để nhận ngay link thiệp riêng cho người đó.
- Là chủ thiệp, tôi muốn link sinh ra là mã ngẫu nhiên, để khách này không mò được link của khách khác.
- Là chủ thiệp, tôi muốn có nút "Copy" link, để dán nhanh vào Zalo/Messenger gửi cho khách.
- Là chủ thiệp, tôi muốn tạo liên tiếp nhiều link cho nhiều khách khác nhau mà không phải reload trang, để mời nhanh cả danh sách.
- Là chủ thiệp, tôi muốn xem trước thiệp bằng link vừa tạo, để kiểm tra tên hiển thị đúng trước khi gửi.
- Là khách mời, tôi muốn khi bấm vào link nhận được, thiệp hiển thị lời mời kèm đúng tên tôi, để cảm thấy được mời riêng.
- Là khách mời, tôi muốn khi link sai vẫn xem được thiệp ở dạng chung, để không gặp trang lỗi.
- Là chủ thiệp, tôi muốn trong trang admin thấy danh sách link kèm **lượt xem và trạng thái RSVP** của từng người, để biết ai đã mở thiệp và ai đã xác nhận tham dự.

## Acceptance Criteria

### Tạo link (trang công khai)

- [ ] Có một trang công khai chứa form với **duy nhất ô "Tên khách mời"** và nút "Tạo link".
- [ ] Tên được validate: tối thiểu 2 ký tự, tối đa 80 ký tự; sai thì hiện lỗi tiếng Việt và **không** gọi API.
- [ ] Bấm "Tạo link" tạo bản ghi `Guest` mới với `slug` là **mã ngẫu nhiên** và trả về link đầy đủ.
- [ ] Mã ngẫu nhiên dài ≥ 8 ký tự, chỉ gồm `[a-z0-9]`, sinh bằng CSPRNG (không dùng `Math.random`).
- [ ] Tạo 2 link cùng tên "Nguyễn Văn A" → ra 2 mã khác nhau, cả 2 đều hoạt động độc lập.
- [ ] Trùng mã (cực hiếm) được xử lý bằng retry, không trả lỗi cho người dùng.
- [ ] Tạo link liên tiếp nhiều lần không cần reload trang; ô nhập được xoá sạch sau mỗi lần tạo.

### Copy & gửi link

- [ ] Sau khi tạo, hiển thị link đầy đủ + nút **Copy** + nút **Xem trước** (mở link ở tab mới).
- [ ] Bấm Copy sao chép vào clipboard và hiển thị phản hồi "Đã sao chép".
- [ ] Trình duyệt không hỗ trợ clipboard API → vẫn hiện link dạng text để copy tay, không crash.
- [ ] Các link đã tạo trong phiên hiện tại được liệt kê lại trên trang, mỗi dòng có nút Copy riêng.

### Xem thiệp (khách mời)

- [ ] Truy cập `/{mã}` hợp lệ → thiệp hiển thị đúng tên khách mời ở phần lời mời.
- [ ] Truy cập `/{mã}` không tồn tại → hiển thị thiệp phiên bản chung (không tên riêng), **không** lỗi 500.
- [ ] Mỗi lần mở link hợp lệ, `viewCount` của khách đó tăng đúng 1.
- [ ] Form RSVP trên trang cá nhân hoá được điền sẵn tên khách mời.
- [ ] Route tĩnh hiện có (`/admin`, `/api`, trang tạo link) không bị route động `/[guestSlug]` nuốt mất.

### Trang admin

- [ ] Bảng `/admin/guests` hiển thị các cột: **Tên · Link · Lượt xem · Trạng thái RSVP · Số ghế xác nhận · Ngày tạo**.
- [ ] Trạng thái RSVP hiển thị 3 giá trị: **Sẽ tham dự** / **Không tham dự** / **Chưa phản hồi**.
- [ ] Mỗi dòng có nút Copy link.

### Bảo mật & chất lượng

- [ ] Endpoint tạo link công khai có **rate limit theo IP** (tái dùng [lib/rate-limit.ts](lib/rate-limit.ts)); vượt hạn mức trả 429 kèm thông báo tiếng Việt.
- [ ] Có trường **honeypot** ẩn để chặn bot (cùng pattern với RSVP/Wishes hiện tại).
- [ ] Tên khách mời được render an toàn qua JSX, không cho chèn HTML/script (chống XSS).
- [ ] Endpoint công khai **chỉ tạo được `Guest`**, không đọc/liệt kê được danh sách khách mời hiện có.
- [ ] `npm run lint` và `npm run build` pass sau khi hoàn thành.

## Ngoài phạm vi (Out of scope)

- Gửi tin nhắn/email tự động cho khách mời (chỉ copy link thủ công).
- Import hàng loạt / tạo nhiều link cùng lúc.
- Sinh mã QR riêng cho từng link.
- Xoá/sửa khách mời đã tạo (chỉ tạo mới và xem).
- Rút gọn link qua dịch vụ bên thứ ba.
- Đổi trường `side`, `phone`, `maxSeats` từ giao diện (giữ giá trị mặc định của schema).

## Giả định

- Dùng lại model `Guest` hiện có trong [prisma/schema.prisma](prisma/schema.prisma), **không đổi schema** (`slug` unique sẽ chứa mã ngẫu nhiên).
- Route cá nhân hoá vẫn là `/[guestSlug]` hiện có, chỉ thay đổi cách sinh giá trị slug.
- Link đầy đủ ghép từ origin của trình duyệt (`window.location.origin`), nên chạy đúng cả ở local lẫn production mà không phụ thuộc `NEXT_PUBLIC_SITE_URL`.
- API `POST /api/guests` (admin, sinh slug theo tên) **giữ nguyên**, không phá vỡ luồng cũ.
- Link không có thời hạn và không giới hạn số lần mở.
- Rủi ro chấp nhận được: trang tạo link công khai nên người lạ có thể tạo bản ghi rác — giảm thiểu bằng rate limit + honeypot, không chặn tuyệt đối.
- Không viết test tự động (dự án chưa cấu hình test framework); kiểm thử thủ công theo checklist.

---

✅ **Requirements đã được duyệt. Chuyển sang Pha 2 — Design.**
