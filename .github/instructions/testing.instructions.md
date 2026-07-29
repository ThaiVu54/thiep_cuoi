---
applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx}"
---

# Hướng dẫn viết Test

- Mỗi tính năng mới phải có test đi kèm.
- Cấu trúc test theo mẫu AAA: Arrange - Act - Assert.
- Tên test mô tả rõ hành vi mong đợi (ví dụ: "should return 404 when user not found").
- Test cả happy path lẫn edge case và trường hợp lỗi.
- Mock các dependency bên ngoài (API, DB) khi unit test.
