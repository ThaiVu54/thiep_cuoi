# Requirements: Hiệu Ứng Pháo Hoa

## Tổng quan

Thêm hiệu ứng pháo hoa (fireworks) vào thiệp cưới để tăng tính sinh động và festive. Hiệu ứng được render bằng Canvas API, không phụ thuộc thư viện bên ngoài, phù hợp với tone màu vintage burgundy của thiệp.

---

## Requirements

### REQ-1: Component Fireworks

**Là** khách xem thiệp,  
**Tôi muốn** thấy hiệu ứng pháo hoa nổ trên màn hình,  
**Để** cảm nhận không khí vui tươi của đám cưới.

**Tiêu chí chấp nhận:**
- [ ] Component `Fireworks` render một `<canvas>` full-screen, fixed, pointer-events-none, z-index cao
- [ ] Pháo hoa được vẽ bằng Canvas 2D API (không dùng thư viện ngoài)
- [ ] Mỗi vụ nổ gồm nhiều hạt (particles) bay ra theo nhiều hướng với trọng lực
- [ ] Màu sắc các hạt lấy từ bảng màu của theme: burgundy (`#7c3d52`), gold (`#c9a84c`), cream (`#f9f3e8`), rose gold (`#b76e79`)
- [ ] Hiệu ứng fade out mượt mà khi hạt biến mất (alpha giảm dần)

### REQ-2: Trigger khi mở thiệp

**Là** khách xem thiệp,  
**Tôi muốn** pháo hoa bắn khi tôi mở phong bì,  
**Để** khoảnh khắc mở thiệp thêm ấn tượng.

**Tiêu chí chấp nhận:**
- [ ] Pháo hoa tự động kích hoạt khi `opened === true` trong `InvitationPageClient`
- [ ] Bắn 3–5 loạt pháo hoa liên tiếp (mỗi loạt cách nhau ~400ms) ngay sau khi mở
- [ ] Sau khi tất cả hạt tắt, animation tự dừng (không loop vô tận)

### REQ-3: Trigger thủ công (nút pháo hoa)

**Là** khách xem thiệp,  
**Tôi muốn** có thể bắn pháo hoa lại bất cứ lúc nào,  
**Để** chia sẻ niềm vui khi muốn.

**Tiêu chí chấp nhận:**
- [ ] Có một nút nhỏ fixed ở góc dưới màn hình (ví dụ: icon 🎆 hoặc emoji/SVG pháo hoa)
- [ ] Nhấn nút sẽ trigger thêm 3–5 loạt pháo hoa
- [ ] Nút không che khuất nội dung thiệp, tooltip "Bắn pháo hoa" khi hover

### REQ-4: Trigger khi đếm ngược kết thúc

**Là** khách xem thiệp vào đúng ngày cưới,  
**Tôi muốn** pháo hoa tự bắn khi countdown về 0,  
**Để** cùng chúc mừng đôi uyên ương.

**Tiêu chí chấp nhận:**
- [ ] Khi `isExpired` chuyển từ `false` sang `true`, trigger 5–8 loạt pháo hoa
- [ ] Chỉ trigger một lần duy nhất (không lặp lại khi re-render)

### REQ-5: Hiệu năng & Accessibility

**Là** người dùng trên thiết bị di động,  
**Tôi muốn** hiệu ứng không làm chậm thiệp,  
**Để** trải nghiệm xem thiệp vẫn mượt mà.

**Tiêu chí chấp nhận:**
- [ ] Sử dụng `requestAnimationFrame` cho animation loop
- [ ] Số particles mỗi vụ nổ tối đa 80 hạt (có thể cấu hình)
- [ ] Canvas resize đúng khi window thay đổi kích thước
- [ ] `aria-hidden="true"` trên canvas element
- [ ] Tôn trọng `prefers-reduced-motion`: nếu user bật reduced motion, không chạy animation (hoặc hiển thị static confetti đơn giản)

### REQ-6: Không phụ thuộc thư viện ngoài

**Là** developer dự án,  
**Tôi muốn** hiệu ứng được viết thuần Canvas API,  
**Để** không tăng bundle size và không phụ thuộc package bên ngoài.

**Tiêu chí chấp nhận:**
- [ ] Không thêm npm package mới nào cho tính năng này
- [ ] Code được viết bằng TypeScript thuần
- [ ] Logic animation được tách vào custom hook `useFireworks`
