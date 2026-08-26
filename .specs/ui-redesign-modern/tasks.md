# Tasks: Redesign giao diện thiệp — phong cách trẻ trung, mượt mà

> Nguồn: [design.md](./design.md) — đã duyệt

- [x] 1. Design tokens: `tailwind.config.ts` (màu pastel + alias tương thích ngược, bỏ keyframes/backgroundImage không dùng)
- [x] 2. `styles/globals.css`: thay primitive vintage bằng primitive mới (`.section`, `.section-title`, `.card`, `.card-sunk`, `.divider`, `.chip`, `.field`, `.btn-*`)
- [x] 3. `config/theme.config.ts`: preset class mới
- [x] 4. `app/layout.tsx`: nền `bg-canvas text-ink`
- [x] 5. `components/ui/*`: Button, Input, Modal, Toast, Skeleton
- [x] 6. Motion: `EnvelopeCover`, `MusicPlayer` (đổi màu/khung, giữ logic); `Fireworks`, `FallingPetals`, `useFireworks` (đổi bảng màu, giữ logic)
- [x] 7. `components/InvitationPageClient.tsx`: nền mới, giữ nguyên hiệu ứng
- [x] 8. Sections nhóm 1: Hero, Calendar, Countdown, Invitation
- [x] 9. Sections nhóm 2: Program, EventInfo, LocationMap
- [x] 10. Sections nhóm 3: LoveStory, Gallery
- [x] 11. Sections nhóm 4: RsvpForm, Wishes, GiftBox, Footer, DressCode
- [x] 12. Kiểm tra lỗi biên dịch (`get_errors`) và build thử
