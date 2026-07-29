---
applyTo: "**/*.{ts,tsx,js,jsx,css}"
---

# Hướng dẫn cho code Frontend

- Dùng function components + React Hooks (không dùng class component).
- Component đặt tên PascalCase, hook đặt tên bắt đầu bằng `use`.
- Tách logic phức tạp ra custom hooks.
- Ưu tiên CSS Modules hoặc styled-components thay vì inline style.
- Đảm bảo accessibility (a11y): dùng thẻ semantic, thêm `alt`, `aria-*`.
- Xử lý trạng thái loading và error cho mọi lời gọi API.
