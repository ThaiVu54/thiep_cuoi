---
mode: agent
description: "Pha 2: Tạo thiết kế (design.md) từ requirements đã duyệt"
---

Đọc file `requirements.md` của tính năng trong thư mục `.specs/${input:slug:slug tính năng}/`.
Nếu có `.specs/codebase-analysis.md`, đọc để thiết kế phù hợp kiến trúc hiện có.

Thực hiện **Pha 2 — Design**: tạo file `design.md` dựa theo `.specs/TEMPLATE-design.md`, gồm:
- Cách tiếp cận tổng thể (kiến trúc, luồng dữ liệu).
- Danh sách file/module tạo mới hoặc thay đổi.
- Thay đổi interface / API / schema (nếu có).
- Rủi ro, edge case, cách xử lý lỗi.

Dừng lại và hỏi tôi duyệt trước khi sang Pha Tasks. KHÔNG viết code.
