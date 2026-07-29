# Hướng dẫn cho GitHub Copilot

## Bối cảnh dự án
- Mô tả ngắn: [Điền mô tả dự án của bạn tại đây].
- Ngôn ngữ chính: [ví dụ: TypeScript, Java, Python].
- Framework / thư viện: [ví dụ: React, Spring Boot].
- Package manager: [npm / yarn / maven / ...].

## Ngữ cảnh codebase
- Nếu tồn tại file `.specs/codebase-analysis.md`, LUÔN đọc nó trước
  để hiểu kiến trúc, tech stack và quy ước của dự án.
- Nếu chưa có file đó, gợi ý tôi chạy `/analyze-codebase` trước khi làm việc lớn.

## Quy trình làm việc (quan trọng)
- Với tính năng mới, lỗi phức tạp, hoặc refactor lớn: TUÂN THEO quy trình
  spec-driven trong `.github/instructions/spec-driven.instructions.md`
  (Requirements → Design → Tasks, dừng chờ duyệt sau mỗi pha).
- Spec của mỗi tính năng lưu trong `.specs/<tên-tính-năng>/` gồm 3 file:
  `requirements.md`, `design.md`, `tasks.md` (theo template trong `.specs/`).
- Với LỖI (bug): dùng `/fix-bug` theo quy trình debug 5 bước
  (Reproduce → Localize → Root cause → Fix → Verify), tìm nguyên nhân gốc.
- Với yêu cầu nhỏ/rõ ràng: có thể làm ngay, không cần quy trình.

## Quy tắc coding chung
- Ưu tiên code rõ ràng, dễ đọc hơn là code "thông minh" khó hiểu.
- Đặt tên biến/hàm bằng tiếng Anh, có ý nghĩa.
- Viết comment giải thích logic phức tạp bằng tiếng Việt.
- Luôn xử lý lỗi (error handling) thay vì bỏ qua exception.
- Tuân thủ cấu hình linter/formatter có sẵn (ESLint, Prettier, Checkstyle...).

## Bảo mật
- KHÔNG hardcode secrets, API keys, mật khẩu trong code.
- Dùng biến môi trường (.env) cho thông tin nhạy cảm.
- Validate mọi input từ người dùng.

## Những điều cần tránh
- Không thêm thư viện mới nếu không thực sự cần thiết.
- Không để lại code chết (dead code) hoặc console.log debug.
- Không tự ý thay đổi cấu trúc thư mục hiện có.

## Khi trả lời
- Trả lời bằng tiếng Việt.
- Khi sửa code, giải thích ngắn gọn lý do thay đổi.
