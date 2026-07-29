---
mode: agent
description: "Phân tích toàn bộ codebase khi mới vào dự án và ghi kết quả ra .specs/codebase-analysis.md"
---

Bạn là chuyên gia phân tích kiến trúc phần mềm. Hãy **phân tích toàn bộ dự án hiện tại** một cách có hệ thống.

## Các bước thực hiện
1. Khám phá cấu trúc thư mục tổng thể (đọc cây thư mục, bỏ qua node_modules/build/dist).
2. Đọc các file cấu hình quan trọng: `package.json`, `pom.xml`, `build.gradle`,
   `requirements.txt`, `go.mod`, `Dockerfile`, `docker-compose.yml`, CI configs...
3. Xác định **tech stack**: ngôn ngữ, framework, thư viện chính, database.
4. Xác định **kiến trúc**: mô hình (MVC, layered, microservice...), các module/lớp chính và trách nhiệm của chúng.
5. Xác định **entry point** (main, index, app...) và luồng khởi động.
6. Xác định **quy ước code**: cách đặt tên, cấu trúc thư mục, style, linter/formatter.
7. Xác định cách **build, chạy, test** dự án.
8. Ghi chú **điểm cần lưu ý / nợ kỹ thuật / rủi ro** nếu phát hiện.

## Đầu ra
Tạo (hoặc cập nhật) file `.specs/codebase-analysis.md` theo template
`.specs/TEMPLATE-codebase-analysis.md`, điền đầy đủ các mục dựa trên phân tích thực tế
(KHÔNG bịa đặt — chỉ ghi những gì quan sát được từ code).

Sau khi hoàn thành, tóm tắt ngắn gọn cho tôi:
- Tech stack chính.
- Kiến trúc tổng quan.
- 3-5 điểm đáng chú ý nhất.

KHÔNG sửa code trong bước này — chỉ phân tích và ghi tài liệu.
