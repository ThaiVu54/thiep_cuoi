# Design: Đăng nhập bằng email

> Trạng thái: ✅ Đã duyệt

## Cách tiếp cận tổng thể
Client gửi POST `/api/auth/login` với email + password. Server xác thực,
so sánh password_hash (bcrypt), phát token JWT nếu đúng.

## File / Module thay đổi
| File | Hành động | Mô tả |
|------|---------|--------|
| `src/routes/auth.ts` | Tạo mới | Định nghĩa route login |
| `src/services/authService.ts` | Tạo mới | Logic xác thực + phát token |
| `src/middleware/rateLimit.ts` | Tạo mới | Giới hạn 5 lần sai |

## Thay đổi API
- `POST /api/auth/login`
  - Body: `{ email: string, password: string }`
  - 200: `{ token: string }`
  - 401: `{ message: "Email hoặc mật khẩu không đúng" }`
  - 429: khi vượt giới hạn

## Rủi ro & Edge case
- Timing attack → luôn so bcrypt dù email không tồn tại.
- Brute force → rate limit theo IP + email.
