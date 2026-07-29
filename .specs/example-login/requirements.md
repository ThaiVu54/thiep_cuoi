# Requirements: Đăng nhập bằng email

> Trạng thái: ✅ Đã duyệt

## Mục tiêu
Cho phép người dùng đăng nhập vào ứng dụng bằng email và mật khẩu.

## User Stories
- Là người dùng đã đăng ký, tôi muốn đăng nhập bằng email/mật khẩu, để truy cập tài khoản.
- Là người dùng, tôi muốn nhận thông báo lỗi rõ ràng khi sai thông tin, để biết cách sửa.

## Acceptance Criteria
- [ ] Đăng nhập thành công với email + mật khẩu đúng, trả về token.
- [ ] Hiển thị lỗi "Email hoặc mật khẩu không đúng" khi sai.
- [ ] Khóa tạm thời sau 5 lần sai liên tiếp.
- [ ] Validate định dạng email trước khi gọi API.

## Giả định
- Đã có bảng `users` với cột email và password_hash.

## Câu hỏi cần làm rõ
- Thời gian sống của token là bao lâu?
