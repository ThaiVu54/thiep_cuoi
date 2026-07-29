---
applyTo: "**"
---

# Quy trình Spec-Driven Development (phong cách Kiro)

Khi tôi yêu cầu xây dựng một tính năng mới, sửa lỗi phức tạp, hoặc refactor lớn,
KHÔNG viết code ngay. Hãy tuân theo 3 pha dưới đây, và DỪNG chờ tôi duyệt sau mỗi pha.

## Pha 1 — Requirements (Yêu cầu)
Trước tiên, làm rõ và ghi lại yêu cầu:
- Tóm tắt vấn đề / mục tiêu bằng 1-2 câu.
- Liệt kê **user stories** dạng: "Là <vai trò>, tôi muốn <mong muốn>, để <lợi ích>".
- Liệt kê **tiêu chí chấp nhận (acceptance criteria)** dạng checklist, cụ thể và kiểm tra được.
- Nêu rõ các **giả định** và **câu hỏi cần làm rõ** (nếu có).
- ⛔ DỪNG lại và hỏi: "Yêu cầu như trên đã đúng chưa? Tôi có thể sang bước Design?"

## Pha 2 — Design (Thiết kế)
Sau khi yêu cầu được duyệt, trình bày thiết kế:
- Mô tả cách tiếp cận tổng thể (kiến trúc, luồng dữ liệu).
- Liệt kê các file / module sẽ tạo mới hoặc thay đổi.
- Nêu các thay đổi về interface / API / schema (nếu có).
- Chỉ ra rủi ro, edge case, và cách xử lý lỗi.
- ⛔ DỪNG lại và hỏi: "Thiết kế này ổn chưa? Tôi có thể lập danh sách task và bắt đầu code?"

## Pha 3 — Tasks & Thực thi
Sau khi thiết kế được duyệt:
- Chia công việc thành danh sách **task nhỏ, tuần tự**, dạng checklist `- [ ]`.
- Thực hiện **từng task một**, không nhảy cóc.
- Sau mỗi task: cập nhật trạng thái checklist (`- [x]`), giải thích ngắn gọn đã làm gì.
- Viết test đi kèm cho mỗi task khi phù hợp.
- Sau khi xong hết: tóm tắt lại thay đổi và cách kiểm thử.

## Nguyên tắc chung
- Với yêu cầu NHỎ / rõ ràng (sửa 1 dòng, đổi tên biến...), có thể bỏ qua quy trình và làm ngay.
- Luôn ưu tiên hỏi khi yêu cầu chưa rõ, thay vì đoán mò.
- Luôn trình bày bằng tiếng Việt.
