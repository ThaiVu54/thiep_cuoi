# Tasks: Hiệu Ứng Pháo Hoa

## Task List

- [x] 1. Tạo hook `useFireworks`
  - Định nghĩa interface `Particle` và hằng số `FIREWORKS_COLORS`, `GRAVITY`, `PARTICLE_COUNT` (80), `BURST_INTERVAL` (400ms)
  - Hàm `createBurst(x, y)`: tạo mảng particles với vận tốc ngẫu nhiên theo tất cả hướng, màu ngẫu nhiên từ palette
  - Hàm `launch(count = 4)`: spawn `count` burst tại vị trí random, mỗi cái cách nhau `BURST_INTERVAL`ms bằng `setTimeout`
  - Animation loop với `requestAnimationFrame`: update physics (gravity, alpha decay), vẽ lên canvas, dừng khi hết particles
  - Trả về `{ launch, isActive }`
  - Bỏ qua animation nếu `prefers-reduced-motion` là true
  - **File:** `hooks/useFireworks.ts`
  - **Requirements:** REQ-1, REQ-5, REQ-6

- [x] 2. Tạo component `Fireworks`
  - Canvas `position: fixed`, `inset: 0`, `z-index: 50`, `pointer-events: none`, `aria-hidden="true"`
  - `useEffect` để set `canvas.width/height = window.innerWidth/Height` và lắng nghe `resize`
  - Nhận props: `trigger: boolean`, `burstCount?: number`, `showButton?: boolean`, `countdownDate?: string`
  - Khi `trigger` chuyển `false → true`: gọi `launch(burstCount)`
  - Nếu `countdownDate` được truyền: dùng `useCountdown` để detect `isExpired`, khi expired lần đầu gọi `launch(6)`
  - Nút "Bắn pháo hoa": fixed `bottom-20 right-4`, style `bg-primary text-cream rounded-full w-10 h-10`, `title="Bắn pháo hoa"`, ẩn khi `showButton === false`
  - **File:** `components/common/Fireworks.tsx`
  - **Requirements:** REQ-2, REQ-3, REQ-4, REQ-5
  - **Depends on:** Task 1

- [x] 3. Tích hợp `Fireworks` vào `InvitationPageClient`
  - Import `Fireworks` từ `@/components/common/Fireworks`
  - Thêm `<Fireworks trigger={opened} burstCount={4} showButton countdownDate={siteConfig.weddingDate} />` ngay sau `<FallingPetals />`
  - **File:** `components/InvitationPageClient.tsx`
  - **Requirements:** REQ-2, REQ-3, REQ-4
  - **Depends on:** Task 2

- [x] 4. Kiểm tra build và type errors
  - Chạy `npx tsc --noEmit` để kiểm tra TypeScript errors
  - Sửa tất cả lỗi type nếu có
  - Chạy `npm run build` để đảm bảo build thành công
  - **Depends on:** Task 3
