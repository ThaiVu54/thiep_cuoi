# Design: Hiệu Ứng Pháo Hoa

## Kiến trúc tổng quan

```
hooks/useFireworks.ts          ← Logic animation (particles, RAF loop)
components/common/Fireworks.tsx ← Canvas component + nút trigger
components/InvitationPageClient.tsx ← Tích hợp: truyền `opened` và `isExpired`
```

Không thêm thư viện mới. Toàn bộ animation chạy trên Canvas 2D API thuần.

---

## Data Models

### Particle

```typescript
interface Particle {
  x: number;        // vị trí hiện tại
  y: number;
  vx: number;       // vận tốc x
  vy: number;       // vận tốc y
  alpha: number;    // độ trong suốt (1 → 0)
  color: string;    // hex color từ FIREWORKS_COLORS
  radius: number;   // bán kính hạt (1–3px)
  decay: number;    // tốc độ giảm alpha mỗi frame
}
```

### FireworkBurst

```typescript
interface FireworkBurst {
  x: number;        // tọa độ nổ
  y: number;
  particles: Particle[];
}
```

---

## Hook: `useFireworks`

```typescript
// hooks/useFireworks.ts
export function useFireworks(canvasRef: RefObject<HTMLCanvasElement>) {
  // Trả về:
  return {
    launch: (count?: number) => void,  // bắn `count` loạt (default 4)
    isActive: boolean,                  // đang có animation chạy không
  };
}
```

**Internals:**
- State: `bursts: FireworkBurst[]`
- `launch(count)`: tạo `count` burst tại vị trí ngẫu nhiên trong viewport, mỗi burst cách nhau 400ms via `setTimeout`
- Animation loop dùng `requestAnimationFrame`:
  - Xóa canvas với `clearRect` (hoặc `fillRect` với alpha thấp để tạo trail effect)
  - Cập nhật mỗi particle: `x += vx`, `y += vy`, `vy += GRAVITY (0.05)`, `alpha -= decay`
  - Vẽ particle: `arc()` với `fillStyle = color + alpha`
  - Xóa particle có `alpha <= 0`
  - Dừng RAF khi không còn particle nào

---

## Component: `Fireworks`

```typescript
// components/common/Fireworks.tsx
interface FireworksProps {
  trigger: boolean;        // khi chuyển sang true → launch()
  burstCount?: number;     // số loạt (default 4)
  showButton?: boolean;    // hiển thị nút bắn tay (default true)
}
```

**Layout:**
- `<canvas>` full-screen fixed, `z-index: 50`, `pointer-events: none`, `aria-hidden="true"`
- Nút trigger: `position: fixed`, `bottom: 80px` (trên MusicPlayer), `right: 16px`
  - Icon: 🎆 emoji hoặc SVG firework
  - Style: nền `bg-primary/80`, bo tròn, size 40×40px
  - `title="Bắn pháo hoa"` cho accessibility

**Resize handling:**
```typescript
useEffect(() => {
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();
  return () => window.removeEventListener('resize', resize);
}, []);
```

**Reduced motion:**
```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) return; // skip animation
```

---

## Tích hợp vào `InvitationPageClient`

```tsx
// Thêm vào InvitationPageClient
import { Fireworks } from "@/components/common/Fireworks";

// Trong JSX:
<Fireworks trigger={opened} burstCount={4} showButton />
```

- `trigger={opened}`: bắn pháo hoa khi mở phong bì
- Countdown → Fireworks: `Countdown` component sẽ expose `isExpired` ra ngoài hoặc `Fireworks` nhận thêm prop `triggerOnExpiry` cùng `weddingDate`

**Phương án đơn giản hơn cho countdown trigger:**
```tsx
<Fireworks 
  trigger={opened} 
  burstCount={4} 
  showButton 
  countdownDate={siteConfig.weddingDate}  // tự theo dõi bên trong
/>
```
Component tự dùng `useCountdown` để detect `isExpired`.

---

## Màu sắc pháo hoa

```typescript
const FIREWORKS_COLORS = [
  "#7c3d52",  // burgundy (primary)
  "#c9a84c",  // gold
  "#f9f3e8",  // cream
  "#b76e79",  // rose gold
  "#e8c4b8",  // blush
  "#ffffff",  // white
];
```

---

## Vị trí burst

Mỗi burst được spawn tại vị trí ngẫu nhiên trong vùng trên màn hình (tránh nổ ở đáy):

```typescript
const x = Math.random() * canvas.width;
const y = Math.random() * canvas.height * 0.6; // chỉ 60% trên
```

---

## File thay đổi

| File | Thay đổi |
|------|----------|
| `hooks/useFireworks.ts` | Tạo mới |
| `components/common/Fireworks.tsx` | Tạo mới |
| `components/InvitationPageClient.tsx` | Import và thêm `<Fireworks>` |
