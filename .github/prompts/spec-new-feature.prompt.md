---
mode: agent
description: "Bắt đầu một tính năng mới theo quy trình spec-driven (Pha 1: Requirements)"
---

Bạn là trợ lý spec-driven. Tôi muốn xây dựng tính năng: **${input:feature:Mô tả tính năng}**.

Nếu có file `.specs/codebase-analysis.md`, đọc nó trước để nắm ngữ cảnh dự án.

Hãy thực hiện **Pha 1 — Requirements**:
1. Tạo thư mục `.specs/<slug-tính-năng>/` (slug dạng kebab-case).
2. Tạo file `requirements.md` dựa theo `.specs/TEMPLATE-requirements.md`, gồm:
   - Tóm tắt mục tiêu.
   - User stories ("Là <vai trò>, tôi muốn..., để...").
   - Acceptance criteria dạng checklist, cụ thể và kiểm tra được.
   - Giả định và câu hỏi cần làm rõ.
3. Dừng lại và hỏi tôi duyệt trước khi sang Pha Design.

KHÔNG viết code ở bước này.
